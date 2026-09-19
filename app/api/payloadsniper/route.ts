import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

const THIRD_PARTY_PATTERNS = [
  { vendor: 'Google Tag Manager', category: 'Tag Management', patterns: ['googletagmanager.com/gtm.js', 'gtm.js'] },
  { vendor: 'Google Analytics (GA4)', category: 'Analytics', patterns: ['google-analytics.com/analytics.js', 'googletagmanager.com/gtag/js', 'gtag/js'] },
  { vendor: 'Meta Pixel (Facebook)', category: 'Advertising', patterns: ['connect.facebook.net', 'fbevents.js'] },
  { vendor: 'Hotjar', category: 'Session Recording', patterns: ['static.hotjar.com', 'script.hotjar.com'] },
  { vendor: 'Klaviyo', category: 'Marketing Automation', patterns: ['static.klaviyo.com', 'klaviyo.js'] },
  { vendor: 'HubSpot', category: 'Marketing Automation', patterns: ['js.hs-scripts.com', 'js.hsforms.net', 'js.hs-analytics.net'] },
  { vendor: 'TikTok Pixel', category: 'Advertising', patterns: ['analytics.tiktok.com'] },
  { vendor: 'Intercom', category: 'Customer Support', patterns: ['widget.intercom.io'] },
  { vendor: 'Sentry', category: 'Error Monitoring', patterns: ['browser.sentry-cdn.com'] },
  { vendor: 'Stripe', category: 'Payment Gateway', patterns: ['js.stripe.com'] },
  { vendor: 'Cloudflare Insights', category: 'Analytics', patterns: ['cloudflareinsights.com', 'beacon.min.js'] },
  { vendor: 'Segment', category: 'Data Platform', patterns: ['cdn.segment.com/analytics.js'] },
  { vendor: 'Microsoft Clarity', category: 'Session Recording', patterns: ['www.clarity.ms'] },
];

