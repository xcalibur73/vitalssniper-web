import React from 'react';
import TopicHubTemplate from '@/components/TopicHubTemplate';
import { BLOG_POSTS } from '@/data/posts';
import { FREE_TOOLS, PRO_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { RESEARCH_STUDIES } from '@/data/research';

export const metadata = {
  title: 'Conversion Optimization & Speed ROI Hub | Web Audits',
  description: 'Data-driven conversion rate optimization (CRO), speed-to-revenue correlation studies, and agency proposal playbooks.',
};

export default function ConversionHub() {
  const articles = BLOG_POSTS.filter((p) => p.category === 'Conversion');
  const tools = FREE_TOOLS.filter((t) => t.category === 'Performance');
  const researchStudies = RESEARCH_STUDIES.filter((s) => s.slug === 'javascript-payload-study');
  const products = PRODUCTS.filter((p) => p.category === 'Analytics' || p.category === 'Speed & Performance');

  const faqs = [
    {
      question: 'How does mobile page speed correlate with e-commerce conversion rates?',
      answer: 'Industry benchmarks from Google, Cloudflare, and major retailers show that every 100ms reduction in mobile page latency correlates with a 1% to 1.5% increase in conversion rates. High TTFB directly increases bounce rates during checkout funnels.',
    },
    {
      question: 'What is the highest-ROI optimization for e-commerce websites?',
      answer: 'Optimizing the primary product hero image into responsive WebP/AVIF format and deferring non-essential marketing tags until user interaction yields the largest immediate gains in LCP and user retention.',
    },
  ];

  return (
    <TopicHubTemplate
      slug="conversion"
      title="Conversion Optimization &amp; Speed ROI"
      subtitle="Connecting technical performance to measurable business outcomes: conversion lift models, latency-to-revenue correlations, and agency pitch frameworks."
      pillarSummary="Performance is a financial metric. By framing Core Web Vitals fixes in terms of reduced bounce rates, improved mobile checkout speed, and higher advertising ROAS, technical consultants close higher-value retainers."
      categoryName="Conversion &amp; CRO"
      articles={articles}
      tools={tools}
      researchStudies={researchStudies}
      products={products}
      faqs={faqs}
    />
  );
}
