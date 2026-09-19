import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import EditorialHero from '@/components/editorial/EditorialHero';
import HowItWorksSection from '@/components/editorial/HowItWorksSection';
import WebsiteIntelligenceSection from '@/components/editorial/WebsiteIntelligenceSection';
import LatestResearchSection from '@/components/editorial/LatestResearchSection';
import LatestArticlesSection from '@/components/editorial/LatestArticlesSection';
import PopularReviewsSection from '@/components/editorial/PopularReviewsSection';
import ActionBanner from '@/components/editorial/ActionBanner';
import NewsletterBrief from '@/components/NewsletterBrief';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Web Audits - Core Web Vitals, SEO & Speed Benchmarks',
  description: 'Digital publication and tools platform for web performance, technical SEO, AI and GEO readiness, and conversion optimization. Includes VitalsSniper PRO.',
  alternates: {
    canonical: 'https://www.webaudits.pro',
  },
};

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.webaudits.pro/#website',
    url: 'https://www.webaudits.pro',
    name: 'Web Audits',
    description: 'Independent digital publication, empirical speed benchmarks, and website forensics software.',
    publisher: {
      '@id': 'https://www.webaudits.pro/#organization',
    },
    inLanguage: 'en-US',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.webaudits.pro/#organization',
    name: 'Web Audits',
    url: 'https://www.webaudits.pro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.webaudits.pro/favicon.svg',
      width: '512',
      height: '512',
    },
    publishingPrinciples: 'https://www.webaudits.pro/editorial-policy',
    correctionsPolicy: 'https://www.webaudits.pro/editorial-policy',
    knowsAbout: [
      'Core Web Vitals',
      'Web Performance Engineering',
      'Largest Contentful Paint (LCP)',
      'Cumulative Layout Shift (CLS)',
      'Interaction to Next Paint (INP)',
      'Technical SEO',
      'DOM Tree Optimization',
      'Generative Engine Optimization (GEO)',
    ],
    sameAs: [
      'https://github.com/xcalibur73',
      'https://github.com/xcalibur73/vitalssniper-web',
      'https://github.com/xcalibur73/overflow-trace',
      'https://github.com/xcalibur73/dom-hydrate',
      'https://github.com/xcalibur73/citation-pulse',
      'https://github.com/xcalibur73/index-trace',
    ],
    founder: {
      '@type': 'Person',
      '@id': 'https://github.com/xcalibur73/#person',
      name: 'xcalibur73',
      url: 'https://github.com/xcalibur73',
      jobTitle: 'Technical SEO Architect & Performance Systems Engineer',
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://github.com/xcalibur73/#person',
    name: 'xcalibur73',
    url: 'https://github.com/xcalibur73',
    jobTitle: 'Technical SEO Architect & Performance Systems Engineer',
    sameAs: [
      'https://github.com/xcalibur73',
    ],
    worksFor: {
      '@id': 'https://www.webaudits.pro/#organization',
    },
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      {/* Schema.org WebSite, Organization & Person Entity Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero + Honest Product Preview Card */}
      <EditorialHero />

      {/* 3. How It Works (3-step explanation) */}
      <HowItWorksSection />

      {/* 4. Website Intelligence (Featured Website Audit + Secondary Tools) */}
      <WebsiteIntelligenceSection />

      {/* 5. Latest Research (Empirical Studies + Comparative Data Chart) */}
      <LatestResearchSection />

      {/* 6. Latest Articles (3-Column Clean Editorial Grid) */}
      <LatestArticlesSection />

      {/* 7. Tested & Reviewed (Software Benchmarks Matrix) */}
      <PopularReviewsSection />

      {/* 8. Restrained Dark Action Callout Banner */}
      <ActionBanner />

      {/* 9. The Web Audits Brief (Inline Newsletter Strip) */}
      <section className="py-12 border-b border-[#E5E7EB] bg-[#F8F8F8]">
        <div className="mx-auto max-w-7xl px-6">
          <NewsletterBrief />
        </div>
      </section>

      {/* 10. Structured Masthead Footer */}
      <Footer />

    </main>
  );
}
