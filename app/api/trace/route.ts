import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';

interface Hop {
  hop: number;
  url: string;
  statusCode: number;
  latencyMs: number;
  protocol: string;
  location?: string | null;
  xRobotsTag?: string | null;
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

    const domain = parsedUrl.hostname;
    const maxHops = 10;
    const hops: Hop[] = [];
    let currentUrl = targetUrl;
    const visited = new Set<string>();
    let isLoop = false;
    let loopUrl: string | null = null;
    let finalResponse: Response | null = null;
    let finalHtml = '';
    let finalHeaders: Record<string, string> = {};

    // 1. Hop-by-hop HTTP redirect tracer
    for (let hopIdx = 1; hopIdx <= maxHops; hopIdx++) {
      if (visited.has(currentUrl)) {
        isLoop = true;
        loopUrl = currentUrl;
        break;
      }
      visited.add(currentUrl);

      const hopParsed = new URL(currentUrl);
      const hopStart = Date.now();
      let res: Response;

      try {
        res = await fetch(currentUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
          },
          redirect: 'manual',
          signal: AbortSignal.timeout(8000),
        });
      } catch (err: any) {
        hops.push({
          hop: hopIdx,
          url: currentUrl,
          statusCode: 0,
          latencyMs: Date.now() - hopStart,
          protocol: hopParsed.protocol.replace(':', ''),
        });
        break;
      }

      const hopLatency = Date.now() - hopStart;
      const location = res.headers.get('location');
      const xRobotsTag = res.headers.get('x-robots-tag');

      hops.push({
        hop: hopIdx,
        url: currentUrl,
        statusCode: res.status,
        latencyMs: hopLatency,
        protocol: hopParsed.protocol.replace(':', ''),
        location: location || null,
        xRobotsTag: xRobotsTag || null,
      });

      if (res.status >= 300 && res.status < 400 && location) {
        try {
          const resolvedNext = new URL(location, currentUrl).toString();
          currentUrl = resolvedNext;
        } catch {
          break;
        }
      } else {
        finalResponse = res;
        try {
          finalHtml = await res.text();
        } catch {
          finalHtml = '';
        }
        res.headers.forEach((value, key) => {
          finalHeaders[key.toLowerCase()] = value;
        });
        break;
      }
    }

    const finalHop = hops[hops.length - 1];
    const finalUrl = finalHop ? finalHop.url : currentUrl;
    const finalStatus = finalHop ? finalHop.statusCode : 0;
    const totalHops = hops.length;
    const isExcessiveHops = totalHops > 3;

    // 2. RFC 9309 Line-by-Line Robots.txt Evaluation
    const parsedFinal = new URL(finalUrl);
    const robotsUrl = `${parsedFinal.protocol}//${parsedFinal.host}/robots.txt`;
    let robotsTxt = '';
    let robotsFound = false;

    try {
      const robRes = await fetch(robotsUrl, {
        headers: { 'User-Agent': 'IndexTrace/1.0 (+https://webaudits.pro)' },
        signal: AbortSignal.timeout(6000),
      });
      if (robRes.ok) {
        robotsTxt = await robRes.text();
        robotsFound = true;
      }
    } catch {
      robotsFound = false;
    }

    interface ParsedRule {
      type: 'allow' | 'disallow';
      pattern: string;
      line: number;
    }

    const agentRules: Record<string, ParsedRule[]> = {};
    let activeAgents: string[] = [];
    let inRuleSection = false;

    if (robotsFound && robotsTxt) {
      const lines = robotsTxt.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const lineNo = i + 1;
        const raw = lines[i].trim();
        if (!raw || raw.startsWith('#') || !raw.includes(':')) continue;

        const [keyRaw, ...valParts] = raw.split(':');
        const key = keyRaw.trim().toLowerCase();
        const val = valParts.join(':').trim();

        if (key === 'user-agent') {
          if (inRuleSection) {
            activeAgents = [];
            inRuleSection = false;
          }
          activeAgents.push(val.toLowerCase());
        } else if (key === 'allow' || key === 'disallow') {
          inRuleSection = true;
          for (const ag of activeAgents) {
            if (!agentRules[ag]) agentRules[ag] = [];
            agentRules[ag].push({
              type: key as 'allow' | 'disallow',
              pattern: val,
              line: lineNo,
            });
          }
        }
      }
    }

    // Evaluate robots match
    const targetPath = parsedFinal.pathname + parsedFinal.search;
    let robotsStatus = 'ALLOWED';
    let matchingRule: string | null = null;
    let matchingLine: number | null = null;
    let userAgentApplied = 'googlebot';

    const selectedRules = agentRules['googlebot'] || agentRules['*'] || [];
    userAgentApplied = agentRules['googlebot'] ? 'googlebot' : '*';

    let bestLength = -1;
    let bestRule: ParsedRule | null = null;

    for (const rule of selectedRules) {
      if (!rule.pattern) continue; // Empty disallow allows all
      try {
        const regexStr = rule.pattern
          .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\\\*/g, '.*')
          .replace(/\\\$/g, '$');
        const regex = new RegExp('^' + regexStr);
        if (regex.test(targetPath)) {
          const len = rule.pattern.length;
          if (len > bestLength) {
            bestLength = len;
            bestRule = rule;
          } else if (len === bestLength && rule.type === 'allow' && bestRule?.type === 'disallow') {
            bestRule = rule;
          }
        }
      } catch {
        continue;
      }
    }

    if (bestRule) {
      matchingRule = `${bestRule.type.toUpperCase()}: ${bestRule.pattern}`;
      matchingLine = bestRule.line;
      robotsStatus = bestRule.type === 'disallow' ? 'BLOCKED' : 'ALLOWED';
    }

    // 3. Directives & Canonical Tag Integrity
    const headerXRobots = finalHeaders['x-robots-tag'] || '';
    const headerHasNoindex = /noindex/i.test(headerXRobots);

    let htmlHasNoindex = false;
    let metaRobotsContent = '';
    let canonicalUrl: string | null = null;
    let wordCount = 0;

    if (finalHtml) {
      const $ = cheerio.load(finalHtml);
      $('script, style, noscript, svg, nav, footer, header').remove();

      const metaRobots = $('meta[name="robots" i]').attr('content') || '';
      const metaGooglebot = $('meta[name="googlebot" i]').attr('content') || '';
      metaRobotsContent = metaRobots || metaGooglebot;
      htmlHasNoindex = /noindex/i.test(metaRobots) || /noindex/i.test(metaGooglebot);

      const linkCanon = $('link[rel="canonical" i]').attr('href');
      if (linkCanon) {
        try {
          canonicalUrl = new URL(linkCanon, finalUrl).toString();
        } catch {
          canonicalUrl = linkCanon;
        }
      }

      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      wordCount = bodyText.split(' ').filter(Boolean).length;
    }

    const isNoindexActive = headerHasNoindex || htmlHasNoindex;

    let canonicalStatus = 'CLEAN_SELF';
    if (!canonicalUrl) {
      canonicalStatus = 'MISSING';
    } else {
      const normFinal = finalUrl.replace(/\/$/, '').toLowerCase();
      const normCanon = canonicalUrl.replace(/\/$/, '').toLowerCase();
      if (normFinal !== normCanon) {
        canonicalStatus = 'EXTERNAL_CANONICAL';
      }
    }

    // 4. Soft-404 Detection
    let isSoft404 = false;
    let soft404Risk = 0;
    if (finalStatus === 200 && finalHtml) {
      const $ = cheerio.load(finalHtml);
      const title = $('title').text().toLowerCase();
      const h1 = $('h1').text().toLowerCase();

      if (/404|not found|page not found|does not exist/i.test(title)) {
        soft404Risk += 45;
      }
      if (/page not found|could not be found|does not exist/i.test(h1)) {
        soft404Risk += 40;
      }
      if (wordCount < 30) {
        soft404Risk += 35;
      } else if (wordCount < 65) {
        soft404Risk += 20;
      }

      soft404Risk = Math.min(100, soft404Risk);
      isSoft404 = soft404Risk >= 50;
    }

    // 5. GSC Verdict Synthesis
    let gscStatus = 'CLEAN_INDEXABLE';
    let severity = 'OK';
    let rootCause = 'Page returns clean HTTP 200 OK, self-canonicalized, allowed in robots.txt, and free of noindex tags.';
    let remediation: string[] = [
      'No technical indexing barriers detected. Page is fully eligible for Google search indexation.'
    ];

    if (isLoop) {
      gscStatus = 'REDIRECT_ERROR (Infinite Loop)';
      severity = 'CRITICAL';
      rootCause = `Infinite redirect loop detected: URL '${loopUrl}' was requested repeatedly.`;
      remediation = [
        'Audit web server rewrite rules (Nginx/Apache/.htaccess) for circular redirect loops.',
        'Verify trailing slash rewrite rules and HTTPS enforcement.',
        'Purge edge CDN cache layers holding outdated Location response headers.'
      ];
    } else if (isExcessiveHops) {
      gscStatus = 'REDIRECT_ERROR (Excessive Hops)';
      severity = 'WARNING';
      rootCause = `Redirect chain contains ${totalHops} hops. Search crawlers typically abandon chains exceeding 3 hops.`;
      remediation = [
        `Collapse intermediate redirect hops so initial URL points directly to '${finalUrl}'.`,
        'Normalize protocol (HTTP -> HTTPS) and host (non-www -> www) in a single 301 redirect.'
      ];
    } else if (finalStatus >= 500) {
      gscStatus = 'SERVER_ERROR (5xx)';
      severity = 'CRITICAL';
      rootCause = `Server returned HTTP ${finalStatus} backend error at destination URL.`;
      remediation = [
        'Inspect web application backend logs and PHP-FPM / Node.js error traces.',
        'Check reverse proxy timeouts if encountering HTTP 502 or 504 errors.'
      ];
    } else if (finalStatus === 404) {
      gscStatus = 'NOT_FOUND (404)';
      severity = 'CRITICAL';
      rootCause = 'Destination URL returned HTTP 404 Not Found.';
      remediation = [
        'If the content was permanently relocated, deploy a 301 redirect to the closest replacement URL.',
        'If intentionally deleted, return HTTP 410 Gone to signal immediate de-indexation to search engines.',
        'Purge the URL from XML sitemaps and internal navigation menus.'
      ];
    } else if (robotsStatus === 'BLOCKED') {
      gscStatus = 'BLOCKED_BY_ROBOTS_TXT';
      severity = 'CRITICAL';
      rootCause = `Crawl access blocked by rule '${matchingRule}' at line ${matchingLine} in robots.txt.`;
      remediation = [
        `Modify or delete the disallow pattern '${matchingRule}' in '${robotsUrl}'.`,
        'Verify CMS robots.txt generation plugins (e.g. Yoast / Rank Math).',
        'Note: robots.txt prevents crawling, but external links can still result in indexation without snippet copy.'
      ];
    } else if (isNoindexActive) {
      gscStatus = 'EXCLUDED_BY_NOINDEX';
      severity = 'CRITICAL';
      rootCause = headerHasNoindex
        ? "Explicit 'X-Robots-Tag: noindex' detected in HTTP response headers."
        : "Explicit '<meta name=\"robots\" content=\"noindex\">' tag detected in HTML head.";
      remediation = [
        'Remove the noindex directive from server response headers or HTML document head.',
        'Check deployment pipeline environment flags that may have deployed staging robots directives to production.'
      ];
    } else if (isSoft404) {
      gscStatus = 'SOFT_404_DETECTED';
      severity = 'CRITICAL';
      rootCause = `Server returned HTTP 200 OK, but document content matches 404 error patterns (${soft404Risk}% risk).`;
      remediation = [
        'Configure the web server to return a genuine HTTP 404 or 410 status code for missing resources.',
        `Expand page body content beyond thin placeholder copy (currently ${wordCount} words).`
      ];
    } else if (canonicalStatus === 'EXTERNAL_CANONICAL') {
      gscStatus = 'ALTERNATE_PAGE_WITH_PROPER_CANONICAL';
      severity = 'WARNING';
      rootCause = `Page specifies external canonical pointing to '${canonicalUrl}'.`;
      remediation = [
        'If this page should index independently, update canonical URL to point to itself.',
        'If this is a deliberate duplicate or tracking URL variant, keep the current canonical configuration.'
      ];
    } else if (canonicalStatus === 'MISSING') {
      gscStatus = 'INDEXABLE_WITH_WARNING (Missing Canonical)';
      severity = 'WARNING';
      rootCause = 'Page returns HTTP 200 OK and is indexable, but lacks a self-referential canonical tag.';
      remediation = [
        `Add a self-referential '<link rel="canonical" href="${finalUrl}">' in the HTML head to prevent duplicate parameter indexing.`
      ];
    }

    return NextResponse.json({
      domain,
      start_url: targetUrl,
      final_url: finalUrl,
      final_status: finalStatus,
      total_hops: totalHops,
      hops,
      robots: {
        status: robotsStatus,
        matching_rule: matchingRule,
        line_number: matchingLine,
        user_agent_applied: userAgentApplied,
        robots_url: robotsUrl,
        robots_found: robotsFound,
      },
      directives: {
        x_robots_tag: headerXRobots || null,
        meta_robots: metaRobotsContent || null,
        is_noindex_active: isNoindexActive,
        canonical_url: canonicalUrl,
        canonical_status: canonicalStatus,
        word_count: wordCount,
      },
      soft404: {
        is_soft404: isSoft404,
        risk_percent: soft404Risk,
      },
      verdict: {
        gsc_status: gscStatus,
        severity,
        root_cause: rootCause,
        remediation,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Error occurred during indexation trace.' },
      { status: 500 }
    );
  }
}
