'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ActionBanner() {
  return (
    <section className="py-12 border-b border-sand-300 bg-[#F7F4EE]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl bg-[#1D1C1A] border border-[#33312C] p-8 sm:p-10 shadow-lg text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-sand-400 block mb-2">
                Take Control of Your Website
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Don&apos;t just read about website problems. Find yours.
              </h2>
            </div>

            {/* Right Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-gray-300 max-w-xs leading-relaxed">
                Run a free website audit and get a detailed report with actionable insights.
              </p>

              <Link
                href="/free-audit-report"
                className="rounded-xl bg-accent px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-accent-dark hover:scale-[1.01] flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>Run a Free Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
