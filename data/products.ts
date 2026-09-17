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
    rating: 4.5,
    verdict: 'Instant browser inspector for Core Web Vitals audits and client tear sheets.',
    description:
      'VitalsSniper PRO is our flagship browser extension built for web consultants and performance specialists. It surfaces real-time Core Web Vitals diagnostic data directly on any live URL and generates client-ready audit reports.',
    pricing: '$39 lifetime on AppSumo',
    pros:
      [
        'Instant client-side performance diagnostics without third-party API quotas',
        'Generates actionable proof-of-flaw tear sheets to accelerate agency closes',
        'Isolates exact DOM nodes and render-blocking scripts behind LCP and CLS issues',
        'Lifetime single-payment access through AppSumo with zero monthly subscriptions',
      ],
    cons:
      [
        'Desktop Chromium extension only: lacks a standalone mobile application',
        'Specialized for diagnostics and client reports rather than automated site code refactoring',
      ],
    features:
      [
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
    rating: 4.5,
    verdict: 'Managed cloud hosting with high performance across top cloud providers.',
    description:
      'Cloudways simplifies managed cloud hosting on top infrastructure providers like DigitalOcean, AWS, and Google Cloud. It provides built-in server-level caches, 1-click staging environments, and automated daily backups for mission-critical websites.',
    pricing: 'From $14/mo',
    pros:
      [
        'Dedicated cloud server resources with scalable CPU and RAM allocation',
        'Built-in server-level caching stack with Redis, Varnish, and Memcached',
        'Isolated staging environments with 1-click push-to-live functionality',
        'Transparent pay-as-you-go billing without lock-in contracts',
      ],
    cons:
      [
        'Traditional cPanel interface is not supported',
        'Email inboxes require a separate paid add-on via Rackspace or third-party SMTP',
      ],
    features:
      [
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
    rating: 5,
    verdict: 'Ultra-lightweight WordPress theme foundation engineered for pure speed.',
    description:
      'GeneratePress is an ultra-fast, modular WordPress theme engineered for speed, clean markup, and full accessibility. When combined with GenerateBlocks, it replaces heavy visual builders with a lean block-based workflow that consistently scores 100 on PageSpeed.',
    pricing: 'From $59/yr',
    pros:
      [
        'Adds less than 10KB to overall page weight out of the box',
        'Flawless 100% Core Web Vitals compatibility on clean installations',
        'Modular architecture allows you to disable unused features completely',
        'Extensive hook system and clean code for technical developers',
      ],
    cons:
      [
        'Requires basic understanding of web design and layout principles',
        'Advanced dynamic block design patterns require the companion GenerateBlocks plugin',
      ],
    features:
      [
        'Modular theme structure with zero jQuery dependencies',
        'Dynamic block-based theme building via GenerateBlocks integration',
        'Full WCAG 2.0 accessibility compliance across all base templates',
        'Comprehensive hook and filter system for tailored development',
        'Extensive pre-built site library for rapid project kickoff',
      ],
    affiliateUrl: '#',
    iconEmoji: '⚡',
  },
  {
    slug: 'cloudflare',
    name: 'Cloudflare',
    category: 'Hosting & CDN',
    isOwnProduct: false,
    rating: 4.5,
    verdict: 'Global edge network providing ultra-fast CDN delivery and DDoS defense.',
    description:
      'Cloudflare powers one of the fastest global edge networks, caching assets close to your visitors and filtering malicious requests before they touch your origin server. It includes ultra-fast authoritative DNS, automated asset compression, and edge compute capabilities.',
    pricing: 'Free tier available',
    pros:
      [
        'Generous free plan offering unmetered CDN traffic and baseline DDoS security',
        'Fastest authoritative DNS propagation times in the web industry',
        'Automatic WebP conversion and Polish image optimization on Pro plans',
        'Extensive edge developer ecosystem via Cloudflare Workers',
      ],
    cons:
      [
        'Advanced firewall rule configurations require Pro or Business subscriptions',
        'Aggressive challenge screens can occasionally hinder legitimate automated bots',
      ],
    features:
      [
        'Global Anycast CDN spanning over 300 cities worldwide',
        'Automated DDoS defense and customizable Web Application Firewall',
        'DNSSEC-ready high-performance DNS resolver',
        'Free automated SSL/TLS certificates and HTTP/3 support',
        'Cloudflare Workers serverless edge execution platform',
      ],
    affiliateUrl: '#',
    iconEmoji: '🛡️',
  },
  {
    slug: 'rank-math',
    name: 'Rank Math',
    category: 'SEO Tools',
    isOwnProduct: false,
    rating: 4.5,
    verdict: 'Feature-packed WordPress SEO plugin with schema tools and content insights.',
    description:
      'Rank Math is a modern WordPress SEO plugin that handles technical SEO, structured data markup, and on-page optimization. It provides built-in schema generation, 404 monitoring, and automated redirects without requiring extra third-party add-ons.',
    pricing: 'Free + Pro from $6.99/mo',
    pros:
      [
        'All-in-one schema generator supporting articles, recipes, FAQs, and products',
        'Modular codebase where unnecessary modules can be switched off',
        'Integrated Search Console keyword performance and position tracking',
        'Significantly more feature-rich than older legacy SEO plugins at comparable price points',
      ],
    cons:
      [
        'Broad feature set can present a steep learning curve for non-technical users',
        'Content AI keyword credits require separate monthly recharges',
      ],
    features:
      [
        'Advanced Schema Markup generator with multi-type structured data',
        'Google Search Console and Google Analytics integration',
        'Built-in 404 error monitor and automated 301/302 redirect engine',
        'Automated image SEO with dynamic alt and title tag generation',
        'Comprehensive WooCommerce and local SEO configuration modules',
      ],
    affiliateUrl: '#',
    iconEmoji: '📈',
  },
  {
    slug: 'ahrefs',
    name: 'Ahrefs',
    category: 'SEO Tools',
    isOwnProduct: false,
    rating: 4.5,
    verdict: 'Industry-standard SEO toolset for backlink intel and site auditing.',
    description:
      'Ahrefs is a premier search marketing platform known for its deep backlink index and competitive intelligence tooling. It helps agencies and website operators conduct keyword discovery, audit technical SEO flaws, and track rankings against competitors.',
    pricing: 'From $99/mo',
    pros:
      [
        'Industry-leading backlink index with dependable link freshness',
        'Deep SERP history breakdowns and organic keyword traffic estimates',
        'Cloud-based Site Audit crawler that uncovers deep technical crawling errors',
        'Granular keyword difficulty metrics and estimated click volume analysis',
      ],
    cons:
      [
        'Credit-based usage quota can deplete quickly on large research tasks',
        'Base subscription pricing represents a notable investment for early-stage sites',
      ],
    features:
      [
        'Site Explorer with comprehensive backlink profile and domain metrics',
        'Keywords Explorer covering search intent and click distribution',
        'Cloud-based technical Site Audit with automated issue flags',
        'Content Explorer to identify high-performing competitor editorial pieces',
        'Rank Tracker for monitoring keyword visibility across mobile and desktop',
      ],
    affiliateUrl: '#',
    iconEmoji: '🔍',
  },
  {
    slug: 'wp-rocket',
    name: 'WP Rocket',
    category: 'Speed & Performance',
    isOwnProduct: false,
    rating: 4,
    verdict: 'Plug-and-play WordPress caching suite delivering instant speed improvements.',
    description:
      'WP Rocket is a performance optimization plugin for WordPress that applies caching and speed best practices immediately upon setup. It automates page caching, JavaScript delay, unused CSS removal, and media lazy loading to boost Core Web Vitals scores.',
    pricing: 'From $59/yr',
    pros:
      [
        'Effortless setup that delivers immediate Core Web Vitals improvements',
        'Powerful JavaScript execution delay feature that resolves INP issues',
        'Seamless compatibility with major hosting providers and page builders',
        'Regular updates that track WordPress core optimization standards',
      ],
    cons:
      [
        'Does not provide a free tier or free trial',
        'Aggressive CSS and JS minification can occasionally require manual exclusions',
      ],
    features:
      [
        'Automated page caching and browser cache expiration headers',
        'JavaScript execution delay until explicit user interaction',
        'Automated unused CSS removal and critical path CSS generation',
        'Native lazy loading for images, videos, and embedded iframes',
        'Database table cleanup and transient optimization scheduler',
      ],
    affiliateUrl: '#',
    iconEmoji: '🚀',
  },
  {
    slug: 'plausible-analytics',
    name: 'Plausible Analytics',
    category: 'Analytics',
    isOwnProduct: false,
    rating: 4.5,
    verdict: 'Lightweight, cookie-free web analytics without privacy or GDPR headaches.',
    description:
      'Plausible Analytics is an open-source, privacy-first alternative to Google Analytics that tracks essential metrics without invasive cookies. Its lightweight script is under 1KB, ensuring zero performance drag on your Core Web Vitals while staying fully compliant with GDPR and CCPA.',
    pricing: 'From $9/mo',
    pros:
      [
        'Ultra-lightweight script weighing under 1KB for zero page speed impact',
        'Fully compliant with GDPR, CCPA, and PECR without requiring cookie banners',
        'Clear single-page dashboard showing crucial traffic and conversion metrics',
        'Straightforward custom event and conversion goal setup',
      ],
    cons:
      [
        'Lacks complex multi-touch attribution modeling found in enterprise analytics',
        'No permanent free plan once the 30-day trial expires',
      ],
    features:
      [
        'Cookieless tracking with complete user privacy respect',
        'Under 1KB script for imperceptible page load overhead',
        'Intuitive dashboard highlighting referral sources and top pages',
        'Goal tracking and custom event funnels for conversion tracking',
        'Public dashboard sharing and scheduled email report digests',
      ],
    affiliateUrl: '#',
    iconEmoji: '📊',
  },
];
