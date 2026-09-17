'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Wrench, Sparkles, TrendingUp, Zap } from 'lucide-react';
import UrlAnalyzerBar from '@/components/UrlAnalyzerBar';

export default function EditorialHero() {
  return (
    <section className="relative pt-16 pb-20 border-b border-sand-300 bg-[#faf8f5]">
      <div className="mx-auto max-w-5xl px-6 text-center">
        
        {/* Editorial Masthead Tagline */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-1.5 text-xs font-semibold text-charcoal-muted shadow-sm mb-8">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span>Independent Benchmarks &bull; Digital Publication &amp; Web Tools</span>
        </div>

        {/* Major Publication Headline in Serif */}
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal leading-[1.08] mb-6">
          Better Websites Start With <br className="hidden sm:inline" />
          <span className="italic font-normal text-accent">Better Information.</span>
        </h1>

        {/* Subhead */}
        <p className="text-base sm:text-xl text-charcoal-muted max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
          Practical research, tools and guides for website performance, SEO, AI search, web design and conversion.
        </p>

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/tools"
            className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md hover:scale-[1.01] flex items-center justify-center gap-2.5"
          >
            <Wrench className="h-4 w-4" />
            <span>Explore Tools</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/articles"
            className="w-full sm:w-auto rounded-xl border border-sand-300 bg-white px-8 py-4 text-sm font-bold text-charcoal shadow-sm transition-all hover:border-accent/40 hover:text-accent flex items-center justify-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-accent" />
            <span>Read the Latest</span>
          </Link>
        </div>

        {/* Underneath: Interactive URL Input Bar */}
        <div className="mb-14">
          <UrlAnalyzerBar />
        </div>

        {/* Editorial Value Strip: 3 Clean Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-2xl border border-sand-300 bg-white shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta block mb-1">
              01. Content
            </span>
            <h3 className="font-editorial text-lg font-bold text-charcoal mb-1">Independent Research</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Real-world Core Web Vitals audits, speed comparisons, and no-fluff technical remediation guides.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-sand-300 bg-white shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta block mb-1">
              02. Tools
            </span>
            <h3 className="font-editorial text-lg font-bold text-charcoal mb-1">Forensic Software</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Proprietary diagnostic tools like VitalsSniper PRO, plus free in-browser DOM bloat calculators.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-sand-300 bg-white shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta block mb-1">
              03. Reviews
            </span>
            <h3 className="font-editorial text-lg font-bold text-charcoal mb-1">Vetted Recommendations</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Objective hosting benchmarks, page builder teardowns, and SEO software matrices tested under load.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
