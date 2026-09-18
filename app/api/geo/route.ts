import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

interface CrawlerDefinition {
  name: string;
  type: string;
  governs: string;
}

const CRAWLER_DEFINITIONS: CrawlerDefinition[] = [
  { name: 'OAI-SearchBot', type: 'Search Citability', governs: 'ChatGPT Search retrieval and answers' },
  { name: 'Claude-SearchBot', type: 'Search Citability', governs: 'Claude.ai web search citations' },
  { name: 'PerplexityBot', type: 'Search Citability', governs: 'Perplexity AI search engine citations' },
  { name: 'Googlebot', type: 'Search Citability', governs: 'Google Search, AI Overviews & AI Mode' },
  { name: 'GPTBot', type: 'Model Training', governs: 'OpenAI foundation model training only' },
  { name: 'ClaudeBot', type: 'Model Training', governs: 'Anthropic foundation model training only' },
  { name: 'Google-Extended', type: 'Model Training', governs: 'Gemini & Vertex AI model training / grounding' },
  { name: 'Applebot-Extended', type: 'Model Training', governs: 'Apple Intelligence training opt-out' },
  { name: 'CCBot', type: 'Model Training', governs: 'Common Crawl dataset scraping' }
];

const STAT_PATTERN = /(\b\d+(\.\d+)?%|\$\d+(\.\d+)?|\b\d{1,3}(,\d{3})+|\b(19|20)\d{2}\b)/i;
const QUOTE_PATTERN = /["“][^"”]{10,200}["”]/;
const ATTRIBUTION_PATTERN = /\b(according to|reported by|study by|source:|data from|research by|cited by|published in|as noted by|found that)\b/i;

function parseRobotsRules(robotsTxt: string): Record<string, { disallow: string[]; allow: string[] }> {
  const rules: Record<string, { disallow: string[]; allow: string[] }> = {};
  let currentAgents: string[] = [];
  let inDirectives = false;

  for (const rawLine of robotsTxt.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes(':')) continue;

    const [rawKey, ...rest] = line.split(':');
    const key = rawKey.trim().toLowerCase();
    const val = rest.join(':').trim();

    if (key === 'user-agent') {
      if (inDirectives) {
        currentAgents = [];
        inDirectives = false;
      }
      currentAgents.push(val.toLowerCase());
    } else if (key === 'disallow') {
      inDirectives = true;
      for (const agent of currentAgents) {
        if (!rules[agent]) rules[agent] = { disallow: [], allow: [] };
        rules[agent].disallow.push(val);
      }
    } else if (key === 'allow') {
      inDirectives = true;
      for (const agent of currentAgents) {
        if (!rules[agent]) rules[agent] = { disallow: [], allow: [] };
        rules[agent].allow.push(val);
      }
    }
  }

  return rules;
}

function testCrawlerAccess(robotsTxt: string) {
  const rules = parseRobotsRules(robotsTxt);
  const wildcard = rules['*'] || { disallow: [], allow: [] };

  let searchAllowed = 0;
  let searchTotal = 0;

  const results = CRAWLER_DEFINITIONS.map((crawler) => {
    const nameLower = crawler.name.toLowerCase();
    let disallowed = false;
    let reason = 'Explicitly or implicitly allowed';

    if (rules[nameLower]) {
      const agentRule = rules[nameLower];
      const hasRootDisallow = agentRule.disallow.some((d) => d === '/');
      const hasRootAllow = agentRule.allow.some((a) => a === '/');

      if (hasRootDisallow && !hasRootAllow) {
        disallowed = true;
        reason = `Explicitly blocked via 'Disallow: /' for ${crawler.name}`;
      } else if (hasRootAllow) {
        disallowed = false;
        reason = `Explicitly allowed via 'Allow: /' for ${crawler.name}`;
      }
    } else {
      const hasRootDisallow = wildcard.disallow.some((d) => d === '/');
      const hasRootAllow = wildcard.allow.some((a) => a === '/');

      if (hasRootDisallow && !hasRootAllow) {
        disallowed = true;
        reason = "Blocked by wildcard 'User-agent: *' directive";
      }
    }

    if (crawler.type === 'Search Citability') {
      searchTotal++;
      if (!disallowed) searchAllowed++;
    }

    return {
      name: crawler.name,
      type: crawler.type,
      governs: crawler.governs,
      status: disallowed ? 'BLOCKED' : 'ALLOWED',
      reason
    };
  });

  const searchScore = Math.round((searchAllowed / Math.max(1, searchTotal)) * 100);

  return {
    search_score: searchScore,
    results
  };
}

