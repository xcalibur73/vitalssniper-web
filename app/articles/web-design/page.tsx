import React from 'react';
import TopicHubTemplate from '@/components/TopicHubTemplate';
import { BLOG_POSTS } from '@/data/posts';
import { FREE_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { RESEARCH_STUDIES } from '@/data/research';

export const metadata = {
  title: 'Web Design & Zero Layout Shift Hub | Web Audits',
  description: 'Design token architecture, fluid typography, responsive layouts, and engineering principles for achieving 0 Cumulative Layout Shift (CLS).',
};

export default function WebDesignHub() {
  const articles = BLOG_POSTS.filter((p) => p.category === 'Web Design');
  const tools = FREE_TOOLS.filter((t) => t.slug === 'image-size-analyzer' || t.slug === 'lcp-checker');
  const researchStudies = RESEARCH_STUDIES.filter((s) => s.slug === 'website-performance-report');
  const products = PRODUCTS.filter((p) => p.category === 'Page Builders');

  const faqs = [
    {
      question: 'What causes Cumulative Layout Shift (CLS) on desktop and mobile?',
      answer: 'CLS occurs when visible elements change their position from one rendered frame to the next. The most common causes are images or video embeds without explicit width and height attributes, dynamically injected ads or banners, and web fonts causing FOIT/FOUT shift.',
    },
    {
      question: 'Why are native block themes faster than legacy page builders?',
      answer: 'Native block themes (like GeneratePress) compile directly to clean, semantic HTML and vanilla CSS. Legacy visual builders often wrap every heading and paragraph in 6-10 nested DIV containers, bloating the DOM and multiplying browser style recalculation time.',
    },
  ];

  return (
    <TopicHubTemplate
      slug="web-design"
      title="Modern Web Design &amp; Zero CLS"
      subtitle="Engineering design tokens, fluid typography, and semantic layout patterns that deliver aesthetic distinction with zero layout shift."
      pillarSummary="Visual aesthetics must not compromise performance. Setting explicit intrinsic aspect ratios on media, hosting typography locally, and keeping container nesting shallow guarantees visual stability across all screen sizes."
      categoryName="Web Design &amp; Tokens"
      articles={articles}
      tools={tools}
      researchStudies={researchStudies}
      products={products}
      faqs={faqs}
    />
  );
}
