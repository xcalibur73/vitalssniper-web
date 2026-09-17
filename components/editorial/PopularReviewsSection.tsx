'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function PopularReviewsSection() {
  // Show 4 popular reviewed products: WP Rocket, GeneratePress, Cloudways, Rank Math
  const reviewedProducts = PRODUCTS.filter((p) => !p.isOwnProduct).slice(0, 4);

  return (
    <section className="py-14 sm:py-16 border-b border-sand-300 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
              Tested &amp; Reviewed
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              In-depth testing. Real-world results. No fluff.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider hover:underline"
          >
            <span>View all reviews</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4-Card Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviewedProducts.map((prod) => (
            <div
              key={prod.slug}
              className="flex flex-col justify-between rounded-2xl border border-sand-300 bg-[#F7F4EE] p-5 shadow-sm hover:shadow-md hover:border-accent/40 transition-all group"
            >
              <div>
                {/* Top: Icon + Name + Category */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-sand-300 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    {prod.iconEmoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-charcoal group-hover:text-accent transition-colors leading-tight">
                      <Link href={`/reviews/${prod.slug}`}>
                        {prod.name}
                      </Link>
                    </h3>
                    <div className="text-[11px] text-charcoal-muted">
                      {prod.category}
                    </div>
                  </div>
                </div>

                {/* Badges strip */}
                <div className="flex flex-wrap gap-1.5 my-3 text-[10px]">
                  <span className="rounded-md bg-white border border-sand-300 px-2 py-0.5 text-charcoal-muted font-medium">
                    Tested 14-30d
                  </span>
                  <span className="rounded-md bg-white border border-sand-300 px-2 py-0.5 text-charcoal-muted font-medium">
                    {prod.pricingModel.split(' ')[0]}
                  </span>
                  <span className="rounded-md bg-white border border-sand-300 px-2 py-0.5 text-charcoal-muted font-medium">
                    WordPress
                  </span>
                </div>

                {/* Best for line */}
                <div className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  <strong className="text-charcoal font-semibold">Best for:</strong> {prod.bestFor}
                </div>
              </div>

              {/* Bottom: Read full review link */}
              <div className="pt-3 border-t border-sand-300/70">
                <Link
                  href={`/reviews/${prod.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                >
                  <span>Read full review</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Disclosure */}
        <div className="mt-8 rounded-xl bg-[#F7F4EE] border border-sand-300 p-3.5 text-xs text-charcoal-muted flex items-center gap-2.5">
          <ShieldCheck className="h-4 w-4 text-accent flex-shrink-0" />
          <span className="text-[11px] leading-tight">
            We do not manufacture arbitrary ratings or accept paid favorable reviews. Commercial links use <code className="text-charcoal font-mono text-[10px]">rel=&quot;sponsored&quot;</code>. See our <Link href="/editorial-policy" className="text-accent underline font-semibold">Editorial Policy</Link>.
          </span>
        </div>

      </div>
    </section>
  );
}
