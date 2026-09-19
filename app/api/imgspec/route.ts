import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

function isModernFormat(str: string): boolean {
  const lower = str.toLowerCase();
  return (
    lower.includes('image/avif') ||
    lower.includes('image/webp') ||
    lower.includes('image/svg') ||
    lower.endsWith('.avif') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.svg') ||
    lower.includes('.avif?') ||
    lower.includes('.webp?') ||
    lower.includes('.svg?')
  );
}

function calculateBreakpoints(width: number): number[] {
  const tiers = [360, 480, 720, 960, 1200, 1440, 1600];
  const max = Math.min(width > 0 ? width : 1200, 1600);
  const bp = tiers.filter((t) => t <= max);
  if (bp.length === 0 || bp[bp.length - 1] < max) {
    bp.push(max);
  }
  if (!bp.includes(360)) bp.unshift(360);
  return Array.from(new Set(bp)).sort((a, b) => a - b);
}

function generateResponsivePicture(src: string, alt: string, w: number, h: number, isLcp: boolean): string {
  const base = src.replace(/\.[^/.]+$/, '');
  const bp = calculateBreakpoints(w);
  const avifSrcset = bp.map((b) => `${base}-${b}.avif ${b}w`).join(', ');
  const webpSrcset = bp.map((b) => `${base}-${b}.webp ${b}w`).join(', ');
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px';
  const priority = isLcp ? 'fetchpriority="high"' : 'fetchpriority="low"';
  const loading = isLcp ? 'loading="eager"' : 'loading="lazy"';

  return `<picture>
  <source type="image/avif" srcset="${avifSrcset}" sizes="${sizes}" />
  <source type="image/webp" srcset="${webpSrcset}" sizes="${sizes}" />
  <img src="${src}" alt="${alt || 'Descriptive keyword-rich image'}" width="${w}" height="${h}" ${priority} ${loading} decoding="async" />
</picture>`;
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

    const images: any[] = [];
    let lcpCandidate: any = null;
    let maxArea = -1;

    $('img').each((idx, el) => {
      let src = $(el).attr('src') || $(el).attr('data-src') || '';
      if (!src) return;

      if (src.startsWith('//')) {
        src = 'https:' + src;
      } else if (src.startsWith('/')) {
        try {
          src = new URL(src, targetUrl).href;
        } catch {
          // keep relative
        }
      }

      const alt = $(el).attr('alt') || '';
      const srcset = $(el).attr('srcset') || '';
      const sizes = $(el).attr('sizes') || '';
      const loading = ($(el).attr('loading') || 'eager').toLowerCase();
      const fetchpriority = ($(el).attr('fetchpriority') || 'auto').toLowerCase();
      const widthAttr = $(el).attr('width');
      const heightAttr = $(el).attr('height');

      const naturalW = widthAttr && !isNaN(Number(widthAttr)) ? parseInt(widthAttr, 10) : 800;
      const naturalH = heightAttr && !isNaN(Number(heightAttr)) ? parseInt(heightAttr, 10) : 450;
      const estArea = naturalW * naturalH;

      const parentPicture = $(el).closest('picture').length > 0;
      const pictureSources: any[] = [];
      if (parentPicture) {
        $(el).closest('picture').find('source').each((_, s) => {
          pictureSources.push({
            type: $(s).attr('type') || '',
            srcset: $(s).attr('srcset') || '',
            sizes: $(s).attr('sizes') || '',
          });
        });
      }

      const hasModernFormat = isModernFormat(src) || pictureSources.some((s) => isModernFormat(s.type + s.srcset));
      const hasExplicitDimensions = Boolean(widthAttr && heightAttr);
      const isOversized = naturalW > 750; // mobile viewport 375 * 2 DPR = 750

      const imgData = {
        index: idx + 1,
        src,
        alt,
        loading,
        fetchpriority,
        natural_dimensions: `${naturalW}x${naturalH}`,
        natural_width: naturalW,
        natural_height: naturalH,
        has_modern_format: hasModernFormat,
        has_explicit_dimensions: hasExplicitDimensions,
        has_srcset: Boolean(srcset) || pictureSources.some((s) => Boolean(s.srcset)),
        is_oversized: isOversized,
        pixel_waste_percent: isOversized ? Math.round(((naturalW - 750) / naturalW) * 100) : 0,
      };

      images.push(imgData);

      if (idx === 0 || estArea > maxArea) {
        lcpCandidate = imgData;
        maxArea = estArea;
      }
    });

    const totalCount = Math.max(1, images.length);
    const oversizedCount = images.filter((i) => i.is_oversized).length;
    const modernCount = images.filter((i) => i.has_modern_format).length;
    const dimensionsCount = images.filter((i) => i.has_explicit_dimensions).length;
    const srcsetCount = images.filter((i) => i.has_srcset).length;
    const avgWaste = Math.round(images.reduce((acc, i) => acc + i.pixel_waste_percent, 0) / totalCount);

    // LCP checks
    let lcpScore = 100;
    const lcpDefects: string[] = [];
    if (lcpCandidate) {
      if (lcpCandidate.loading === 'lazy') {
        lcpDefects.push("Critical: LCP hero image has loading='lazy'. This delays image download until layout calculation completes.");
        lcpScore -= 45;
      }
      if (lcpCandidate.fetchpriority !== 'high') {
        lcpDefects.push("Warning: LCP hero image is missing fetchpriority='high'. Browser discovers the asset late in the waterfall.");
        lcpScore -= 25;
      }
      if (!lcpCandidate.has_explicit_dimensions) {
        lcpDefects.push("Warning: LCP hero image lacks explicit width and height attributes, risking layout shift (CLS).");
        lcpScore -= 15;
      }
      if (!lcpCandidate.has_modern_format) {
        lcpDefects.push("Info: LCP hero image is served in legacy format. Converting to AVIF/WebP reduces transfer size by 35%-60%.");
        lcpScore -= 15;
      }
    }
    lcpScore = Math.max(0, lcpScore);

    const wasteScore = Math.max(0, 100 - avgWaste);
    const formatScore = Math.round((modernCount / totalCount) * 100);
    const clsScore = Math.round((dimensionsCount / totalCount) * 100);
    const srcsetScore = Math.round((srcsetCount / totalCount) * 100);

    const overallScore = Math.round(
      (lcpScore * 0.35) + (wasteScore * 0.25) + (formatScore * 0.20) + (clsScore * 0.10) + (srcsetScore * 0.10)
    );

    const recommendations: string[] = [];
    if (lcpDefects.length > 0) {
      recommendations.push(...lcpDefects);
    }
    if (oversizedCount > 0) {
      recommendations.push(`Generate responsive srcset breakpoints for ${oversizedCount} oversized image(s) to avoid serving desktop dimensions to mobile devices.`);
    }
    if (formatScore < 70) {
      recommendations.push(`Convert legacy images (${totalCount - modernCount} file(s)) to next-gen WebP or AVIF format.`);
    }
    if (clsScore < 100) {
      recommendations.push(`Add explicit 'width' and 'height' attributes on ${totalCount - dimensionsCount} image(s) to guarantee 0.00 CLS.`);
    }

    const responsiveMarkup = lcpCandidate
      ? generateResponsivePicture(lcpCandidate.src, lcpCandidate.alt, lcpCandidate.natural_width, lcpCandidate.natural_height, true)
      : '';

    return NextResponse.json({
      target_url: targetUrl,
      overall_score: overallScore,
      grade: overallScore >= 90 ? 'A' : overallScore >= 75 ? 'B' : overallScore >= 60 ? 'C' : overallScore >= 40 ? 'D' : 'F',
      total_images: images.length,
      stats: {
        oversized_images: oversizedCount,
        average_byte_waste_percent: avgWaste,
        modern_format_count: modernCount,
        explicit_dimensions_count: dimensionsCount,
        responsive_srcset_count: srcsetCount,
      },
      component_scores: {
        lcp_priority: lcpScore,
        byte_waste_efficiency: wasteScore,
        format_modernity: formatScore,
        layout_shift_protection: clsScore,
        responsive_srcset_coverage: srcsetScore,
      },
      lcp_candidate: lcpCandidate ? {
        src: lcpCandidate.src,
        loading: lcpCandidate.loading,
        fetchpriority: lcpCandidate.fetchpriority,
        score: lcpScore,
        defects: lcpDefects,
        verdict: lcpScore >= 85 ? 'Optimal LCP Delivery' : lcpScore >= 55 ? 'Sub-optimal LCP Hints' : 'Critical LCP Bottleneck',
      } : null,
      images,
      recommended_markup: responsiveMarkup,
      recommendations: recommendations.slice(0, 5),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal error processing ImgSpec audit.' },
      { status: 500 }
    );
  }
}
