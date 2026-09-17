'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import EditorialHero from '@/components/editorial/EditorialHero';
import FeaturedToolHero from '@/components/editorial/FeaturedToolHero';
import FeaturedArticlesGrid from '@/components/editorial/FeaturedArticlesGrid';
import TopicExplorer from '@/components/editorial/TopicExplorer';
import PopularReviewsSection from '@/components/editorial/PopularReviewsSection';
import FreeToolsSuite from '@/components/editorial/FreeToolsSuite';
import ResearchCaseStudy from '@/components/editorial/ResearchCaseStudy';
import EditorialDarkCta from '@/components/editorial/EditorialDarkCta';
import NewsletterBox from '@/components/editorial/NewsletterBox';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col justify-between">
      
      {/* Editorial Navbar */}
      <Navbar />

      {/* 1. Hero: Editorial headline, explanation, dual CTAs */}
      <EditorialHero />

      {/* 2. Featured Tool: VitalsSniper PRO outcome-driven showcase */}
      <FeaturedToolHero />

      {/* 3. Latest Articles: 6 editorial cards across core beats */}
      <FeaturedArticlesGrid limit={6} />

      {/* 4. Explore by Topic: Performance, SEO, AI/GEO, Web Design, CRO, Software */}
      <TopicExplorer />

      {/* 5. Popular Reviews: Affiliate comparison cards with pros/cons */}
      <PopularReviewsSection />

      {/* 6. Free Tools Suite: Acquisition tools leading to VitalsSniper PRO */}
      <FreeToolsSuite />

      {/* 7. Research / Case Studies: "We analyzed 100 websites..." */}
      <ResearchCaseStudy />

      {/* 8. Tool CTA: Contrast dark break "Don't just read about website problems. Find yours." */}
      <EditorialDarkCta />

      {/* 9. Newsletter: "Get useful web intelligence without the fluff." */}
      <NewsletterBox />

      {/* Editorial Masthead Footer */}
      <Footer />

    </main>
  );
}
