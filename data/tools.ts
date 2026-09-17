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
    id: 'page-weight',
    name: 'Page Weight & DOM Checker',
    tier: 'Free',
    tagline: 'Inspect uncompressed HTML weight against Google’s 50KB mobile ceiling',
    description: 'Diagnoses excessive container nesting and measures raw transfer size to reveal why mobile devices struggle to render your pages.',
    features: ['HTML payload byte counter', 'DOM tree depth measurement', 'Excessive div wrapper detection', 'Immediate optimization checklist'],
    href: '/free-audit-report?tool=page-weight',
    ctaText: 'Check Page Weight',
  },
  {
    id: 'seo-checker',
    name: 'SEO & Metadata Inspector',
    tier: 'Free',
    tagline: 'Verify titles, meta tags, and OpenGraph social previews',
    description: 'Checks essential on-page technical SEO elements, character limits, canonical URLs, and mobile viewport configurations.',
    features: ['Title tag length validation', 'OpenGraph card previews', 'Robots.txt & indexability flag check', 'Heading hierarchy analysis'],
    href: '/free-audit-report?tool=seo',
    ctaText: 'Inspect SEO Tags',
  },
  {
    id: 'schema-validator',
    name: 'Schema & AI Knowledge Graph Validator',
    tier: 'Free',
    tagline: 'Test JSON-LD schemas for ChatGPT, Perplexity, and Google Rich Results',
    description: 'Confirms whether your website publishes valid Organization, Article, Product, or FAQ structured data needed for AI search citations.',
    features: ['JSON-LD syntax verification', 'Knowledge Graph entity check', 'AI search citability assessment', 'Missing property alerts'],
    href: '/free-audit-report?tool=schema',
    badge: 'New',
    ctaText: 'Validate Schema',
  },
];

export const PRO_TOOLS: WebTool[] = [
  {
    id: 'vitalssniper-pro',
    name: 'VitalsSniper PRO',
    tier: 'Pro',
    tagline: 'The proof-of-flaw browser extension that closes $3,000+ speed retainers',
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
    badge: 'Flagship Tool',
    ctaText: 'Explore VitalsSniper PRO ($39)',
  },
  {
    id: 'white-label-reports',
    name: 'Executive White-Label PDF Engine',
    tier: 'Pro',
    tagline: 'Automated 1-page forensic audits stamped with your agency branding',
    description: 'Generates non-technical, visual teardowns customized with your agency logo, lead auditor name, and direct booking link.',
    features: ['Custom agency logo & auditor name', 'Visual health dial & metric comparisons', 'Direct Calendly call-to-action button', 'Print-ready vector PDF rendering'],
    href: '/vitalssniper#deliverables',
    ctaText: 'Learn More',
  },
  {
    id: 'lead-pipeline-crm',
    name: 'Agency Outbound CRM & CSV Exporter',
    tier: 'Pro',
    tagline: 'Organize audited prospects and export cold outreach lists',
    description: 'Save prospective clients while browsing the web and export clean CSV datasets formatted for cold email tools.',
    features: ['1-Click lead saving in browser storage', 'Pre-written personalized killer-hooks', 'RFC-4180 compliant CSV export', 'Ready for Instantly, Lemlist, and HubSpot'],
    href: '/vitalssniper#deliverables',
    ctaText: 'View CRM Features',
  },
];
