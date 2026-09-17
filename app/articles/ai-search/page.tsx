import React from 'react';
import TopicHubTemplate from '@/components/TopicHubTemplate';
import { BLOG_POSTS } from '@/data/posts';
import { FREE_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { RESEARCH_STUDIES } from '@/data/research';

export const metadata = {
  title: 'AI Search & GEO Hub | Web Audits Helper',
  description: 'Emerging practices for generative search engine optimization (GEO), AI crawler access (OAI-SearchBot, PerplexityBot), and llms.txt observability.',
};

export default function AiSearchHub() {
  const articles = BLOG_POSTS.filter((p) => p.category === 'AI Search');
  const tools = FREE_TOOLS.filter((t) => t.slug === 'schema-validator' || t.slug === 'seo-meta-checker');
  const researchStudies = RESEARCH_STUDIES.filter((s) => s.slug === 'ai-search-readiness');
  const products = PRODUCTS.filter((p) => p.category === 'SEO Tools');

  const faqs = [
    {
      question: 'Is structured data or llms.txt required to appear in ChatGPT Search?',
      answer: 'No. OpenAI-s publisher documentation states that public web content crawled by OAI-SearchBot can appear in ChatGPT Search. Structured data and llms.txt assist machines in entity extraction and topical clarity, but are not mandatory ranking prerequisites.',
    },
    {
      question: 'What is the difference between GPTBot and OAI-SearchBot?',
      answer: 'GPTBot crawls web content to train foundation models (users can disallow GPTBot in robots.txt without affecting search visibility). OAI-SearchBot crawls pages specifically to surface citations and links within ChatGPT Search queries.',
    },
    {
      question: 'How do client-side Single Page Apps (SPAs) impact AI search crawlers?',
      answer: 'Many AI search bots do not execute full client-side JavaScript when scraping content. If key text content requires client-side hydration, AI crawlers may only record empty container tags, reducing the probability of citation.',
    },
  ];

  return (
    <TopicHubTemplate
      slug="ai-search"
      title="AI Search &amp; Generative Engine Optimization"
      subtitle="Observational research and technical protocols for crawler accessibility, entity disambiguation, and structured fact extraction."
      pillarSummary="AI discovery relies on static crawlability and factual density. Rather than keyword stuffing, AI search models extract concise claim-and-evidence passages supported by verified entity markup."
      categoryName="AI Search &amp; GEO"
      articles={articles}
      tools={tools}
      researchStudies={researchStudies}
      products={products}
      faqs={faqs}
    />
  );
}
