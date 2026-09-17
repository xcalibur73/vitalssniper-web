import React from 'react';
import TopicHubTemplate from '@/components/TopicHubTemplate';
import { BLOG_POSTS } from '@/data/posts';
import { FREE_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { RESEARCH_STUDIES } from '@/data/research';

export const metadata = {
  title: 'Web Performance & Core Web Vitals Hub | Web Audits',
  description: 'In-depth engineering guides, diagnostic tools, and speed benchmarks for mobile Largest Contentful Paint (LCP), INP, and server TTFB.',
  alternates: {
    canonical: 'https://www.webaudits.pro/articles/web-performance',
  },
  openGraph: {
    title: 'Web Performance & Core Web Vitals Hub | Web Audits',
    description: 'In-depth engineering guides, diagnostic tools, and speed benchmarks for mobile Largest Contentful Paint (LCP), INP, and server TTFB.',
    url: 'https://www.webaudits.pro/articles/web-performance',
  },
};

export default function WebPerformanceHub() {
  const articles = BLOG_POSTS.filter((p) => p.category === 'Web Performance');
  const tools = FREE_TOOLS.filter((t) => t.category === 'Performance');
  const researchStudies = RESEARCH_STUDIES.filter((s) => s.slug === 'website-performance-report' || s.slug === 'javascript-payload-study');
  const products = PRODUCTS.filter((p) => p.category === 'Speed & Performance' || p.category === 'Hosting & CDN');

  const faqs = [
    {
      question: 'What is the actual target for Largest Contentful Paint (LCP)?',
      answer: 'According to official Core Web Vitals specifications, a good LCP score is 2.5 seconds or less measured at the 75th percentile of real-user page loads. Optimizing the primary hero image with fetchpriority="high" and preloading it in the document head are the most effective fixes.',
    },
    {
      question: 'Why does mobile performance score lower than desktop?',
      answer: 'Mobile devices have constrained CPU cores and run over wireless networks with variable latency. Heavy JavaScript bundles that execute smoothly on an M-series Mac or desktop PC can lock the main thread of a mid-tier Android phone for multiple seconds.',
    },
    {
      question: 'What is Time to First Byte (TTFB) and how does it affect overall speed?',
      answer: 'TTFB measures the latency between when a browser requests a page and when it receives the first byte of data from the server. An initial TTFB over 600ms delays every subsequent asset download, making a fast LCP mathematically impossible.',
    },
  ];

  return (
    <TopicHubTemplate
      slug="web-performance"
      title="Web Performance &amp; Core Web Vitals"
      subtitle="Engineering guides, empirical benchmarks, and diagnostic utilities to isolate mobile bottlenecks and optimize user experience."
      pillarSummary="Performance is an architectural discipline. Real-world speed requires minimizing initial HTML payloads, preloading the LCP element, and deferring non-critical third-party scripts to keep the main thread idle."
      categoryName="Web Performance"
      articles={articles}
      tools={tools}
      researchStudies={researchStudies}
      products={products}
      faqs={faqs}
    />
  );
}
