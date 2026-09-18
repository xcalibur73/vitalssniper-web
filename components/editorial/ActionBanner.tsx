'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity } from 'lucide-react';

export default function ActionBanner() {
  return (
    <section className="py-16 md:py-20 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-xl bg-[#111827] border border-[#1F2937] p-8 sm:p-12 shadow-none text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 text-[11px] font-mono uppercase tracking-wider text-[#60A5FA] mb-4">
                <span>Free Technical Audit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-3">
                Don&apos;t just read about website problems. Find yours.
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                Run an instant synthetic audit and get a comprehensive diagnostic breakdown with prioritized fixes.
              </p>
            </div>

            {/* Right Action */}
            <div className="flex-shrink-0">
              <Link
                href="/tools/website-speed-test"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-none hover:bg-[#1D4ED8] transition-colors"
              >
                <Activity className="h-4 w-4" />
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
