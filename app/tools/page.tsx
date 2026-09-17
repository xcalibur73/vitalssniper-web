'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FREE_TOOLS, PRO_TOOLS } from '@/data/tools';
import { Wrench, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'pro'>('all');

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-2xs">
            <Wrench className="h-3.5 w-3.5 text-terracotta" />
            <span>Web Performance &amp; Diagnostic Suite</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Web Tools Catalog
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Free forensic tools to uncover bottlenecks in 50 milliseconds, paired with our agency-grade commercial platform to close optimization retainers.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center rounded-xl border border-sand-300 bg-white p-1 text-xs font-semibold shadow-2xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-charcoal text-white'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              All Tools ({FREE_TOOLS.length + PRO_TOOLS.length})
            </button>
            <button
              onClick={() => setActiveTab('free')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'free'
                  ? 'bg-terracotta text-white'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Free Tools ({FREE_TOOLS.length})
            </button>
            <button
              onClick={() => setActiveTab('pro')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'pro'
                  ? 'bg-terracotta text-white'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Pro Agency Tools ({PRO_TOOLS.length})
            </button>
          </div>
        </div>

        {/* PRO TOOLS SECTION */}
        {(activeTab === 'all' || activeTab === 'pro') && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-4 w-4 text-terracotta" />
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                Pro Tools (Monetization &amp; Agency Scale)
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PRO_TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all ${
                    tool.id === 'vitalssniper-pro'
                      ? 'border-2 border-terracotta bg-white shadow-md relative'
                      : 'paper-card'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider font-mono">
                        {tool.tier} Suite
                      </span>
                      {tool.badge && (
                        <span className="text-[10px] font-bold text-white bg-terracotta px-2.5 py-0.5 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-editorial text-2xl font-bold text-charcoal mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-5">
                      {tool.description}
                    </p>

                    <div className="space-y-2 text-xs text-charcoal-light border-t border-sand-300 pt-4 mb-6">
                      {tool.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={tool.href}
                    className={`w-full py-3 rounded-xl text-center text-xs font-bold transition-all block ${
                      tool.id === 'vitalssniper-pro'
                        ? 'bg-terracotta text-white hover:bg-terracotta-dark shadow-sm'
                        : 'border border-sand-300 bg-[#faf8f5] text-charcoal hover:border-terracotta/40 hover:text-terracotta hover:bg-white'
                    }`}
                  >
                    {tool.ctaText} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FREE TOOLS SECTION */}
        {(activeTab === 'all' || activeTab === 'free') && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="h-4 w-4 text-emerald-600" />
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                Free Tools (Instant In-Browser Scanners)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FREE_TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="editorial-pill">
                        100% Free
                      </span>
                      {tool.badge && (
                        <span className="text-[10px] font-bold text-charcoal bg-sand-200 px-2 py-0.5 rounded-full border border-sand-300">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-5">
                      {tool.description}
                    </p>

                    <div className="space-y-2 text-xs text-charcoal-subtle border-t border-sand-300 pt-4 mb-6">
                      {tool.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={tool.href}
                    className="w-full rounded-xl border border-sand-300 bg-[#faf8f5] py-2.5 text-center text-xs font-bold text-charcoal hover:border-terracotta/40 hover:text-terracotta hover:bg-white transition-all block"
                  >
                    {tool.ctaText} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
