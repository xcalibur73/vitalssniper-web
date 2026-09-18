export interface TeardownStudy {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  targetType: string;
  date: string;
  lcpScore: string;
  domElements: number;
  totalWeight: string;
  seoFinding: string;
  uxObservation: string;
  recommendations: string[];
  vitalsSniperProof: string;
}

export const TEARDOWNS: TeardownStudy[] = [
  {
    id: '#027',
    slug: 'website-teardown-027',
    title: 'Website Teardown #027: Why This 7-Figure E-Commerce Store Has a 4.8s Mobile LCP',
    metaTitle: 'Teardown #027: E-Commerce 4.8s Mobile LCP | Web Audits',
    metaDescription: 'Forensic teardown of a 7-figure Shopify store with 4.8s mobile LCP caused by carousel slider CSS background-image loading and render-blocking scripts.',
    targetType: 'Direct-to-Consumer Apparel Store (Shopify)',
    date: 'March 2026',
    lcpScore: '4.8s (Failed)',
    domElements: 2450,
    totalWeight: '6.2MB',
    seoFinding: 'Hero image lacked explicit fetchpriority="high" and was loaded via CSS background-image inside a nested carousel slider, preventing browser preloading.',
    uxObservation: 'Mobile visitors experience a blank white hero area for nearly 5 seconds while 14 third-party review and tracking scripts block main-thread execution.',
    recommendations: [
      'Refactor hero carousel into a native HTML picture element with high fetch priority.',
      'Defer non-essential marketing tags (Hotjar, TikTok Pixel) until after primary content hydration.',
      'Convert 2.8MB PNG product imagery to compressed WebP format, reducing weight by 75%.',
    ],
    vitalsSniperProof: 'VitalsSniper PRO isolated the exact DOM node (.hero-carousel-slide__bg) and flagged 1,240ms of unnecessary render delay in under 50ms.',
  },
  {
    id: '#028',
    slug: 'website-teardown-028',
    title: 'Website Teardown #028: Excessive DOM Depth and Script Execution in Enterprise SaaS',
    metaTitle: 'Teardown #028: DOM Depth in Enterprise SaaS | Web Audits',
    metaDescription: 'Forensic teardown of an enterprise SaaS site with 3,820 DOM nodes, 24 nested wrapper DIV levels, and mobile style recalculation latency issues.',
    targetType: 'B2B Enterprise Analytics Platform (Custom React/Next)',
    date: 'February 2026',
    lcpScore: '3.9s (Failed)',
    domElements: 3820,
    totalWeight: '4.8MB',
    seoFinding: 'Excessive DIV wrapping (nesting depth > 24 levels) correlated with elevated style recalculation penalties during mobile scroll interactions, contributing to high interaction latency.',
    uxObservation: 'Navigation menu triggers a visible 320ms frame freeze on mobile touch due to heavy unoptimized re-renders of the global mega-menu DOM tree.',
    recommendations: [
      'Flatten DOM layout hierarchy by removing redundant utility container wrappers.',
      'Code-split complex interactive pricing calculators so they only load when scrolled into view.',
      'Implement passive event listeners on global touch and scroll handlers.',
    ],
    vitalsSniperProof: 'VitalsSniper PRO surfaced DOM depth warnings and identified 8 unminified vendor bundles directly from the active Chromium browser tab.',
  },
  {
    id: '#001',
    slug: 'website-autopsy-001',
    title: 'Website Autopsy #001: A Full Mobile Performance Teardown',
    metaTitle: 'Teardown #001: Mobile Performance Teardown | Web Audits',
    metaDescription: 'Performance autopsy of a SaaS landing page with 5.4s mobile LCP, uncompressed 4.2MB video hero payload, and 18 unbundled tracking tags.',
    targetType: 'High-Growth SaaS Landing Page (Next.js / Tailwind)',
    date: 'March 2026',
    lcpScore: '5.4s (Failed)',
    domElements: 3410,
    totalWeight: '6.8MB',
    seoFinding: 'Video hero background (4.2MB MP4) was loaded eagerly without preload controls, starving bandwidth from the Largest Contentful Paint text node.',
    uxObservation: 'Mobile viewport froze for 410ms on initial scroll as 18 unbundled tracking tags executed simultaneously on the main thread.',
    recommendations: [
      'Replace autoplay video background with responsive static WebP poster on mobile viewports.',
      'Offload third-party tracking scripts to a web worker via Partytown or defer execution past initial input.',
      'Flatten 28 nested wrapper DIVs into a single CSS grid container.',
    ],
    vitalsSniperProof: 'VitalsSniper PRO surfaced 3,410 DOM elements, flagged the 4.2MB video payload, and exported a client proposal PDF card in under 50ms.',
  },
  {
    id: '#029',
    slug: 'website-teardown-029',
    title: 'Website Teardown #029: Why This High-Growth Shopify Brand Has a 5.1s Mobile LCP',
    metaTitle: 'Teardown #029: Shopify 5.1s Mobile LCP | Web Audits',
    metaDescription: 'Teardown of a DTC Shopify Plus brand with 5.1s mobile LCP caused by uncompressed hero images and 22 third-party Shopify app scripts.',
    targetType: 'Direct-to-Consumer Beauty Brand (Shopify Plus)',
    date: 'March 2026',
    lcpScore: '5.1s (Failed)',
    domElements: 2890,
    totalWeight: '5.4MB',
    seoFinding: 'High-resolution uncompressed JPEG hero (1.8MB) was loaded via CSS background-image in an app carousel without preload headers or fetchpriority="high", delaying mobile LCP by 2,400ms.',
    uxObservation: 'Mobile shoppers see a blank hero canvas for over 4 seconds while 22 third-party Shopify app scripts (reviews, upsells, live chat) block main-thread execution.',
    recommendations: [
      'Replace CSS background carousel with a native HTML picture element and fetchpriority="high".',
      'Consolidate 22 individual third-party app scripts into a single deferred bundle.',
      'Serve responsive WebP images sized to mobile viewport dimensions, saving 1.4MB.',
    ],
    vitalsSniperProof: 'VitalsSniper PRO flagged 2,400ms of render delay on .hero-banner__image and isolated 32 unexecuted third-party script tags.',
  },
  {
    id: '#030',
    slug: 'website-teardown-030',
    title: 'Website Teardown #030: 3,800 DOM Elements and 24 Nested Levels in a Page Builder',
    metaTitle: 'Teardown #030: 3,800 DOM Elements in WP | Web Audits',
    metaDescription: 'Teardown of a real estate portal with 3,840 DOM elements, 24 nested wrapper levels, and 420ms scroll recalculation latency in Elementor.',
    targetType: 'Commercial Real Estate Portal (WordPress + Elementor)',
    date: 'March 2026',
    lcpScore: '4.6s (Failed)',
    domElements: 3840,
    totalWeight: '4.1MB',
    seoFinding: 'Extreme DIV nesting (depth 24) resulted in 420ms of continuous style recalculation during mobile scroll, triggering severe interaction latency and layout thrashing.',
    uxObservation: 'Scrolling feels sluggish and stuttery on mid-tier mobile devices: property filter dropdowns exhibit a visible 280ms touch delay.',
    recommendations: [
      'Enable Elementor Flexbox Containers and remove legacy section/column/inner-section wrapper nests.',
      'Lazy-load below-the-fold listing carousels and map widgets.',
      'Offload heavy filter query processing to client-side indexed JSON or lightweight REST endpoint.',
    ],
    vitalsSniperProof: 'VitalsSniper PRO highlighted a DOM depth of 24 levels and identified 3,840 nodes on the primary viewport.',
  },
];
