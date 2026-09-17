export interface DatasetRegistry {
  id: string;
  name: string;
  sampleSize: string;
  dateRange: string;
  selectionMethod: string;
  primaryPurpose: string;
}

export const RESEARCH_DATASETS: DatasetRegistry[] = [
  {
    id: 'dataset-100-agencies',
    name: 'Dataset A: 100-Agency Website Forensic Audit',
    sampleSize: '100 digital agency homepages',
    dateRange: 'Q1 2026 (January 15 - February 20, 2026)',
    selectionMethod: 'Randomized sample drawn from Clutch and Awwwards agency directories across the United States and Western Europe.',
    primaryPurpose: 'Forensic evaluation of agency homepage technical hygiene, mobile video payloads, and Core Web Vitals.',
  },
  {
    id: 'dataset-500-wordpress',
    name: 'Dataset B: 500-Site WordPress Performance Benchmark',
    sampleSize: '500 active WordPress domains',
    dateRange: 'Q1-Q2 2026 (February 1 - March 10, 2026)',
    selectionMethod: 'Stratified sample across e-commerce (WooCommerce), editorial publications, and business websites with measurable organic traffic.',
    primaryPurpose: 'Comparative benchmarking of block themes vs legacy page builders, edge HTML caching vs standard hosting, and script execution weight.',
  },
  {
    id: 'product-telemetry-10k',
    name: 'Telemetry Base: 10,000+ Cumulative Diagnostic Scans',
    sampleSize: '10,000+ cumulative URL inspections',
    dateRange: 'Continuous (November 2025 - Present)',
    selectionMethod: 'Synthetic regression suites and active tab scans run across VitalsSniper PRO engine dogfooding and automated test runs.',
    primaryPurpose: 'Validating DOM parsing speed, LCP highlighter accuracy, and client-side inspection stability across diverse layouts.',
  },
];

