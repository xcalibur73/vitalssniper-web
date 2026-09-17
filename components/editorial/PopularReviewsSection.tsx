'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { Star, ExternalLink, ArrowRight, Check, X } from 'lucide-react';

export default function PopularReviewsSection() {
  const featuredReviews = [
    {
      title: 'Cloudways Managed Cloud Hosting',
      productSlug: 'cloudways',
      category: 'Hosting & CDN',
      bestFor: 'Agencies scaling WordPress sites needing custom server stacks',
      rating: 4.5,
      pricing: 'From $14/month',
      verdict: 'Highest TTFB consistency under multi-threaded concurrency tests.',
      pros: ['Built-in Cloudflare Enterprise CDN', 'One-click staging & automatic backups', 'Choice of DigitalOcean, AWS, or Vultr'],
      cons: ['No cPanel (custom dashboard required)', 'Email hosting requires separate add-on'],
      affiliateUrl: 'https://www.cloudways.com',
    },
    {
      title: 'GeneratePress Theme & Blocks',
      productSlug: 'generatepress',
      category: 'Page Builders',
      bestFor: 'Developers aiming for perfect 100/100 Core Web Vitals with zero bloat',
      rating: 5.0,
      pricing: 'From $59/year (or $249 Lifetime)',
      verdict: 'Under 10KB total CSS and zero jQuery. The gold standard for modern speed.',
      pros: ['Near-zero DOM overhead (<300 elements)', 'Native CSS grid & flexbox controls', 'Unmatched documentation and support'],
      cons: ['Requires basic understanding of web design layout principles', 'No pre-packaged bloated animations'],
      affiliateUrl: 'https://generatepress.com',
    },
    {
      title: 'Rank Math SEO Suite',
      productSlug: 'rank-math',
      category: 'SEO Tools',
      bestFor: 'Content publishers needing granular Schema.org JSON-LD graph controls',
      rating: 4.5,
      pricing: 'Free + Pro from $6.99/month',
      verdict: 'Lighter script execution than Yoast, with built-in AI content scoring.',
      pros: ['Comprehensive Schema.org entity generator', 'Built-in 404 monitor and redirection engine', 'Clean modular design (enable only what you need)'],
      cons: ['AI content suggestions require credits', 'Settings hierarchy can feel overwhelming for novices'],
      affiliateUrl: 'https://rankmath.com',
    },
    {
      title: 'WP Rocket Caching Plugin',
      productSlug: 'wp-rocket',
      category: 'Speed & Performance',
      bestFor: 'Busy site owners wanting 1-click critical CSS and script delaying',
      rating: 4.0,
      pricing: 'From $59/year',
      verdict: 'The easiest way to pass Largest Contentful Paint without editing code.',
      pros: ['Automatic unused CSS removal', 'JavaScript execution delay until user interaction', 'Gzip and cache preloading built-in'],
      cons: ['No free trial tier', 'Aggressive script delaying can break complex interactive carousels'],
      affiliateUrl: 'https://wp-rocket.me',
    },
  ];

  return (
    <section className="py-20 border-b border-sand-300 bg-[#faf8f5]">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Independent Reviews &amp; Testing
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mt-1">
              Tested &amp; Recommended Software
            </h2>
            <p className="text-charcoal-muted max-w-xl text-sm mt-2">
              Every tool is benchmarked in isolated environments. We document honest trade-offs so you invest only in software that delivers measurable returns.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-xs font-bold text-terracotta hover:underline"
          >
            <span>Browse All Software Reviews</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 2-Column Structured Review Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredReviews.map((rev) => (
            <div
              key={rev.title}
              className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Header row: category, rating, pricing */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="editorial-pill">
                    {rev.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                    <span>{rev.rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-2xl font-bold text-charcoal mb-1">
                  <Link href={`/tools/${rev.productSlug}`} className="hover:text-terracotta transition-colors">
                    {rev.title}
                  </Link>
                </h3>

                {/* Best For tag */}
                <p className="text-xs font-semibold text-charcoal-light mb-4">
                  <span className="text-terracotta">Best for:</span> {rev.bestFor}
                </p>

                {/* Verdict Callout Box */}
                <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-sand-300 text-xs text-charcoal-light leading-relaxed mb-5">
                  <strong className="text-charcoal">Verdict:</strong> {rev.verdict}
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                  <div>
                    <span className="font-bold text-emerald-700 block mb-2">Strengths:</span>
                    <ul className="space-y-1.5 text-charcoal-muted">
                      {rev.pros.map((pro, i) => (
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
                      {rev.cons.map((con, i) => (
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
                  {rev.pricing}
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <Link
                    href={`/tools/${rev.productSlug}`}
                    className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-xl border border-sand-300 bg-white text-xs font-bold text-charcoal hover:border-terracotta/40 transition-all"
                  >
                    Read Full Review
                  </Link>

                  <a
                    href={rev.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta text-xs font-bold text-white hover:bg-terracotta-dark transition-all shadow-sm"
                  >
                    <span>Visit Tool</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
