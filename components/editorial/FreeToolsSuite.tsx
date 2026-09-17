'use client';

import React from 'react';
import Link from 'next/link';
import { FREE_TOOLS, PRO_TOOLS } from '@/data/tools';
import { ArrowRight, Wrench, Sparkles, Check, ExternalLink } from 'lucide-react';

export default function FreeToolsSuite() {
  return (
    <section className="py-20 border-b border-sand-300 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Web Intelligence Suite
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mt-1">
              Free &amp; Professional Web Tools
            </h2>
            <p className="text-charcoal-muted max-w-xl text-sm mt-2">
              Free utility tools to diagnose bottlenecks instantly, backed by our commercial agency platform for deep forensic analysis.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-bold text-terracotta hover:underline"
          >
            <span>Explore All Diagnostic Tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Flagship Pro Card (Pinned) */}
          <div className="p-6 sm:p-7 rounded-2xl border-2 border-terracotta bg-[#faf8f5] flex flex-col justify-between shadow-sm relative group">
            <div className="absolute -top-3 left-6 rounded-full bg-terracotta px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              Commercial Flagship
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-3 mt-1">
                <span className="text-xs font-bold text-terracotta font-mono">Pro Platform</span>
                <span className="text-[11px] font-bold text-charcoal bg-sand-300 px-2 py-0.5 rounded">
                  $39 Lifetime
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-charcoal mb-2">
                VitalsSniper PRO
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed mb-5">
                The active tab forensic inspector that highlights LCP elements live on screen, benchmarks competitors side-by-side, and generates white-label agency PDF teardowns.
              </p>

              <div className="space-y-2 text-xs text-charcoal-light mb-6 border-t border-sand-300/80 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-terracotta flex-shrink-0" />
                  <span>50ms in-tab client execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-terracotta flex-shrink-0" />
                  <span>White-label PDF with booking CTA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-terracotta flex-shrink-0" />
                  <span>1-Click Lead CRM &amp; CSV export</span>
                </div>
              </div>
            </div>

            <Link
              href="/vitalssniper"
              className="w-full rounded-xl bg-terracotta py-3 text-center text-xs font-bold text-white hover:bg-terracotta-dark transition-all block shadow-xs"
            >
              Get VitalsSniper PRO ($39)
            </Link>
          </div>

          {/* Free Tools Cards */}
          {FREE_TOOLS.slice(0, 5).map((tool) => (
            <div
              key={tool.slug}
              className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="editorial-pill">
                    Free Tool
                  </span>
                  {tool.category && (
                    <span className="text-[10px] font-bold text-charcoal bg-sand-200 px-2 py-0.5 rounded-full border border-sand-300">
                      {tool.category}
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-xl font-bold text-charcoal mb-2 group-hover:text-terracotta transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-5">
                  {tool.shortDescription}
                </p>

                <div className="space-y-2 text-xs text-charcoal-subtle mb-6 border-t border-sand-300 pt-4">
                  {tool.howToImprove.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/tools/${tool.slug}`}
                className="w-full rounded-xl border border-sand-300 bg-[#faf8f5] py-2.5 text-center text-xs font-bold text-charcoal hover:border-terracotta/40 hover:text-terracotta hover:bg-white transition-all block"
              >
                Launch Free Tool &rarr;
              </Link>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
