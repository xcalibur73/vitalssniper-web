import React from 'react';
import TopicHubTemplate from '@/components/TopicHubTemplate';
import { BLOG_POSTS } from '@/data/posts';
import { FREE_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { RESEARCH_STUDIES } from '@/data/research';

export const metadata = {
  title: 'Technical SEO & Structured Data Hub | Web Audits',
  description: 'Guides and tools for Schema.org JSON-LD structured data, crawl budget optimization, canonical directives, and entity SEO.',
};

export default function SeoHub() {
  const articles = BLOG_POSTS.filter((p) => p.category === 'SEO');
  const tools = FREE_TOOLS.filter((t) => t.category === 'SEO');
  const researchStudies = RESEARCH_STUDIES.filter((s) => s.slug === 'agency-websites-study');
  const products = PRODUCTS.filter((p) => p.category === 'SEO Tools');

  const faqs = [
    {
      question: 'Does Schema.org structured data guarantee rich snippets in Google Search?',
      answer: 'No. Google explicitly states that valid Schema.org markup is an eligibility requirement for rich results (such as review stars, FAQs, and product tags), but Google-s algorithms dynamically decide whether to show rich results based on query intent and domain authority.',
    },
    {
      question: 'How do broken internal links affect organic search rankings?',
      answer: 'Broken internal links waste search engine crawl budget, strand link equity (PageRank) from circulating across topical clusters, and create immediate dead ends for visitors, increasing site abandonment.',
    },
  ];

  return (
    <TopicHubTemplate
      slug="seo"
      title="Technical SEO &amp; Structured Data"
      subtitle="In-depth tutorials, schema validators, and crawler diagnostics to maximize organic search visibility and machine readability."
      pillarSummary="Modern SEO is entity-driven. Providing explicit JSON-LD schema, clean canonical hierarchies, and fast response codes ensures search crawlers understand your site-s topical authority without ambiguity."
      categoryName="Technical SEO"
      articles={articles}
      tools={tools}
      researchStudies={researchStudies}
      products={products}
      faqs={faqs}
    />
  );
}
