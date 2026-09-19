import * as cheerio from 'cheerio';

export interface SeoMetaAuditResult {
  tool: 'seo-meta-checker';
  domain: string;
  targetUrl: string;
  score: number;
  grade: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR';
  title: {
    text: string;
    charCount: number;
    estimatedPixelWidth: number;
    status: 'OPTIMAL' | 'TOO_SHORT' | 'TOO_LONG' | 'MISSING';
    recommendation: string;
  };
  description: {
    text: string;
    charCount: number;
    status: 'OPTIMAL' | 'TOO_SHORT' | 'TOO_LONG' | 'MISSING';
    recommendation: string;
  };
  canonical: {
    url?: string;
    isPresent: boolean;
    isSelfReferential: boolean;
    status: 'PASS' | 'WARNING' | 'FAIL';
    recommendation: string;
  };
  indexingDirectives: {
    metaRobots?: string;
    isIndexable: boolean;
    hasNoindex: boolean;
    hasNofollow: boolean;
    hasViewport: boolean;
    viewportContent?: string;
  };
  openGraph: {
    hasOg: boolean;
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
  };
  twitterCard: {
    hasTwitterCard: boolean;
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  serpPreview: {
    displayUrl: string;
    title: string;
    snippet: string;
  };
  recommendations: string[];
}

export function analyzeSeoMeta(html: string, targetUrl: string, headers?: Headers): SeoMetaAuditResult {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;

  // 1. Title Tag
  const rawTitle = $('title').first().text().trim();
  const titleCharCount = rawTitle.length;
  // Estimate pixel width: avg ~8.5px per character in Google serif 18px font
  const estimatedPixelWidth = Math.round(titleCharCount * 8.5);

  let titleStatus: SeoMetaAuditResult['title']['status'] = 'OPTIMAL';
  let titleRec = 'Title length is well calibrated for search snippets.';
  if (!rawTitle) {
    titleStatus = 'MISSING';
    titleRec = 'Title tag is missing. Search engines will fabricate a snippet title.';
  } else if (titleCharCount < 30) {
    titleStatus = 'TOO_SHORT';
    titleRec = 'Title is under 30 characters. Expand with descriptive keywords.';
  } else if (titleCharCount > 60 || estimatedPixelWidth > 580) {
    titleStatus = 'TOO_LONG';
    titleRec = 'Title exceeds 60 characters and may be truncated on SERP displays.';
  }

  // 2. Meta Description
  const rawDesc = $('meta[name="description"]').attr('content')?.trim() || '';
  const descCharCount = rawDesc.length;

  let descStatus: SeoMetaAuditResult['description']['status'] = 'OPTIMAL';
  let descRec = 'Meta description length communicates intent without truncation.';
  if (!rawDesc) {
    descStatus = 'MISSING';
    descRec = 'Meta description is missing. Google will extract an ad-hoc snippet.';
  } else if (descCharCount < 80) {
    descStatus = 'TOO_SHORT';
    descRec = 'Description is under 80 characters. Elaborate on the value proposition.';
  } else if (descCharCount > 160) {
    descStatus = 'TOO_LONG';
    descRec = 'Description exceeds 160 characters and may truncate on mobile displays.';
  }

  // 3. Canonical Tag
  const canonicalHref = $('link[rel="canonical"]').attr('href')?.trim();
  const isCanonicalPresent = Boolean(canonicalHref);
  let isSelfReferential = false;

  if (canonicalHref) {
    try {
      const canonUrl = new URL(canonicalHref, targetUrl);
      isSelfReferential =
        canonUrl.origin === parsedUrl.origin &&
        canonUrl.pathname.replace(/\/$/, '') === parsedUrl.pathname.replace(/\/$/, '');
    } catch {
      isSelfReferential = false;
    }
  }

  const canonicalStatus: SeoMetaAuditResult['canonical']['status'] =
    !isCanonicalPresent ? 'WARNING' : isSelfReferential ? 'PASS' : 'WARNING';

  const canonicalRec = !isCanonicalPresent
    ? 'Add a self-referential canonical tag to consolidate URL ranking signals.'
    : isSelfReferential
    ? 'Self-referential canonical tag is correctly declared.'
    : `Canonical points to an alternate URL (${canonicalHref}). Ensure this cross-URL mapping is intentional.`;

  // 4. Indexing Directives
  const metaRobotsContent = $('meta[name="robots"]').attr('content')?.toLowerCase() || '';
  const xRobotsHeader = headers?.get('x-robots-tag')?.toLowerCase() || '';
  const combinedRobots = `${metaRobotsContent} ${xRobotsHeader}`;

  const hasNoindex = combinedRobots.includes('noindex');
  const hasNofollow = combinedRobots.includes('nofollow');
  const isIndexable = !hasNoindex;

  const viewportContent = $('meta[name="viewport"]').attr('content');
  const hasViewport = Boolean(viewportContent);

  // 5. Open Graph & Twitter Card
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogUrl = $('meta[property="og:url"]').attr('content');
  const ogType = $('meta[property="og:type"]').attr('content');
  const ogSiteName = $('meta[property="og:site_name"]').attr('content');
  const hasOg = Boolean(ogTitle || ogImage);

  const twitterCardType = $('meta[name="twitter:card"]').attr('content');
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  const twitterDesc = $('meta[name="twitter:description"]').attr('content');
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  const hasTwitterCard = Boolean(twitterCardType || twitterTitle);

  // 6. SERP Snippet Preview Data
  const serpPreview: SeoMetaAuditResult['serpPreview'] = {
    displayUrl: `${parsedUrl.hostname}${parsedUrl.pathname === '/' ? '' : parsedUrl.pathname}`,
    title: rawTitle || domain,
    snippet: rawDesc || 'No meta description provided. Search engines will extract snippet copy from on-page content.',
  };

  // 7. Calculate overall score
  let score = 100;
  if (!rawTitle) score -= 30;
  else if (titleStatus !== 'OPTIMAL') score -= 10;

  if (!rawDesc) score -= 25;
  else if (descStatus !== 'OPTIMAL') score -= 10;

  if (!isCanonicalPresent) score -= 15;
  if (hasNoindex) score -= 20;
  if (!hasViewport) score -= 15;
  if (!hasOg) score -= 10;

  score = Math.max(10, Math.min(100, score));
  const grade: SeoMetaAuditResult['grade'] =
    score >= 85 ? 'GOOD' : score >= 60 ? 'NEEDS_IMPROVEMENT' : 'POOR';

  // 8. Recommendations
  const recommendations: string[] = [];
  if (!rawTitle) {
    recommendations.push('Add an explicit <title> tag between 50 and 60 characters with primary target keywords.');
  } else if (titleStatus === 'TOO_LONG') {
    recommendations.push(`Shorten title from ${titleCharCount} to under 60 characters to avoid SERP truncation.`);
  }
  if (!rawDesc) {
    recommendations.push('Add a high-intent <meta name="description"> between 140 and 160 characters.');
  } else if (descStatus === 'TOO_LONG') {
    recommendations.push(`Trim meta description from ${descCharCount} to under 160 characters.`);
  }
  if (!isCanonicalPresent) {
    recommendations.push(`Declare a canonical tag in <head>: <link rel="canonical" href="${targetUrl}">.`);
  }
  if (hasNoindex) {
    recommendations.push('A noindex directive was detected. Remove it if you intend this page to rank in Google search.');
  }
  if (!hasOg) {
    recommendations.push('Add Open Graph tags (og:title, og:description, og:image) for rich social link unfurls.');
  }
  if (recommendations.length === 0) {
    recommendations.push('On-page meta tags, canonical links, and social preview data are properly calibrated.');
  }

  return {
    tool: 'seo-meta-checker',
    domain,
    targetUrl,
    score,
    grade,
    title: {
      text: rawTitle,
      charCount: titleCharCount,
      estimatedPixelWidth,
      status: titleStatus,
      recommendation: titleRec,
    },
    description: {
      text: rawDesc,
      charCount: descCharCount,
      status: descStatus,
      recommendation: descRec,
    },
    canonical: {
      url: canonicalHref || undefined,
      isPresent: isCanonicalPresent,
      isSelfReferential,
      status: canonicalStatus,
      recommendation: canonicalRec,
    },
    indexingDirectives: {
      metaRobots: metaRobotsContent || undefined,
      isIndexable,
      hasNoindex,
      hasNofollow,
      hasViewport,
      viewportContent: viewportContent || undefined,
    },
    openGraph: {
      hasOg,
      title: ogTitle,
      description: ogDesc,
      image: ogImage,
      url: ogUrl,
      type: ogType,
      siteName: ogSiteName,
    },
    twitterCard: {
      hasTwitterCard,
      card: twitterCardType,
      title: twitterTitle,
      description: twitterDesc,
      image: twitterImage,
    },
    serpPreview,
    recommendations,
  };
}
