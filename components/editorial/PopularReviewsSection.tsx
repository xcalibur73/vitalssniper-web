'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { Star, ExternalLink, ArrowRight, Check, X, Beaker, ShieldCheck } from 'lucide-react';

export default function PopularReviewsSection() {
  // Show 4 popular third-party software reviews
  const reviewedProducts = PRODUCTS.filter((p) => !p.isOwnProduct).slice(0, 4);

  return (
    <section className="py-20 border-b border-sand-300 bg-[#F7F4EE]">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3 py-1 text-xs font-semibold text-charcoal-muted mb-3 shadow-xs">
              <Beaker className="h-3.5 w-3.5 text-accent" />
              <span>Independent Laboratory Testing</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
              Empirical Software &amp; Hosting Reviews
            </h2>
            <p className="text-charcoal-muted max-w-xl text-sm mt-2">
              Every tool is tested in live and staging environments. Factual attributes, speed impact, and real trade-offs rather than arbitrary scores.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
          >
            <span>Browse All Reviews</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 2-Column Structured Review Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviewedProducts.map((prod) => (
            <div
              key={prod.slug}
              className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Header row: category, rating, pricing */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{prod.iconEmoji}</span>
                    <span className="editorial-pill">
                      {prod.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted bg-white px-2.5 py-1 rounded-md border border-sand-300 shadow-2xs">
                    <span className="font-mono text-accent font-bold">{prod.pricingModel}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-2xl font-bold text-charcoal mb-1">
                  <Link href={`/reviews/${prod.slug}`} className="hover:text-accent transition-colors">
                    {prod.name}
                  </Link>
                </h3>

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

                {/* Verdict Callout Box */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300 text-xs text-charcoal leading-relaxed mb-5">
                  <strong className="text-charcoal">Verdict:</strong> {prod.verdict}
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                  <div>
                    <span className="font-bold text-emerald-700 block mb-2">Strengths:</span>
                    <ul className="space-y-1.5 text-charcoal-muted">
                      {prod.pros.slice(0, 3).map((pro, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-rose-700 block mb-2">Limitations:</span>
                    <ul className="space-y-1.5 text-charcoal-muted">
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

              {/* Bottom Card Bar: Pricing & Dual CTA */}
              <div className="pt-4 border-t border-sand-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-charcoal font-mono">
                  {prod.pricing}
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <Link
                    href={`/reviews/${prod.slug}`}
                    className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-xl border border-sand-300 bg-white text-xs font-bold text-charcoal hover:border-accent/40 transition-all shadow-xs"
                  >
                    Read Full Review
                  </Link>

                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-xs font-bold text-white hover:bg-accent-dark transition-all shadow-sm"
                  >
                    <span>Visit Tool</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Detailed Methodology Disclosure */}
        <div className="mt-8 rounded-xl bg-white border border-sand-300 p-4 text-xs text-charcoal-muted flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            <strong>Editorial &amp; Testing Methodology:</strong> We do not accept payment for positive reviews or favorable rankings. All software undergoes at least 14 days of live deployment testing. Affiliate links support our research at zero extra cost to you. Read our full <Link href="/editorial-policy" className="text-accent underline font-semibold">Editorial Policy</Link>.
          </p>
        </div>

      </div>
    </section>
  );
}
