import * as cheerio from 'cheerio';

export interface PageWeightCategory {
  name: string;
  count: number;
  estimatedBytes: number;
  estimatedKb: number;
  percentageOfTotal: number;
}

export interface PageWeightAuditResult {
  tool: 'page-weight-checker';
  domain: string;
  targetUrl: string;
  score: number;
  grade: 'LIGHT' | 'MODERATE' | 'HEAVY';
  totalTransferBytes: number;
  totalTransferKb: number;
  totalTransferMb: number;
  budgetLimitMb: number;
  isWithinBudget: boolean;
  categories: PageWeightCategory[];
  heaviestAssets: {
    url: string;
    type: 'script' | 'stylesheet' | 'image' | 'font';
    isExternal: boolean;
  }[];
  compression: {
    isCompressed: boolean;
    encoding?: string;
  };
  recommendations: string[];
}

export function analyzePageWeight(
  html: string,
  targetUrl: string,
  docBytes: number,
  headers?: Headers
): PageWeightAuditResult {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;

  // 1. Resource counts & discovery
  const externalScripts: string[] = [];
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) externalScripts.push(src);
  });

  const externalStylesheets: string[] = [];
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) externalStylesheets.push(href);
  });

  const images: string[] = [];
  $('img[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) images.push(src);
  });

  const fonts: string[] = [];
  $('link[rel*="font"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) fonts.push(href);
  });

  // 2. Weight estimations
  // HTML: exact byte size
  const htmlBytes = docBytes;

  // Industry average bundle sizes per referenced element (HTTP Archive 2024 mobile medians)
  const estimatedScriptBytes = Math.round(externalScripts.length * 48 * 1024);
  const estimatedCssBytes = Math.round(externalStylesheets.length * 28 * 1024);
  const estimatedImgBytes = Math.round(images.length * 65 * 1024);
  const estimatedFontBytes = Math.round(Math.max(1, fonts.length) * 35 * 1024);

  const totalTransferBytes =
    htmlBytes + estimatedScriptBytes + estimatedCssBytes + estimatedImgBytes + estimatedFontBytes;
  const totalTransferKb = Math.round(totalTransferBytes / 1024);
  const totalTransferMb = parseFloat((totalTransferBytes / (1024 * 1024)).toFixed(2));
  const budgetLimitMb = 1.5;
  const isWithinBudget = totalTransferMb <= budgetLimitMb;

  // 3. Category distribution
  const rawCategories = [
    { name: 'JavaScript', count: externalScripts.length, bytes: estimatedScriptBytes },
    { name: 'Images', count: images.length, bytes: estimatedImgBytes },
    { name: 'CSS Stylesheets', count: externalStylesheets.length, bytes: estimatedCssBytes },
    { name: 'HTML Document', count: 1, bytes: htmlBytes },
    { name: 'Web Fonts', count: fonts.length, bytes: estimatedFontBytes },
  ];

  const categories: PageWeightCategory[] = rawCategories.map((cat) => ({
    name: cat.name,
    count: cat.count,
    estimatedBytes: cat.bytes,
    estimatedKb: Math.round(cat.bytes / 1024),
    percentageOfTotal: Math.round((cat.bytes / Math.max(1, totalTransferBytes)) * 100),
  }));

  // 4. Heaviest Referenced Assets
  const heaviestAssets: PageWeightAuditResult['heaviestAssets'] = [];

  for (const s of externalScripts.slice(0, 4)) {
    let absUrl = s;
    try {
      absUrl = new URL(s, targetUrl).href;
    } catch {}
    heaviestAssets.push({
      url: absUrl,
      type: 'script',
      isExternal: !absUrl.includes(domain),
    });
  }

  for (const css of externalStylesheets.slice(0, 3)) {
    let absUrl = css;
    try {
      absUrl = new URL(css, targetUrl).href;
    } catch {}
    heaviestAssets.push({
      url: absUrl,
      type: 'stylesheet',
      isExternal: !absUrl.includes(domain),
    });
  }

  for (const img of images.slice(0, 3)) {
    let absUrl = img;
    try {
      absUrl = new URL(img, targetUrl).href;
    } catch {}
    heaviestAssets.push({
      url: absUrl,
      type: 'image',
      isExternal: !absUrl.includes(domain),
    });
  }

  // 5. Compression
  const contentEncoding = headers?.get('content-encoding')?.toLowerCase();
  const isCompressed = Boolean(contentEncoding && ['gzip', 'br', 'zstd'].includes(contentEncoding));

  // 6. Score & Grade
  let score = 100;
  if (totalTransferMb > 3.5) score -= 50;
  else if (totalTransferMb > 2.5) score -= 35;
  else if (totalTransferMb > 1.5) score -= 20;

  if (externalScripts.length > 20) score -= 20;
  else if (externalScripts.length > 10) score -= 10;

  if (!isCompressed) score -= 15;

  score = Math.max(10, Math.min(100, score));
  const grade: PageWeightAuditResult['grade'] =
    score >= 80 ? 'LIGHT' : score >= 50 ? 'MODERATE' : 'HEAVY';

  // 7. Recommendations
  const recommendations: string[] = [];
  if (!isWithinBudget) {
    recommendations.push(
      `Total estimated page weight (${totalTransferMb} MB) exceeds the 1.5 MB mobile budget. Prune unused script dependencies and compress images.`
    );
  }
  if (externalScripts.length > 12) {
    recommendations.push(
      `Found ${externalScripts.length} external JavaScript requests. Consolidate vendor libraries and load non-critical scripts via dynamic imports.`
    );
  }
  if (!isCompressed) {
    recommendations.push(
      'HTML response is uncompressed. Enable Brotli or Gzip on your web server or CDN to reduce text transfer size by up to 70%.'
    );
  }
  if (images.length > 15) {
    recommendations.push(
      `The document references ${images.length} images. Ensure below-the-fold images use loading="lazy" and modern WebP or AVIF formats.`
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'Page weight and resource distribution are well calibrated for rapid mobile loading.'
    );
  }

  return {
    tool: 'page-weight-checker',
    domain,
    targetUrl,
    score,
    grade,
    totalTransferBytes,
    totalTransferKb,
    totalTransferMb,
    budgetLimitMb,
    isWithinBudget,
    categories,
    heaviestAssets,
    compression: {
      isCompressed,
      encoding: contentEncoding || undefined,
    },
    recommendations,
  };
}
