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

    const start = Date.now();
    let res: Response;

    try {
      res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(9000),
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: `Failed to fetch target URL: ${err.message || 'Connection timed out'}` },
        { status: 502 }
      );
    }

    const html = await res.text();
    const loadTimeMs = Date.now() - start;
    const $ = cheerio.load(html);

    // 1. Detect Framework Hydration Markers
    const hasNextData = $('#__NEXT_DATA__').length > 0;
    const hasNuxtData = html.includes('__NUXT__') || html.includes('window.__NUXT__');
    const hasSvelteKit = html.includes('__sveltekit') || html.includes('data-sveltekit');
    const hasReactRoot = $('[data-reactroot]').length > 0;
    const hasGatsby = $('#___gatsby').length > 0;

    let framework = 'Static HTML / Traditional Server';
    if (hasNextData) framework = 'Next.js (App / Pages Router)';
    else if (hasNuxtData) framework = 'Nuxt / Vue';
    else if (hasSvelteKit) framework = 'SvelteKit';
    else if (hasReactRoot) framework = 'React Client App';
    else if (hasGatsby) framework = 'Gatsby';

    // 2. Audit Server-Rendered Schema.org Blocks
    const schemas: string[] = [];
    $('script[type="application/ld+json"]').each((_, elem) => {
      try {
        const raw = $(elem).html() || '';
        const parsed = JSON.parse(raw);
        if (parsed['@type']) {
          schemas.push(String(parsed['@type']));
        } else if (Array.isArray(parsed['@graph'])) {
          parsed['@graph'].forEach((node: any) => {
            if (node['@type']) schemas.push(String(node['@type']));
          });
        } else {
          schemas.push('Generic Structured Data');
        }
      } catch {
        schemas.push('Invalid JSON-LD Block');
      }
    });

    // 3. Audit Internal Navigation Links in Server Payload
    const domain = parsedUrl.hostname.replace(/^www\./i, '');
    let internalLinksCount = 0;
    let externalLinksCount = 0;

    $('a[href]').each((_, elem) => {
      const href = $(elem).attr('href') || '';
      if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return;

      if (href.startsWith('/') || href.includes(domain)) {
        internalLinksCount++;
      } else if (/^https?:\/\//i.test(href)) {
        externalLinksCount++;
      }
    });

    // 4. Inspect Indexability Directives in Server HTML
    const metaRobots = $('meta[name="robots"]').attr('content') || '';
    const hasNoindex = /noindex/i.test(metaRobots);
    const hasNofollow = /nofollow/i.test(metaRobots);
    const canonical = $('link[rel="canonical"]').attr('href') || null;

    // 5. Calculate Content Density (Thin HTML Shell Detection)
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    const wordCount = bodyText ? bodyText.split(' ').length : 0;
    const isThinShell = wordCount < 30;

    // 6. Compute SSR Parity Score (0 - 100)
    let parityScore = 100;
    const defects: string[] = [];

    if (hasNoindex) {
      parityScore -= 50;
      defects.push("Server HTML includes 'noindex' directive, blocking search indexation.");
    }
    if (isThinShell) {
      parityScore -= 40;
      defects.push(`Server HTML contains only ${wordCount} words (client-only hydration shell). Non-executing crawlers cannot index content.`);
    }
    if (schemas.length === 0) {
      parityScore -= 20;
      defects.push('No Schema.org JSON-LD structured data detected in initial server HTML.');
    }
    if (internalLinksCount < 5) {
      parityScore -= 20;
      defects.push(`Only ${internalLinksCount} internal navigation links rendered in server payload. Crawlers may experience crawl graph loss.`);
    }
    if (!canonical) {
      parityScore -= 10;
      defects.push('No canonical URL tag declared in initial server HTML head.');
    }

    parityScore = Math.max(0, parityScore);

    const verdict =
      parityScore >= 80
        ? { status: 'FULL_SSR_PARITY', severity: 'OK', message: 'Initial server payload delivers complete metadata, links, and structured data.' }
        : parityScore >= 50
        ? { status: 'PARTIAL_SSR_EXPOSURE', severity: 'WARNING', message: 'Core metadata present, but structured data or links rely on client hydration.' }
        : { status: 'CLIENT_HYDRATION_DEPENDENCY', severity: 'ERROR', message: 'Severe dependency on client JavaScript execution; search visibility at high risk.' };

    const recommendations = [
      'Render all primary navigation links and categories in initial server HTML to ensure discovery by fast web crawlers.',
      'Deliver Schema.org JSON-LD directly from server templates rather than injecting via useEffect() or client mount hooks.',
      'Ensure canonical links and meta descriptions are populated server-side to prevent snippet truncation in search indexes.',
    ];

    return NextResponse.json({
      target_url: targetUrl,
      framework_detected: framework,
      ssr_parity_score: parityScore,
      schemas_found: schemas,
      schemas_count: schemas.length,
      internal_links_count: internalLinksCount,
      external_links_count: externalLinksCount,
      word_count: wordCount,
      is_thin_shell: isThinShell,
      meta_robots: metaRobots || 'Default (index, follow)',
      canonical_url: canonical,
      defects,
      verdict,
      recommendations,
      load_time_ms: loadTimeMs,
      open_source_repo: 'https://github.com/xcalibur73/dom-hydrate',
      cli_install: 'pip install dom-hydrate',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error inspecting SSR hydration parity.' },
      { status: 500 }
    );
  }
}
