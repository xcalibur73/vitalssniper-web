import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

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

    const domain = parsedUrl.hostname;

    // Fetch target URL with performance measurement
    const startTime = Date.now();
    let response: Response;
    try {
      response = await fetch(targetUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: `Could not reach ${domain}. Please check the domain name and try again.` },
        { status: 502 }
      );
    }

    const ttfb = Date.now() - startTime;
    const html = await response.text();
    const docBytes = new Blob([html]).size;
    const docKb = Math.round(docBytes / 1024);

    // Parse HTML with cheerio
    const $ = cheerio.load(html);

    // 1. DOM Element Count
    const totalElements = $('*').length;

    // 2. Max DOM Depth
    let maxDepth = 1;
    const computeDepth = (node: any, currentDepth: number) => {
      if (currentDepth > maxDepth) maxDepth = currentDepth;
      if (node.type === 'tag' && node.children) {
        for (const child of node.children) {
          if (child.type === 'tag') {
            computeDepth(child, currentDepth + 1);
          }
        }
      }
    };
    const rootEl = $('html').get(0);
    if (rootEl) computeDepth(rootEl, 1);

    // 3. Page Builder / CMS Detection
    const htmlLower = html.toLowerCase();
    const builders: string[] = [];

    if ($('link[href*="elementor"], script[src*="elementor"], .elementor').length > 0 || htmlLower.includes('elementor')) {
      builders.push('Elementor');
    }
    if ($('link[href*="divi"], script[src*="divi"], #et-main-area').length > 0 || htmlLower.includes('et_builder')) {
      builders.push('Divi');
    }
    if ($('link[href*="js_composer"], .vc_row').length > 0 || htmlLower.includes('wpbakery')) {
      builders.push('WPBakery');
    }
    if ($('link[href*="fusion-builder"], .fusion-row').length > 0 || htmlLower.includes('avada')) {
      builders.push('Avada');
    }
    if ($('#__next').length > 0 || htmlLower.includes('/_next/static')) {
      builders.push('Next.js');
    }
    if ($('link[href*="squarespace"], script[src*="squarespace"]').length > 0 || htmlLower.includes('squarespace')) {
      builders.push('Squarespace');
    }
    if ($('html[data-wf-page]').length > 0 || htmlLower.includes('webflow')) {
      builders.push('Webflow');
    }
    if (htmlLower.includes('cdn.shopify.com') || htmlLower.includes('shopify.theme')) {
      builders.push('Shopify');
    }
    if (builders.length === 0 && (htmlLower.includes('wp-content') || htmlLower.includes('wp-includes'))) {
      builders.push('WordPress');
    }

    const detectedCms = builders.length > 0 ? builders.join(' + ') : 'Custom / Static';

    // 4. Viewport Mobile Zoom Lock Check
    const viewportMeta = $('meta[name="viewport"]').attr('content') || '';
    const isZoomLocked =
      viewportMeta.includes('user-scalable=no') ||
      viewportMeta.includes('user-scalable=0') ||
      viewportMeta.includes('maximum-scale=1');

    // 5. AI Citation Schema Readiness
    let hasSchema = false;
    let schemaType = 'None';
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html() || '{}');
        const type = json['@type'] || (Array.isArray(json['@graph']) ? 'Knowledge Graph' : 'Schema Object');
        hasSchema = true;
        schemaType = String(type);
      } catch {}
    });

    // 6. External JavaScript Files
    let externalScripts = 0;
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src') || '';
      if (!src.startsWith('data:') && !src.startsWith('blob:')) {
        externalScripts++;
      }
    });

    // 7. Calculate Performance Health Score (0-100)
    let score = 100;
    if (totalElements > 1400) score -= Math.min(25, Math.floor((totalElements - 1400) / 100));
    if (maxDepth > 32) score -= Math.min(15, (maxDepth - 32) * 2);
    if (docKb > 50) score -= Math.min(20, Math.floor((docKb - 50) / 10));
    if (isZoomLocked) score -= 15;
    if (!hasSchema) score -= 10;
    if (externalScripts > 20) score -= Math.min(15, externalScripts - 20);
    if (ttfb > 600) score -= Math.min(15, Math.floor((ttfb - 600) / 100));
    score = Math.max(12, Math.min(99, score));

    // Determine primary flaw
    let primaryFlaw = 'Clean architecture detected';
    if (docKb > 80 && totalElements > 2000) {
      primaryFlaw = `Severe DOM bloat (${totalElements.toLocaleString()} nodes) with ${docKb}KB payload (${detectedCms})`;
    } else if (docKb > 60) {
      primaryFlaw = `Heavy uncompressed document payload (${docKb}KB exceeds mobile 50KB ceiling)`;
    } else if (isZoomLocked) {
      primaryFlaw = `Mobile viewport scaling is locked (hurts mobile UX & SEO)`;
    } else if (!hasSchema) {
      primaryFlaw = `Missing Schema.org Knowledge Graph structured data (invisible to AI search engines)`;
    } else if (totalElements > 1400) {
      primaryFlaw = `Excessive DOM container nesting (${totalElements.toLocaleString()} elements, depth: ${maxDepth})`;
    }

    // 8. Generate 3-Channel Sniper Outreach Pitch
    const emailPitch = `Subject: quick observation on the mobile experience for ${domain}

Hi [First Name],

While reviewing ${domain} on mobile, I noticed the homepage payload carries over ${docKb}KB of uncompressed container code across ${totalElements.toLocaleString()} DOM elements (${detectedCms}), causing a noticeable freeze on cellular connections before imagery renders.

We specialize in optimizing high-ticket digital architecture so visual fidelity stays pristine while dropping mobile load times to under 1 second.

I put together a quick 30-second screen recording showing the exact bottleneck and the zero-design-change fix.

Would you like me to send the clip over to your team?

Best regards,
[Your Name]
[Your Title / Agency]`;

    const dmPitch = `Hey [First Name] - noticed ${domain} on mobile while exploring your work. 

The site carries ${docKb}KB of container code (${totalElements.toLocaleString()} elements from ${detectedCms}), which causes iPhone Safari to delay rendering key visuals.

I put together a quick 30s screen recording showing how to resolve the bottleneck with zero changes to your photography, typography, or styling.

Mind if I send the clip link over here?

- [Your Name]`;

    const loomScript = `[0:00 - 0:08] "Hey [Name], [Your Name] here. I was reviewing the mobile experience on ${domain} and wanted to point out one specific technical bottleneck your team might not have caught."

[0:08 - 0:18] "Right here on mobile: The homepage is loading over ${docKb}KB of uncompressed container code across ${totalElements.toLocaleString()} DOM elements. Affluent clients on iPhone Safari wait several seconds before credentials and imagery render."

[0:18 - 0:30] "The good news is this can be streamlined in 48 hours with 100% visual invariance and zero downtime. Happy to share the exact remediation teardown if helpful!"`;

    return NextResponse.json({
      domain,
      targetUrl,
      score,
      ttfb,
      telemetry: {
        totalElements,
        maxDepth,
        docKb,
        detectedCms,
        isZoomLocked,
        hasSchema,
        schemaType,
        externalScripts,
      },
      primaryFlaw,
      outreach: {
        email: emailPitch,
        dm: dmPitch,
        loom: loomScript,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error during audit.' }, { status: 500 });
  }
}
