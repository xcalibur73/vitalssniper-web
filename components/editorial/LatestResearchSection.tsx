'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';

export default function LatestResearchSection() {
  return (
    <section className="py-14 sm:py-16 border-b border-sand-300 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
              Latest Research
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Original studies, real data, actionable insights.
            </p>
          </div>

          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider hover:underline"
          >
            <span>View all research</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 2-Column Split: Featured Study with Chart (Left) + 2 Stacked Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Featured AI Search Study with Data Visualization (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-sand-300 bg-[#F7F4EE] p-6 sm:p-7 shadow-sm hover:border-accent/40 transition-all group">
            <div>
              {/* Pill */}
              <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent mb-3">
                AI Search
              </span>

              {/* Title */}
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-charcoal group-hover:text-accent transition-colors mb-2">
                AI Search Readiness Study 2026
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6">
                We analyzed 200 URLs across 10 high-traffic domains to understand what helps content get cited in AI search engines.
              </p>

              {/* Visual Split: 3 Key Metrics (Left) + Comparative Bar Chart (Right) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center p-4 rounded-xl bg-white border border-sand-300 mb-6">
                
                {/* Metric Summary Column */}
                <div className="sm:col-span-6 space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-charcoal tracking-tight">4.1x</div>
                    <div className="text-[11px] text-charcoal-muted">citation lift (llms.txt)</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-charcoal tracking-tight">48h</div>
                    <div className="text-[11px] text-charcoal-muted">faster indexing</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-charcoal tracking-tight">10</div>
                    <div className="text-[11px] text-charcoal-muted">production domains</div>
                  </div>
                </div>

                {/* Comparative Bar Chart */}
                <div className="sm:col-span-6 flex flex-col items-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2 text-center w-full">
                    Citation Rate Lift
                  </div>
                  
                  <div className="flex items-end justify-center gap-6 h-28 w-full px-2 border-b border-sand-300 pb-1">
                    {/* Bar 1: With llms.txt (4.1x) */}
                    <div className="flex flex-col items-center gap-1 w-12">
                      <span className="text-[10px] font-bold text-charcoal">4.1x</span>
                      <div className="w-full bg-[#20201E] rounded-t-md h-24 transition-all group-hover:bg-accent" />
                      <span className="text-[9px] font-medium text-charcoal text-center leading-tight whitespace-nowrap">With llms.txt</span>
                    </div>

                    {/* Bar 2: Without (Baseline 1.0x) */}
                    <div className="flex flex-col items-center gap-1 w-12">
                      <span className="text-[10px] font-bold text-charcoal-muted">1.0x</span>
                      <div className="w-full bg-sand-400/60 rounded-t-md h-8" />
                      <span className="text-[9px] font-medium text-charcoal-muted text-center leading-tight">Without</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Read Full Study CTA */}
            <div>
              <Link
                href="/research/ai-search-readiness"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-accent-dark transition-all"
              >
                <span>Read the full study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2 Stacked Research Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            
            {/* Study 1: Mobile Performance Benchmark */}
            <div className="flex-1 flex flex-col justify-between rounded-2xl border border-sand-300 bg-[#F7F4EE] p-5 sm:p-6 shadow-sm hover:border-accent/40 transition-all group">
              <div>
                <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                  Performance
                </span>

                <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-accent transition-colors mb-1.5">
                  Mobile Performance Benchmark 2026
                </h3>

                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  We tested 500 real websites to find what actually impacts Core Web Vitals in the wild.
                </p>

                {/* 3 Metric Pills */}
                <div className="flex items-center gap-4 py-2 border-y border-sand-300/60 mb-4 text-xs font-bold text-charcoal">
                  <div>
                    <span className="block text-sm">500</span>
                    <span className="text-[10px] text-charcoal-muted font-normal">websites</span>
                  </div>
                  <div className="h-6 w-px bg-sand-300" />
                  <div>
                    <span className="block text-sm">8</span>
                    <span className="text-[10px] text-charcoal-muted font-normal">regions</span>
                  </div>
                  <div className="h-6 w-px bg-sand-300" />
                  <div>
                    <span className="block text-sm">3</span>
                    <span className="text-[10px] text-charcoal-muted font-normal">metrics</span>
                  </div>
                </div>
              </div>

              <Link
                href="/research/website-performance-report"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                <span>Read the study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Study 2: Schema & AI Citations Analysis */}
            <div className="flex-1 flex flex-col justify-between rounded-2xl border border-sand-300 bg-[#F7F4EE] p-5 sm:p-6 shadow-sm hover:border-accent/40 transition-all group">
              <div>
                <span className="inline-block rounded-full bg-sand-300/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                  SEO
                </span>

                <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-accent transition-colors mb-1.5">
                  Schema &amp; AI Citations Analysis
                </h3>

                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  How structured data and content types influence visibility in ChatGPT, Perplexity and Google AI Overviews.
                </p>

                {/* 3 Metric Pills */}
                <div className="flex items-center gap-4 py-2 border-y border-sand-300/60 mb-4 text-xs font-bold text-charcoal">
                  <div>
                    <span className="block text-sm">200</span>
                    <span className="text-[10px] text-charcoal-muted font-normal">URLs</span>
                  </div>
                  <div className="h-6 w-px bg-sand-300" />
                  <div>
                    <span className="block text-sm">4</span>
                    <span className="text-[10px] text-charcoal-muted font-normal">platforms</span>
                  </div>
                  <div className="h-6 w-px bg-sand-300" />
                  <div>
                    <span className="block text-sm">90</span>
                    <span className="text-[10px] text-charcoal-muted font-normal">days</span>
                  </div>
                </div>
              </div>

              <Link
                href="/research/agency-websites-study"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                <span>Read the study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
