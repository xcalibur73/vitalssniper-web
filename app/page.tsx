'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import EditorialHero from '@/components/editorial/EditorialHero';
import WebsiteIntelligenceSection from '@/components/editorial/WebsiteIntelligenceSection';
import LatestResearchSection from '@/components/editorial/LatestResearchSection';
import LatestArticlesSection from '@/components/editorial/LatestArticlesSection';
import PopularReviewsSection from '@/components/editorial/PopularReviewsSection';
import ActionBanner from '@/components/editorial/ActionBanner';
import NewsletterBrief from '@/components/NewsletterBrief';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Editorial Two-Column Hero + Live Forensic Terminal */}
      <EditorialHero />

      {/* 3. Website Intelligence (4-card horizontal tools suite) */}
      <WebsiteIntelligenceSection />

      {/* 4. Latest Research (Data Lab with Comparative Bar Chart) */}
      <LatestResearchSection />

      {/* 5. Latest Articles (Magazine Rhythm: Large Featured Story + Modular Guides) */}
      <LatestArticlesSection />

      {/* 6. Tested & Reviewed (4-card empirical software grid) */}
      <PopularReviewsSection />

      {/* 7. Dark Action Callout Banner */}
      <ActionBanner />

      {/* 8. The Web Audits Brief (Inline Newsletter Strip) */}
      <section className="py-10 border-b border-sand-300 bg-[#F7F4EE]">
        <div className="mx-auto max-w-7xl px-6">
          <NewsletterBrief />
        </div>
      </section>

      {/* 9. Structured Editorial Masthead Footer */}
      <Footer />

    </main>
  );
}
