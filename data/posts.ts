export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '5-best-wordpress-speed-plugins-2026',
    title: '5 Best WordPress Speed Plugins in 2026',
    excerpt:
      'Speed optimization in WordPress often suffers from plugin bloat and conflicting cache layers. We tested the leading performance plugins to see which tools actually improve Core Web Vitals without breaking your layouts.',
    category: 'Speed & Performance',
    date: '2026-03-10',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'cloudways-vs-siteground-which-host-loads-faster',
    title: 'Cloudways vs SiteGround: Which Host Loads Faster?',
    excerpt:
      'Hosting architecture directly impacts your Time to First Byte and server responsiveness under load. We deployed identical test setups on Cloudways and SiteGround to measure real-world performance under heavy traffic.',
    category: 'Hosting',
    date: '2026-02-28',
    readTime: '12 min read',
    featured: true,
  },
  {
    slug: 'how-to-score-100-on-pagespeed-without-breaking-your-site',
    title: 'How to Score 100 on PageSpeed Without Breaking Your Site',
    excerpt:
      'Striving for a perfect PageSpeed score often tempts developers to disable crucial analytics and tracking scripts. Here is a battle-tested approach to hitting green metrics while keeping your conversion tracking intact.',
    category: 'Speed & Performance',
    date: '2026-02-18',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'rank-math-vs-yoast-definitive-seo-plugin-comparison',
    title: 'Rank Math vs Yoast: The Definitive SEO Plugin Comparison',
    excerpt:
      'Selecting an SEO plugin determines how cleanly your WordPress site structures schema markup and metadata. We compare Rank Math and Yoast across page weight, schema flexibility, and indexing controls to find the best fit.',
    category: 'SEO Tools',
    date: '2026-02-05',
    readTime: '10 min read',
    featured: true,
  },
  {
    slug: 'why-your-lcp-score-tanks-on-mobile-how-to-fix-it',
    title: 'Why Your LCP Score Tanks on Mobile (and How to Fix It)',
    excerpt:
      'Largest Contentful Paint failures on mobile are almost always caused by oversized hero media or deferred critical CSS. Learn how to diagnose mobile-specific rendering bottlenecks and fix them before they harm search rankings.',
    category: 'Core Web Vitals',
    date: '2026-01-24',
    readTime: '7 min read',
    featured: false,
  },
  {
    slug: 'the-agency-guide-to-white-label-website-audits',
    title: 'The Agency Guide to White-Label Website Audits',
    excerpt:
      'Prospects rarely read generic 50-page automated PDF audit reports sent by cold outreach. Learn how top web agencies use targeted proof-of-flaw audit tear sheets to close high-value optimization retainers.',
    category: 'Agency Growth',
    date: '2026-01-12',
    readTime: '9 min read',
    featured: false,
  },
];
