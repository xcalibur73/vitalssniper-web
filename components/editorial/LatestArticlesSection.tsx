'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User, BookOpen, Layers, Terminal, Sparkles, TrendingUp } from 'lucide-react';

export default function LatestArticlesSection() {
  return (
    <section className="py-14 sm:py-16 border-b border-sand-300 bg-[#F7F4EE]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
              Latest Articles
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Practical guides, expert insights and real-world examples.
            </p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider hover:underline"
          >
            <span>View all articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Row 1: 1 Featured Large Card (Left) + 2 Companion Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* Card 1: Large Featured Article (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-sand-300 bg-white p-6 shadow-sm hover:border-accent/40 transition-all group">
            <div>
              {/* Thumbnail / Visual Box */}
              <div className="rounded-xl bg-[#F7F4EE] border border-sand-300 p-4 mb-4 relative overflow-hidden flex items-center justify-center">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-muted pb-2 border-b border-sand-300">
                    <span>Performance Diagnostic</span>
                    <span className="text-emerald-600 font-bold">LCP 1.6s</span>
                  </div>
                  <div className="h-2 w-3/4 rounded bg-sand-300" />
                  <div className="h-2 w-1/2 rounded bg-sand-300/70" />
                  <div className="rounded border border-dashed border-accent/40 bg-accent/5 p-2 text-[10px] text-accent font-medium text-center">
                    fetchpriority=&quot;high&quot; + WebP srcset
                  </div>
                </div>
              </div>

              {/* Tag */}
              <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                Performance
              </span>

              {/* Title */}
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-charcoal group-hover:text-accent transition-colors mb-2">
                <Link href="/articles/why-your-lcp-score-tanks-on-mobile-how-to-fix-it">
                  How to Fix High LCP in WordPress
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                A step-by-step guide to identify and fix the real causes of LCP bloat and understand what helps content load under 2.5s.
              </p>

              {/* Evidence stats */}
              <div className="flex items-center gap-4 py-2 border-y border-sand-200 text-xs font-bold text-charcoal mb-4">
                <div>
                  <span className="block text-sm text-emerald-600">-58%</span>
                  <span className="text-[10px] text-charcoal-muted font-normal">mobile LCP</span>
                </div>
                <div className="h-6 w-px bg-sand-300" />
                <div>
                  <span className="block text-sm">30</span>
                  <span className="text-[10px] text-charcoal-muted font-normal">sites tested</span>
                </div>
                <div className="h-6 w-px bg-sand-300" />
                <div>
                  <span className="block text-sm">10 min</span>
                  <span className="text-[10px] text-charcoal-muted font-normal">remediation</span>
                </div>
              </div>
            </div>

            <Link
              href="/articles/why-your-lcp-score-tanks-on-mobile-how-to-fix-it"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-accent-dark transition-all w-fit"
            >
              <span>Read the article</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2: Technical SEO Guide (3.5 cols) */}
          <div className="lg:col-span-3.5 flex flex-col justify-between rounded-2xl border border-sand-300 bg-white p-5 shadow-sm hover:border-accent/40 transition-all group">
            <div>
              {/* Thumbnail / Code Terminal Preview */}
              <div className="rounded-xl bg-[#14151B] p-3 mb-4 font-mono text-[10px] text-gray-400 space-y-1 overflow-hidden h-28 flex flex-col justify-center">
                <div className="text-emerald-400">$ curl -I https://example.com</div>
                <div className="text-gray-300">HTTP/2 200 OK</div>
                <div className="text-gray-500">x-cache: HIT (LiteSpeed)</div>
                <div className="text-accent">schema: JSON-LD Validated</div>
              </div>

              <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                SEO
              </span>

              <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-accent transition-colors mb-2">
                <Link href="/articles/rank-math-vs-yoast-definitive-seo-plugin-comparison">
                  The Complete Guide to Technical SEO in 2026
                </Link>
              </h3>

              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                Selecting an SEO plugin determines how cleanly your WordPress site structures schema markup and metadata.
              </p>
            </div>

            <div className="text-[11px] text-charcoal-muted font-medium pt-3 border-t border-sand-200">
              By Elena Rostova : 7 min read
            </div>
          </div>

          {/* Card 3: ChatGPT Search Optimization (3.5 cols) */}
          <div className="lg:col-span-3.5 flex flex-col justify-between rounded-2xl border border-sand-300 bg-white p-5 shadow-sm hover:border-accent/40 transition-all group">
            <div>
              {/* Thumbnail / AI Mockup */}
              <div className="rounded-xl bg-[#F7F4EE] border border-sand-300 p-3 mb-4 font-sans text-[10px] text-charcoal-muted space-y-1.5 h-28 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 font-bold text-charcoal text-[11px]">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span>AI Crawler Query Response</span>
                </div>
                <div className="h-1.5 w-full bg-sand-300 rounded" />
                <div className="h-1.5 w-4/5 bg-sand-300/70 rounded" />
                <div className="text-[9px] text-accent font-semibold">llms.txt entity graph detected (4.1x lift)</div>
              </div>

              <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                AI Search
              </span>

              <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-accent transition-colors mb-2">
                <Link href="/articles/how-to-make-your-website-discoverable-by-ai-search-engines">
                  How to Optimize for ChatGPT Search
                </Link>
              </h3>

              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                Configure JSON-LD entity graphs, llms.txt endpoints, and answer-ready passage formatting for generative engines.
              </p>
            </div>

            <div className="text-[11px] text-charcoal-muted font-medium pt-3 border-t border-sand-200">
              By Devin Vance : 6 min read
            </div>
          </div>

        </div>

        {/* Row 2: 3 Secondary Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Article 4: Web Design */}
          <div className="rounded-2xl border border-sand-300 bg-white p-5 shadow-sm hover:border-accent/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="rounded-xl bg-[#F7F4EE] border border-sand-300 p-2.5 mb-3 flex items-center justify-between text-xs font-mono text-charcoal-muted">
                <span>CLS Metric</span>
                <span className="text-emerald-600 font-bold">0.000 (Zero Shift)</span>
              </div>
              <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                Web Design
              </span>
              <h4 className="font-editorial text-base font-bold text-charcoal group-hover:text-accent transition-colors mb-1.5">
                <Link href="/articles/zero-cls-web-design-principles">
                  Modern Web Design Trends That Improve Performance
                </Link>
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                How aspect ratio containers and fluid typography scales eliminate cumulative layout shift forever.
              </p>
            </div>
            <div className="text-[11px] text-charcoal-muted font-medium pt-3 border-t border-sand-200">
              By Elena Rostova : 5 min read
            </div>
          </div>

          {/* Article 5: Tools & Workflows */}
          <div className="rounded-2xl border border-sand-300 bg-white p-5 shadow-sm hover:border-accent/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="rounded-xl bg-[#14151B] p-2.5 mb-3 flex items-center justify-between text-xs font-mono text-white">
                <span className="text-gray-400">Diagnostic Suite</span>
                <span className="text-accent font-bold">VitalsSniper + DevTools</span>
              </div>
              <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                Tools
              </span>
              <h4 className="font-editorial text-base font-bold text-charcoal group-hover:text-accent transition-colors mb-1.5">
                <Link href="/articles/cloudways-vs-siteground-which-host-loads-faster">
                  Best Website Audit Tools for Agencies in 2026
                </Link>
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                Comparing in-browser forensics vs synthetic lab testing to diagnose client bottlenecks accurately.
              </p>
            </div>
            <div className="text-[11px] text-charcoal-muted font-medium pt-3 border-t border-sand-200">
              By Marcus Reed : 9 min read
            </div>
          </div>

          {/* Article 6: Conversion & CRO */}
          <div className="rounded-2xl border border-sand-300 bg-white p-5 shadow-sm hover:border-accent/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="rounded-xl bg-[#F7F4EE] border border-sand-300 p-2.5 mb-3 flex items-center justify-between text-xs font-mono text-charcoal-muted">
                <span>Speed to Revenue</span>
                <span className="text-emerald-600 font-bold">+28% Discovery Calls</span>
              </div>
              <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                Conversion
              </span>
              <h4 className="font-editorial text-base font-bold text-charcoal group-hover:text-accent transition-colors mb-1.5">
                <Link href="/articles/the-agency-guide-to-white-label-website-audits">
                  10 CRO Fixes That Actually Increase Revenue
                </Link>
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                How technical proof-of-flaw audit tear sheets convert cold prospects into high-value optimization retainers.
              </p>
            </div>
            <div className="text-[11px] text-charcoal-muted font-medium pt-3 border-t border-sand-200">
              By Devin Vance : 6 min read
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
