export interface TeardownStudy {
  id: string;
  slug: string;
  title: string;
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
];
