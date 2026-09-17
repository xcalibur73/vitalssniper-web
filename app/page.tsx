'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import EditorialHero from '@/components/editorial/EditorialHero';
import FeaturedToolHero from '@/components/editorial/FeaturedToolHero';
import EditorialGrid from '@/components/EditorialGrid';
import ResearchCard from '@/components/ResearchCard';
import PopularReviewsSection from '@/components/editorial/PopularReviewsSection';
import FreeToolsGrid from '@/components/FreeToolsGrid';
import TeardownCard from '@/components/TeardownCard';
import NewsletterBrief from '@/components/NewsletterBrief';
import Footer from '@/components/Footer';
import { BLOG_POSTS } from '@/data/posts';
import { RESEARCH_STUDIES } from '@/data/research';
import { TEARDOWNS } from '@/data/teardowns';
import { ArrowRight, Sparkles, BarChart3, Eye } from 'lucide-react';

export default function HomePage() {
  const featuredResearch = RESEARCH_STUDIES[0];
  const featuredTeardown = TEARDOWNS[0];

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Editorial Hero + URL Analyzer Bar (Section 3) */}
      <EditorialHero />

      {/* 3. Featured Tools Section + 6-Stage VitalsSniper PRO Workflow (Section 4 & 11) */}
      <FeaturedToolHero />

      {/* 4. Editorial Magazine Section: 1 Large Left, 4 Smaller Right + Topic Navigation (Section 5) */}
      <section className="py-20 border-b border-sand-300 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl px-6">
          <EditorialGrid posts={BLOG_POSTS} />
        </div>
      </section>

      {/* 5. Original Research Spotlight (Section 6 & 22) */}
      {featuredResearch && (
        <section className="py-20 border-b border-sand-300 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="editorial-pill">
                  Original Data &amp; Benchmarks
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                  Original Empirical Research
                </h2>
                <p className="text-charcoal-muted max-w-xl text-sm mt-1">
                  We collect and analyze primary performance datasets so you make decisions backed by verifiable evidence.
                </p>
              </div>

              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
              >
                <span>View All Research Studies</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ResearchCard study={featuredResearch} />
          </div>
        </section>
      )}

      {/* 6. Featured Product Reviews (Section 7 & 8) */}
      <PopularReviewsSection />

      {/* 7. Free Tools Suite: Acquisition tools leading to VitalsSniper PRO (Section 9 & 10) */}
      <section className="py-20 border-b border-sand-300 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="editorial-pill">
                Utility Layer
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                Free In-Browser Diagnostic Utilities
              </h2>
              <p className="text-charcoal-muted max-w-xl text-sm mt-1">
                Zero installations. Run fast on-page technical checks directly in your browser.
              </p>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
            >
              <span>Explore All Web Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <FreeToolsGrid limit={6} />
        </div>
      </section>

      {/* 8. The VitalsSniper Showroom: Website Teardowns (Section 30) */}
      {featuredTeardown && (
        <section className="py-20 border-b border-sand-300 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-[#F7F4EE] px-3 py-1 text-xs font-semibold text-charcoal-muted mb-2">
                  <Eye className="h-3.5 w-3.5 text-accent" />
                  <span>The VitalsSniper Showroom</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
                  Live Website Teardowns
                </h2>
                <p className="text-charcoal-muted max-w-xl text-sm mt-1">
                  We periodically inspect real production websites using VitalsSniper PRO to document hidden speed and SEO bottlenecks.
                </p>
              </div>

              <Link
                href="/teardowns"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
              >
                <span>Browse All Teardowns</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="max-w-3xl mx-auto">
              <TeardownCard teardown={featuredTeardown} />
            </div>
          </div>
        </section>
      )}

      {/* 9. The Web Audits Brief Newsletter (Section 23) */}
      <section className="py-20 border-b border-sand-300 bg-[#F7F4EE]">
        <div className="mx-auto max-w-5xl px-6">
          <NewsletterBrief />
        </div>
      </section>

      {/* 10. Editorial Masthead Footer */}
      <Footer />

    </main>
  );
}
