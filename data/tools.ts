export interface WebTool {
  id: string;
  name: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  tagline: string;
  description: string;
  features: string[];
  href: string;
  isExternal?: boolean;
  badge?: string;
  ctaText: string;
}

export const FREE_TOOLS: WebTool[] = [
  {
    id: 'free-audit',
    name: 'Free Website Audit',
    tier: 'Free',
    tagline: 'Instant 50ms forensic website speed and flaw detector',
    description: 'Scans live websites directly from your browser to uncover hidden DOM bloat, identify CMS frameworks, and verify cellular payload budgets.',
    features: ['50ms client-side execution', 'DOM element count & nesting check', 'CMS & page builder detection', 'Cellular payload budget test'],
    href: '/free-audit-report',
    badge: 'Popular',
    ctaText: 'Run Free Audit',
  },
  {
    id: 'seo-checker',
    name: 'SEO Checker',
    tier: 'Free',
    tagline: 'Basic SEO analysis, title lengths, and indexing verification',
    description: 'Audits essential technical SEO signals: title tags, meta descriptions, canonical targets, robots directives, and heading structures.',
    features: ['Title tag length validation', 'Robots.txt & meta robots flags', 'H1 through H3 hierarchy check', 'Canonical URL consistency test'],
    href: '/free-audit-report?tool=seo',
    badge: 'Essential',
    ctaText: 'Run SEO Checker',
  },
  {
    id: 'page-weight-checker',
    name: 'Page Weight Checker',
    tier: 'Free',
    tagline: 'Inspect uncompressed HTML weight against Google 50KB mobile ceiling',
    description: 'Diagnoses excessive container nesting and measures raw transfer size to reveal why mobile devices struggle to render your pages.',
    features: ['HTML payload byte counter', 'DOM tree depth measurement', 'Excessive div wrapper detection', 'Immediate optimization checklist'],
    href: '/free-audit-report?tool=page-weight',
    ctaText: 'Check Page Weight',
  },
  {
    id: 'meta-tag-checker',
    name: 'Meta Tag Checker',
    tier: 'Free',
    tagline: 'Verify OpenGraph cards, Twitter cards, and social preview metadata',
    description: 'Preview exactly how your URLs display when shared on LinkedIn, X/Twitter, Slack, and Facebook before launching campaigns.',
    features: ['OpenGraph image & title check', 'Twitter card preview simulator', 'Character limit warnings', 'Missing tag notifications'],
    href: '/free-audit-report?tool=meta',
    ctaText: 'Inspect Meta Tags',
  },
  {
    id: 'schema-checker',
    name: 'Schema Checker',
    tier: 'Free',
    tagline: 'Test JSON-LD schemas for ChatGPT, Perplexity, and Google Rich Results',
    description: 'Confirms whether your website publishes valid Organization, Article, Product, or FAQ structured data needed for AI search citations.',
    features: ['JSON-LD syntax verification', 'Knowledge Graph entity check', 'AI search citability assessment', 'Missing property alerts'],
    href: '/free-audit-report?tool=schema',
    badge: 'AI & GEO',
    ctaText: 'Validate Schema',
  },
];

export const PRO_TOOLS: WebTool[] = [
  {
    id: 'vitalssniper-pro',
    name: 'VitalsSniper PRO',
    tier: 'Pro',
    tagline: 'Website performance and opportunity analysis to close $3,000+ retainers',
    description: 'Inspect any prospect website live in your active browser tab. Highlights sabotaging LCP nodes, benchmarks competitors side-by-side, and generates white-label executive PDF teardowns.',
    features: [
      'Unlimited client-side tab inspections (<50ms)',
      'Live LCP visual element highlighter with pulsing overlay',
      'Head-to-head competitor comparison scorecard',
      'White-label PDF teardown with your Calendly booking CTA',
      '1-Click Lead CRM with RFC-4180 CSV export for Instantly/Lemlist',
      'Multi-channel outreach generator (Email, LinkedIn, 30s Loom)',
    ],
    href: '/vitalssniper',
    badge: 'Flagship Platform',
    ctaText: 'Get VitalsSniper PRO ($39)',
  },
  {
    id: 'client-audit-reports',
    name: 'Client Audit Reports',
    tier: 'Pro',
    tagline: 'Automated 1-page executive teardowns customized with your agency branding',
    description: 'Generates non-technical visual audits stamped with your agency logo, lead auditor name, and direct booking link to convert cold prospects into paid clients.',
    features: ['Custom agency logo & auditor name', 'Visual health dial & metric comparisons', 'Direct Calendly call-to-action button', 'Print-ready vector PDF rendering'],
    href: '/vitalssniper#deliverables',
    ctaText: 'View Report Engine',
  },
  {
    id: 'website-monitoring',
    name: 'Website Monitoring',
    tier: 'Pro',
    tagline: 'Scheduled Core Web Vitals checks and automated flaw regression alerts',
    description: 'Monitors client domains continuously for sudden performance drops, uncompressed media uploads, or broken third-party tag injections.',
    features: ['Automated weekly speed tracking', 'LCP regression email notifications', 'Historical performance charts', 'Client status reports'],
    href: '/dashboard',
    badge: 'Coming Soon',
    ctaText: 'Learn About Monitoring',
  },
  {
    id: 'agency-audit-platform',
    name: 'Agency Audit Platform',
    tier: 'Enterprise',
    tagline: 'Multi-seat team workflow with bulk domain scanning and CRM integrations',
    description: 'Equip your entire business development and developer team with shared prospect pipelines, automated outbound sequences, and API access.',
    features: ['Multi-seat license keys', 'Bulk domain scanning API', 'HubSpot & webhook integrations', 'Custom agency domain white-labeling'],
    href: '/pricing',
    ctaText: 'Explore Agency Tier',
  },
];