function classifyScript(scriptUrl: string, pageDomain: string) {
  if (!scriptUrl) {
    return {
      vendor: 'Inline Script',
      category: 'Application Code',
      is_third_party: false,
      domain: pageDomain,
    };
  }

  let host = '';
  try {
    const parsed = new URL(scriptUrl);
    host = parsed.hostname.toLowerCase();
  } catch {
    host = pageDomain;
  }

  const lower = scriptUrl.toLowerCase();
  for (const entry of THIRD_PARTY_PATTERNS) {
    for (const p of entry.patterns) {
      if (lower.includes(p)) {
        return {
          vendor: entry.vendor,
          category: entry.category,
          is_third_party: true,
          domain: host,
        };
      }
    }
  }

  const cleanPage = pageDomain.toLowerCase().replace('www.', '');
  const cleanHost = host.replace('www.', '');

  if (cleanHost && cleanPage && !cleanHost.includes(cleanPage) && !cleanPage.includes(cleanHost)) {
    return {
      vendor: `External (${cleanHost})`,
      category: 'Third-Party Script',
      is_third_party: true,
      domain: host,
    };
  }

  return {
    vendor: 'First-Party Application',
    category: 'First-Party Code',
    is_third_party: false,
    domain: host || pageDomain,
  };
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

    const pageDomain = parsedUrl.hostname;

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

    const scripts: any[] = [];
    let thirdPartyCount = 0;
    let blockingCount = 0;

    $('script').each((idx, el) => {
      let src = $(el).attr('src') || '';
      if (src.startsWith('//')) {
        src = 'https:' + src;
      } else if (src.startsWith('/')) {
        try {
          src = new URL(src, targetUrl).href;
        } catch {
          // keep relative
        }
      }

      const isInline = !src;
      const isAsync = $(el).attr('async') !== undefined;
      const isDefer = $(el).attr('defer') !== undefined;
      const typeAttr = $(el).attr('type') || 'text/javascript';
      const isModule = typeAttr === 'module';

      const isRenderBlocking = !isInline && !isAsync && !isDefer && !isModule;
      if (isRenderBlocking) blockingCount++;

      const info = classifyScript(src, pageDomain);
      if (info.is_third_party) thirdPartyCount++;

      scripts.push({
        index: idx + 1,
        src,
        is_inline: isInline,
        is_async: isAsync,
        is_defer: isDefer,
        is_module: isModule,
        is_render_blocking: isRenderBlocking,
        vendor: info.vendor,
        category: info.category,
        is_third_party: info.is_third_party,
        domain: info.domain,
      });
    });

    const totalCount = Math.max(1, scripts.length);

    // Vendor Aggregation
    const vendorMap: Record<string, any> = {};
    for (const s of scripts) {
      const v = s.vendor;
      if (!vendorMap[v]) {
        vendorMap[v] = {
          vendor: v,
          category: s.category,
          is_third_party: s.is_third_party,
          script_count: 0,
          blocking_scripts: 0,
        };
      }
      vendorMap[v].script_count++;
      if (s.is_render_blocking) {
        vendorMap[v].blocking_scripts++;
      }
    }

    // Heuristic TBT and INP estimation
    // Third-party scripts add ~40ms blocking each on average; blocking scripts add ~60ms
    const estimatedTbtMs = Math.min(2000, (thirdPartyCount * 45) + (blockingCount * 65) + Math.max(0, totalCount - 10) * 10);
    const estimatedInpMs = Math.max(50, Math.min(1200, 60 + (thirdPartyCount * 30) + (blockingCount * 40)));

    const tbtScore = estimatedTbtMs <= 150 ? 100 : estimatedTbtMs <= 300 ? 80 : estimatedTbtMs <= 600 ? 55 : 25;
    const inpScore = estimatedInpMs <= 200 ? 100 : estimatedInpMs <= 400 ? 65 : 30;
    const tpScore = Math.max(20, Math.round(100 - ((thirdPartyCount / totalCount) * 75)));
    const hygieneScore = Math.max(0, Math.round(100 - ((blockingCount / totalCount) * 100)));
    const bundleScore = totalCount <= 12 ? 100 : totalCount <= 25 ? 75 : totalCount <= 40 ? 50 : 30;

    const overallScore = Math.round(
      (tbtScore * 0.35) + (inpScore * 0.25) + (tpScore * 0.20) + (hygieneScore * 0.10) + (bundleScore * 0.10)
    );

    const recommendations: string[] = [];
    if (blockingCount > 0) {
      recommendations.push(`Add 'defer' or 'async' to ${blockingCount} render-blocking <script> tag(s) in HTML head to unblock First Contentful Paint.`);
    }
    if (estimatedInpMs > 200) {
      recommendations.push(`Estimated INP latency (${estimatedInpMs}ms) exceeds Google's 200ms target. Break up long tasks using scheduler.yield() or requestIdleCallback().`);
    }
    if (thirdPartyCount >= 4) {
      recommendations.push(`Consolidate ${thirdPartyCount} third-party marketing and analytics tags. Offload non-critical trackers via web workers.`);
    }
    if (recommendations.length === 0) {
      recommendations.push('Script execution timeline is clean with zero render-blocking tags and low INP vulnerability.');
    }

    return NextResponse.json({
      target_url: targetUrl,
      overall_score: overallScore,
      grade: overallScore >= 90 ? 'A' : overallScore >= 75 ? 'B' : overallScore >= 60 ? 'C' : overallScore >= 40 ? 'D' : 'F',
      total_scripts: scripts.length,
      stats: {
        total_scripts: scripts.length,
        third_party_scripts: thirdPartyCount,
        render_blocking_scripts: blockingCount,
        estimated_tbt_ms: estimatedTbtMs,
        estimated_inp_ms: estimatedInpMs,
      },
      component_scores: {
        total_blocking_time: tbtScore,
        estimated_inp_readiness: inpScore,
        third_party_overhead: tpScore,
        script_loading_hygiene: hygieneScore,
        bundle_efficiency: bundleScore,
      },
      inp_estimate: {
        estimated_inp_ms: estimatedInpMs,
        status: estimatedInpMs <= 200 ? 'Good (Low INP Risk)' : estimatedInpMs <= 400 ? 'Needs Improvement' : 'Poor (High Delay)',
        meets_google_target: estimatedInpMs <= 200,
      },
      vendor_breakdown: Object.values(vendorMap),
      scripts: scripts.slice(0, 25),
      recommendations,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal error processing PayloadSniper audit.' },
      { status: 500 }
    );
  }
}
