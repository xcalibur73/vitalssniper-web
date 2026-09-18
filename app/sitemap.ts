import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/posts';
import { PRODUCTS } from '@/data/products';
import { COMPARISONS } from '@/data/comparisons';
import { RESEARCH_STUDIES } from '@/data/research';
import { TEARDOWNS } from '@/data/teardowns';
import { AUTHORS_LIST } from '@/data/authors';
import { FREE_TOOLS } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.webaudits.pro';

  // Release and freshness timestamps for Q1 2026 updates
  const currentReleaseDate = new Date('2026-03-18T00:00:00.000Z');
  const evergreenDate = new Date('2026-03-15T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentReleaseDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/articles`, lastModified: currentReleaseDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/articles/web-performance`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/articles/seo`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/articles/ai-search`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/articles/web-design`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/articles/conversion`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/articles/tools`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/directory`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/comparisons`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/research`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/teardowns`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/docs`, lastModified: currentReleaseDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/free-audit-report`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/products/vitalssniper-pro`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/vitalssniper`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about/methodology`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/editorial-policy`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cookies`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/newsletter`, lastModified: evergreenDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/sitemap-page`, lastModified: currentReleaseDate, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const reviewRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/reviews/${product.slug}`,
    lastModified: currentReleaseDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = COMPARISONS.map((comp) => ({
    url: `${baseUrl}/comparisons/${comp.slug}`,
    lastModified: currentReleaseDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const researchRoutes: MetadataRoute.Sitemap = RESEARCH_STUDIES.map((study) => ({
    url: `${baseUrl}/research/${study.slug}`,
    lastModified: currentReleaseDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const teardownRoutes: MetadataRoute.Sitemap = TEARDOWNS.map((td) => ({
    url: `${baseUrl}/teardowns/${td.slug}`,
    lastModified: currentReleaseDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const authorRoutes: MetadataRoute.Sitemap = AUTHORS_LIST.map((author) => ({
    url: `${baseUrl}/about/authors/${author.slug}`,
    lastModified: evergreenDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = FREE_TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: currentReleaseDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...reviewRoutes,
    ...comparisonRoutes,
    ...researchRoutes,
    ...teardownRoutes,
    ...authorRoutes,
    ...toolRoutes,
  ];
}
