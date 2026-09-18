'use client';

import React from 'react';
import Link from 'next/link';
import { CASE_STUDY_100_SITES } from '@/data/case_studies';
import { BarChart3, AlertTriangle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export default function ResearchCaseStudy() {
  const { title, subtitle, sampleSize, date, findings } = CASE_STUDY_100_SITES;

  return (
    <section className="py-20 border-b border-sand-300 bg-[#F7F4EE]">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted shadow-2xs mb-3">
            <BarChart3 className="h-3.5 w-3.5 text-terracotta" />
            <span>Original Research &bull; {date} Edition</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal max-w-2xl mx-auto">
            {title}
          </h2>
          <p className="text-charcoal-muted max-w-xl mx-auto text-xs sm:text-sm mt-2">
            {subtitle}
          </p>
        </div>

        {/* 4 Core Findings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {findings.map((item, idx) => (
            <div
              key={item.label}
              className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-editorial text-3xl sm:text-4xl font-bold text-terracotta">
                    {item.metric}
                  </span>
                  <span className="text-[11px] font-bold text-charcoal-muted bg-sand-200 px-2.5 py-1 rounded-md">
                    of {sampleSize} Sites
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                  {item.label}
                </h3>
                
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  <strong className="text-charcoal">The Flaw:</strong> {item.problem}
                </p>

                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300 text-xs text-charcoal-light leading-relaxed mb-4">
                  <strong className="text-rose-700">Performance Penalty:</strong> {item.impact}
                </div>
              </div>

              <div className="pt-3 border-t border-sand-300 text-xs text-emerald-800">
                <strong>Fix:</strong> {item.remediation}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Bar */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta/10 text-terracotta">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-charcoal block">Download the Complete 100-Website Dataset</span>
              <span className="text-charcoal-muted text-[11px]">Includes anonymized DOM element counts, CMS distributions, and TTFB scores.</span>
            </div>
          </div>

          <Link
            href="/free-audit-report"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-charcoal text-white font-bold hover:bg-black transition-colors"
          >
            <span>Run Free Teardown on Your Site</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
