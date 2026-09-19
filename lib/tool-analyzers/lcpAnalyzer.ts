import * as cheerio from 'cheerio';

export interface LcpAuditResult {
  tool: 'lcp-checker';
  domain: string;
  targetUrl: string;
  score: number;
  grade: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR';
  lcpCandidate: {
    type: 'image' | 'heading' | 'video' | 'block';
    elementSelector: string;
    htmlSnippet: string;
    resourceUrl?: string;
    hasFetchPriorityHigh: boolean;
    hasPreload: boolean;
    hasLazyLoadingAntiPattern: boolean;
    hasExplicitDimensions: boolean;
    width?: string;
    height?: string;
    format?: string;
  };
  timingEstimate: {
    ttfbMs: number;
    resourceLoadDelayMs: number;
    resourceLoadDurationMs: number;
    elementRenderDelayMs: number;
    estimatedLcpMs: number;
  };
  checks: {
    label: string;
    passed: boolean;
    detail: string;
    severity: 'PASS' | 'WARNING' | 'CRITICAL';
  }[];
  recommendations: string[];
}

export function analyzeLcp(html: string, targetUrl: string, ttfbMs: number): LcpAuditResult {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;

  // 1. Identify LCP candidate
  // Priority: 1. Hero image in header/hero/main, 2. First content image, 3. Primary H1, 4. Main content block
  let candidateType: 'image' | 'heading' | 'video' | 'block' = 'heading';
  let elementSelector = 'h1';
  let htmlSnippet = '';
  let resourceUrl: string | undefined;
  let hasFetchPriorityHigh = false;
  let hasPreload = false;
  let hasLazyLoadingAntiPattern = false;
  let hasExplicitDimensions = false;
  let width: string | undefined;
  let height: string | undefined;
  let format: string | undefined;

  // Check preloaded images in head
  const preloadedImages: string[] = [];
  $('link[rel="preload"][as="image"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) preloadedImages.push(href);
  });

  // Find candidate hero image
  const heroImgEl = $(
    'header img, .hero img, [class*="hero"] img, [class*="banner"] img, main img, article img'
  ).first();

  const anyImgEl = heroImgEl.length > 0 ? heroImgEl : $('img').first();

  if (anyImgEl.length > 0) {
    candidateType = 'image';
    const tagClass = anyImgEl.attr('class') ? `.${anyImgEl.attr('class')?.trim().split(/\s+/).join('.')}` : '';
    const tagId = anyImgEl.attr('id') ? `#${anyImgEl.attr('id')}` : '';
    elementSelector = `img${tagId}${tagClass}` || 'img';
    
    // Extract outer HTML snippet safely
    const rawSnippet = $.html(anyImgEl);
    htmlSnippet = rawSnippet.length > 250 ? rawSnippet.substring(0, 247) + '...' : rawSnippet;

    const src = anyImgEl.attr('src') || anyImgEl.attr('data-src') || '';
    if (src) {
      try {
        resourceUrl = new URL(src, targetUrl).href;
        const ext = resourceUrl.split('.').pop()?.toLowerCase().split('?')[0];
        format = ext ? ext.toUpperCase() : 'UNKNOWN';
      } catch {
        resourceUrl = src;
      }
    }

    const fetchpriority = anyImgEl.attr('fetchpriority')?.toLowerCase();
    hasFetchPriorityHigh = fetchpriority === 'high';

    const loading = anyImgEl.attr('loading')?.toLowerCase();
    hasLazyLoadingAntiPattern = loading === 'lazy';

    width = anyImgEl.attr('width');
    height = anyImgEl.attr('height');
    hasExplicitDimensions = Boolean(width && height);

    if (resourceUrl) {
      hasPreload = preloadedImages.some(
        (p) => p === resourceUrl || (resourceUrl && resourceUrl.includes(p))
      );
    }
  } else {
    // Check H1 heading
    const h1El = $('h1').first();
    if (h1El.length > 0) {
      candidateType = 'heading';
      elementSelector = h1El.attr('id') ? `h1#${h1El.attr('id')}` : 'h1';
      const text = h1El.text().trim();
      htmlSnippet = `<h1>${text.length > 80 ? text.substring(0, 77) + '...' : text}</h1>`;
    } else {
      candidateType = 'block';
      elementSelector = 'body';
      htmlSnippet = '<body>No explicit image or H1 identified</body>';
    }
  }

  // 2. Compute timing estimates
  // TTFB is base. Image load delay is higher if not preloaded. Load duration depends on format.
  const resourceLoadDelayMs = candidateType === 'image' ? (hasPreload ? 80 : 450) : 0;
  const resourceLoadDurationMs =
    candidateType === 'image'
      ? format === 'AVIF' || format === 'WEBP'
        ? 320
        : 680
      : 0;
  const elementRenderDelayMs = hasFetchPriorityHigh ? 60 : 280;
  const estimatedLcpMs = ttfbMs + resourceLoadDelayMs + resourceLoadDurationMs + elementRenderDelayMs;

  // 3. Compile audit checks
  const checks: LcpAuditResult['checks'] = [];

  if (candidateType === 'image') {
    checks.push({
      label: 'Fetchpriority Hint',
      passed: hasFetchPriorityHigh,
      detail: hasFetchPriorityHigh
        ? 'fetchpriority="high" is present, ensuring browser prioritizes this asset.'
        : 'Missing fetchpriority="high". The browser may delay downloading the hero image.',
      severity: hasFetchPriorityHigh ? 'PASS' : 'WARNING',
    });

    checks.push({
      label: 'Avoid Lazy Loading on LCP',
      passed: !hasLazyLoadingAntiPattern,
      detail: hasLazyLoadingAntiPattern
        ? 'loading="lazy" is declared on the primary LCP image. This delays image discovery until script execution.'
        : 'loading="eager" or default loading used. No lazy-loading anti-pattern detected on LCP.',
      severity: hasLazyLoadingAntiPattern ? 'CRITICAL' : 'PASS',
    });

    checks.push({
      label: 'Preload in Head',
      passed: hasPreload,
      detail: hasPreload
        ? 'Asset is preloaded in document head via <link rel="preload">.'
        : 'Asset is not preloaded in document head. Preloading starts asset discovery immediately upon HTML parsing.',
      severity: hasPreload ? 'PASS' : 'WARNING',
    });

    checks.push({
      label: 'Explicit Dimensions (Width/Height)',
      passed: hasExplicitDimensions,
      detail: hasExplicitDimensions
        ? `Explicit dimensions defined (${width}x${height}px) preventing layout shift.`
        : 'Missing explicit width and height attributes. This can cause layout shifts during image render.',
      severity: hasExplicitDimensions ? 'PASS' : 'WARNING',
    });
  } else {
    checks.push({
      label: 'Text Element LCP',
      passed: true,
      detail: 'Primary LCP element is text/heading. Text elements render faster than image assets when web fonts are optimized.',
      severity: 'PASS',
    });
  }

  // 4. Scoring calculation
  let score = 100;
  if (estimatedLcpMs > 4000) score -= 40;
  else if (estimatedLcpMs > 2500) score -= 25;
  else if (estimatedLcpMs > 1800) score -= 10;

  if (hasLazyLoadingAntiPattern) score -= 25;
  if (!hasFetchPriorityHigh && candidateType === 'image') score -= 15;
  if (!hasPreload && candidateType === 'image') score -= 10;
  if (!hasExplicitDimensions && candidateType === 'image') score -= 10;

  score = Math.max(15, Math.min(100, score));
  const grade: LcpAuditResult['grade'] =
    score >= 80 ? 'GOOD' : score >= 50 ? 'NEEDS_IMPROVEMENT' : 'POOR';

  // 5. Targeted recommendations
  const recommendations: string[] = [];
  if (hasLazyLoadingAntiPattern) {
    recommendations.push(
      'Remove loading="lazy" from the hero image. Lazy-loading above-the-fold images delays discovery until after the layout phase.'
    );
  }
  if (!hasFetchPriorityHigh && candidateType === 'image') {
    recommendations.push(
      'Add fetchpriority="high" to the principal LCP image to instruct the browser network queue to prioritize it immediately.'
    );
  }
  if (!hasPreload && candidateType === 'image' && resourceUrl) {
    recommendations.push(
      `Preload the hero image in <head>: <link rel="preload" as="image" href="${resourceUrl}" fetchpriority="high">.`
    );
  }
  if (!hasExplicitDimensions && candidateType === 'image') {
    recommendations.push(
      'Set explicit width and height attributes on the <img> element to lock aspect ratio geometry and eliminate CLS.'
    );
  }
  if (ttfbMs > 500) {
    recommendations.push(
      `Server TTFB is high (${ttfbMs}ms). Improve edge caching and origin server latency to accelerate initial document delivery.`
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'LCP element delivery is well optimized. Continue monitoring real-user field telemetry (CrUX) to protect mobile 75th percentile speeds.'
    );
  }

  return {
    tool: 'lcp-checker',
    domain,
    targetUrl,
    score,
    grade,
    lcpCandidate: {
      type: candidateType,
      elementSelector,
      htmlSnippet,
      resourceUrl,
      hasFetchPriorityHigh,
      hasPreload,
      hasLazyLoadingAntiPattern,
      hasExplicitDimensions,
      width,
      height,
      format,
    },
    timingEstimate: {
      ttfbMs,
      resourceLoadDelayMs,
      resourceLoadDurationMs,
      elementRenderDelayMs,
      estimatedLcpMs,
    },
    checks,
    recommendations,
  };
}
