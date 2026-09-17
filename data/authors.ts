export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  specialization: string[];
  testingExperience: string;
  publishedArticlesCount: number;
  publishedStudiesCount: number;
}

export const AUTHORS: Record<string, Author> = {
  'devin-vance': {
    slug: 'devin-vance',
    name: 'Devin Vance',
    role: 'Principal Performance Architect & Technical Editor',
    bio: 'Devin has specialized in web performance and Core Web Vitals engineering for over a decade. He leads diagnostic research and benchmark testing at Web Audits Helper, focusing on mobile LCP reduction, JavaScript execution profiling, and zero-shift layout engineering.',
    specialization: [
      'Core Web Vitals Diagnostics (LCP, INP, CLS)',
      'Chromium DevTools Protocol Profiling',
      'GeneratePress & Native Block Architecture',
      'Client-Side Inspection Tooling',
    ],
    testingExperience: 'Audited over 1,200 production web properties with automated and manual DevTools tracing since 2018.',
    publishedArticlesCount: 5,
    publishedStudiesCount: 2,
  },
  'marcus-reed': {
    slug: 'marcus-reed',
    name: 'Marcus Reed',
    role: 'Senior Systems & Hosting Architect',
    bio: 'Marcus has spent 12 years configuring enterprise Linux hosting stacks, NGINX edge caches, and LiteSpeed servers. He leads the publication-s hosting benchmarks, measuring real-world TTFB, Redis caching efficiency, and server response times under concurrent synthetic load.',
    specialization: [
      'Managed Cloud Infrastructure (Cloudways, Kinsta, AWS)',
      'Edge HTML Caching (Cloudflare APO, Fastly)',
      'Object Caching (Redis, Memcached)',
      'Database Query Profiling & WooCommerce Optimization',
    ],
    testingExperience: 'Designed and executed the 500-Site WordPress Hosting Benchmark utilizing K6 load testing across 8 global nodes.',
    publishedArticlesCount: 3,
    publishedStudiesCount: 1,
  },
  'elena-rostova': {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Semantic Search & AI Crawler Researcher',
    bio: 'Elena focuses on knowledge graphs, Schema.org structured data, and search engine crawler behavior. Her research explores how emerging AI agents (GPTBot, ClaudeBot, PerplexityBot) parse and index structured technical content versus unstructured prose.',
    specialization: [
      'Schema.org JSON-LD Structured Data',
      'AI Crawler Access Patterns & llms.txt Observability',
      'Entity Disambiguation & Knowledge Graph Optimization',
      'Automated Web Scraping & Firecrawl Pipelines',
    ],
    testingExperience: 'Monitored crawler logs across 200 technical publishing documents over a 90-day research window.',
    publishedArticlesCount: 4,
    publishedStudiesCount: 1,
  },
};

export const AUTHORS_LIST: Author[] = Object.values(AUTHORS);
