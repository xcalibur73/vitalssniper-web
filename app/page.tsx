'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroBrand from '@/components/HeroBrand';
import FeaturedProduct from '@/components/FeaturedProduct';
import ToolsGrid from '@/components/ToolsGrid';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/data/products';
import { BLOG_POSTS } from '@/data/posts';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#08090e] bg-tech-grid relative selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero: Editorial Brand Introduction */}
      <HeroBrand />

      {/* Featured Product: VitalsSniper PRO Spotlight */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Flagship Product</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Built by Us, Trusted by Agencies
            </h2>
          </div>
          <FeaturedProduct />
        </div>
      </section>

      {/* Curated Tools Grid: Top Picks Preview */}
      <section className="py-16 border-t border-white/[0.06] bg-[#0c0d14]/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-4">
              <Zap className="h-3.5 w-3.5" />
              <span>Curated Tool Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
              Top Web Tools We Recommend
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Independently tested and benchmarked. Every tool earns its spot through real-world performance data.
            </p>
          </div>
          <ToolsGrid products={PRODUCTS} limit={6} />
        </div>
      </section>

      {/* Blog / Reviews Preview */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-4">
              <span>Latest Reviews &amp; Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
              From the Blog
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              In-depth comparisons, speed benchmarks, and practical guides for agencies and web professionals.
            </p>
          </div>
          <BlogPreview posts={BLOG_POSTS} limit={3} />
        </div>
      </section>

      {/* Free Audit CTA Banner */}
      <section className="py-16 border-t border-white/[0.06] bg-gradient-to-b from-[#12141d] to-[#090a10]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Test Your Website Speed for Free
            </h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-8">
              Get an instant forensic performance report with DOM bloat analysis, CMS detection, and actionable speed recommendations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/free-audit-report"
                className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-black shadow-[0_4px_20px_rgba(255,255,255,0.25)] transition-all hover:bg-gray-100 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Zap className="h-4 w-4 text-emerald-600" />
                <span>Get Free Audit Report</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/vitalssniper"
                className="w-full sm:w-auto rounded-xl border border-white/20 bg-surface-card px-6 py-4 text-sm font-semibold text-gray-300 transition-all hover:border-white/30 hover:text-white flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Or Get VitalsSniper PRO: $39</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
