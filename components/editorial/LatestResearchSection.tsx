'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LatestResearchSection() {
  return (
    <section className="py-16 md:py-20 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Empirical Research
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F0F0F]">
              Latest Research &amp; Studies
            </h2>
            <p className="text-base text-[#4B5563] mt-1">
              Original laboratory studies, empirical dataset audits, and actionable findings.
            </p>
          </div>

          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <span>View all research</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 2-Column Split: Featured Study with Chart (Left) + 2 Stacked Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Featured AI Search Study with Data Visualization (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-6 sm:p-8 transition-colors hover:border-[#D1D5DB] group">
            <div>
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#2563EB] mb-4">
                <span>AI Search &amp; GEO</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-2">
                AI Search Readiness Study 2026
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                We analyzed 200 URLs across 10 high-traffic domains to understand what factual markup helps content get cited in AI search engines.
              </p>

              {/* Visual Split: Key Metrics + Comparative Bar Chart */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center p-5 rounded-xl bg-white border border-[#E5E7EB] mb-6">
                
                {/* Metric Summary Column */}
                <div className="sm:col-span-6 space-y-3">
                  <div>
                    <div className="text-3xl font-bold text-[#0F0F0F] font-mono tracking-tight">3.2x</div>
                    <div className="text-xs text-[#6B7280]">observed citation frequency (structured claims)</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#0F0F0F] font-mono tracking-tight">200</div>
                    <div className="text-xs text-[#6B7280]">technical URLs audited</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#0F0F0F] font-mono tracking-tight">10</div>
                    <div className="text-xs text-[#6B7280]">production domains monitored</div>
                  </div>
                </div>

                {/* Comparative Bar Chart */}
                <div className="sm:col-span-6 flex flex-col items-center justify-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] mb-4 text-center w-full">
                    Observed Citation Frequency
                  </div>
                  
                  <div className="w-full max-w-[200px]">
                    {/* Plot Area with Baseline */}
                    <div className="flex items-end justify-center gap-7 h-28 w-full border-b border-[#E5E7EB] pb-0">
                      {/* Bar 1: Structured Claims (3.2x) */}
                      <div className="flex flex-col items-center gap-1.5 w-16">
                        <span className="text-xs font-bold text-[#0F0F0F] font-mono">3.2x</span>
                        <div className="w-full bg-[#2563EB] rounded-t-md h-20 transition-colors group-hover:bg-[#1D4ED8]" />
                      </div>

                      {/* Bar 2: Unstructured (Baseline 1.0x) */}
                      <div className="flex flex-col items-center gap-1.5 w-16">
                        <span className="text-xs font-medium text-[#6B7280] font-mono">1.0x</span>
                        <div className="w-full bg-[#E5E7EB] rounded-t-md h-7" />
                      </div>
                    </div>

                    {/* X-Axis Category Labels */}
                    <div className="flex items-start justify-center gap-7 w-full pt-2">
                      <span className="w-16 text-center text-[11px] font-semibold text-[#0F0F0F] leading-tight">
                        Structured
                      </span>
                      <span className="w-16 text-center text-[11px] font-medium text-[#6B7280] leading-tight">
                        Unstructured
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Read Full Study CTA */}
            <div>
              <Link
                href="/research/ai-search-readiness"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                <span>Read the full study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2 Stacked Research Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Study 1: Mobile Performance Benchmark */}
            <div className="flex-1 flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-6 transition-colors hover:border-[#D1D5DB] group">
              <div>
                <span className="inline-block rounded-full bg-white border border-[#E5E7EB] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  Performance
                </span>

                <h3 className="text-lg font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-2">
                  Mobile Performance Benchmark 2026
                </h3>

                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  We tested 500 real production websites to find what architectural choices actually impact Core Web Vitals in field conditions.
                </p>

                {/* 3 Metric Summary Strip */}
                <div className="flex items-center gap-4 py-2.5 border-y border-[#E5E7EB] mb-4 text-xs font-bold text-[#0F0F0F]">
                  <div>
                    <span className="block text-sm font-mono">500</span>
                    <span className="text-[10px] text-[#6B7280] font-normal">websites</span>
                  </div>
                  <div className="h-6 w-px bg-[#E5E7EB]" />
                  <div>
                    <span className="block text-sm font-mono">8</span>
                    <span className="text-[10px] text-[#6B7280] font-normal">regions</span>
                  </div>
                  <div className="h-6 w-px bg-[#E5E7EB]" />
                  <div>
                    <span className="block text-sm font-mono">3</span>
                    <span className="text-[10px] text-[#6B7280] font-normal">metrics</span>
                  </div>
                </div>
              </div>

              <Link
                href="/research/website-performance-report"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
              >
                <span>Read the study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Study 2: Schema & AI Citations Analysis */}
            <div className="flex-1 flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-6 transition-colors hover:border-[#D1D5DB] group">
              <div>
                <span className="inline-block rounded-full bg-white border border-[#E5E7EB] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  Technical SEO
                </span>

                <h3 className="text-lg font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-2">
                  Schema &amp; AI Citations Analysis
                </h3>

                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  How structured entity data and factual schemas influence visibility in ChatGPT, Perplexity, and Google AI Overviews.
                </p>

                {/* 3 Metric Summary Strip */}
                <div className="flex items-center gap-4 py-2.5 border-y border-[#E5E7EB] mb-4 text-xs font-bold text-[#0F0F0F]">
                  <div>
                    <span className="block text-sm font-mono">200</span>
                    <span className="text-[10px] text-[#6B7280] font-normal">URLs</span>
                  </div>
                  <div className="h-6 w-px bg-[#E5E7EB]" />
                  <div>
                    <span className="block text-sm font-mono">4</span>
                    <span className="text-[10px] text-[#6B7280] font-normal">platforms</span>
                  </div>
                  <div className="h-6 w-px bg-[#E5E7EB]" />
                  <div>
                    <span className="block text-sm font-mono">90</span>
                    <span className="text-[10px] text-[#6B7280] font-normal">days</span>
                  </div>
                </div>
              </div>

              <Link
                href="/research/agency-websites-study"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
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
