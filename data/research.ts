export interface ResearchStudy {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  sampleSize: string;
  date: string;
  readTime: string;
  keyFindings: string[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  methodology: string;
  featured: boolean;
}

export const RESEARCH_STUDIES: ResearchStudy[] = [
  {
    slug: 'website-performance-report',
    title: 'The State of WordPress Performance 2026: We Analyzed 500 Production Websites',
    subtitle: 'An empirical teardown of mobile Core Web Vitals, page weight, DOM depth, and cache hit ratios across top content and e-commerce websites.',
    summary: 'Our engineering lab audited 500 active WordPress domains across varying traffic tiers to measure real-world performance, plugin weight, and mobile Largest Contentful Paint compliance.',
    sampleSize: '500 active production domains',
    date: 'March 2026',
    readTime: '14 min read',
    featured: true,
    keyFindings: [
      '68% of audited WordPress sites fail mobile Largest Contentful Paint (LCP > 2.5s).',
      'The average WordPress site ships 1.8MB of JavaScript, with 62% marked as unexecuted during initial viewport render.',
      'Sites using native block themes (GeneratePress, Kadence) scored 3.4x higher on mobile Core Web Vitals than legacy drag-and-drop page builders.',
      'Sites with server-level edge HTML caching achieved an average TTFB of 145ms versus 620ms on shared hosting.',
    ],
    metrics: [
      { label: 'Mobile LCP Pass Rate', value: '32%', description: 'Only 160 of 500 sites met Google-s 2.5s threshold' },
      { label: 'Average Mobile Page Weight', value: '3.4MB', description: 'Driven primarily by uncompressed PNGs and third-party tracking scripts' },
      { label: 'Average Server TTFB', value: '380ms', description: 'Measured globally across 8 geographic testing regions' },
      { label: 'Average DOM Element Count', value: '1,420', description: 'Excessive DIV wrapping was prevalent in visual page builders' },
    ],
    methodology: 'All 500 URLs were crawled using headless Chromium instances emulating a mid-tier mobile device (Moto G4 on a simulated 4G connection) following W3C Navigation Timing standards.',
  },
  {
    slug: 'agency-websites-study',
    title: '100 Agency Websites: What Their Homepages Get Wrong About Speed and SEO',
    subtitle: 'We audited the websites of 100 digital agencies to uncover how their own technical performance impacts client acquisition.',
    summary: 'Web development and marketing agencies sell speed and optimization services, but how do their own websites hold up? We inspected 100 agency homepages to measure performance flaws.',
    sampleSize: '100 digital agency homepages',
    date: 'February 2026',
    readTime: '11 min read',
    featured: true,
    keyFindings: [
      '74% of agency homepages load autoplay background video that adds over 6MB to initial mobile payloads.',
      '52% of agency sites lack proper Schema.org Organization structured data linking their service catalog.',
      'Agencies with sub-1.5s mobile load times demonstrated a 40% higher average domain authority and stronger organic search footprints.',
      'Heavy animation libraries (GSAP, Locomotive Scroll, Three.js) were loaded globally on 44% of homepages, causing high Interaction to Next Paint (INP) latency.',
    ],
    metrics: [
      { label: 'Autoplay Video Rate', value: '74%', description: 'Unnecessarily inflates mobile data consumption' },
      { label: 'Valid Schema Entities', value: '48%', description: 'Over half failed basic structured data validation' },
      { label: 'Average Hero Weight', value: '4.2MB', description: 'Hero imagery was rarely optimized to WebP or AVIF' },
      { label: 'Average INP Latency', value: '240ms', description: 'Script execution delayed click responsiveness' },
    ],
    methodology: 'A randomized cohort of 100 agencies across the US and Europe were audited for performance, accessibility, SEO metadata, and Core Web Vitals.',
  },
  {
    slug: 'ai-search-readiness',
    title: 'AI Search Readiness Study: How AI Crawlers Parse Technical Content',
    subtitle: 'An empirical investigation into GPTBot, PerplexityBot, and ClaudeBot crawling behavior across 200 technical articles.',
    summary: 'Generative search engines are changing discovery. We monitored crawler visits and citation patterns across 200 published technical documents to discover what drives AI citability.',
    sampleSize: '200 technical publishing URLs',
    date: 'January 2026',
    readTime: '12 min read',
    featured: false,
    keyFindings: [
      'Articles with explicit llms.txt declarations were indexed by AI crawlers within 48 hours of publication.',
      'Passages structured as factual claim sentences followed by numerical data were extracted 4.1x more frequently in answer citations.',
      'Excessive JavaScript hydration blocked full text extraction for 38% of AI crawler requests that do not execute client-side scripts.',
    ],
    metrics: [
      { label: 'Citation Rate Lift', value: '4.1x', description: 'For claim-evidence-source structured content' },
      { label: 'Crawl Frequency', value: 'Every 3 Days', description: 'Average recrawl cycle for high-authority technical domains' },
      { label: 'Text Extraction Success', value: '62%', description: 'Failed on heavy client-side rendered Single Page Applications' },
    ],
    methodology: 'Server access logs from 10 high-traffic domains were analyzed over a 90-day window, tracking user-agent patterns for GPTBot, PerplexityBot, and ClaudeBot.',
  },
  {
    slug: 'javascript-payload-study',
    title: 'How Much JavaScript Do SaaS Websites Actually Ship?',
    subtitle: 'Benchmarking 250 B2B SaaS marketing homepages for script execution time, tracking pixel bloat, and hydration overhead.',
    summary: 'Modern SaaS marketing pages are increasingly built like full web apps, shipping megabytes of client-side code for simple static copy. We measured the real impact on user experience.',
    sampleSize: '250 B2B SaaS marketing homepages',
    date: 'January 2026',
    readTime: '9 min read',
    featured: false,
    keyFindings: [
      'The median B2B SaaS homepage executes 2.4MB of JavaScript before user interaction.',
      'Third-party marketing tags (HubSpot, Intercom, Segment, Google Tag Manager) accounted for 64% of total main-thread blocking time.',
      'Static-generated sites (Next.js SSG, Astro) loaded 3.1x faster than client-rendered SPAs.',
    ],
    metrics: [
      { label: 'Median Script Size', value: '2.4MB', description: 'JavaScript code transferred over wire' },
      { label: 'Third-Party Share', value: '64%', description: 'Percentage of main thread consumed by marketing pixels' },
      { label: 'Main Thread Block', value: '820ms', description: 'Average total blocking time on mobile hardware' },
    ],
    methodology: 'Automated Chrome DevTools Protocol tracing measured script parse, compile, and evaluation times across 250 top SaaS marketing domains.',
  },
];
