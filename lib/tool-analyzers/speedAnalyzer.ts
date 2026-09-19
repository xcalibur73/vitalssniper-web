import * as cheerio from 'cheerio';

export interface RenderBlockingAsset {
  url: string;
  type: 'script' | 'stylesheet';
  tagSnippet: string;
  suggestedFix: string;
}

export interface SpeedAuditResult {
  tool: 'website-speed-test';
  domain: string;
  targetUrl: string;
  score: number;
  grade: 'FAST' | 'MODERATE' | 'SLOW';
  ttfbMs: number;
  ttfbRating: 'OPTIMAL' | 'MODERATE' | 'SLOW';
  docKb: number;
  totalElements: number;
  compression: {
    isCompressed: boolean;
    encoding?: string;
  };
  renderBlockingSummary: {
    totalBlockingAssets: number;
    blockingScriptsCount: number;
    blockingStylesCount: number;
    assets: RenderBlockingAsset[];
  };
  latencyBreakdown: {
    phase: string;
    durationMs: number;
    status: 'PASS' | 'WARNING' | 'FAIL';
  }[];
  recommendations: string[];
}

export function analyzeSpeed(
  html: string,
  targetUrl: string,
  ttfbMs: number,
  docBytes: number,
  headers?: Headers
): SpeedAuditResult {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;
  const docKb = Math.round(docBytes / 1024);
  const totalElements = $('*').length;

  // 1. TTFB Rating
  let ttfbRating: SpeedAuditResult['ttfbRating'] = 'OPTIMAL';
  if (ttfbMs > 500) ttfbRating = 'SLOW';
  else if (ttfbMs > 250) ttfbRating = 'MODERATE';

  // 2. Render-blocking head assets
  const blockingAssets: RenderBlockingAsset[] = [];
  let blockingScriptsCount = 0;
  let blockingStylesCount = 0;

  $('head script[src]').each((_, el) => {
    const isAsync = $(el).attr('async') !== undefined;
    const isDefer = $(el).attr('defer') !== undefined;
    const isModule = $(el).attr('type')?.toLowerCase() === 'module';

    if (!isAsync && !isDefer && !isModule) {
      blockingScriptsCount++;
      const src = $(el).attr('src') || '';
      blockingAssets.push({
        url: src,
        type: 'script',
        tagSnippet: `<script src="${src.length > 50 ? src.substring(0, 47) + '...' : src}">`,
        suggestedFix: 'Add defer or async attribute to prevent blocking HTML parsing.',
      });
    }
  });

  $('head link[rel="stylesheet"]').each((_, el) => {
    const media = $(el).attr('media')?.toLowerCase();
    const isNonBlockingMedia = media === 'print';

    if (!isNonBlockingMedia) {
      blockingStylesCount++;
      const href = $(el).attr('href') || '';
      blockingAssets.push({
        url: href,
        type: 'stylesheet',
        tagSnippet: `<link rel="stylesheet" href="${href.length > 50 ? href.substring(0, 47) + '...' : href}">`,
        suggestedFix: 'Inline critical above-the-fold CSS and load secondary stylesheets asynchronously.',
      });
    }
  });

  // 3. Compression
  const contentEncoding = headers?.get('content-encoding')?.toLowerCase();
  const isCompressed = Boolean(contentEncoding && ['gzip', 'br', 'zstd'].includes(contentEncoding));

  // 4. Latency Breakdown
  const latencyBreakdown: SpeedAuditResult['latencyBreakdown'] = [
    {
      phase: 'Server Response (TTFB)',
      durationMs: ttfbMs,
      status: ttfbMs < 250 ? 'PASS' : ttfbMs < 600 ? 'WARNING' : 'FAIL',
    },
    {
      phase: 'HTML Document Transfer',
      durationMs: Math.round((docKb / 50) * 40), // estimated download duration on 4G
      status: docKb < 60 ? 'PASS' : docKb < 150 ? 'WARNING' : 'FAIL',
    },
    {
      phase: 'DOM Parse & Node Build',
      durationMs: Math.round(totalElements * 0.15),
      status: totalElements < 1200 ? 'PASS' : totalElements < 2000 ? 'WARNING' : 'FAIL',
    },
  ];

  // 5. Score & Grade
  let score = 100;
  if (ttfbMs > 800) score -= 40;
  else if (ttfbMs > 400) score -= 25;
  else if (ttfbMs > 250) score -= 10;

  if (blockingScriptsCount > 0) score -= Math.min(25, blockingScriptsCount * 10);
  if (blockingStylesCount > 4) score -= 15;
  if (docKb > 100) score -= 15;
  if (!isCompressed) score -= 15;

  score = Math.max(10, Math.min(100, score));
  const grade: SpeedAuditResult['grade'] =
    score >= 80 ? 'FAST' : score >= 50 ? 'MODERATE' : 'SLOW';

  // 6. Recommendations
  const recommendations: string[] = [];
  if (ttfbMs > 300) {
    recommendations.push(
      `Server TTFB is ${ttfbMs}ms. Deploy full-page caching at edge CDN points (Cloudflare, Fastly) or configure Redis page caching on origin.`
    );
  }
  if (blockingScriptsCount > 0) {
    recommendations.push(
      `Found ${blockingScriptsCount} synchronous render-blocking script(s) in <head>. Add defer or async to unblock the main thread.`
    );
  }
  if (!isCompressed) {
    recommendations.push(
      'Server response lacks HTTP compression. Enable Brotli or Gzip to cut transfer latency by 60%.'
    );
  }
  if (docKb > 80) {
    recommendations.push(
      `HTML payload size is ${docKb} KB. Remove bloated inline SVG symbols or redundant server markup to keep initial HTML under 50 KB.`
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'Server delivery speed and render-blocking hygiene meet modern Core Web Vitals standards.'
    );
  }

  return {
    tool: 'website-speed-test',
    domain,
    targetUrl,
    score,
    grade,
    ttfbMs,
    ttfbRating,
    docKb,
    totalElements,
    compression: {
      isCompressed,
      encoding: contentEncoding || undefined,
    },
    renderBlockingSummary: {
      totalBlockingAssets: blockingAssets.length,
      blockingScriptsCount,
      blockingStylesCount,
      assets: blockingAssets.slice(0, 10),
    },
    latencyBreakdown,
    recommendations,
  };
}
