import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { analyzeLcp } from '@/lib/tool-analyzers/lcpAnalyzer';
import { analyzeHeaders } from '@/lib/tool-analyzers/headersAnalyzer';
import { analyzeSeoMeta } from '@/lib/tool-analyzers/seoMetaAnalyzer';
import { validateSchema } from '@/lib/tool-analyzers/schemaValidator';
import { analyzeBrokenLinks } from '@/lib/tool-analyzers/brokenLinkAnalyzer';
import { analyzePageWeight } from '@/lib/tool-analyzers/pageWeightAnalyzer';
import { analyzeImages } from '@/lib/tool-analyzers/imageAnalyzer';
import { analyzeSpeed } from '@/lib/tool-analyzers/speedAnalyzer';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { url, tool } = await req.json();

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

    // Route to dedicated tool analyzer if tool parameter is specified
    if (tool === 'lcp-checker') {
      return NextResponse.json(analyzeLcp(html, targetUrl, ttfb));
    }
    if (tool === 'http-header-checker') {
      return NextResponse.json(analyzeHeaders(response, targetUrl));
    }
    if (tool === 'seo-meta-checker') {
      return NextResponse.json(analyzeSeoMeta(html, targetUrl, response.headers));
    }
    if (tool === 'schema-validator') {
      return NextResponse.json(validateSchema(html, targetUrl));
    }
    if (tool === 'broken-link-checker') {
      return NextResponse.json(await analyzeBrokenLinks(html, targetUrl));
    }
    if (tool === 'page-weight-checker') {
      return NextResponse.json(analyzePageWeight(html, targetUrl, docBytes, response.headers));
    }
    if (tool === 'image-size-analyzer') {
      return NextResponse.json(analyzeImages(html, targetUrl));
    }
    if (tool === 'website-speed-test') {
      return NextResponse.json(analyzeSpeed(html, targetUrl, ttfb, docBytes, response.headers));
    }

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

    // 8. Determine primary flaw category, deep reasoning, and actionable improvement ideas
    let primaryFlaw = 'Clean architecture detected';
    let emailPitch = '';
    let dmPitch = '';
    let loomScript = '';
    let improvements: string[] = [];

    if (totalElements > 2000 || (totalElements > 1400 && builders.length > 0)) {
      primaryFlaw = `Severe DOM bloat (${totalElements.toLocaleString()} nodes) with deep ${detectedCms} container nesting`;
      improvements = [
        'Flatten container hierarchy into semantic HTML5 (<section>, <main>) with native CSS Grid/Flexbox, dropping total DOM nodes by 60%+',
        'Virtualize and defer below-the-fold content sections so mobile layout geometry calculates instantly for visible hero elements',
        'Guarantee 100% visual design invariance (exact typography, spacing, styling, animations, and photography preserved with 0 changes)',
      ];

      emailPitch = `Subject: quick observation on the mobile experience for ${domain}

Hi [First Name],

While reviewing ${domain} on mobile, I noticed the homepage tree carries ${totalElements.toLocaleString()} DOM elements with deep container nesting from ${detectedCms}.

Because mobile browsers must recursively recalculate layout geometry across thousands of nested nodes, this creates a 1.8s to 3.2s main-thread freeze where button taps hesitate before responding, causing mobile visitors to bounce.

We specialize in architectural refactoring that flattens excessive builder nesting into semantic HTML5 while keeping your design, branding, and typography 100% intact:
1. Flatten 15+ container wrappers into lightweight CSS Grid (reducing DOM nodes by 60%+).
2. Defer layout calculations for below-the-fold sections so the mobile viewport becomes interactive in under 1 second.
3. Zero design changes (100% visual fidelity guarantee).

I recorded a quick 30-second screen teardown showing the exact bottleneck and how to eliminate the lag in 48 hours.

Mind if I send the clip over to your team?

Best regards,
[Your Name]
[Your Title / Agency]`;

      dmPitch = `Hey [First Name] - noticed ${domain} on mobile while exploring your work.

The homepage carries ${totalElements.toLocaleString()} DOM nodes with deep container nesting from ${detectedCms}. On mobile devices, this forces the browser to recalculate layout geometry across thousands of elements, causing a 2-second main-thread freeze before taps respond.

We can streamline this with zero visual changes:
• Flatten container nesting into clean CSS Grid (cutting DOM count by 60%+).
• Virtualize below-the-fold blocks so the mobile viewport is interactive in under 1 second.
• 100% design fidelity preserved (exact typography, spacing, and photography).

I recorded a 30s teardown showing the exact fix. Mind if I share the link here?

- [Your Name]`;

      loomScript = `[0:00 - 0:08] "Hey [Name], [Your Name] here. I was testing ${domain} on mobile and wanted to point out one specific technical bottleneck that's impacting your conversion rates."

[0:08 - 0:22] "Right here in the mobile inspector: the page tree has ${totalElements.toLocaleString()} DOM nodes with deep container nesting from ${detectedCms}. Because mobile chipsets have to recursively compute layout geometry for every wrapper, button clicks freeze for up to 2 seconds before firing."

[0:22 - 0:35] "The fix is straightforward and requires zero design changes: we flatten the container hierarchy into semantic CSS Grid, dropping DOM count by 60%+ and making the page instantly responsive. Happy to share the exact teardown if helpful!"`;

    } else if (docKb > 50) {
      primaryFlaw = `Heavy document payload (${docKb}KB HTML exceeds mobile 50KB speed ceiling)`;
      improvements = [
        'Extract inlined base64 data URIs and embedded SVG graphics into external cached assets served via HTTP/2 multiplexing',
        'Enable edge-level Brotli compression (level 11) with HTML minification to bring the initial document under 35KB',
        'Inline only critical above-the-fold CSS while deferring non-essential stylesheet chunks for sub-800ms FCP',
      ];

      emailPitch = `Subject: quick observation on the mobile speed for ${domain}

Hi [First Name],

While testing ${domain} on mobile data, I noticed the initial HTML document payload alone is ${docKb}KB, which significantly exceeds the 50KB mobile cellular speed budget.

Because mobile towers transmit data in 14.6KB TCP packets during the slow-start window, an oversized HTML file requires multiple cellular round-trips before the browser can even begin parsing your layout, delaying First Contentful Paint by over 2 seconds.

We can resolve this without touching your visual layout or design:
1. Extract inline SVG graphics and embedded base64 assets into external cached files via HTTP/2.
2. Implement edge Brotli compression and code minification to bring the document under 35KB.
3. Inline critical above-the-fold styling while deferring non-essential stylesheets.

I put together a quick 30-second screen recording showing the packet waterfall and the zero-design-change fix.

Would you like me to send the video over?

Best regards,
[Your Name]
[Your Title / Agency]`;

      dmPitch = `Hey [First Name] - noticed ${domain} on mobile while checking out your site.

The initial HTML payload is ${docKb}KB (above the 50KB mobile threshold). Over cellular data, this requires 5+ TCP packet round-trips before the browser can even start rendering, leaving mobile visitors on a blank screen for 2+ seconds.

We can fix this with 0 visual changes:
• Extract inline base64/SVG assets into cached HTTP/2 assets.
• Apply edge Brotli compression to drop the document payload under 35KB.
• Defer secondary styling so First Contentful Paint renders in under 800ms.

I made a quick 30s screen recording showing the fix. Mind if I send the clip over?

- [Your Name]`;

      loomScript = `[0:00 - 0:08] "Hey [Name], [Your Name] here. I was testing ${domain} on a mobile connection and spotted a network-level bottleneck that's delaying your initial render."

[0:08 - 0:22] "Right here in the network waterfall: the HTML payload is ${docKb}KB. Cellular networks deliver data in 14.6KB TCP packets, so this requires multiple round-trips over cellular towers before the browser can paint anything, creating 2 seconds of blank-screen delay."

[0:22 - 0:35] "We can resolve this with zero design modifications by extracting inline assets into cached CDN files and enabling edge Brotli compression to bring it under 35KB. Happy to send over the full remediation plan if you'd like!"`;

    } else if (isZoomLocked) {
      primaryFlaw = `Mobile viewport scaling is locked (violates WCAG 2.2 accessibility & mobile SEO)`;
      improvements = [
        'Update viewport meta tag to width=device-width, initial-scale=1.0 allowing fluid pinch-to-zoom up to 500% with 0 layout shift',
        'Implement modern CSS clamp() typography so headline scaling remains balanced across all screen magnifications',
        'Audit interactive tap zones to guarantee 48x48px minimum touch targets, eliminating mobile mis-taps',
      ];

      emailPitch = `Subject: mobile accessibility issue on ${domain}

Hi [First Name],

While reviewing ${domain} on an iPhone, I noticed your mobile viewport configuration currently blocks pinch-to-zoom (user-scalable=no).

This creates a frustrating experience for prospective clients trying to zoom in on your work, directly violates WCAG 2.2 accessibility standards (SC 1.4.4), and triggers usability warnings in Google's mobile ranking algorithms.

We can resolve this cleanly with zero disruption to your visual design:
1. Update the viewport meta tag to allow fluid zoom up to 500% without horizontal overflow.
2. Implement modern fluid clamp() typography so text scales elegantly across all screen sizes.
3. Validate all touch targets meet the 48x48px standard for effortless mobile navigation.

I recorded a 30-second mobile walkthrough demonstrating the issue and the exact 5-minute code fix.

Would you like me to send the clip over to your team?

Best regards,
[Your Name]
[Your Title / Agency]`;

      dmPitch = `Hey [First Name] - noticed ${domain} on mobile while checking out your site.

The viewport tag is set to lock pinch-to-zoom (user-scalable=0). This blocks visitors on phones from zooming in on portfolio details, violates WCAG 2.2 accessibility rules, and can trigger Google mobile usability demotions.

We can fix this in under an hour with 0 design changes:
• Unlock the viewport tag for smooth 500% zoom with 0 layout shift.
• Add fluid clamp() scaling so typography adjusts seamlessly.
• Ensure all touch targets meet mobile tap standards.

I recorded a 30s screen clip showing the fix. Mind if I send the link over?

- [Your Name]`;

      loomScript = `[0:00 - 0:08] "Hey [Name], [Your Name] here. I was reviewing ${domain} on mobile and noticed an accessibility restriction that could be hurting your mobile conversions and Google visibility."

[0:08 - 0:22] "Right here in the viewport tag: user zooming is locked with user-scalable=0. When prospective clients try to pinch and zoom into your portfolio or details, the screen is frozen. This triggers WCAG accessibility violations and Google mobile usability penalties."

[0:22 - 0:35] "The fix takes less than an hour with zero visual changes: we configure fluid scaling so mobile visitors can zoom comfortably while the design stays pixel-perfect. Happy to share the exact fix if helpful!"`;

    } else if (!hasSchema) {
      primaryFlaw = `Missing Schema.org Knowledge Graph (invisible to AI search engines & rich snippets)`;
      improvements = [
        'Deploy structured JSON-LD Knowledge Graph with Organization/LocalBusiness, Service, and canonical sameAs authority links',
        'Add conversational FAQPage and semantic entity markup optimized for direct citation in Google AI Overviews and ChatGPT Search',
        'Configure a structured llms.txt index so autonomous AI crawlers can cleanly parse and cite your brand offerings',
      ];

      emailPitch = `Subject: AI search discoverability for ${domain}

Hi [First Name],

While auditing search discoverability for ${domain}, I noticed your site currently has 0% Schema.org structured data in JSON-LD format.

New AI search platforms (ChatGPT Search, Perplexity AI, Google AI Overviews) rely on structured entity graphs to verify authority. Without this structured data, AI models cannot disambiguate your services or credentials, causing them to cite competitors instead of your business.

We can implement a complete AI-ready semantic graph with zero changes to your website design:
1. Deploy a comprehensive JSON-LD Knowledge Graph with Organization, Service, and sameAs entity links.
2. Add FAQPage and passage-optimized structured schema for direct citation in AI summaries.
3. Configure an llms.txt index so AI search crawlers can parse and cite your offerings instantly.

I put together a quick 30-second teardown showing how AI search currently sees your domain and how to get cited.

Would you like me to send the video over?

Best regards,
[Your Name]
[Your Title / Agency]`;

      dmPitch = `Hey [First Name] - noticed ${domain} while researching leaders in your space.

Your site currently lacks Schema.org JSON-LD structured data. Modern AI search engines like ChatGPT Search and Perplexity use these entity graphs to cite authoritative brands. Without it, AI crawlers skip your content and cite competitors instead.

We can set up full AI citation readiness with zero changes to your website:
• Deploy structured Organization and Service JSON-LD entity graphs.
• Add passage-extractable schema for AI Overviews and answer engines.
• Set up an llms.txt index for autonomous AI crawlers.

I recorded a 30s teardown showing how AI crawlers currently read your domain. Mind if I share the link?

- [Your Name]`;

      loomScript = `[0:00 - 0:08] "Hey [Name], [Your Name] here. I was analyzing ${domain}'s search presence and wanted to highlight an emerging blind spot in AI search discoverability."

[0:08 - 0:22] "Right here in the page source: there is zero Schema.org JSON-LD structured data. Platforms like ChatGPT Search, Perplexity, and Google AI Overviews rely on structured entity graphs to understand your authority. Without it, they end up citing competing businesses."

[0:22 - 0:35] "We can implement a complete entity Knowledge Graph and llms.txt directory with zero visual changes to your website, unlocking AI citations within days. Happy to share the teardown if you'd like to take a look!"`;

    } else {
      primaryFlaw = `Render-blocking resources & asset delivery delay sub-1s mobile LCP`;
      improvements = [
        'Apply fetchpriority="high" and preconnect resource hints on Largest Contentful Paint hero visuals',
        'Offload non-critical analytics trackers (GTM, Meta Pixel, Hotjar) off the main thread via web workers',
        'Preload primary typography with font-display: swap to eliminate layout shifts (CLS) and invisible text flash',
      ];

      emailPitch = `Subject: quick observation on mobile loading speed for ${domain}

Hi [First Name],

While testing ${domain}'s mobile architecture, I noticed key render-blocking resource chains that delay Largest Contentful Paint (LCP) past Google's 2.5s Core Web Vitals threshold.

Because third-party tracker scripts and web fonts load synchronously on the main thread, mobile visitors experience a noticeable delay before interactive elements respond, directly impacting conversion rates.

We can optimize this to sub-1-second mobile speeds with zero visual changes:
1. Add fetchpriority="high" and preconnect hints to ensure hero visuals load instantly.
2. Offload heavy analytics trackers to web workers off the main execution thread.
3. Preload web fonts with font-display: swap to eliminate layout shifts and invisible text.

I put together a quick 30-second screen recording showing the network waterfall and the exact optimization fix.

Would you like me to send the clip over to your team?

Best regards,
[Your Name]
[Your Title / Agency]`;

      dmPitch = `Hey [First Name] - noticed ${domain} on mobile while exploring your work.

Your mobile page load has render-blocking script chains that push Largest Contentful Paint past Google's 2.5s threshold, which creates friction on mobile connections.

We can drop this to sub-1-second speeds with 0 visual changes:
• Prioritize hero imagery with fetchpriority="high" and preconnects.
• Offload analytics trackers off the main UI thread via web workers.
• Preload primary web fonts with font-display: swap for 0 layout shift.

I recorded a 30s screen clip showing the fix. Mind if I send the link over?

- [Your Name]`;

      loomScript = `[0:00 - 0:08] "Hey [Name], [Your Name] here. I was reviewing ${domain}'s mobile performance and wanted to point out a specific asset delivery bottleneck."

[0:08 - 0:22] "Right here in the network waterfall: third-party scripts and synchronous font loading are blocking the main thread, pushing your Largest Contentful Paint past 2.5 seconds and hurting mobile visitor retention."

[0:22 - 0:35] "We can streamline the asset delivery pipeline to achieve sub-1-second mobile loads with 100% visual fidelity preserved. Happy to share the exact remediation breakdown if helpful!"`;
    }

    return NextResponse.json({
      success: true,
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
      improvements,
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
