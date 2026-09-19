import * as cheerio from 'cheerio';

export interface ImageRecord {
  src: string;
  format: string;
  isModernFormat: boolean;
  hasAlt: boolean;
  altText?: string;
  hasDimensions: boolean;
  width?: string;
  height?: string;
  loading?: string;
  isClsRisk: boolean;
}

export interface ImageSizeAuditResult {
  tool: 'image-size-analyzer';
  domain: string;
  targetUrl: string;
  score: number;
  grade: 'OPTIMAL' | 'NEEDS_OPTIMIZATION' | 'POOR';
  stats: {
    totalImages: number;
    modernFormatCount: number;
    legacyFormatCount: number;
    modernFormatPercentage: number;
    missingAltCount: number;
    missingDimensionsCount: number;
    lazyLoadedCount: number;
  };
  formatDistribution: { format: string; count: number }[];
  images: ImageRecord[];
  recommendations: string[];
}

export function analyzeImages(html: string, targetUrl: string): ImageSizeAuditResult {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;

  const images: ImageRecord[] = [];
  const formatCounts: Record<string, number> = {};

  $('img').each((_, el) => {
    const rawSrc = $(el).attr('src') || $(el).attr('data-src') || '';
    if (!rawSrc) return;

    let absSrc = rawSrc;
    try {
      absSrc = new URL(rawSrc, targetUrl).href;
    } catch {}

    const extMatch = absSrc.split('.').pop()?.toLowerCase().split('?')[0];
    let format = 'UNKNOWN';
    if (extMatch && ['webp', 'avif', 'png', 'jpg', 'jpeg', 'gif', 'svg'].includes(extMatch)) {
      format = extMatch === 'jpeg' ? 'JPG' : extMatch.toUpperCase();
    } else if (rawSrc.startsWith('data:image/svg')) {
      format = 'SVG';
    } else if (rawSrc.startsWith('data:image/')) {
      format = 'INLINE_BASE64';
    }

    formatCounts[format] = (formatCounts[format] || 0) + 1;

    const isModernFormat = format === 'WEBP' || format === 'AVIF' || format === 'SVG';

    const altAttr = $(el).attr('alt');
    const hasAlt = typeof altAttr === 'string' && altAttr.trim().length > 0;
    const altText = hasAlt ? altAttr?.trim() : undefined;

    const width = $(el).attr('width');
    const height = $(el).attr('height');
    const hasDimensions = Boolean(width && height);
    const isClsRisk = !hasDimensions;

    const loading = $(el).attr('loading')?.toLowerCase();

    images.push({
      src: absSrc,
      format,
      isModernFormat,
      hasAlt,
      altText,
      hasDimensions,
      width,
      height,
      loading,
      isClsRisk,
    });
  });

  const totalImages = images.length;
  const modernFormatCount = images.filter((img) => img.isModernFormat).length;
  const legacyFormatCount = totalImages - modernFormatCount;
  const modernFormatPercentage =
    totalImages > 0 ? Math.round((modernFormatCount / totalImages) * 100) : 100;
  const missingAltCount = images.filter((img) => !img.hasAlt).length;
  const missingDimensionsCount = images.filter((img) => img.isClsRisk).length;
  const lazyLoadedCount = images.filter((img) => img.loading === 'lazy').length;

  const formatDistribution = Object.entries(formatCounts)
    .map(([format, count]) => ({ format, count }))
    .sort((a, b) => b.count - a.count);

  // Scoring
  let score = 100;
  if (totalImages > 0) {
    // Format penalty
    const legacyRatio = legacyFormatCount / totalImages;
    score -= Math.round(legacyRatio * 35);

    // Missing dimensions (CLS) penalty
    const clsRatio = missingDimensionsCount / totalImages;
    score -= Math.round(clsRatio * 35);

    // Missing alt penalty
    const altRatio = missingAltCount / totalImages;
    score -= Math.round(altRatio * 20);
  }

  score = Math.max(10, Math.min(100, score));
  const grade: ImageSizeAuditResult['grade'] =
    score >= 80 ? 'OPTIMAL' : score >= 50 ? 'NEEDS_OPTIMIZATION' : 'POOR';

  // Recommendations
  const recommendations: string[] = [];
  if (missingDimensionsCount > 0) {
    recommendations.push(
      `Add explicit width and height attributes to ${missingDimensionsCount} image(s) to reserve layout space and eliminate Cumulative Layout Shift (CLS).`
    );
  }
  if (legacyFormatCount > 0) {
    recommendations.push(
      `Convert ${legacyFormatCount} legacy PNG/JPG image(s) to modern WebP or AVIF formats to reduce transfer bytes by 30% to 60%.`
    );
  }
  if (missingAltCount > 0) {
    recommendations.push(
      `Provide descriptive alt text for ${missingAltCount} image(s) to ensure accessibility compliance and image search indexability.`
    );
  }
  if (totalImages > 4 && lazyLoadedCount === 0) {
    recommendations.push(
      'Apply loading="lazy" on below-the-fold images to defer network requests until users scroll into view.'
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'Image assets adhere to modern WebP/AVIF compression with explicit dimensions and complete accessibility metadata.'
    );
  }

  return {
    tool: 'image-size-analyzer',
    domain,
    targetUrl,
    score,
    grade,
    stats: {
      totalImages,
      modernFormatCount,
      legacyFormatCount,
      modernFormatPercentage,
      missingAltCount,
      missingDimensionsCount,
      lazyLoadedCount,
    },
    formatDistribution,
    images: images.slice(0, 40),
    recommendations,
  };
}
