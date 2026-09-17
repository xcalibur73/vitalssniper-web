'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { PRODUCTS } from '@/data/products';
import { Star, ExternalLink, ArrowRight, Check, X, ShieldCheck } from 'lucide-react';

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hosting & CDN', 'Page Builders', 'SEO Tools', 'Speed & Performance', 'Analytics'];

  const filteredProducts = PRODUCTS.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-2xs">
            <span>Independent Software Testing</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Tested &amp; Benchmarked Software
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Honest evaluations of hosting platforms, WordPress optimization plugins, SEO suites, and page builders tested on live production servers.
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-10 max-w-4xl mx-auto">
          <AffiliateDisclosure />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-terracotta text-white shadow-xs'
                  : 'bg-white border border-sand-300 text-charcoal-muted hover:text-charcoal hover:border-terracotta/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filteredProducts.map((prod) => (
            <div
              key={prod.slug}
              className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="editorial-pill">
                    {prod.category}
                  </span>
                  {prod.isOwnProduct ? (
                    <span className="text-[10px] font-bold text-white bg-terracotta px-2.5 py-0.5 rounded-full">
                      Our Flagship Product
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                      <span>{prod.rating.toFixed(1)} / 5.0</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{prod.iconEmoji}</span>
                  <h3 className="font-editorial text-2xl font-bold text-charcoal">
                    <Link href={prod.isOwnProduct ? '/vitalssniper' : `/tools/${prod.slug}`} className="hover:text-terracotta transition-colors">
                      {prod.name}
                    </Link>
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                  {prod.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-sand-300 text-xs text-charcoal-light leading-relaxed mb-5">
                  <strong className="text-charcoal">Verdict:</strong> {prod.verdict}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                  <div>
                    <span className="font-bold text-emerald-700 block mb-2">Key Advantages:</span>
                    <ul className="space-y-1 text-charcoal-muted">
                      {prod.pros.slice(0, 3).map((pro, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-rose-700 block mb-2">Trade-offs:</span>
                    <ul className="space-y-1 text-charcoal-muted">
                      {prod.cons.slice(0, 2).map((con, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <X className="h-3.5 w-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sand-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-charcoal font-mono">
                  {prod.pricing}
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <Link
                    href={prod.isOwnProduct ? '/vitalssniper' : `/tools/${prod.slug}`}
                    className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-xl border border-sand-300 bg-white text-xs font-bold text-charcoal hover:border-terracotta/40 transition-all"
                  >
                    View In-Depth Review
                  </Link>

                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta text-xs font-bold text-white hover:bg-terracotta-dark transition-all shadow-xs"
                  >
                    <span>{prod.isOwnProduct ? 'Get VitalsSniper ($39)' : 'Visit Site'}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}
