import * as cheerio from 'cheerio';

export interface LinkRecord {
  url: string;
  anchorText: string;
  type: 'internal' | 'external' | 'fragment' | 'protocol';
  rel?: string;
  statusCode?: number;
  status: 'OK' | 'BROKEN' | 'REDIRECT' | 'SKIPPED';
  error?: string;
}

export interface BrokenLinkAuditResult {
  tool: 'broken-link-checker';
  domain: string;
  targetUrl: string;
  score: number;
  grade: 'EXCELLENT' | 'WARNINGS' | 'BROKEN_DETECTED';
  stats: {
    totalLinksFound: number;
    internalCount: number;
    externalCount: number;
    fragmentCount: number;
    testedCount: number;
    brokenCount: number;
  };
  brokenLinks: LinkRecord[];
  allLinks: LinkRecord[];
  recommendations: string[];
}

export async function analyzeBrokenLinks(html: string, targetUrl: string): Promise<BrokenLinkAuditResult> {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;

  const rawLinks: { href: string; anchorText: string; rel?: string }[] = [];

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')?.trim() || '';
    const anchorText = $(el).text().trim() || $(el).find('img').attr('alt')?.trim() || '[Image/Icon]';
    const rel = $(el).attr('rel')?.trim();
    if (href) {
      rawLinks.push({ href, anchorText: anchorText.substring(0, 80), rel });
    }
  });

  let internalCount = 0;
  let externalCount = 0;
  let fragmentCount = 0;

  const linksToTest: LinkRecord[] = [];

  for (const item of rawLinks) {
    if (item.href.startsWith('#')) {
      fragmentCount++;
      linksToTest.push({
        url: item.href,
        anchorText: item.anchorText,
        type: 'fragment',
        rel: item.rel,
        status: 'SKIPPED',
      });
      continue;
    }

    if (/^(mailto:|tel:|javascript:|sms:)/i.test(item.href)) {
      linksToTest.push({
        url: item.href,
        anchorText: item.anchorText,
        type: 'protocol',
        rel: item.rel,
        status: 'SKIPPED',
      });
      continue;
    }

    let absoluteUrl: string;
    try {
      absoluteUrl = new URL(item.href, targetUrl).href;
    } catch {
      linksToTest.push({
        url: item.href,
        anchorText: item.anchorText,
        type: 'internal',
        rel: item.rel,
        status: 'BROKEN',
        error: 'Malformed URL',
      });
      continue;
    }

    const isInternal = new URL(absoluteUrl).hostname === domain;
    if (isInternal) {
      internalCount++;
    } else {
      externalCount++;
    }

    linksToTest.push({
      url: absoluteUrl,
      anchorText: item.anchorText,
      type: isInternal ? 'internal' : 'external',
      rel: item.rel,
      status: 'SKIPPED',
    });
  }

  // De-duplicate links to test (sample up to 20 unique links to keep execution fast & reliable)
  const uniqueUrlsToVerify = Array.from(
    new Set(linksToTest.filter((l) => l.type === 'internal' || l.type === 'external').map((l) => l.url))
  ).slice(0, 20);

  const verificationResults = new Map<string, { status: LinkRecord['status']; code?: number; err?: string }>();

  await Promise.all(
    uniqueUrlsToVerify.map(async (testUrl) => {
      try {
        const res = await fetch(testUrl, {
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          },
          signal: AbortSignal.timeout(4000),
          redirect: 'follow',
        });

        if (res.status >= 400) {
          verificationResults.set(testUrl, { status: 'BROKEN', code: res.status });
        } else if (res.status >= 300) {
          verificationResults.set(testUrl, { status: 'REDIRECT', code: res.status });
        } else {
          verificationResults.set(testUrl, { status: 'OK', code: res.status });
        }
      } catch (err: any) {
        // Retry with GET if HEAD was blocked by server
        try {
          const res = await fetch(testUrl, {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            },
            signal: AbortSignal.timeout(3000),
            redirect: 'follow',
          });
          if (res.status >= 400) {
            verificationResults.set(testUrl, { status: 'BROKEN', code: res.status });
          } else {
            verificationResults.set(testUrl, { status: 'OK', code: res.status });
          }
        } catch (getErr: any) {
          verificationResults.set(testUrl, {
            status: 'BROKEN',
            err: getErr.message?.includes('timeout') ? 'Connection Timeout' : 'Unreachable Host',
          });
        }
      }
    })
  );

  // Apply verification results back to links
  const brokenLinks: LinkRecord[] = [];
  for (const link of linksToTest) {
    const verified = verificationResults.get(link.url);
    if (verified) {
      link.status = verified.status;
      link.statusCode = verified.code;
      link.error = verified.err;
      if (verified.status === 'BROKEN') {
        brokenLinks.push(link);
      }
    }
  }

  const testedCount = verificationResults.size;
  const brokenCount = brokenLinks.length;

  let score = 100;
  if (brokenCount > 0) score -= Math.min(60, brokenCount * 20);
  if (rawLinks.length === 0) score = 50;

  score = Math.max(10, Math.min(100, score));
  const grade: BrokenLinkAuditResult['grade'] =
    brokenCount === 0 ? 'EXCELLENT' : brokenCount <= 2 ? 'WARNINGS' : 'BROKEN_DETECTED';

  const recommendations: string[] = [];
  if (brokenCount > 0) {
    recommendations.push(
      `Repair or replace ${brokenCount} broken link destination(s) to protect user experience and crawl budget.`
    );
  }
  if (externalCount > 0 && !linksToTest.some((l) => l.rel?.includes('noopener'))) {
    recommendations.push(
      'Ensure external links that open in new windows include rel="noopener" or rel="noreferrer" for browser security.'
    );
  }
  if (rawLinks.length === 0) {
    recommendations.push(
      'No anchor links found on this page. Add internal navigation to allow search crawlers to traverse your site.'
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'All verified on-page links resolved with clean 200 HTTP statuses and proper anchor associations.'
    );
  }

  return {
    tool: 'broken-link-checker',
    domain,
    targetUrl,
    score,
    grade,
    stats: {
      totalLinksFound: rawLinks.length,
      internalCount,
      externalCount,
      fragmentCount,
      testedCount,
      brokenCount,
    },
    brokenLinks,
    allLinks: linksToTest.slice(0, 50),
    recommendations,
  };
}
