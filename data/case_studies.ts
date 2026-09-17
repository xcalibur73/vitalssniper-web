export interface TeardownFinding {
  metric: string;
  percentage: number;
  label: string;
  problem: string;
  impact: string;
  remediation: string;
}

export const CASE_STUDY_100_SITES: {
  title: string;
  subtitle: string;
  sampleSize: number;
  date: string;
  summary: string;
  findings: TeardownFinding[];
} = {
  title: 'What We Found: The 100-Website Forensic Performance Audit',
  subtitle: 'We crawled and audited 100 live business websites across WordPress, Shopify, Webflow, and Squarespace. Here are the 4 flaws sabotaging user experience and search rankings.',
  sampleSize: 100,
  date: 'Q1 2026',
  summary: 'Over 82% of audited websites failed mobile Core Web Vitals, despite 74% having acceptable desktop scores. The failures were overwhelmingly caused by unoptimized hero assets and container bloat.',
  findings: [
    {
      metric: '82%',
      percentage: 82,
      label: 'Excessive DOM Nesting',
      problem: 'DOM elements exceeded 1,400 nodes due to nested page builder div wrappers (Elementor, Divi, WPBakery).',
      impact: 'Severely increases style calculation times and main-thread execution, causing sluggish scrolling on mobile phones.',
      remediation: 'Migrate to lightweight block architectures (GenerateBlocks, Kadence) or eliminate empty container wrappers.',
    },
    {
      metric: '74%',
      percentage: 74,
      label: 'Cellular Payload Over Budget',
      problem: 'Mobile HTML/CSS transfer payload exceeded Google’s 50KB mobile cellular ceiling, with average payload reaching 184KB.',
      impact: 'Drastically increases Time to First Byte (TTFB) and causes First Contentful Paint delays on 4G cellular connections.',
      remediation: 'Purge unused CSS, inline critical above-the-fold styling, and enable server-level Brotli compression.',
    },
    {
      metric: '69%',
      percentage: 69,
      label: 'Unoptimized LCP Hero Images',
      problem: 'Hero images lacked fetchpriority="high", used uncompressed JPEG/PNG instead of WebP/AVIF, or were lazy-loaded incorrectly.',
      impact: 'Postpones Largest Contentful Paint beyond 4.2 seconds, directly triggering a failing Google CWV signal.',
      remediation: 'Preload the primary LCP hero image, set explicit width/height dimensions, and serve modern WebP under 120KB.',
    },
    {
      metric: '61%',
      percentage: 61,
      label: 'Missing Knowledge Graph Schema',
      problem: 'Websites lacked structured JSON-LD schemas or used incomplete Schema.org templates without Organization entities.',
      impact: 'Ineligible for rich search results and invisible to semantic AI search engines like ChatGPT Search and Perplexity.',
      remediation: 'Implement verified Schema.org JSON-LD templates linking publisher identity, author E-E-A-T, and primary entity definitions.',
    },
  ],
};
