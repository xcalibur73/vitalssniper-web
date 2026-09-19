import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

interface LinkEdge {
  source_url: string;
  target_url: string;
  anchor_text: string;
  is_internal: boolean;
  is_nofollow: boolean;
  is_sponsored: boolean;
}

function normalizeUrl(rawUrl: string, baseUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:') ||
    lower.startsWith('data:') ||
    lower.startsWith('#')
  ) {
    return null;
  }

  try {
    const resolved = new URL(trimmed, baseUrl);
    if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') {
      return null;
    }
    resolved.hash = '';
    return resolved.href;
  } catch {
    return null;
  }
}

function isInternal(targetUrl: string, baseHost: string): boolean {
  try {
    const parsed = new URL(targetUrl);
    const host = parsed.hostname.toLowerCase().replace('www.', '');
    const base = baseHost.toLowerCase().replace('www.', '');
    return host === base || host.endsWith('.' + base);
  } catch {
    return false;
  }
}

function computePageRank(
  nodes: string[],
  edges: { source: string; target: string }[],
  damping: number = 0.85,
  maxIter: number = 50
): Record<string, number> {
  const n = nodes.length;
  if (n === 0) return {};
  if (n === 1) return { [nodes[0]]: 1.0 };

  const nodeMap = new Map<string, number>();
  nodes.forEach((node, i) => nodeMap.set(node, i));

  const outEdges = new Map<string, string[]>();
  for (const edge of edges) {
    if (nodeMap.has(edge.source) && nodeMap.has(edge.target)) {
      if (!outEdges.has(edge.source)) outEdges.set(edge.source, []);
      outEdges.get(edge.source)!.push(edge.target);
    }
  }

  let pr = new Array(n).fill(1.0 / n);

  for (let it = 0; it < maxIter; it++) {
    const nextPr = new Array(n).fill((1.0 - damping) / n);
    let danglingSum = 0.0;

    for (let i = 0; i < n; i++) {
      const node = nodes[i];
      const targets = outEdges.get(node) || [];
      if (targets.length === 0) {
        danglingSum += pr[i];
      } else {
        const share = (damping * pr[i]) / targets.length;
        for (const tgt of targets) {
          const tgtIdx = nodeMap.get(tgt);
          if (tgtIdx !== undefined) {
            nextPr[tgtIdx] += share;
          }
        }
      }
    }

    if (danglingSum > 0) {
      const danglingShare = (damping * danglingSum) / n;
      for (let i = 0; i < n; i++) {
        nextPr[i] += danglingShare;
      }
    }

    let diff = 0.0;
    for (let i = 0; i < n; i++) {
      diff += Math.abs(nextPr[i] - pr[i]);
    }
    pr = nextPr;
    if (diff < 1e-6) break;
  }

  const result: Record<string, number> = {};
  nodes.forEach((node, i) => {
    result[node] = pr[i];
  });
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUrl = body.url;

    if (!rawUrl || typeof rawUrl !== 'string') {
      return NextResponse.json({ error: 'Valid URL is required' }, { status: 400 });
    }

    let targetUrl = rawUrl.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    let baseHost = '';
    try {
      const p = new URL(targetUrl);
      baseHost = p.hostname;
    } catch {
      return NextResponse.json({ error: 'Malformed URL provided' }, { status: 400 });
    }

    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 (LinkBleed/1.0.0)',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    };

    // 1. Ingest Sitemap
    const sitemapUrls: string[] = [];
    try {
      const parsedOrigin = new URL(targetUrl).origin;
      const sitemapResp = await fetch(`${parsedOrigin}/sitemap.xml`, {
        headers,
        signal: AbortSignal.timeout(6000),
      });
      if (sitemapResp.ok) {
        const smText = await sitemapResp.text();
        const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/gi;
        let match;
        while ((match = locRegex.exec(smText)) !== null && sitemapUrls.length < 50) {
          const norm = normalizeUrl(match[1], targetUrl);
          if (norm) sitemapUrls.push(norm);
        }
      }
    } catch {
      // sitemap parse optional
    }

    // 2. Multi-page Crawl (up to 6 internal pages for fast online response)
    const queue: { url: string; depth: number }[] = [{ url: targetUrl, depth: 0 }];
    const visited = new Set<string>();
    const nodeDetails: Record<string, { status: number; depth: number }> = {};
    const edges: LinkEdge[] = [];
    const internalNodesSet = new Set<string>();

    while (queue.length > 0 && visited.size < 6) {
      const current = queue.shift()!;
      if (visited.has(current.url)) continue;
      visited.add(current.url);
      internalNodesSet.add(current.url);

      try {
        const resp = await fetch(current.url, {
          headers,
          signal: AbortSignal.timeout(8000),
          redirect: 'follow',
        });

        nodeDetails[current.url] = { status: resp.status, depth: current.depth };
        if (!resp.ok) continue;

        const html = await resp.text();
        const $ = cheerio.load(html);

        $('a[href]').each((_, el) => {
          const rawHref = $(el).attr('href') || '';
          const normalized = normalizeUrl(rawHref, current.url);
          if (!normalized) return;

          const anchorText = $(el).text().trim() || $(el).find('img').attr('alt') || '[No Text]';
          const rel = ($(el).attr('rel') || '').toLowerCase();
          const isInt = isInternal(normalized, baseHost);

          if (isInt) internalNodesSet.add(normalized);

          edges.push({
            source_url: current.url,
            target_url: normalized,
            anchor_text: anchorText,
            is_internal: isInt,
            is_nofollow: rel.includes('nofollow'),
            is_sponsored: rel.includes('sponsored'),
          });

          if (
            isInt &&
            !visited.has(normalized) &&
            !queue.some((q) => q.url === normalized) &&
            current.depth < 3 &&
            visited.size + queue.length < 10
          ) {
            queue.push({ url: normalized, depth: current.depth + 1 });
          }
        });
      } catch {
        nodeDetails[current.url] = { status: 0, depth: current.depth };
      }
    }

    // Include sitemap URLs into internal nodes set
    sitemapUrls.forEach((u) => internalNodesSet.add(u));

    const internalNodes = Array.from(internalNodesSet);
    const internalEdges = edges.filter((e) => e.is_internal && !e.is_nofollow);

    // 3. Compute PageRank
    const pagerankMap = computePageRank(
      internalNodes,
      internalEdges.map((e) => ({ source: e.source_url, target: e.target_url }))
    );

    // 4. Calculate Leakage
    let externalLeakageCount = 0;
    let nofollowLeakageCount = 0;
    let internalEdgeCount = 0;

    edges.forEach((e) => {
      if (e.is_internal) {
        internalEdgeCount++;
        if (e.is_nofollow) nofollowLeakageCount++;
      } else {
        externalLeakageCount++;
      }
    });

    const totalOut = edges.length || 1;
    const leakageRatioPercent = Math.min(
      100,
      parseFloat(
        (
          ((externalLeakageCount * 0.4 + nofollowLeakageCount * 0.8) / totalOut) *
          100
        ).toFixed(2)
      )
    );

    // 5. Detect Orphan Pages
    const inDegrees: Record<string, number> = {};
    const outDegrees: Record<string, number> = {};
    internalNodes.forEach((n) => {
      inDegrees[n] = 0;
      outDegrees[n] = 0;
    });

    internalEdges.forEach((e) => {
      outDegrees[e.source_url] = (outDegrees[e.source_url] || 0) + 1;
      inDegrees[e.target_url] = (inDegrees[e.target_url] || 0) + 1;
    });

    const orphans = internalNodes
      .filter((n) => n !== targetUrl && inDegrees[n] === 0)
      .map((n) => ({
        url: n,
        in_sitemap: sitemapUrls.includes(n),
        pagerank: parseFloat(((pagerankMap[n] || 0) * 1000).toFixed(3)),
      }));

    // 6. Crawl Depth Distribution
    const depthDistribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
    let maxDepth = 0;
    Object.values(nodeDetails).forEach((d) => {
      const bucket = Math.min(4, d.depth);
      depthDistribution[bucket] = (depthDistribution[bucket] || 0) + 1;
      if (d.depth > maxDepth) maxDepth = d.depth;
    });

    // 7. Top Authority Pages
    const topPages = internalNodes
      .map((url) => ({
        url,
        pagerank: parseFloat(((pagerankMap[url] || 0) * 1000).toFixed(3)),
        in_links: inDegrees[url] || 0,
        out_links: outDegrees[url] || 0,
        depth: nodeDetails[url]?.depth ?? 1,
      }))
      .sort((a, b) => b.pagerank - a.pagerank)
      .slice(0, 8);

    // 8. Architecture Score
    const leakageScore = leakageRatioPercent <= 5 ? 100 : Math.max(0, 100 - (leakageRatioPercent - 5) * 2.5);
    const orphanScore = orphans.length === 0 ? 100 : Math.max(20, 100 - (orphans.length / internalNodes.length) * 100);
    const depthScore = maxDepth <= 2 ? 100 : (maxDepth === 3 ? 90 : 75);

    const overallScore = parseFloat(
      (leakageScore * 0.4 + orphanScore * 0.35 + depthScore * 0.25).toFixed(1)
    );

    let grade = 'F';
    if (overallScore >= 90) grade = 'A';
    else if (overallScore >= 75) grade = 'B';
    else if (overallScore >= 60) grade = 'C';
    else if (overallScore >= 45) grade = 'D';

    const recommendations: string[] = [];
    if (leakageRatioPercent > 12) {
      recommendations.push(
        `Reduce PageRank equity leakage (${leakageRatioPercent}%): Verify outbound external links use rel='noopener' and eliminate internal rel='nofollow' directives.`
      );
    }
    if (orphans.length > 0) {
      recommendations.push(
        `Connect ${orphans.length} orphan URL(s) to site hierarchy: Add internal anchor links from relevant pillar or category pages.`
      );
    }
    if (maxDepth >= 4) {
      recommendations.push(
        `Flatten click depth: Deep content at depth ${maxDepth} requires excessive crawl budget. Add breadcrumbs or contextual link bridges.`
      );
    }
    if (recommendations.length === 0) {
      recommendations.push(
        'Internal link graph is well architected with strong PageRank distribution and clean click depth hierarchy.'
      );
    }

    return NextResponse.json({
      url: targetUrl,
      base_domain: baseHost,
      overall_score: overallScore,
      grade,
      stats: {
        total_internal_pages: internalNodes.length,
        total_internal_edges: internalEdges.length,
        total_external_edges: externalLeakageCount,
        pagerank_leakage_ratio: leakageRatioPercent,
        orphan_count: orphans.length,
        max_crawl_depth: maxDepth,
      },
      component_scores: {
        equity_preservation: Math.round(leakageScore),
        orphan_prevention: Math.round(orphanScore),
        crawl_depth_efficiency: Math.round(depthScore),
      },
      leakage_breakdown: {
        external_outbound: externalLeakageCount,
        internal_nofollow: nofollowLeakageCount,
      },
      crawl_depth_distribution: depthDistribution,
      top_pages: topPages,
      orphan_pages: orphans.slice(0, 10),
      recommendations,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to crawl and analyze internal link graph' },
      { status: 500 }
    );
  }
}
