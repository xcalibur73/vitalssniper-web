import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

interface EntityNode {
  id: string;
  type: string;
  name?: string;
  source_url: string;
  same_as: string[];
}

interface GraphEdge {
  source_id: string;
  target_id: string;
  property_name: string;
}

function normalizeId(uri: string, baseUrl: string): string {
  if (!uri) return '';
  let clean = uri.trim();
  if (clean.startsWith('http://')) {
    clean = 'https://' + clean.slice(7);
  }
  if (clean.startsWith('//')) {
    clean = 'https:' + clean;
  }
  if (clean.startsWith('#') || clean.startsWith('/')) {
    try {
      const resolved = new URL(clean, baseUrl);
      clean = resolved.href;
    } catch {
      // keep as is
    }
  }
  return clean.replace(/\/+$/, '');
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'A valid URL is required.' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
    }

    let res: Response;
    try {
      res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: `Failed to fetch target URL: ${err.message || 'Connection timed out'}` },
        { status: 502 }
      );
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // 1. Extract JSON-LD blocks
    const rawBlocks: any[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      const text = $(el).text().trim();
      if (!text) return;
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          rawBlocks.push(...parsed);
        } else {
          rawBlocks.push(parsed);
        }
      } catch {
        // malformed json
      }
    });

    // 2. Flatten entities
    const entities: any[] = [];
    const unpack = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        obj.forEach(unpack);
        return;
      }
      if (obj['@graph'] && Array.isArray(obj['@graph'])) {
        obj['@graph'].forEach(unpack);
        return;
      }
      if (obj['@type']) {
        entities.push(obj);
      }
    };
    rawBlocks.forEach(unpack);

    // 3. Build Nodes and Edges
    const nodes: Record<string, EntityNode> = {};
    const edges: GraphEdge[] = [];
    const relationProps = [
      'author', 'publisher', 'creator', 'worksFor', 'memberOf',
      'parentOrganization', 'mainEntityOfPage', 'isPartOf', 'about', 'founder',
      'provider', 'itemReviewed', 'publishingPrinciples'
    ];

    entities.forEach((ent, idx) => {
      const rawId = ent['@id'] || `${targetUrl}#${ent['@type']}#${idx + 1}`;
      const id = normalizeId(rawId, targetUrl);
      const sameAs = Array.isArray(ent.sameAs)
        ? ent.sameAs
        : ent.sameAs
        ? [ent.sameAs]
        : [];

      nodes[id] = {
        id,
        type: Array.isArray(ent['@type']) ? ent['@type'].join(', ') : ent['@type'] || 'Thing',
        name: ent.name || ent.headline || ent.title || id,
        source_url: targetUrl,
        same_as: sameAs,
      };

      relationProps.forEach((prop) => {
        const val = ent[prop];
        if (!val) return;
        if (typeof val === 'object' && val['@id']) {
          edges.push({
            source_id: id,
            target_id: normalizeId(val['@id'], targetUrl),
            property_name: prop,
          });
        } else if (typeof val === 'string' && (val.startsWith('http') || val.startsWith('#') || val.startsWith('/'))) {
          edges.push({
            source_id: id,
            target_id: normalizeId(val, targetUrl),
            property_name: prop,
          });
        }
      });
    });

    // 4. Integrity Checks
    const nodeIds = new Set(Object.keys(nodes));
    const brokenRefs: any[] = [];
    edges.forEach((edge) => {
      if (!nodeIds.has(edge.target_id)) {
        brokenRefs.push({
          target_id: edge.target_id,
          source_id: edge.source_id,
          property: edge.property_name,
        });
      }
    });

    const targetIds = new Set(edges.map((e) => e.target_id));
    const orphanNodes: any[] = [];
    Object.keys(nodes).forEach((id) => {
      if (!targetIds.has(id)) {
        orphanNodes.push(nodes[id]);
      }
    });

    // 5. Disambiguation
    const disambiguation: any[] = [];
    Object.values(nodes).forEach((n) => {
      if (['Organization', 'Person', 'WebSite'].some((t) => n.type.includes(t))) {
        disambiguation.push({
          id: n.id,
          type: n.type,
          name: n.name,
          has_same_as: n.same_as.length > 0,
          same_as_count: n.same_as.length,
        });
      }
    });

    // 6. Scoring
    const totalRefs = edges.length;
    const refScore = totalRefs === 0 ? 100 : Math.round(((totalRefs - brokenRefs.length) / totalRefs) * 100);
    const totalNodesCount = Object.keys(nodes).length;
    const connScore = totalNodesCount === 0 ? 100 : Math.round(((totalNodesCount - orphanNodes.length) / totalNodesCount) * 100);
    const missingSameAs = disambiguation.filter((d) => !d.has_same_as).length;
    const disambScore = disambiguation.length === 0 ? 100 : Math.round(((disambiguation.length - missingSameAs) / disambiguation.length) * 100);

    const overallScore = Math.round((refScore * 0.45) + (connScore * 0.35) + (disambScore * 0.20));

    const recommendations: string[] = [];
    if (brokenRefs.length > 0) {
      recommendations.push(`Fix ${brokenRefs.length} broken @id reference(s) pointing to non-existent nodes: ${brokenRefs.map((b) => b.property + ' -> ' + b.target_id).slice(0, 2).join(', ')}.`);
    }
    if (missingSameAs > 0) {
      recommendations.push(`Add 'sameAs' Knowledge Graph references (Wikidata, Wikipedia, LinkedIn) to ${missingSameAs} primary entity node(s).`);
    }
    if (orphanNodes.length > 0 && totalNodesCount > 1) {
      recommendations.push(`Connect isolated entity nodes (${orphanNodes.map((o) => o.type).slice(0, 2).join(', ')}) to primary content schemas via 'publisher' or 'isPartOf'.`);
    }
    if (recommendations.length === 0) {
      recommendations.push('Graph structure is sound with zero broken entity references and clean Knowledge Graph disambiguation.');
    }

    return NextResponse.json({
      target_url: targetUrl,
      overall_score: overallScore,
      grade: overallScore >= 90 ? 'A' : overallScore >= 75 ? 'B' : overallScore >= 60 ? 'C' : overallScore >= 40 ? 'D' : 'F',
      total_entities: totalNodesCount,
      total_edges: edges.length,
      component_scores: {
        reference_integrity: refScore,
        entity_connectivity: connScore,
        disambiguation_depth: disambScore,
      },
      entities_found: Object.values(nodes).map((n) => ({ id: n.id, type: n.type, name: n.name })),
      broken_references: brokenRefs,
      orphan_nodes: orphanNodes.map((o) => ({ id: o.id, type: o.type, name: o.name })),
      disambiguation,
      recommendations,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal error processing SchemaGraph audit.' },
      { status: 500 }
    );
  }
}