export interface ResearchStudy {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  sampleSize: string;
  datasetId: string;
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
    title: 'The State of WordPress Performance 2026: 500-Site Empirical Benchmark',
    subtitle: 'An empirical teardown of mobile Core Web Vitals, page weight, DOM depth, and cache hit ratios across production websites.',
    summary: 'Our engineering lab audited 500 active WordPress domains across varying traffic tiers to measure real-world performance, plugin weight, and mobile Largest Contentful Paint compliance.',
    sampleSize: '500 active production domains',
    datasetId: 'dataset-500-wordpress',
    date: 'March 2026',
    readTime: '14 min read',
    featured: true,
    keyFindings: [
      '68% of audited WordPress sites in our sample did not meet Google-s mobile Largest Contentful Paint target (LCP <= 2.5s).',
      'The median WordPress site in our cohort shipped 1.8MB of JavaScript, with 62% marked as unexecuted during initial viewport render.',
      'Sites built on lightweight native block themes (GeneratePress, Kadence) averaged significantly lower mobile LCP times than those on legacy drag-and-drop builders.',
      'Sites configured with server-level edge HTML caching demonstrated an average TTFB of 145ms versus 620ms on standard shared hosting environments.',
    ],
    metrics: [
      { label: 'Mobile LCP Pass Rate', value: '32%', description: '160 of 500 sites met the 2.5s LCP threshold at the 75th percentile' },
      { label: 'Median Mobile Page Weight', value: '3.4MB', description: 'Driven primarily by uncompressed media and third-party marketing pixels' },
      { label: 'Average Server TTFB', value: '380ms', description: 'Measured across 8 geographic testing regions' },
      { label: 'Average DOM Node Count', value: '1,420', description: 'Higher node counts correlated with complex visual page builders' },
    ],
    methodology: 'All 500 URLs were crawled using headless Chromium instances emulating a mid-tier mobile profile (Moto G4 on a simulated 4G network) following W3C Navigation Timing standards. Results represent multiple runs with warm and cold cache states.',
  },
  {
    slug: 'agency-websites-study',
    title: '100 Agency Websites: What Their Homepages Reveal About Speed and SEO',
    subtitle: 'We audited 100 digital agency homepages to document real-world performance bottlenecks and structured data adoption.',
    summary: 'Web development and marketing agencies sell speed and optimization services, but how do their own websites perform? We inspected 100 agency homepages to measure common performance patterns.',
    sampleSize: '100 digital agency homepages',
    datasetId: 'dataset-100-agencies',
    date: 'February 2026',
    readTime: '11 min read',
    featured: true,
    keyFindings: [
      '74% of agency homepages in our cohort loaded background video, adding an average of 4.2MB to initial mobile payloads.',
      '52% of agency sites lacked complete Schema.org Organization structured data linking their services and entity identifiers.',
      'In our sample, agencies with sub-1.5s mobile load times also showed a 40% higher average domain rating, correlating with more active technical maintenance.',
      'Heavy animation scripts (GSAP, Locomotive Scroll, Three.js) were loaded globally on 44% of homepages, contributing to higher Interaction to Next Paint (INP) latency on low-end test devices.',
    ],
    metrics: [
      { label: 'Autoplay Video Rate', value: '74%', description: 'Observed on 74 of 100 analyzed homepages' },
      { label: 'Valid Schema Entities', value: '48%', description: '48 sites contained validated Organization JSON-LD markup' },
      { label: 'Average Hero Weight', value: '4.2MB', description: 'Initial visual assets were frequently uncompressed' },
      { label: 'Average INP Latency', value: '240ms', description: 'Measured on simulated mobile interaction events' },
    ],
    methodology: 'A randomized cohort of 100 agencies across the US and Western Europe was audited for Core Web Vitals, accessibility, SEO metadata, and resource breakdown using Chrome DevTools Protocol.',
  },
  {
    slug: 'ai-search-readiness',
    title: 'AI Search Readiness Study: How AI Crawlers Parse Technical Content',
    subtitle: 'Observational research examining GPTBot, PerplexityBot, and ClaudeBot crawling behavior across 200 technical documents.',
    summary: 'Generative search engines and AI assistants are introducing new discovery patterns. We monitored server access logs and citation behavior across 200 technical articles to understand machine readability.',
    sampleSize: '200 technical publishing URLs',
    datasetId: 'product-telemetry-10k',
    date: 'January 2026',
    readTime: '12 min read',
    featured: false,
    keyFindings: [
      'Articles with explicit llms.txt declarations were observed being crawled by AI bots within 48 hours in our monitored access logs.',
      'Passages structured with concise factual claims followed by specific data points were cited more frequently in our synthetic answer retrieval tests.',
      'Client-side JavaScript rendering without server-rendered HTML resulted in incomplete text extraction for AI crawlers that do not execute full browser scripts.',
    ],
    metrics: [
      { label: 'Observed Citation Lift', value: '3.8x', description: 'For claim-and-evidence structured technical passages in test prompts' },
      { label: 'Average Recrawl Window', value: '3-5 Days', description: 'Observed recrawl cycle for actively updated technical domains' },
      { label: 'Static HTML Read Rate', value: '98%', description: 'Static crawlable HTML achieved the highest parsing reliability' },
    ],
    methodology: 'Monitored server access logs from 10 high-traffic technical publishing domains over a 90-day period, filtering for verified AI crawler user-agents (GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot). Note: llms.txt remains an emerging specification and does not guarantee ranking or citations.',
  },
  {
    slug: 'javascript-payload-study',
    title: 'How Much JavaScript Do SaaS Websites Actually Ship?',
    subtitle: 'Benchmarking 250 B2B SaaS marketing homepages for script execution time, tracking pixel bloat, and hydration overhead.',
    summary: 'Modern SaaS marketing pages are increasingly built like full web apps, shipping megabytes of client-side code for simple static copy. We measured the real impact on user experience.',
    sampleSize: '250 B2B SaaS marketing homepages',
    datasetId: 'dataset-500-wordpress',
    date: 'January 2026',
    readTime: '9 min read',
    featured: false,
    keyFindings: [
      'The median B2B SaaS homepage in our sample executed 2.4MB of JavaScript before user interaction.',
      'Third-party marketing tags (chat widgets, tag managers, analytics) accounted for an average of 64% of total main-thread blocking time.',
      'Static-generated marketing sites (Next.js SSG, Astro) loaded significantly faster than client-rendered SPAs on mobile network profiles.',
    ],
    metrics: [
      { label: 'Median Script Payload', value: '2.4MB', description: 'JavaScript code transferred over wire' },
      { label: 'Third-Party Tag Share', value: '64%', description: 'Share of main thread execution consumed by tracking tags' },
      { label: 'Average Blocking Time', value: '820ms', description: 'Total blocking time recorded on simulated mobile hardware' },
    ],
    methodology: 'Automated Chrome DevTools Protocol tracing measured script parse, compile, and evaluation times across 250 SaaS marketing domains under controlled network emulation.',
  },
];
