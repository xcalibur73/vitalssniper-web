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
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Independent Software Testing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F0F0F] mb-4">
            Best Website Audit &amp; Performance Tools
          </h1>
          <p className="text-base text-[#4B5563] leading-relaxed">
            Honest evaluations of hosting platforms, WordPress speed plugins, SEO suites, and page builders tested on live production servers under real traffic concurrency.
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-10 max-w-4xl">
          <AffiliateDisclosure />
        </div>

        {/* Comparison Table Near Top */}
        <div className="mb-14 rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-none">
          <div className="p-5 border-b border-[#E5E7EB] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
              <h2 className="text-lg font-bold tracking-tight text-[#0F0F0F]">
                2026 Software Comparison Matrix
              </h2>
            </div>
            <span className="text-xs font-medium text-[#6B7280] hidden sm:inline">
              Sorted by Empirical Testing
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F8F8] border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 font-semibold">Tool</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Observed Metric</th>
                  <th className="py-3.5 px-4 font-semibold">Pricing</th>
                  <th className="py-3.5 px-4 font-semibold">Best For</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {products.map((prod) => (
                  <tr key={prod.slug} className="hover:bg-[#F8F8F8] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0F0F0F] flex items-center gap-2">
                      <span>{prod.iconEmoji}</span>
                      <Link
                        href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                        className="hover:text-[#2563EB] transition-colors"
                      >
                        {prod.name}
                      </Link>
                      {prod.isOwnProduct && (
                        <span className="text-[9px] font-semibold text-white bg-[#2563EB] px-1.5 py-0.5 rounded">
                          OURS
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#4B5563]">
                      {prod.category}
                    </td>
                    <td className="py-3.5 px-4 text-[#4B5563] text-[11px] font-mono">
                      {prod.observedMetric}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#0F0F0F]">
                      {prod.pricing}
                    </td>
                    <td className="py-3.5 px-4 text-[#4B5563] max-w-[200px] truncate">
                      {prod.bestFor}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
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
        <div className="flex items-center justify-start gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#0F0F0F]'
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
              className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-none transition-colors hover:border-[#D1D5DB]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#4B5563]">
                    {prod.category}
                  </span>
                  {prod.isOwnProduct ? (
                    <span className="text-[10px] font-semibold text-white bg-[#2563EB] px-2.5 py-0.5 rounded-full">
                      Our Platform
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[#4B5563] bg-[#F8F8F8] px-2.5 py-1 rounded-md border border-[#E5E7EB]">
                      <span className="font-mono text-[#0F0F0F] font-bold">{prod.pricingModel}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{prod.iconEmoji}</span>
                  <h3 className="text-xl font-bold tracking-tight text-[#0F0F0F]">
                    <Link
                      href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                      className="hover:text-[#2563EB] transition-colors"
                    >
                      {prod.name}
                    </Link>
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  {prod.description}
                </p>

                {/* Factual Attributes Strip */}
                <div className="grid grid-cols-2 gap-2 my-3 text-[11px] bg-[#F8F8F8] p-3 rounded-lg border border-[#E5E7EB]">
                  <div>
                    <span className="text-[#6B7280] block text-[10px] uppercase font-semibold">Tested Environment:</span>
                    <span className="font-semibold text-[#0F0F0F] truncate block mt-0.5">{prod.testedStack}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block text-[10px] uppercase font-semibold">Observed Metric:</span>
                    <span className="font-semibold text-[#0F0F0F] truncate block mt-0.5">{prod.observedMetric}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] leading-relaxed mb-5">
                  <strong className="text-[#0F0F0F]">Verdict: </strong>
                  {prod.verdict}
                </div>

                {/* Key Features */}
                <div className="mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] block mb-2">Key Features:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4B5563]">
                    {prod.features.slice(0, 4).map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#0F0F0F] font-mono">
                  {prod.pricing}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                    className="px-3.5 py-2 rounded-lg border border-[#E5E7EB] bg-white text-xs font-semibold text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors"
                  >
                    Read Review
                  </Link>

                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
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
