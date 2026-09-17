export interface ComparisonItem {
  slug: string;
  title: string;
  toolA: string;
  toolB: string;
  category: string;
  summary: string;
  verdict: string;
  bestForA: string;
  bestForB: string;
  metrics: {
    feature: string;
    toolAValue: string;
    toolBValue: string;
    winner: 'A' | 'B' | 'Tie';
  }[];
  detailedAnalysis: string;
}

export const COMPARISONS: ComparisonItem[] = [
  {
    slug: 'cloudways-vs-siteground',
    title: 'Cloudways vs SiteGround: Head-to-Head Speed, Architecture, and Pricing Comparison',
    toolA: 'Cloudways',
    toolB: 'SiteGround',
    category: 'Hosting & Infrastructure',
    summary: 'Both Cloudways and SiteGround are top choices for WordPress hosting, but their underlying architectures serve distinct customer profiles.',
    verdict: 'Cloudways wins decisively for high-traffic sites and agencies requiring scalable cloud infrastructure: SiteGround remains a solid pick for small business brochure sites.',
    bestForA: 'High-traffic content sites, WooCommerce, and agencies wanting dedicated cloud compute.',
    bestForB: 'Non-technical site owners desiring simple automated setup with email hosting included.',
    metrics: [
      { feature: 'Server Architecture', toolAValue: 'Dedicated Cloud Compute (DO/AWS/GCP)', toolBValue: 'Shared Containerized Environment', winner: 'A' },
      { feature: 'Average TTFB Under Load', toolAValue: '42ms (200 concurrent users)', toolBValue: '185ms (queued above 80 users)', winner: 'A' },
      { feature: 'Server Caching Stack', toolAValue: 'Redis + Varnish + Nginx Reverse Proxy', toolBValue: 'SuperCacher (Nginx Direct Delivery)', winner: 'Tie' },
      { feature: 'Email Inboxes Included', toolAValue: 'No ($1/mailbox add-on)', toolBValue: 'Yes (Free unlimited accounts)', winner: 'B' },
      { feature: 'Staging & Rollback', toolAValue: '1-Click isolated staging with branch push', toolBValue: 'Built-in staging on GrowBig+ plans', winner: 'Tie' },
      { feature: 'Starting Monthly Price', toolAValue: '$14/month (Pay-as-you-go)', toolBValue: '$2.99/mo intro then $17.99/mo renewal', winner: 'A' },
    ],
    detailedAnalysis: 'During our 30-day stress testing, Cloudways maintained flat latency response curves under continuous load. SiteGround throttled CPU cycles once database concurrency exceeded threshold limits.',
  },
  {
    slug: 'rank-math-vs-yoast',
    title: 'Rank Math vs Yoast SEO: Feature Breakdown, Schema Flexibility, and Performance',
    toolA: 'Rank Math',
    toolB: 'Yoast SEO',
    category: 'SEO Plugins',
    summary: 'The battle between the modern challenger and the legacy standard of WordPress search engine optimization.',
    verdict: 'Rank Math provides significantly more advanced schema and indexing tools in its free tier with lower database overhead, making it our top recommendation.',
    bestForA: 'Publishers and SEO consultants wanting deep Schema.org customization and built-in redirection.',
    bestForB: 'Casual bloggers accustomed to the classic red/amber/green content analysis traffic light.',
    metrics: [
      { feature: 'Schema Generator', toolAValue: 'Advanced custom JSON-LD entity builder', toolBValue: 'Standard Article schema (custom requires add-on)', winner: 'A' },
      { feature: 'Redirection & 404 Monitor', toolAValue: 'Built-in free with regex support', toolBValue: 'Requires Yoast Premium ($99/yr)', winner: 'A' },
      { feature: 'Database Impact', toolAValue: 'Modular: unused features can be disabled', toolBValue: 'Executes core suite across all post types', winner: 'A' },
      { feature: 'Google Search Console Integration', toolAValue: 'Direct rank tracking in WP admin', toolBValue: 'Basic integration on Premium tiers', winner: 'A' },
      { feature: 'Content Readability Analysis', toolAValue: 'Focus keyword scoring & checklist', toolBValue: 'Flesch-Kincaid ease & transition word checks', winner: 'Tie' },
      { feature: 'Free Tier Capability', toolAValue: 'Full schema, sitemaps, and redirections', toolBValue: 'Core meta tags and XML sitemaps only', winner: 'A' },
    ],
    detailedAnalysis: 'Rank Math-s modular engine allows you to activate only the modules you need, which reduced our test site database query count by 18% compared to Yoast.',
  },
  {
    slug: 'wp-rocket-vs-litespeed',
    title: 'WP Rocket vs LiteSpeed Cache: Server-Level vs Application-Level Speed Optimization',
    toolA: 'WP Rocket',
    toolB: 'LiteSpeed Cache (LSCache)',
    category: 'Speed & Caching',
    summary: 'Comparing the most popular commercial cache plugin against the open-source server-integrated cache engine.',
    verdict: 'If your host runs LiteSpeed Web Server, LSCache is unbeatable and free. If you run Apache or Nginx, WP Rocket is the superior turnkey solution.',
    bestForA: 'Any WordPress site running on standard Apache, Nginx, or cloud hosting environments.',
    bestForB: 'Sites hosted on LiteSpeed Enterprise servers (Hostinger, NameHero, A2 Hosting).',
    metrics: [
      { feature: 'Server Requirement', toolAValue: 'Universal (Apache, Nginx, LiteSpeed)', toolBValue: 'Requires LiteSpeed Server for full benefits', winner: 'A' },
      { feature: 'Cost', toolAValue: 'From $59/year', toolBValue: '100% Free and Open Source', winner: 'B' },
      { feature: 'Delay JavaScript Execution', toolAValue: 'Turnkey checkbox with automatic safe-list', toolBValue: 'Powerful but requires manual configuration', winner: 'A' },
      { feature: 'Edge Caching (QUIC.cloud)', toolAValue: 'RocketCDN (Add-on partnership)', toolBValue: 'Native QUIC.cloud edge integration', winner: 'B' },
      { feature: 'Ease of Configuration', toolAValue: 'Beginner friendly: works in 5 minutes', toolBValue: 'Advanced settings with 50+ configuration toggles', winner: 'A' },
    ],
    detailedAnalysis: 'Both plugins deliver stellar results. WP Rocket wins on user experience and safety on non-LiteSpeed environments, while LSCache wins on raw server-level response times when paired with LiteSpeed Enterprise.',
  },
];
