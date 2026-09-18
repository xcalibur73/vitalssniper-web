'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function PopularReviewsSection() {
  // Show 4 popular reviewed products: WP Rocket, GeneratePress, Cloudways, Rank Math
  const reviewedProducts = PRODUCTS.filter((p) => !p.isOwnProduct).slice(0, 4);

  return (
    <section className="py-16 md:py-20 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Software Benchmarks
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F0F0F]">
              Tested &amp; Reviewed
            </h2>
            <p className="text-base text-[#4B5563] mt-1">
              Empirical laboratory benchmarks, verified server metrics, and transparent verdicts.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <span>View all reviews</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4-Card Horizontal Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewedProducts.map((prod) => (
            <div
              key={prod.slug}
              className="flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-6 shadow-none transition-colors hover:border-[#D1D5DB] group"
            >
              <div>
                {/* Top: Icon + Name + Category */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-xl flex-shrink-0">
                    {prod.iconEmoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors leading-tight">
                      <Link href={`/reviews/${prod.slug}`}>
                        {prod.name}
                      </Link>
                    </h3>
                    <div className="text-xs text-[#6B7280]">
                      {prod.category}
                    </div>
                  </div>
                </div>

                {/* Empirical Parameters */}
                <div className="space-y-2.5 my-4 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E7EB]">
                    <div className="text-[11px] text-[#6B7280]">Observed Result:</div>
                    <div className="font-semibold text-[#0F0F0F] mt-0.5">{prod.observedMetric}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E7EB]">
                    <div className="text-[11px] text-[#6B7280]">Pricing Model:</div>
                    <div className="font-semibold text-[#0F0F0F] mt-0.5">{prod.pricingModel}</div>
                  </div>
                </div>

                {/* Best For */}
                <div className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  <span className="font-semibold text-[#0F0F0F]">Best for: </span>
                  {prod.bestFor}
                </div>
              </div>

              {/* Bottom: Read full review link */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <Link
                  href={`/reviews/${prod.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                >
                  <span>Read {prod.name} benchmark</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Disclosure */}
        <div className="mt-8 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] p-4 text-xs text-[#6B7280] flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-[#2563EB] flex-shrink-0" />
          <span className="text-xs leading-normal">
            We do not manufacture arbitrary star ratings or accept sponsored favorable coverage. Outbound affiliate links carry <code className="text-[#0F0F0F] font-mono text-xs">rel=&quot;sponsored&quot;</code>. See our <Link href="/editorial-policy" className="text-[#2563EB] underline font-semibold">Editorial Policy</Link>.
          </span>
        </div>

      </div>
    </section>
  );
}
