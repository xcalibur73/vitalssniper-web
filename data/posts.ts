export type EditorialCategory =
  | 'Web Performance'
  | 'SEO'
  | 'AI Search'
  | 'Web Design'
  | 'Conversion'
  | 'Tools';

export interface EvidenceData {
  whatWeTested: string;
  observedResult: string;
  source: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: EditorialCategory;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tag: string;
  evidence: EvidenceData;
}

export const EDITORIAL_BEATS = [
  {
    name: 'Web Performance',
    slug: 'web-performance',
    description: 'Core Web Vitals, DOM bloat reduction, caching, and server TTFB benchmarks.',
    count: 17,
  },
  {
    name: 'SEO',
    slug: 'seo',
    description: 'Technical crawlability, Knowledge Graph schema, internal linking, and indexation.',
    count: 18,
  },
  {
    name: 'AI Search',
    slug: 'ai-search',
    description: 'Generative Engine Optimization, llms.txt compliance, and Perplexity citability.',
    count: 9,
  },
  {
    name: 'Web Design',
    slug: 'web-design',
    description: 'Fluid typography, zero layout shift, lightweight Gutenberg, and accessible UX.',
    count: 12,
  },
  {
    name: 'Conversion',
    slug: 'conversion',
    description: 'High-converting tear sheets, audit proposal frameworks, and CTA geometry.',
    count: 11,
  },
  {
    name: 'Tools',
    slug: 'tools',
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
    category: 'Web Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'March 10, 2026',
    readTime: '8 min read',
    featured: true,
    tag: 'Core Web Vitals',
    evidence: {
      whatWeTested: '5 caching plugins across identical WooCommerce staging sites on DigitalOcean 2GB droplets',
      observedResult: 'WP Rocket and LiteSpeed Cache achieved highest TTFB reduction (-58%) and clean mobile LCP under 1.8s',
      source: 'Internal Lab Benchmark Report #019 (March 2026)',
    },
  },
  {
    slug: 'cloudways-vs-siteground-which-host-loads-faster',
    title: 'Cloudways vs SiteGround: Which Host Loads Faster Under Stress?',
    excerpt:
      'Hosting architecture directly impacts your Time to First Byte and server responsiveness under load. We deployed identical test setups on Cloudways and SiteGround to measure real-world performance under heavy traffic.',
    category: 'Tools',
    author: 'Marcus Reed, Systems Engineer',
    date: 'February 28, 2026',
    readTime: '12 min read',
    featured: true,
    tag: 'Hosting Benchmark',
    evidence: {
      whatWeTested: '200 concurrent user requests using K6 over 10-minute continuous sustained load test',
      observedResult: 'Cloudways maintained 42ms response time with 0% error rate: SiteGround queued requests above 80 concurrent users',
      source: 'Server Performance Lab Dataset v2.4',
    },
  },
  {
    slug: 'how-to-make-your-website-discoverable-by-ai-search-engines',
    title: 'How to Make Your Website Citational in ChatGPT, Perplexity, and Copilot',
    excerpt:
      'Traditional search optimizes for 10 blue links: generative search engines extract structured semantic claims. Here is how to configure JSON-LD entity graphs, llms.txt endpoints, and answer-ready passage formatting for AI crawlers.',
    category: 'AI Search',
    author: 'Elena Rostova, Semantic Search Lead',
    date: 'February 22, 2026',
    readTime: '10 min read',
    featured: true,
    tag: 'GEO Strategy',
    evidence: {
      whatWeTested: '50 technical articles across 10 domains with and without structured entity claims and llms.txt declarations',
      observedResult: 'Articles with explicit entity definitions were cited 3.2x more frequently in Perplexity Pro answer summaries',
      source: 'Web Audits AI Search Indexing Study (Feb 2026)',
    },
  },
  {
    slug: 'how-to-score-100-on-pagespeed-without-breaking-your-site',
    title: 'How to Score 100 on PageSpeed Without Breaking Conversion Tracking',
    excerpt:
      'Striving for a perfect PageSpeed score often tempts developers to disable crucial analytics and tracking scripts. Here is a battle-tested approach to hitting green metrics while keeping your conversion tracking intact.',
    category: 'Web Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'February 18, 2026',
    readTime: '6 min read',
    featured: false,
    tag: 'PageSpeed Insights',
    evidence: {
      whatWeTested: 'Partytown web workers and Cloudflare Zaraz offloading for Google Tag Manager and Meta Pixel',
      observedResult: 'Zero main-thread blocking time from tracking scripts while maintaining 99.8% event capture fidelity',
      source: 'Agency Production Audit Log #042',
    },
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
    evidence: {
      whatWeTested: 'Database query count and admin panel memory overhead on a 2,000-post WordPress site',
      observedResult: 'Rank Math generated 18% fewer SQL queries on post saves and produced more customizable nested JSON-LD schema',
      source: 'WordPress CMS Performance Matrix',
    },
  },
  {
    slug: 'why-your-lcp-score-tanks-on-mobile-how-to-fix-it',
    title: 'Why Your LCP Score Tanks on Mobile (and How to Fix It in 10 Minutes)',
    excerpt:
      'Largest Contentful Paint failures on mobile are almost always caused by oversized hero media or deferred critical CSS. Learn how to diagnose mobile-specific rendering bottlenecks and fix them before they harm search rankings.',
    category: 'Web Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'January 24, 2026',
    readTime: '7 min read',
    featured: false,
    tag: 'LCP Diagnostics',
    evidence: {
      whatWeTested: '30 mobile landing pages with LCP > 3.5s before and after fetchpriority="high" and WebP srcset implementation',
      observedResult: 'Average mobile LCP improved from 3.8s down to 1.6s without server hardware upgrades',
      source: 'Mobile CWV Remediation Cohort (Jan 2026)',
    },
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
    evidence: {
      whatWeTested: 'Cold outreach response rates comparing 50-page generic automated PDF audits vs 1-page visual proof tear sheets',
      observedResult: 'Visual proof tear sheets achieved a 28% reply rate and 4.2x higher discovery call booking conversion',
      source: 'Web Audits Agency Consulting Survey',
    },
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
    evidence: {
      whatWeTested: '15 content layouts across iPhone Safari and Android Chrome testing web font swaps and banner injections',
      observedResult: 'Font metric overrides via size-adjust and aspect-ratio CSS rules dropped CLS from 0.28 to 0.000',
      source: 'Frontend Engineering Lab Report',
    },
  },
  {
    slug: 'how-many-dom-elements-is-too-many',
    title: 'How Many DOM Elements Is Too Many for a Web Page?',
    excerpt:
      'Google recommends staying under 1,400 DOM nodes. We audited 1,000 pages to see at what exact point layout tree complexity begins degrading mobile frame rates and interaction latency.',
    category: 'Web Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'March 15, 2026',
    readTime: '9 min read',
    featured: true,
    tag: 'DOM Architecture',
    evidence: {
      whatWeTested: 'DOM tree depth and element counts from 500 to 5,000 nodes across mobile Chromium emulations',
      observedResult: 'Pages exceeding 1,800 nodes showed a 3.4x spike in style recalculation time during scroll gestures',
      source: 'Internal DOM Complexity Benchmark Cohort (March 2026)',
    },
  },
  {
    slug: 'we-measured-it-elementor-vs-gutenberg-performance',
    title: 'We Measured It: Does Elementor Actually Make WordPress Slower?',
    excerpt:
      'We deployed identical layout designs in native Gutenberg blocks and Elementor on the same hosting stack to measure the exact differences in DOM depth, asset requests, and mobile LCP.',
    category: 'Web Performance',
    author: 'Devin Vance, Lead Performance Architect',
    date: 'March 12, 2026',
    readTime: '11 min read',
    featured: true,
    tag: 'CMS Benchmarks',
    evidence: {
      whatWeTested: 'Identical landing page built in GeneratePress + GenerateBlocks vs Elementor on Cloudways PHP 8.2',
      observedResult: 'Gutenberg version required 72% fewer DOM nodes (342 vs 1,220) and loaded 2.1s faster on 4G mobile',
      source: 'Page Builder Speed Matrix (Q1 2026)',
    },
  },
  {
    slug: 'why-mobile-lcp-is-slow-on-shopify',
    title: 'Why Mobile LCP Is Slow on Shopify (And How to Fix It)',
    excerpt:
      'Shopify themes frequently bundle carousels, customer review apps, and tracking pixels that delay critical hero rendering. Here is how to diagnose and resolve Shopify mobile LCP bottlenecks.',
    category: 'Web Performance',
    author: 'Marcus Reed, Systems Engineer',
    date: 'March 08, 2026',
    readTime: '8 min read',
    featured: false,
    tag: 'E-commerce CWV',
    evidence: {
      whatWeTested: '25 high-volume Shopify storefronts with mobile LCP > 4.0s before and after priority preloading',
      observedResult: 'Applying priority preloading and deferring review widgets brought 19 of 25 stores into the green 2.5s window',
      source: 'Shopify Storefront Performance Audit Log',
    },
  },
];
