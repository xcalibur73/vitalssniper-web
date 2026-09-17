import React from 'react';
import TopicHubTemplate from '@/components/TopicHubTemplate';
import { BLOG_POSTS } from '@/data/posts';
import { FREE_TOOLS, PRO_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { RESEARCH_STUDIES } from '@/data/research';

export const metadata = {
  title: 'Agency Toolstacks & Diagnostic Workflows Hub | Web Audits',
  description: 'Workflows, software stacks, and consultative sales frameworks for web performance consultants and digital marketing agencies.',
};

export default function ToolsHub() {
  const articles = BLOG_POSTS.filter((p) => p.category === 'Tools');
  const tools = FREE_TOOLS;
  const researchStudies = RESEARCH_STUDIES.filter((s) => s.slug === 'agency-websites-study');
  const products = PRODUCTS;

  const faqs = [
    {
      question: 'How should agencies package Core Web Vitals remediation services?',
      answer: 'High-performing agencies avoid raw 50-page automated PDF dumps. Instead, they lead with an active-tab visual teardown identifying the specific LCP element, present a 48-hour remediation sprint, and offer ongoing regression monitoring.',
    },
    {
      question: 'Why is client-side in-browser inspection faster than third-party audit APIs?',
      answer: 'In-browser extensions inspect the rendered DOM and Performance Timeline directly in the active tab without queuing requests on external server clusters, enabling real-time diagnostics on dynamic or authenticated pages.',
    },
  ];

  return (
    <TopicHubTemplate
      slug="tools"
      title="Agency Toolstacks &amp; Workflows"
      subtitle="Evaluations of diagnostic tools, proposal generators, and automation pipelines designed to streamline performance consultancy operations."
      pillarSummary="Tool efficiency determines agency profitability. Utilizing in-browser diagnostics with automated visual proof sheets eliminates hours of non-billable manual reporting and accelerates consultative client closes."
      categoryName="Tools &amp; Workflows"
      articles={articles}
      tools={tools}
      researchStudies={researchStudies}
      products={products}
      faqs={faqs}
    />
  );
}
