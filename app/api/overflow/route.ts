import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

interface OverflowCulprit {
  selector: string;
  tag: string;
  width: number;
  overflow_px: number;
  spill_direction: 'RIGHT' | 'LEFT';
  root_cause: string;
  suggested_fix: string;
  snippet: string;
}

export async function POST(req: NextRequest) {
  try {
    const { url, viewport_width = 375 } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'A valid URL is required.' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
    }

    const start = Date.now();
    let res: Response;

    try {
      res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
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

    // 1. Audit Viewport Meta Tag
    const viewportMeta = $('meta[name="viewport"]').attr('content') || '';
    const hasDeviceWidth = /width=device-width/i.test(viewportMeta);
    const hasInitialScale = /initial-scale=1/i.test(viewportMeta);
    const locksZoom = /user-scalable=no|maximum-scale=1/i.test(viewportMeta);

    const viewportAudit = {
      present: Boolean(viewportMeta),
      content: viewportMeta || null,
      has_device_width: hasDeviceWidth,
      has_initial_scale: hasInitialScale,
      locks_zoom: locksZoom,
      status: !viewportMeta
        ? 'MISSING_VIEWPORT_META'
        : !hasDeviceWidth
        ? 'INCOMPLETE_VIEWPORT'
        : 'CONFIGURED_CORRECTLY',
    };

    // 2. Scan for Overflow Culprits
    const targetVw = Number(viewport_width) || 375;
    const culprits: OverflowCulprit[] = [];

    // Helper to build CSS selector
    const getSelector = (el: cheerio.Cheerio<any>): string => {
      const tag = el.prop('tagName')?.toLowerCase() || 'div';
      const id = el.attr('id');
      if (id) return `${tag}#${id}`;
      const classes = (el.attr('class') || '')
        .trim()
        .split(/\s+/)
        .filter((c) => c && !c.includes(':') && !c.includes('/'))
        .slice(0, 2);
      if (classes.length) return `${tag}.${classes.join('.')}`;
      return tag;
    };

    // Check inline styles with 100vw
    $('[style*="100vw"]').each((_, elem) => {
      const $el = $(elem);
      const sel = getSelector($el);
      culprits.push({
        selector: sel,
        tag: elem.tagName.toLowerCase(),
        width: targetVw + 15,
        overflow_px: 15,
        spill_direction: 'RIGHT',
        root_cause: '100vw viewport width offset (includes vertical scrollbar gutter)',
        suggested_fix: 'width: 100%; (replace 100vw to eliminate scrollbar offset)',
        snippet: $.html(elem).slice(0, 140),
      });
    });

    // Check fixed pixel widths in inline styles exceeding target viewport
    $('[style]').each((_, elem) => {
      const style = $(elem).attr('style') || '';
      const match = style.match(/(?:^|;)\s*(?:min-)?width:\s*(\d+)px/i);
      if (match) {
        const px = parseInt(match[1], 10);
        if (px > targetVw) {
          const $el = $(elem);
          const sel = getSelector($el);
          if (!culprits.some((c) => c.selector === sel)) {
            culprits.push({
              selector: sel,
              tag: elem.tagName.toLowerCase(),
              width: px,
              overflow_px: px - targetVw,
              spill_direction: 'RIGHT',
              root_cause: `Rigid fixed width declared: ${px}px > ${targetVw}px`,
              suggested_fix: 'max-width: 100%; box-sizing: border-box;',
              snippet: $.html(elem).slice(0, 140),
            });
          }
        }
      }
    });

    // Check unconstrained tables
    $('table').each((_, elem) => {
      const $el = $(elem);
      const parentStyle = $el.parent().attr('style') || '';
      const parentClass = $el.parent().attr('class') || '';
      const hasOverflowWrapper =
        /overflow(?:-x)?:\s*(?:auto|scroll)/i.test(parentStyle) ||
        /overflow-x-auto|table-responsive/i.test(parentClass);

      if (!hasOverflowWrapper) {
        const colCount = $el.find('tr').first().find('th, td').length;
        if (colCount >= 4) {
          const sel = getSelector($el);
          if (!culprits.some((c) => c.selector === sel)) {
            const estimatedWidth = Math.max(targetVw + 80, colCount * 90);
            culprits.push({
              selector: sel,
              tag: 'table',
              width: estimatedWidth,
              overflow_px: estimatedWidth - targetVw,
              spill_direction: 'RIGHT',
              root_cause: `Multi-column table (${colCount} cols) missing overflow-x scroll wrapper`,
              suggested_fix: 'display: block; overflow-x: auto; max-width: 100%;',
              snippet: $.html(elem).slice(0, 140),
            });
          }
        }
      }
    });

    // Check unconstrained <pre> code blocks
    $('pre').each((_, elem) => {
      const $el = $(elem);
      const style = $el.attr('style') || '';
      const text = $el.text() || '';
      const longestLine = Math.max(...text.split('\n').map((l) => l.length), 0);

      const hasAutoOverflow = /overflow(?:-x)?:\s*(?:auto|scroll)/i.test(style);
      if (!hasAutoOverflow && longestLine > 45) {
        const sel = getSelector($el);
        if (!culprits.some((c) => c.selector === sel)) {
          const estimatedWidth = Math.round(longestLine * 8.5);
          culprits.push({
            selector: sel,
            tag: 'pre',
            width: estimatedWidth,
            overflow_px: Math.max(0, estimatedWidth - targetVw),
            spill_direction: 'RIGHT',
            root_cause: `Unconstrained preformatted code block (${longestLine} chars per line)`,
            suggested_fix: 'overflow-x: auto; white-space: pre-wrap; word-break: break-word;',
            snippet: $.html(elem).slice(0, 140),
          });
        }
      }
    });

    // Check media assets with fixed width attributes > targetVw
    $('img[width], iframe[width], video[width]').each((_, elem) => {
      const $el = $(elem);
      const widthAttr = parseInt($el.attr('width') || '0', 10);
      const style = $el.attr('style') || '';
      const hasResponsiveClass = /max-w-full|img-fluid|w-full/i.test($el.attr('class') || '');
      const hasResponsiveStyle = /max-width:\s*100%/i.test(style);

      if (widthAttr > targetVw && !hasResponsiveClass && !hasResponsiveStyle) {
        const sel = getSelector($el);
        if (!culprits.some((c) => c.selector === sel)) {
          culprits.push({
            selector: sel,
            tag: elem.tagName.toLowerCase(),
            width: widthAttr,
            overflow_px: widthAttr - targetVw,
            spill_direction: 'RIGHT',
            root_cause: `Media element with fixed width attribute (${widthAttr}px) lacking max-width: 100%`,
            suggested_fix: 'max-width: 100%; height: auto;',
            snippet: $.html(elem).slice(0, 140),
          });
        }
      }
    });

    // Sort culprits by overflow severity descending
    culprits.sort((a, b) => b.overflow_px - a.overflow_px);

    // Calculate document scrollWidth estimation
    const maxCulpritWidth = culprits.length > 0 ? Math.max(...culprits.map((c) => c.width)) : targetVw;
    const estimatedScrollWidth = Math.max(targetVw, maxCulpritWidth);
    const totalOverflowPx = Math.max(0, estimatedScrollWidth - targetVw);
    const hasHorizontalOverflow = totalOverflowPx > 0 || !viewportAudit.has_device_width;

    const verdict = !hasHorizontalOverflow
      ? { status: 'CLEAN_PASS', severity: 'OK', message: 'No mobile horizontal overflow detected (0px spill).' }
      : {
          status: 'CRITICAL_BREAKAGE',
          severity: 'ERROR',
          message: `Horizontal scroll overflow detected (+${totalOverflowPx}px beyond ${targetVw}px viewport).`,
        };

    const recommendations = [
      "Add 'overflow-x: clip;' on root <html> and <body> containers to prevent accidental horizontal scrollbar creation while preserving sticky positioning.",
      "Replace 'width: 100vw;' with 'width: 100%;' across full-bleed hero sections to prevent scrollbar gutter offset.",
      "Apply 'min-width: 0;' to flex children containing text or code blocks so they can shrink within flex rows.",
      "Wrap data tables and <pre> code snippets in dedicated containers with 'overflow-x: auto;'.",
    ];

    return NextResponse.json({
      target_url: targetUrl,
      emulated_device: targetVw === 375 ? 'Apple iPhone SE' : `Custom Mobile (${targetVw}px)`,
      visual_viewport_width: targetVw,
      scroll_width: estimatedScrollWidth,
      has_horizontal_overflow: hasHorizontalOverflow,
      total_overflow_px: totalOverflowPx,
      culprits_count: culprits.length,
      culprits: culprits.slice(0, 10),
      viewport_audit: viewportAudit,
      verdict,
      recommendations,
      load_time_ms: loadTimeMs,
      open_source_repo: 'https://github.com/xcalibur73/overflow-trace',
      cli_install: 'pip install overflow-trace',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error inspecting mobile viewport.' },
      { status: 500 }
    );
  }
}
