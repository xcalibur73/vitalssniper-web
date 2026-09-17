export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Performance' | 'SEO' | 'AI & GEO' | 'Web Design' | 'Conversion' | 'Tools & Software';
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tag: string;
}

export const EDITORIAL_BEATS = [
  {
    name: 'Performance',
    description: 'Core Web Vitals, DOM bloat reduction, caching, and server TTFB benchmarks.',
    count: 14,
  },
  {
    name: 'SEO',
    description: 'Technical crawlability, Knowledge Graph schema, internal linking, and indexation.',
    count: 18,
  },
  {
    name: 'AI & GEO',
    description: 'Generative Engine Optimization, llms.txt compliance, and Perplexity citability.',
    count: 9,
  },
  {
    name: 'Web Design',
    description: 'Fluid typography, zero layout shift, lightweight Gutenberg, and accessible UX.',
    count: 12,
  },
  {
    name: 'Conversion',
    description: 'High-converting tear sheets, audit proposal frameworks, and CTA geometry.',
    count: 11,
  },
  {
    name: 'Tools & Software',
    description: 'Objective hands-on testing, speed comparisons, and vetted recommendations.',
    count: 22,
  },
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '5-best-wordpress-speed-plugins-2026',
    title: '5 Best WordPress Speed Plugins in 2026 Tested on Real Servers',
    excerpt:
      'Speed optimization in WordPress often suffers from plugin bloat and conflicting cache layers. We tested the leading performance plugins to see which tools actually improve Core Web Vitals without breaking your layouts.',
    category: 'Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'March 10, 2026',
    readTime: '8 min read',
    featured: true,
    tag: 'Core Web Vitals',
  },
  {
    slug: 'cloudways-vs-siteground-which-host-loads-faster',
    title: 'Cloudways vs SiteGround: Which Host Loads Faster Under Stress?',
    excerpt:
      'Hosting architecture directly impacts your Time to First Byte and server responsiveness under load. We deployed identical test setups on Cloudways and SiteGround to measure real-world performance under heavy traffic.',
    category: 'Tools & Software',
    author: 'Marcus Reed, Systems Engineer',
    date: 'February 28, 2026',
    readTime: '12 min read',
    featured: true,
    tag: 'Hosting Benchmark',
  },
  {
    slug: 'how-to-make-your-website-discoverable-by-ai-search-engines',
    title: 'How to Make Your Website Citational in ChatGPT, Perplexity, and Copilot',
    excerpt:
      'Traditional search optimizes for 10 blue links; generative search engines extract structured semantic claims. Here is how to configure JSON-LD entity graphs, llms.txt endpoints, and answer-ready passage formatting for AI crawlers.',
    category: 'AI & GEO',
    author: 'Elena Rostova, Semantic Search Lead',
    date: 'February 22, 2026',
    readTime: '10 min read',
    featured: true,
    tag: 'GEO Strategy',
  },
  {
    slug: 'how-to-score-100-on-pagespeed-without-breaking-your-site',
    title: 'How to Score 100 on PageSpeed Without Breaking Conversion Tracking',
    excerpt:
      'Striving for a perfect PageSpeed score often tempts developers to disable crucial analytics and tracking scripts. Here is a battle-tested approach to hitting green metrics while keeping your conversion tracking intact.',
    category: 'Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'February 18, 2026',
    readTime: '6 min read',
    featured: false,
    tag: 'PageSpeed Insights',
  },
  {
    slug: 'rank-math-vs-yoast-definitive-seo-plugin-comparison',
    title: 'Rank Math vs Yoast: The Definitive SEO Plugin Comparison',
    excerpt:
      'Selecting an SEO plugin determines how cleanly your WordPress site structures schema markup and metadata. We compare Rank Math and Yoast across page weight, schema flexibility, and indexing controls to find the best fit.',
    category: 'SEO',
    author: 'Elena Rostova, Semantic Search Lead',
    date: 'February 05, 2026',
    readTime: '10 min read',
    featured: false,
    tag: 'SEO Plugins',
  },
  {
    slug: 'why-your-lcp-score-tanks-on-mobile-how-to-fix-it',
    title: 'Why Your LCP Score Tanks on Mobile (and How to Fix It in 10 Minutes)',
    excerpt:
      'Largest Contentful Paint failures on mobile are almost always caused by oversized hero media or deferred critical CSS. Learn how to diagnose mobile-specific rendering bottlenecks and fix them before they harm search rankings.',
    category: 'Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'January 24, 2026',
    readTime: '7 min read',
    featured: false,
    tag: 'LCP Diagnostics',
  },
  {
    slug: 'the-agency-guide-to-white-label-website-audits',
    title: 'The Agency Playbook: How to Turn Proof-of-Flaw Audits Into $3,500 Retainers',
    excerpt:
      'Prospects delete generic 50-page automated PDF audit dumps. Learn how top web agencies use targeted 1-page technical tear sheets highlighting exact DOM bloat flaws to close high-value optimization retainers.',
    category: 'Conversion',
    author: 'Marcus Reed, Systems Engineer',
    date: 'January 12, 2026',
    readTime: '9 min read',
    featured: true,
    tag: 'Agency Growth',
  },
  {
    slug: 'zero-cls-web-design-principles',
    title: 'Zero CLS Web Design: How to Eliminate Visual Shifts Forever',
    excerpt:
      'Cumulative Layout Shift frustrates users and lowers Core Web Vitals rankings. Learn how aspect ratio containers, font fallback overrides, and fluid clamp typography prevent sudden visual jumps on mobile devices.',
    category: 'Web Design',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'January 04, 2026',
    readTime: '8 min read',
    featured: false,
    tag: 'UX & CSS',
  },
];
