'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench, Sparkles, ShieldCheck } from 'lucide-react';

export default function EditorialDarkCta() {
  return (
    <section className="py-20 bg-[#12141d] text-white relative overflow-hidden border-b border-white/10">
      {/* Background glow & subtle tech grid */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-terracotta/15 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold text-gray-300 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-terracotta-light" />
          <span>Instant In-Browser Telemetry</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-5">
          Don&apos;t just read about website problems. <br className="hidden sm:inline" />
          <span className="italic text-terracotta-light">Find yours.</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Test any target domain in 50 milliseconds. Inspect DOM element nesting, identify the CMS and active page builder, and verify cellular payload budgets without signing up.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/free-audit-report"
            className="w-full sm:w-auto rounded-xl bg-terracotta px-8 py-4 text-sm font-bold text-white shadow-lg shadow-terracotta/20 hover:bg-terracotta-dark hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Wrench className="h-4 w-4" />
            <span>Run a Free Audit</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/vitalssniper"
            className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-gray-300 hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <span>Explore VitalsSniper PRO ($39)</span>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Client-Side Privacy</span>
          </div>
          <span>&bull;</span>
          <span>Zero Server Logs</span>
          <span>&bull;</span>
          <span>No Credit Card Required</span>
        </div>

      </div>
    </section>
  );
}
