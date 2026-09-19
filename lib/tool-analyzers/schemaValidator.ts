import * as cheerio from 'cheerio';

export interface SchemaBlockAudit {
  index: number;
  isValidJson: boolean;
  parseError?: string;
  rawJson: string;
  entityCount: number;
  entities: {
    type: string;
    id?: string;
    name?: string;
    missingRequiredProperties: string[];
    missingRecommendedProperties: string[];
  }[];
}

export interface SchemaValidatorResult {
  tool: 'schema-validator';
  domain: string;
  targetUrl: string;
  score: number;
  grade: 'VALID' | 'WARNINGS' | 'INVALID' | 'MISSING';
  totalBlocksFound: number;
  totalEntitiesExtracted: number;
  detectedTypes: string[];
  blocks: SchemaBlockAudit[];
  validationIssues: {
    severity: 'ERROR' | 'WARNING';
    type: string;
    message: string;
  }[];
  richSnippetEligibility: {
    feature: string;
    eligible: boolean;
    reason: string;
  }[];
  recommendations: string[];
}

const REQUIRED_PROPERTIES_MAP: Record<string, string[]> = {
  Article: ['headline', 'image', 'datePublished', 'author'],
  BlogPosting: ['headline', 'image', 'datePublished', 'author'],
  NewsArticle: ['headline', 'image', 'datePublished', 'author'],
  Product: ['name', 'image'],
  Organization: ['name', 'url'],
  LocalBusiness: ['name', 'address'],
  WebSite: ['name', 'url'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['mainEntity'],
};

const RECOMMENDED_PROPERTIES_MAP: Record<string, string[]> = {
  Article: ['dateModified', 'publisher', 'mainEntityOfPage'],
  Product: ['offers', 'review', 'aggregateRating', 'description'],
  Organization: ['logo', 'sameAs'],
  LocalBusiness: ['telephone', 'openingHours'],
  WebSite: ['potentialAction'],
};

export function validateSchema(html: string, targetUrl: string): SchemaValidatorResult {
  const $ = cheerio.load(html);
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname;

  const scriptTags = $('script[type="application/ld+json"]');
  const totalBlocksFound = scriptTags.length;

  const blocks: SchemaBlockAudit[] = [];
  const detectedTypesSet = new Set<string>();
  const validationIssues: SchemaValidatorResult['validationIssues'] = [];
  let totalEntitiesExtracted = 0;

  scriptTags.each((idx, el) => {
    const rawContent = $(el).text().trim();
    let parsed: any;
    let isValidJson = true;
    let parseError: string | undefined;

    try {
      parsed = JSON.parse(rawContent);
    } catch (err: any) {
      isValidJson = false;
      parseError = err.message || 'JSON syntax error';
      validationIssues.push({
        severity: 'ERROR',
        type: 'Syntax Error',
        message: `Block #${idx + 1} contains invalid JSON: ${parseError}`,
      });
    }

    const blockEntities: SchemaBlockAudit['entities'] = [];

    if (isValidJson && parsed) {
      // Handle array, @graph, or single object
      let entityList: any[] = [];
      if (Array.isArray(parsed)) {
        entityList = parsed;
      } else if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
        entityList = parsed['@graph'];
      } else if (typeof parsed === 'object') {
        entityList = [parsed];
      }

      for (const ent of entityList) {
        if (!ent || typeof ent !== 'object') continue;
        const rawType = ent['@type'];
        const typeStr = Array.isArray(rawType) ? rawType.join(', ') : String(rawType || 'Unknown');
        if (typeStr !== 'Unknown') detectedTypesSet.add(typeStr);

        totalEntitiesExtracted++;

        const missingRequired: string[] = [];
        const missingRecommended: string[] = [];

        // Check required fields
        const reqProps = REQUIRED_PROPERTIES_MAP[typeStr];
        if (reqProps) {
          for (const prop of reqProps) {
            if (ent[prop] === undefined || ent[prop] === null || ent[prop] === '') {
              missingRequired.push(prop);
              validationIssues.push({
                severity: 'ERROR',
                type: typeStr,
                message: `Missing required property "${prop}" on @type: ${typeStr}.`,
              });
            }
          }
        }

        // Check recommended fields
        const recProps = RECOMMENDED_PROPERTIES_MAP[typeStr];
        if (recProps) {
          for (const prop of recProps) {
            if (ent[prop] === undefined || ent[prop] === null || ent[prop] === '') {
              missingRecommended.push(prop);
              validationIssues.push({
                severity: 'WARNING',
                type: typeStr,
                message: `Missing recommended property "${prop}" on @type: ${typeStr}.`,
              });
            }
          }
        }

        blockEntities.push({
          type: typeStr,
          id: ent['@id'] || undefined,
          name: ent.name || ent.headline || undefined,
          missingRequiredProperties: missingRequired,
          missingRecommendedProperties: missingRecommended,
        });
      }
    }

    // Format raw JSON nicely
    let formattedJson = rawContent;
    try {
      if (isValidJson && parsed) formattedJson = JSON.stringify(parsed, null, 2);
    } catch {}

    blocks.push({
      index: idx + 1,
      isValidJson,
      parseError,
      rawJson: formattedJson,
      entityCount: blockEntities.length,
      entities: blockEntities,
    });
  });

  const detectedTypes = Array.from(detectedTypesSet);

  // Rich Snippet Eligibility Check
  const richSnippetEligibility: SchemaValidatorResult['richSnippetEligibility'] = [
    {
      feature: 'Article Rich Snippets',
      eligible: detectedTypes.some((t) => ['Article', 'BlogPosting', 'NewsArticle'].includes(t)),
      reason: detectedTypes.some((t) => ['Article', 'BlogPosting', 'NewsArticle'].includes(t))
        ? 'Article schema detected with core publication metadata.'
        : 'No Article or BlogPosting structured data detected.',
    },
    {
      feature: 'Organization & Knowledge Graph',
      eligible: detectedTypes.some((t) => ['Organization', 'LocalBusiness'].includes(t)),
      reason: detectedTypes.some((t) => ['Organization', 'LocalBusiness'].includes(t))
        ? 'Organization entity declared for brand disambiguation.'
        : 'Missing Organization entity.',
    },
    {
      feature: 'Breadcrumb Path',
      eligible: detectedTypes.includes('BreadcrumbList'),
      reason: detectedTypes.includes('BreadcrumbList')
        ? 'BreadcrumbList detected for enhanced SERP navigation trails.'
        : 'Missing BreadcrumbList markup.',
    },
    {
      feature: 'Product & Review Stars',
      eligible: detectedTypes.includes('Product'),
      reason: detectedTypes.includes('Product')
        ? 'Product markup detected.'
        : 'No Product structured data found.',
    },
  ];

  // Scoring
  let score = 100;
  if (totalBlocksFound === 0) {
    score = 0;
  } else {
    for (const issue of validationIssues) {
      if (issue.severity === 'ERROR') score -= 20;
      if (issue.severity === 'WARNING') score -= 5;
    }
  }
  score = Math.max(0, Math.min(100, score));

  const grade: SchemaValidatorResult['grade'] =
    totalBlocksFound === 0
      ? 'MISSING'
      : score >= 85
      ? 'VALID'
      : score >= 50
      ? 'WARNINGS'
      : 'INVALID';

  // Recommendations
  const recommendations: string[] = [];
  if (totalBlocksFound === 0) {
    recommendations.push(
      'Deploy Schema.org JSON-LD (such as WebSite, Organization, or Article) to enable rich search result features.'
    );
  } else {
    if (validationIssues.some((i) => i.severity === 'ERROR')) {
      recommendations.push(
        'Fix critical schema syntax errors and fill missing required properties (headline, image, author).'
      );
    }
    if (!detectedTypes.includes('Organization') && !detectedTypes.includes('LocalBusiness')) {
      recommendations.push(
        'Add an Organization entity with sameAs links to official Wikipedia/Wikidata or social profiles.'
      );
    }
    if (!detectedTypes.includes('BreadcrumbList')) {
      recommendations.push(
        'Add BreadcrumbList structured data to display clean breadcrumb trails in Google Search results.'
      );
    }
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Schema.org structured data validated with 0 syntax errors and complete property coverage.'
    );
  }

  return {
    tool: 'schema-validator',
    domain,
    targetUrl,
    score,
    grade,
    totalBlocksFound,
    totalEntitiesExtracted,
    detectedTypes,
    blocks,
    validationIssues,
    richSnippetEligibility,
    recommendations,
  };
}