function scorePassage(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  if (wordCount === 0) return { score: 0, word_count: 0, length_verdict: 'EMPTY', has_statistics: false, has_quotes: false, has_attributions: false };

  let lengthScore = 25;
  let lengthVerdict = 'POOR (Too short or too long)';

  if (wordCount >= 134 && wordCount <= 167) {
    lengthScore = 100;
    lengthVerdict = 'OPTIMAL (134-167 words)';
  } else if (wordCount >= 90 && wordCount <= 210) {
    lengthScore = 80;
    lengthVerdict = 'GOOD (90-210 words)';
  } else if (wordCount >= 40 && wordCount <= 260) {
    lengthScore = 55;
    lengthVerdict = 'MARGINAL (40-260 words)';
  }

  const hasStats = STAT_PATTERN.test(text);
  const hasQuotes = QUOTE_PATTERN.test(text);
  const hasAttr = ATTRIBUTION_PATTERN.test(text);

  let evidenceScore = 0;
  if (hasStats) evidenceScore += 25;
  if (hasQuotes) evidenceScore += 20;
  if (hasAttr) evidenceScore += 25;

  let totalScore = (lengthScore * 0.45) + Math.min(55, evidenceScore);
  totalScore = Math.round(Math.min(100, Math.max(0, totalScore)) * 10) / 10;

  return {
    score: totalScore,
    word_count: wordCount,
    length_verdict: lengthVerdict,
    has_statistics: hasStats,
    has_quotes: hasQuotes,
    has_attributions: hasAttr
  };
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'A valid target URL is required.' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    let parsed: URL;
    try {
      parsed = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
    }

    const domain = parsed.hostname;
    const origin = parsed.origin;

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9'
    };

    // 1. Fetch Page HTML, robots.txt, and llms.txt in parallel
    const [pageRes, robotsRes, llmsRes] = await Promise.all([
      fetch(targetUrl, { headers, redirect: 'follow', signal: AbortSignal.timeout(12000) }).catch(() => null),
      fetch(`${origin}/robots.txt`, { headers, redirect: 'follow', signal: AbortSignal.timeout(8000) }).catch(() => null),
      fetch(`${origin}/llms.txt`, { headers, redirect: 'follow', signal: AbortSignal.timeout(6000) }).catch(() => null)
    ]);

    if (!pageRes || !pageRes.ok) {
      return NextResponse.json(
        { error: `Could not retrieve HTML from ${domain}. Status: ${pageRes ? pageRes.status : 'Network Timeout'}` },
        { status: 502 }
      );
    }

    const html = await pageRes.text();
    const robotsTxt = robotsRes && robotsRes.ok ? await robotsRes.text() : '';
    const llmsPresent = !!(llmsRes && llmsRes.ok);

    // 2. Crawler Access Audit
    const crawlerData = testCrawlerAccess(robotsTxt);

    // 3. Cheerio Content Extraction & Passage Citability Scoring
    const $ = cheerio.load(html);
    $('script, style, nav, footer, header, noscript, svg').remove();

    const passages: { text: string; scoreData: ReturnType<typeof scorePassage>; index: number; preview: string }[] = [];
    const mainScope = $('main, article, body').first();
    const candidates = mainScope.find('p, blockquote, li');

    let totalCandidateWords = 0;
    candidates.each((i, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      const words = text.split(/\s+/).filter(Boolean);
      if (words.length >= 15) {
        totalCandidateWords += words.length;
        const scored = scorePassage(text);
        passages.push({
          text,
          scoreData: scored,
          index: i,
          preview: text.slice(0, 140) + (text.length > 140 ? '...' : '')
        });
      }
    });

    passages.sort((a, b) => b.scoreData.score - a.scoreData.score);
    const topCandidates = passages.slice(0, 3);
    const avgPassageScore = passages.length > 0
      ? Math.round((passages.reduce((acc, p) => acc + p.scoreData.score, 0) / passages.length) * 10) / 10
      : 30.0;

    // 4. Schema.org JSON-LD Entities
    const schemas: any[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const raw = $(el).html() || '';
        const parsedJson = JSON.parse(raw);
        if (Array.isArray(parsedJson)) schemas.push(...parsedJson);
        else if (parsedJson['@graph'] && Array.isArray(parsedJson['@graph'])) schemas.push(...parsedJson['@graph']);
        else schemas.push(parsedJson);
      } catch {}
    });

    const schemaTypes: string[] = [];
    let hasOrg = false;
    let hasPerson = false;
    const sameAsLinks: string[] = [];

    for (const s of schemas) {
      const t = s['@type'];
      if (Array.isArray(t)) schemaTypes.push(...t.map(String));
      else if (t) schemaTypes.push(String(t));

      if (['Organization', 'Corporation', 'LocalBusiness'].includes(String(t))) hasOrg = true;
      if (['Person', 'Author'].includes(String(t))) hasPerson = true;

      if (s.sameAs) {
        if (typeof s.sameAs === 'string') sameAsLinks.push(s.sameAs);
        else if (Array.isArray(s.sameAs)) sameAsLinks.push(...s.sameAs);
      }
    }

    let schemaScore = schemas.length > 0 ? 30 : 0;
    if (hasOrg) schemaScore += 25;
    if (hasPerson) schemaScore += 20;
    if (sameAsLinks.length > 0) schemaScore += 25;
    schemaScore = Math.min(100, schemaScore);

    // 5. Composite Scoring
    const passageCitability = avgPassageScore;
    const crawlerAccess = crawlerData.search_score;
    const schemaEntity = schemaScore;
    const llmsScore = llmsPresent ? 90 : 20;

    const overallScore = Math.round(
      (passageCitability * 0.35) + (crawlerAccess * 0.25) + (schemaEntity * 0.25) + (llmsScore * 0.15)
    );

    const googleAio = Math.round(Math.min(100, (passageCitability * 0.45) + (schemaEntity * 0.35) + (crawlerAccess * 0.20)));
    const chatgpt = Math.round(Math.min(100, (crawlerAccess * 0.40) + (passageCitability * 0.35) + (schemaEntity * 0.25)));
    const perplexity = Math.round(Math.min(100, (passageCitability * 0.50) + (crawlerAccess * 0.30) + (schemaEntity * 0.20)));

    const recommendations: string[] = [];
    if (crawlerAccess < 100) {
      recommendations.push("Ensure 'OAI-SearchBot', 'Claude-SearchBot', and 'PerplexityBot' are explicitly allowed in robots.txt.");
    }
    if (passageCitability < 70) {
      recommendations.push("Front-load factual definitions in the first 40 words of each section and format key answers into 134-167 word blocks.");
    }
    if (sameAsLinks.length === 0) {
      recommendations.push("Add authoritative 'sameAs' entity links in JSON-LD (Wikidata, Wikipedia, LinkedIn) to establish Knowledge Graph entity connections.");
    }
    if (!hasPerson) {
      recommendations.push("Implement 'Person' author schema with professional credentials and publication dates to boost E-E-A-T citation confidence.");
    }
    if (!llmsPresent) {
      recommendations.push("Deploy a structured '/llms.txt' index file at your domain root for machine-readable AI agent indexation.");
    }

    return NextResponse.json({
      url: targetUrl,
      domain,
      overall_score: overallScore,
      platform_scores: {
        google_ai_overviews: googleAio,
        chatgpt_search: chatgpt,
        perplexity_ai: perplexity
      },
      component_scores: {
        passage_citability: passageCitability,
        crawler_access: crawlerAccess,
        schema_entity_graph: schemaEntity,
        llms_readiness: llmsScore
      },
      crawler_results: crawlerData.results,
      top_passages: topCandidates.map((c) => ({
        score: c.scoreData.score,
        word_count: c.scoreData.word_count,
        length_verdict: c.scoreData.length_verdict,
        has_statistics: c.scoreData.has_statistics,
        has_quotes: c.scoreData.has_quotes,
        has_attributions: c.scoreData.has_attributions,
        preview: c.preview,
        full_text: c.text
      })),
      schema_summary: {
        total_schemas: schemas.length,
        types: Array.from(new Set(schemaTypes)),
        has_organization: hasOrg,
        has_person: hasPerson,
        same_as_count: sameAsLinks.length
      },
      llms_txt_present: llmsPresent,
      recommendations
    });
  } catch (err: any) {
    return NextResponse.json({ error: `Audit failed: ${err?.message || 'Unknown error'}` }, { status: 500 });
  }
}
