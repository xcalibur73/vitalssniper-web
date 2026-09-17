'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { ExternalLink, ArrowRight, Check, Beaker } from 'lucide-react';

interface ReviewsPageClientProps {
  products: any[];
  categories: readonly string[];
}

export default function ReviewsPageClient({ products, categories }: ReviewsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts = products.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-xs">
            <Beaker className="h-3.5 w-3.5 text-accent" />
            <span>Independent Software Testing &bull; 2026 Edition</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Best Website Audit &amp; Performance Tools
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Honest evaluations of hosting platforms, WordPress speed plugins, SEO suites, and page builders tested on live production servers under real traffic concurrency.
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-10 max-w-4xl mx-auto">
          <AffiliateDisclosure />
        </div>

        {/* Comparison Table Near Top */}
        <div className="mb-14 paper-card rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-sand-300 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-charcoal">
                2026 Software Comparison Matrix
              </h2>
            </div>
            <span className="text-xs font-semibold text-charcoal-subtle hidden sm:inline">
              Sorted by Empirical Rating
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7F4EE] border-b border-sand-300 text-charcoal-subtle uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 font-bold">Tool</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Observed Metric</th>
                  <th className="py-3.5 px-4 font-bold">Pricing</th>
                  <th className="py-3.5 px-4 font-bold">Best For</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300 bg-white">
                {products.map((prod) => (
                  <tr key={prod.slug} className="hover:bg-sand-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-charcoal flex items-center gap-2">
                      <span>{prod.iconEmoji}</span>
                      <Link
                        href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {prod.name}
                      </Link>
                      {prod.isOwnProduct && (
                        <span className="text-[9px] font-bold text-white bg-accent px-1.5 py-0.5 rounded">
                          OURS
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-muted">
                      {prod.category}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-muted text-[11px] font-medium">
                      {prod.observedMetric}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-charcoal">
                      {prod.pricing}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-muted max-w-[200px] truncate">
                      {prod.bestFor}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"
                      >
                        <span>Review</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-white border border-sand-300 text-charcoal-muted hover:text-charcoal hover:border-accent/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Structured Product Cards Grid */}
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
                    <span className="text-[10px] font-bold text-white bg-accent px-2.5 py-0.5 rounded-full">
                      Our Flagship Platform
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-charcoal-muted bg-white px-2.5 py-1 rounded-md border border-sand-300 shadow-2xs">
                      <span className="font-mono text-accent font-bold">{prod.pricingModel}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{prod.iconEmoji}</span>
                  <h3 className="font-editorial text-2xl font-bold text-charcoal">
                    <Link
                      href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {prod.name}
                    </Link>
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                  {prod.description}
                </p>

                {/* Factual Attributes Strip */}
                <div className="grid grid-cols-2 gap-2 my-3 text-[11px] bg-[#F7F4EE] p-2.5 rounded-lg border border-sand-300">
                  <div>
                    <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Tested Environment:</span>
                    <span className="font-semibold text-charcoal truncate block">{prod.testedStack}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Observed Metric:</span>
                    <span className="font-semibold text-charcoal truncate block">{prod.observedMetric}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300 text-xs text-charcoal-light leading-relaxed mb-5">
                  <strong className="text-charcoal">Verdict:</strong> {prod.verdict}
                </div>

                {/* Key Features */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-charcoal block mb-2">Key Features:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-muted">
                    {prod.features.slice(0, 4).map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="pt-4 border-t border-sand-300 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-charcoal font-mono">
                  {prod.pricing}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                    className="px-3.5 py-2 rounded-xl border border-sand-300 bg-white text-xs font-bold text-charcoal hover:border-accent/40 transition-all"
                  >
                    Read Review
                  </Link>

                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-accent text-xs font-bold text-white hover:bg-accent-dark transition-all shadow-xs"
                  >
                    <span>Visit Site</span>
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
