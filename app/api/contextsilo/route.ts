import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

const GENERIC_ANCHORS = new Set([
  'click here',
  'read more',
  'learn more',
  'here',
  'this',
  'link',
  'this link',
  'this page',
  'this article',
  'check it out',
  'more info',
  'view more',
  'find out more',
  'continue reading',
  'website',
  'source',
  'details',
  'visit',
  'see here',
  'download',
  'go here',
  '[no text]',
  '[empty anchor]',
]);

const NAVIGATIONAL_ANCHORS = new Set([
  'about',
  'about us',
  'contact',
  'contact us',
  'home',
  'homepage',
  'blog',
  'docs',
  'documentation',
  'pricing',
  'privacy',
  'privacy policy',
  'terms',
  'terms of service',
  'reviews',
  'articles',
  'tools',
  'resources',
]);

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'could', 'did', 'do', 'does', 'doing', 'down',
  'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his',
  'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me',
  'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 's',
  'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we',
  'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why',
  'will', 'with', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

function tokenizeClean(text: string): string[] {
  if (!text) return [];
  const words = text.toLowerCase().match(/\b[a-z0-9_-]{2,}\b/g) || [];
  return words.filter((w) => !STOP_WORDS.has(w));
}

function computeCosine(tokensA: string[], tokensB: string[]): number {
  if (!tokensA.length || !tokensB.length) return 0;
  const countA = new Map<string, number>();
  const countB = new Map<string, number>();

  tokensA.forEach((t) => countA.set(t, (countA.get(t) || 0) + 1));
  tokensB.forEach((t) => countB.set(t, (countB.get(t) || 0) + 1));

  let dotProduct = 0;
  countA.forEach((c, w) => {
    if (countB.has(w)) {
      dotProduct += c * countB.get(w)!;
    }
  });

  let normA = 0;
  countA.forEach((v) => (normA += v * v));
  let normB = 0;
  countB.forEach((v) => (normB += v * v));

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
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
    if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') return null;
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
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 (ContextSilo/1.0.0)',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    };

    const queue: string[] = [targetUrl];
    const visited = new Set<string>();
    const pageMetadata: Record<string, { title: string; h1: string; desc: string }> = {};
    const links: {
      source_url: string;
      target_url: string;
      anchor_text: string;
      passage: string;
      placement: string;
    }[] = [];

    while (queue.length > 0 && visited.size < 5) {
      const currentUrl = queue.shift()!;
      if (visited.has(currentUrl)) continue;
      visited.add(currentUrl);

      try {
        const resp = await fetch(currentUrl, {
          headers,
          signal: AbortSignal.timeout(8000),
          redirect: 'follow',
        });
        if (!resp.ok) continue;

        const html = await resp.text();
        const $ = cheerio.load(html);

        const title = $('title').text().trim();
        const h1 = $('h1').first().text().trim();
        const desc = $('meta[name="description"]').attr('content')?.trim() || '';

        pageMetadata[currentUrl] = { title, h1, desc };

        $('a[href]').each((_, el) => {
          const rawHref = $(el).attr('href') || '';
          const normalized = normalizeUrl(rawHref, currentUrl);
          if (!normalized || !isInternal(normalized, baseHost) || normalized === currentUrl) return;

          let anchorText = $(el).text().trim();
          if (!anchorText) {
            const alt = $(el).find('img').attr('alt');
            anchorText = alt ? `[Image Alt: ${alt.trim()}]` : '[No Text]';
          }

          let placement = 'content';
          if ($(el).closest('header, nav').length) placement = 'navigation';
          else if ($(el).closest('footer').length) placement = 'footer';
          else if ($(el).closest('aside, .sidebar').length) placement = 'sidebar';

          let passage = '';
          const parentBlock = $(el).closest('p, li, blockquote, td');
          if (parentBlock.length) {
            passage = parentBlock.text().replace(/\s+/g, ' ').trim().slice(0, 240);
          } else {
            passage = anchorText;
          }

          links.push({
            source_url: currentUrl,
            target_url: normalized,
            anchor_text: anchorText,
            passage,
            placement,
          });

          if (
            !visited.has(normalized) &&
            !queue.includes(normalized) &&
            visited.size + queue.length < 8
          ) {
            queue.push(normalized);
          }
        });
      } catch {
        // continue
      }
    }

    const brandName = baseHost.toLowerCase().replace('www.', '').split('.')[0];
    const anchorTypeDistribution: Record<string, number> = {
      navigational: 0,
      generic: 0,
      exact_match: 0,
      partial_match: 0,
      descriptive: 0,
      branded: 0,
    };

    const anchorToTargets = new Map<string, Set<string>>();
    const genericLinks: any[] = [];
    let totalContiguity = 0;
    let contiguityCount = 0;

    const classifiedLinks = links.map((l) => {
      const lowerAnchor = l.anchor_text.toLowerCase().trim();
      const meta = pageMetadata[l.target_url] || { title: '', h1: '', desc: '' };

      let anchorType = 'descriptive';
      if (NAVIGATIONAL_ANCHORS.has(lowerAnchor)) {
        anchorType = 'navigational';
      } else if (GENERIC_ANCHORS.has(lowerAnchor) || lowerAnchor.length <= 2) {
        anchorType = 'generic';
      } else if (brandName && lowerAnchor.includes(brandName)) {
        anchorType = 'branded';
      } else {
        const anchorToks = tokenizeClean(lowerAnchor);
        const targetToks = new Set([...tokenizeClean(meta.h1), ...tokenizeClean(meta.title)]);
        const overlap = anchorToks.filter((t) => targetToks.has(t));

        if (anchorToks.length >= 2 && overlap.length === anchorToks.length) {
          anchorType = 'exact_match';
        } else if (overlap.length > 0) {
          anchorType = 'partial_match';
        }
      }

      anchorTypeDistribution[anchorType] = (anchorTypeDistribution[anchorType] || 0) + 1;

      // Track for cannibalization
      if (anchorType !== 'generic' && anchorType !== 'navigational' && lowerAnchor.length > 3) {
        if (!anchorToTargets.has(lowerAnchor)) anchorToTargets.set(lowerAnchor, new Set());
        anchorToTargets.get(lowerAnchor)!.add(l.target_url);
      }

      // Vector Cosine Similarity
      const srcTokens = tokenizeClean(`${l.anchor_text} ${l.passage}`);
      const tgtTokens = tokenizeClean(`${meta.h1} ${meta.title} ${meta.desc}`);
      const sim = computeCosine(srcTokens, tgtTokens);

      totalContiguity += sim;
      contiguityCount++;

      let contiguityRating = 'Topical Drift / Weak';
      if (sim >= 0.4) contiguityRating = 'High Contiguity';
      else if (sim >= 0.2) contiguityRating = 'Moderate Contiguity';

      let suggestedReplacement = '';
      if (anchorType === 'generic') {
        const candidate = meta.h1 || meta.title || 'Related Guide';
        suggestedReplacement = candidate.replace(/\s*[-|:]\s*.*$/, '').split(' ').slice(0, 6).join(' ');
        genericLinks.push({
          anchor_text: l.anchor_text,
          target_url: l.target_url,
          suggested_replacement: suggestedReplacement,
        });
      }

      return {
        source_url: l.source_url,
        target_url: l.target_url,
        anchor_text: l.anchor_text,
        anchor_type: anchorType,
        vector_similarity: parseFloat(sim.toFixed(3)),
        contiguity_rating: contiguityRating,
      };
    });

    // Cannibalization Collisions
    const cannibalizationCollisions: any[] = [];
    anchorToTargets.forEach((targets, anchor) => {
      if (targets.size > 1) {
        cannibalizationCollisions.push({
          anchor_text: anchor,
          conflicting_target_count: targets.size,
          conflicting_urls: Array.from(targets).slice(0, 4),
        });
      }
    });

    const totalLinks = links.length || 1;
    const genericCount = anchorTypeDistribution.generic || 0;
    const genericRatio = parseFloat(((genericCount / totalLinks) * 100).toFixed(1));
    const avgContiguityPercent = contiguityCount
      ? parseFloat(((totalContiguity / contiguityCount) * 100).toFixed(1))
      : 25.0;

    const uniqueAnchors = new Set(links.map((l) => l.anchor_text.toLowerCase().trim())).size;
    const diversityRatio = parseFloat(((uniqueAnchors / totalLinks) * 100).toFixed(1));

    // Scoring
    const contiguityScore =
      avgContiguityPercent >= 28 ? 100 : Math.max(20, Math.round(avgContiguityPercent * 3.5));
    const genericScore =
      genericRatio <= 3 ? 100 : Math.max(0, Math.round(100 - (genericRatio - 3) * 3));
    const cannibalizationScore =
      cannibalizationCollisions.length === 0
        ? 100
        : Math.max(20, 100 - cannibalizationCollisions.length * 12);
    const diversityScore = diversityRatio >= 50 ? 100 : Math.max(30, Math.round(diversityRatio * 1.8));

    const overallScore = parseFloat(
      (
        contiguityScore * 0.35 +
        genericScore * 0.3 +
        cannibalizationScore * 0.2 +
        diversityScore * 0.15
      ).toFixed(1)
    );

    let grade = 'F';
    if (overallScore >= 90) grade = 'A';
    else if (overallScore >= 75) grade = 'B';
    else if (overallScore >= 60) grade = 'C';
    else if (overallScore >= 45) grade = 'D';

    const recommendations: string[] = [];
    if (genericCount > 0) {
      recommendations.push(
        `Replace ${genericCount} generic anchor(s) ('click here', 'read more'): Update with descriptive entity-rich phrases derived from target headings.`
      );
    }
    if (cannibalizationCollisions.length > 0) {
      recommendations.push(
        `Resolve ${cannibalizationCollisions.length} anchor cannibalization collision(s): Assign distinct, non-overlapping anchor phrases to differentiate target URLs.`
      );
    }
    if (avgContiguityPercent < 20) {
      recommendations.push(
        'Strengthen semantic passage context: Ensure sentences surrounding internal links share topical vocabulary with target destinations.'
      );
    }
    if (!recommendations.length) {
      recommendations.push(
        'Internal anchor network demonstrates strong vector contiguity, balanced anchor diversity, and zero keyword cannibalization.'
      );
    }

    return NextResponse.json({
      url: targetUrl,
      base_domain: baseHost,
      overall_score: overallScore,
      grade,
      stats: {
        total_links_analyzed: links.length,
        unique_anchors: uniqueAnchors,
        generic_anchor_count: genericCount,
        generic_anchor_ratio: genericRatio,
        average_vector_contiguity: avgContiguityPercent,
        cannibalization_collisions_count: cannibalizationCollisions.length,
      },
      component_scores: {
        semantic_contiguity: contiguityScore,
        generic_anchor_prevention: genericScore,
        cannibalization_prevention: cannibalizationScore,
        anchor_diversity: diversityScore,
      },
      anchor_type_distribution: anchorTypeDistribution,
      cannibalization_collisions: cannibalizationCollisions.slice(0, 8),
      generic_links: genericLinks.slice(0, 8),
      recommendations,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to audit semantic anchor texts and vector contiguity' },
      { status: 500 }
    );
  }
}
