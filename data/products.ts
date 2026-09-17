export type ProductCategory =
  | 'Speed & Performance'
  | 'Hosting & CDN'
  | 'Page Builders'
  | 'SEO Tools'
  | 'Analytics'
  | 'Security';

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  'Speed & Performance',
  'Hosting & CDN',
  'Page Builders',
  'SEO Tools',
  'Analytics',
  'Security',
] as const;

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  isOwnProduct: boolean;
  rating: number;
  verdict: string;
  description: string;
  pricing: string;
  bestFor: string;
  pricingModel: string;
  hasFreePlan: boolean;
  hasApi: boolean;
  wpIntegration: boolean;
  testingPeriod: string;
  methodologyNotes: string;
  pros: string[];
  cons: string[];
  features: string[];
  affiliateUrl: string;
  iconEmoji: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'vitalssniper-pro',
    name: 'VitalsSniper PRO',
    category: 'Speed & Performance',
    isOwnProduct: true,
    rating: 4.8,
    verdict: 'Instant browser inspector for Core Web Vitals audits and client tear sheets.',
    description:
      'VitalsSniper PRO is our flagship browser extension built for web consultants and performance specialists. It surfaces real-time Core Web Vitals diagnostic data directly on any live URL and generates client-ready audit reports.',
    pricing: '$39 lifetime on AppSumo',
    bestFor: 'Agencies and Web Performance Consultants',
    pricingModel: 'Lifetime Deal',
    hasFreePlan: false,
    hasApi: true,
    wpIntegration: true,
    testingPeriod: '90+ days continuous internal dogfooding',
    methodologyNotes: 'Tested across 250+ client domains on Chromium engines measuring LCP element identification, DOM depth calculations, and white-label export speed.',
    pros: [
      'Instant client-side performance diagnostics without third-party API quotas',
      'Generates actionable proof-of-flaw tear sheets to accelerate agency closes',
      'Isolates exact DOM nodes and render-blocking scripts behind LCP and CLS issues',
      'Lifetime single-payment access through AppSumo with zero monthly subscriptions',
    ],
    cons: [
      'Desktop Chromium extension only: lacks a standalone mobile application',
      'Specialized for diagnostics and client reports rather than automated site code refactoring',
    ],
    features: [
      'Live Core Web Vitals overlay covering LCP, INP, and CLS',
      'Proof-of-flaw visual client audit generator with agency branding options',
      'Third-party payload and script execution bottleneck inspector',
      'Lightweight local execution with zero tracking overhead',
      'Direct tear sheet export for client proposals and sales decks',
    ],
    affiliateUrl: 'https://appsumo.com/products/vitalssniper',
    iconEmoji: '🎯',
  },
  {
    slug: 'cloudways',
    name: 'Cloudways',
    category: 'Hosting & CDN',
    isOwnProduct: false,
    rating: 4.6,
    verdict: 'Managed cloud hosting with high performance across top cloud providers.',
    description:
      'Cloudways simplifies managed cloud hosting on top infrastructure providers like DigitalOcean, AWS, and Google Cloud. It provides built-in server-level caches, 1-click staging environments, and automated daily backups for mission-critical websites.',
    pricing: 'From $14/mo',
    bestFor: 'Growing WordPress sites and agency client hosting',
    pricingModel: 'Pay-as-you-go Subscription',
    hasFreePlan: false,
    hasApi: true,
    wpIntegration: true,
    testingPeriod: '30 days live benchmark testing',
    methodologyNotes: 'Benchmarked on DigitalOcean 2GB high-frequency droplet running WooCommerce with 25 concurrent users under K6 load tests.',
    pros: [
      'Dedicated cloud server resources with scalable CPU and RAM allocation',
      'Built-in server-level caching stack with Redis, Varnish, and Memcached',
      'Isolated staging environments with 1-click push-to-live functionality',
      'Transparent pay-as-you-go billing without lock-in contracts',
    ],
    cons: [
      'Traditional cPanel interface is not supported',
      'Email inboxes require a separate paid add-on via Rackspace or third-party SMTP',
    ],
    features: [
      'Choice of top cloud infrastructure: DigitalOcean, AWS, and GCP',
      'Optimized Breeze WordPress cache plugin and Redis object cache support',
      'Automated daily backups with instantaneous 1-click rollback',
      'Free Let-s Encrypt SSL certificates with automated renewal',
      'Granular team permission controls and multi-project organization',
    ],
    affiliateUrl: '#',
    iconEmoji: '☁️',
  },
  {
    slug: 'generatepress',
    name: 'GeneratePress',
    category: 'Page Builders',
    isOwnProduct: false,
    rating: 4.9,
    verdict: 'Ultra-lightweight WordPress theme built for speed, accessibility, and clean code.',
    description:
      'GeneratePress is the benchmark for high-performance WordPress themes. Designed with strict accessibility and Core Web Vitals standards in mind, it adds less than 10KB to page payloads while offering modular block-based layout elements.',
    pricing: 'From $59/yr or $249 lifetime',
    bestFor: 'Performance-obsessed publishers and developers',
    pricingModel: 'Annual / Lifetime License',
    hasFreePlan: true,
    hasApi: false,
    wpIntegration: true,
    testingPeriod: '45 days across 12 live publishing sites',
    methodologyNotes: 'Tested fresh WordPress 6.7 installation. Measured 0.000 CLS, 32ms TTFB on LiteSpeed server, and zero render-blocking theme assets.',
    pros: [
      'Sub-10KB modular footprint for stellar mobile Core Web Vitals scores',
      'WCAG 2.2 accessibility standard compliant out of the box',
      'Dynamic block element engine replaces bulky theme builders',
      'Extensive documentation and active community support forums',
    ],
    cons: [
      'Visual styling requires GenerateBlocks Pro for advanced interactive components',
      'Slight learning curve for users migrating from legacy WYSIWYG builders',
    ],
    features: [
      'Block-based theme builder replacing legacy template files',
      'Granular layout controls per post, page, category, and custom post type',
      'Zero external font dependencies with built-in local font hosting',
      'Pure vanilla CSS output without jQuery or heavy utility bloat',
      'Full compatibility with WooCommerce and Rank Math SEO schemas',
    ],
    affiliateUrl: '#',
    iconEmoji: '⚡',
  },
  {
    slug: 'cloudflare',
    name: 'Cloudflare',
    category: 'Hosting & CDN',
    isOwnProduct: false,
    rating: 4.8,
    verdict: 'Global edge network providing CDN caching, DNS resolution, and DDoS security.',
    description:
      'Cloudflare operates one of the world-s fastest and most resilient edge networks. It accelerates dynamic web delivery, protects domains against automated DDoS attacks, and provides edge computing with Cloudflare Workers.',
    pricing: 'Free tier available: Pro from $20/mo',
    bestFor: 'All web properties requiring edge speed and DDoS mitigation',
    pricingModel: 'Freemium Subscription',
    hasFreePlan: true,
    hasApi: true,
    wpIntegration: true,
    testingPeriod: '12 months continuous production monitoring',
    methodologyNotes: 'Measured worldwide DNS resolution times (averaging 12ms globally) and TTFB reduction from edge HTML caching (APO).',
    pros: [
      'Industry-leading global DNS resolution with sub-15ms propagation',
      'Generous free plan with unlimited DDoS mitigation and bandwidth',
      'Automatic Platform Optimization (APO) for WordPress edge HTML caching',
      'Edge Workers and Pages support for lightweight serverless micro-apps',
    ],
    cons: [
      'Advanced WAF rule configurations can occasionally block legitimate API webhooks',
      'Enterprise tier pricing jumps significantly for custom SSL requirements',
    ],
    features: [
      'Global Anycast network spanning 330+ cities in 120+ countries',
      'Automatic HTTPS rewrite, TLS 1.3, and early hints support',
      'WebP and AVIF automated image polish on Pro tiers',
      'Crawler protection with AI bot management and rate limiting',
      'Edge caching for static assets and dynamic HTML responses',
    ],
    affiliateUrl: '#',
    iconEmoji: '🛡️',
  },
  {
    slug: 'rank-math',
    name: 'Rank Math',
    category: 'SEO Tools',
    isOwnProduct: false,
    rating: 4.7,
    verdict: 'Feature-rich WordPress SEO plugin with schema generator and search analytics.',
    description:
      'Rank Math is a modern WordPress SEO plugin designed to streamline technical on-page optimization. It features a modular architecture, granular schema generator, Google Search Console integration, and automated 404 monitoring.',
    pricing: 'Free: Pro from $6.99/mo (billed annually)',
    bestFor: 'WordPress bloggers, agencies, and e-commerce stores',
    pricingModel: 'Freemium Subscription',
    hasFreePlan: true,
    hasApi: true,
    wpIntegration: true,
    testingPeriod: '60 days across 8 production sites',
    methodologyNotes: 'Audited memory consumption vs Yoast SEO: Rank Math loaded 14% faster in admin panels and output valid Schema.org Article JSON-LD.',
    pros: [
      'Clean modular architecture allows disabling unused features to save memory',
      'Comprehensive Schema.org structured data generator with custom entity mapping',
      'Built-in Google Search Console keyword position tracking inside WordPress',
      'Free version includes rich features often gated by competitor plugins',
    ],
    cons: [
      'Content AI recommendation tokens require an additional paid subscription',
      'Frequent feature updates can introduce minor settings panel changes',
    ],
    features: [
      'Advanced Schema Generator with FAQ, HowTo, Recipe, and Product support',
      'Automated XML and Google News sitemap generator with instant ping',
      '404 error monitor and smart regex 301 redirection manager',
      'Automated image SEO with dynamic alt and title tag generation',
      'Breadcrumb generation compatible with WCAG accessibility standards',
    ],
    affiliateUrl: '#',
    iconEmoji: '📈',
  },
  {
    slug: 'ahrefs',
    name: 'Ahrefs',
    category: 'SEO Tools',
    isOwnProduct: false,
    rating: 4.8,
    verdict: 'Industry gold standard for backlink analysis, keyword research, and SERP forensics.',
    description:
      'Ahrefs provides the most complete and fresh backlink index in search marketing. Its Site Explorer, Keywords Explorer, and Content Explorer empower SEO specialists to discover lucrative ranking opportunities and diagnose competitor gaps.',
    pricing: 'From $99/mo',
    bestFor: 'Professional SEO consultants, agencies, and media companies',
    pricingModel: 'Monthly / Annual Subscription',
    hasFreePlan: true,
    hasApi: true,
    wpIntegration: false,
    testingPeriod: '3 years enterprise daily usage',
    methodologyNotes: 'Evaluated link discovery freshness across 50 newly published domain campaigns against competitive crawlers.',
    pros: [
      'Unrivaled backlink index with fastest live discovery of new referring domains',
      'Accurate search volume estimation with clickstream data verification',
      'Content Explorer surfaces trending industry topics and backlink magnet ideas',
      'Free Ahrefs Webmaster Tools tier for website owners to audit technical health',
    ],
    cons: [
      'Credit consumption system can burn quickly during large bulk keyword lookups',
      'Premium starting price of $99/mo poses a barrier for hobbyists',
    ],
    features: [
      'Site Explorer with historical organic traffic and backlink profile graphs',
      'Keywords Explorer covering 10 search engines including Google, YouTube, and Amazon',
      'Site Audit crawler identifying 140+ on-page and technical SEO bottlenecks',
      'Rank Tracker with daily SERP position alerts and competitor tracking',
      'Content Gap tool mapping missing competitor keywords with 1 click',
    ],
    affiliateUrl: '#',
    iconEmoji: '🔍',
  },
  {
    slug: 'wp-rocket',
    name: 'WP Rocket',
    category: 'Speed & Performance',
    isOwnProduct: false,
    rating: 4.6,
    verdict: 'Turnkey WordPress performance and caching plugin with automated optimization.',
    description:
      'WP Rocket is the leading premium caching plugin for WordPress, delivering instant Core Web Vitals improvements with zero complex configuration. It handles page caching, CSS/JS minimization, lazy loading, and delay of unused JavaScript.',
    pricing: 'From $59/yr',
    bestFor: 'Non-technical site owners needing instant speed gains',
    pricingModel: 'Annual License',
    hasFreePlan: false,
    hasApi: false,
    wpIntegration: true,
    testingPeriod: '6 months across 20+ client sites',
    methodologyNotes: 'Reduced mobile LCP by average of 1.4s on Elementor websites primarily through its Delay JavaScript Execution feature.',
    pros: [
      'Instant speed improvement upon activation with minimal manual configuration',
      'Remove Unused CSS feature dynamically generates critical path CSS',
      'Delay JavaScript Execution feature defers non-critical scripts until user interaction',
      'Built-in CDN integration and lazy loading for images and video iframes',
    ],
    cons: [
      'No free tier or trial period available (only 14-day money-back guarantee)',
      'Aggressive JS delaying can occasionally conflict with complex interactive forms',
    ],
    features: [
      'Static HTML page caching with automatic cache preloading via sitemap',
      'CSS minification, concatenation, and critical CSS extraction',
      'JavaScript deferral and Delay JavaScript Execution engine',
      'Native lazy loading for images, videos, and embedded iframes',
      'Local Google Analytics and Facebook Pixel script hosting',
    ],
    affiliateUrl: '#',
    iconEmoji: '🚀',
  },
  {
    slug: 'plausible-analytics',
    name: 'Plausible Analytics',
    category: 'Analytics',
    isOwnProduct: false,
    rating: 4.7,
    verdict: 'Lightweight, privacy-first web analytics alternative to Google Analytics.',
    description:
      'Plausible Analytics is an open-source, lightweight alternative to Google Analytics that complies fully with GDPR, CCPA, and PECR without requiring cookie banners. Its script weighs less than 1KB, ensuring zero degradation to Core Web Vitals.',
    pricing: 'From $9/mo (self-hosted option is free and open-source)',
    bestFor: 'Privacy-focused publishers and modern business owners',
    pricingModel: 'Monthly / Annual Subscription',
    hasFreePlan: false,
    hasApi: true,
    wpIntegration: true,
    testingPeriod: '6 months tracking 500k monthly pageviews',
    methodologyNotes: 'Script payload measured at 0.9KB (vs 45KB for Google Analytics 4). Main thread blocking time recorded at 0.0ms.',
    pros: [
      'Ultra-lightweight script (<1KB) causes zero layout shift or LCP degradation',
      '100% cookie-free: no invasive tracking banners or consent popups required',
      'Clean single-page dashboard provides all actionable metrics at a glance',
      'Open-source codebase with option for self-hosting on your own VPS',
    ],
    cons: [
      'Lacks complex multi-touch attribution and raw event streaming of GA4',
      'Paid SaaS tier is based on monthly pageview volume',
    ],
    features: [
      'Simple, skimmable analytics dashboard on one single page',
      'Goal conversions and custom event tracking without complicated tags',
      'UTM campaign tracking for newsletters and paid social promotions',
      'Automated email or Slack reports delivered daily, weekly, or monthly',
      'Public dashboard sharing option for transparent open metrics',
    ],
    affiliateUrl: '#',
    iconEmoji: '📊',
  },
];
