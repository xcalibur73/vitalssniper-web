export interface HeaderAuditResult {
  tool: 'http-header-checker';
  domain: string;
  targetUrl: string;
  statusCode: number;
  protocol: string;
  securityScore: number;
  securityGrade: 'A+' | 'A' | 'B' | 'C' | 'F';
  securityHeaders: {
    header: string;
    present: boolean;
    value?: string;
    status: 'PASS' | 'WARNING' | 'FAIL';
    recommendation: string;
  }[];
  cachingPolicy: {
    cacheControl?: string;
    isCacheable: boolean;
    maxAgeSeconds?: number;
    hasEtag: boolean;
    hasLastModified: boolean;
    summary: string;
  };
  serverSignatures: {
    server?: string;
    poweredBy?: string;
    hasTechLeak: boolean;
    cdnDetected?: string;
  };
  compression: {
    contentEncoding?: string;
    isCompressed: boolean;
  };
  rawHeaders: { key: string; value: string }[];
  recommendations: string[];
}

export function analyzeHeaders(response: Response, targetUrl: string): HeaderAuditResult {
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;
  const statusCode = response.status;
  const headers = response.headers;

  const rawHeaders: { key: string; value: string }[] = [];
  headers.forEach((val, key) => {
    rawHeaders.push({ key, value: val });
  });
  rawHeaders.sort((a, b) => a.key.localeCompare(b.key));

  // 1. Security Headers Audit
  const hsts = headers.get('strict-transport-security');
  const csp = headers.get('content-security-policy');
  const xfo = headers.get('x-frame-options');
  const xcto = headers.get('x-content-type-options');
  const rp = headers.get('referrer-policy');
  const pp = headers.get('permissions-policy');

  const securityHeaders: HeaderAuditResult['securityHeaders'] = [
    {
      header: 'Strict-Transport-Security (HSTS)',
      present: Boolean(hsts),
      value: hsts || undefined,
      status: hsts && hsts.includes('max-age=') ? 'PASS' : 'FAIL',
      recommendation: hsts
        ? 'HSTS is active. Enforces HTTPS transport.'
        : 'Deploy Strict-Transport-Security: max-age=31536000; includeSubDomains to enforce SSL.',
    },
    {
      header: 'Content-Security-Policy (CSP)',
      present: Boolean(csp),
      value: csp || undefined,
      status: csp ? 'PASS' : 'WARNING',
      recommendation: csp
        ? 'CSP policy defined, mitigating cross-site scripting (XSS).'
        : 'Add a Content-Security-Policy header to restrict unauthorized script and resource origins.',
    },
    {
      header: 'X-Content-Type-Options',
      present: Boolean(xcto),
      value: xcto || undefined,
      status: xcto?.toLowerCase() === 'nosniff' ? 'PASS' : 'FAIL',
      recommendation: xcto?.toLowerCase() === 'nosniff'
        ? 'nosniff is configured, preventing MIME-sniffing attacks.'
        : 'Set X-Content-Type-Options: nosniff to prevent browsers from interpreting files as incorrect MIME types.',
    },
    {
      header: 'X-Frame-Options',
      present: Boolean(xfo),
      value: xfo || undefined,
      status: xfo ? 'PASS' : 'WARNING',
      recommendation: xfo
        ? `Configured as ${xfo}, mitigating clickjacking.`
        : 'Set X-Frame-Options: DENY or SAMEORIGIN to prevent unauthorized iframe embedding.',
    },
    {
      header: 'Referrer-Policy',
      present: Boolean(rp),
      value: rp || undefined,
      status: rp ? 'PASS' : 'WARNING',
      recommendation: rp
        ? `Configured as ${rp}.`
        : 'Set Referrer-Policy: strict-origin-when-cross-origin to control outbound referrer leaks.',
    },
    {
      header: 'Permissions-Policy',
      present: Boolean(pp),
      value: pp || undefined,
      status: pp ? 'PASS' : 'WARNING',
      recommendation: pp
        ? 'Permissions-Policy configured.'
        : 'Define Permissions-Policy to restrict browser features (camera, microphone, geolocation).',
    },
  ];

  // 2. Compute Security Score
  let securityScore = 100;
  if (!hsts) securityScore -= 25;
  if (!csp) securityScore -= 20;
  if (!xcto) securityScore -= 20;
  if (!xfo) securityScore -= 15;
  if (!rp) securityScore -= 10;
  if (!pp) securityScore -= 10;
  securityScore = Math.max(10, Math.min(100, securityScore));

  const securityGrade: HeaderAuditResult['securityGrade'] =
    securityScore >= 90 ? 'A+' : securityScore >= 75 ? 'A' : securityScore >= 55 ? 'B' : securityScore >= 35 ? 'C' : 'F';

  // 3. Caching Policy
  const cc = headers.get('cache-control');
  const etag = headers.get('etag');
  const lastModified = headers.get('last-modified');
  let isCacheable = false;
  let maxAgeSeconds: number | undefined;

  if (cc) {
    const match = cc.match(/max-age=(\d+)/i);
    if (match) {
      maxAgeSeconds = parseInt(match[1], 10);
      isCacheable = maxAgeSeconds > 0 && !cc.includes('no-store') && !cc.includes('no-cache');
    }
  }

  const cachingSummary = cc
    ? `Cache-Control: ${cc}`
    : 'No Cache-Control header found on the HTML document.';

  // 4. Server Signatures & Information Leaks
  const server = headers.get('server');
  const poweredBy = headers.get('x-powered-by');
  const hasTechLeak = Boolean(poweredBy) || (Boolean(server) && /\d+\.\d+/.test(server || ''));

  let cdnDetected: string | undefined;
  if (headers.get('cf-ray') || server?.toLowerCase().includes('cloudflare')) {
    cdnDetected = 'Cloudflare';
  } else if (headers.get('x-vercel-id')) {
    cdnDetected = 'Vercel Edge';
  } else if (headers.get('x-amz-cf-id')) {
    cdnDetected = 'Amazon CloudFront';
  } else if (headers.get('x-fastly-request-id')) {
    cdnDetected = 'Fastly';
  } else if (headers.get('x-litespeed-cache')) {
    cdnDetected = 'LiteSpeed Server Cache';
  }

  // 5. Compression
  const contentEncoding = headers.get('content-encoding')?.toLowerCase();
  const isCompressed = Boolean(contentEncoding && ['gzip', 'br', 'zstd', 'deflate'].includes(contentEncoding));

  // 6. Actionable recommendations
  const recommendations: string[] = [];
  if (!hsts) {
    recommendations.push('Deploy HTTP Strict Transport Security (HSTS) with max-age=31536000.');
  }
  if (!xcto) {
    recommendations.push('Add X-Content-Type-Options: nosniff to stop MIME-type confusion vulnerabilities.');
  }
  if (!csp) {
    recommendations.push('Configure Content-Security-Policy to enforce trusted script execution sources.');
  }
  if (hasTechLeak && poweredBy) {
    recommendations.push(`Remove the X-Powered-By header ("${poweredBy}") to prevent backend framework fingerprinting.`);
  }
  if (!isCompressed) {
    recommendations.push('Enable Brotli (br) or Gzip (gzip) compression on server responses to reduce HTML transfer size.');
  }
  if (recommendations.length === 0) {
    recommendations.push('HTTP response headers are well hardened with strong security and caching policies.');
  }

  return {
    tool: 'http-header-checker',
    domain,
    targetUrl,
    statusCode,
    protocol: 'HTTP/2',
    securityScore,
    securityGrade,
    securityHeaders,
    cachingPolicy: {
      cacheControl: cc || undefined,
      isCacheable,
      maxAgeSeconds,
      hasEtag: Boolean(etag),
      hasLastModified: Boolean(lastModified),
      summary: cachingSummary,
    },
    serverSignatures: {
      server: server || undefined,
      poweredBy: poweredBy || undefined,
      hasTechLeak,
      cdnDetected,
    },
    compression: {
      contentEncoding: contentEncoding || undefined,
      isCompressed,
    },
    rawHeaders,
    recommendations,
  };
}
