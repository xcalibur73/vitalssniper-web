'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FREE_TOOLS, PRO_TOOLS, DIRECTORY_TOOLS } from '@/data/tools';
import { Wrench, Sparkles, Check, ArrowRight, ShieldCheck, Zap, FolderSearch } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'pro'>('all');

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-xs">
            <Wrench className="h-3.5 w-3.5 text-accent" />
            <span>Web Performance &amp; Diagnostic Suite</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Web Tools Catalog
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Free forensic utilities to uncover bottlenecks in 50 milliseconds, paired with our agency-grade commercial platform to close optimization retainers.
          </p>

          {/* Directory Quick Link */}
          <div className="mt-4">
            <Link
              href="/tools/directory"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
            >
              <FolderSearch className="h-3.5 w-3.5" />
              <span>Looking for external SEO &amp; hosting tools? Browse the Public Tool Directory</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center rounded-xl border border-sand-300 bg-white p-1 text-xs font-semibold shadow-xs">
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
                  ? 'bg-accent text-white'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Free Tools ({FREE_TOOLS.length})
            </button>
            <button
              onClick={() => setActiveTab('pro')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'pro'
                  ? 'bg-accent text-white'
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
              <Sparkles className="h-4 w-4 text-accent" />
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                Pro Tools (Monetization &amp; Agency Scale)
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PRO_TOOLS.map((tool) => (
                <div
                  key={tool.slug}
                  className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all ${
                    tool.slug === 'vitalssniper-pro'
                      ? 'border-2 border-accent bg-white shadow-md relative'
                      : 'paper-card'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{tool.icon}</span>
                        <span className="text-[11px] font-bold text-accent uppercase tracking-wider font-mono">
                          {tool.category}
                        </span>
                      </div>
                      {tool.slug === 'vitalssniper-pro' && (
                        <span className="text-[10px] font-bold text-white bg-accent px-2.5 py-0.5 rounded-full">
                          Flagship
                        </span>
                      )}
                    </div>

                    <h3 className="font-editorial text-2xl font-bold text-charcoal mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-5">
                      {tool.fullDescription}
                    </p>

                    <div className="p-3 rounded-lg bg-[#F7F4EE] border border-sand-300 text-xs text-charcoal-muted mb-6">
                      <strong className="text-charcoal block mb-0.5">Workflow Advantage:</strong>
                      {tool.whatItMeans}
                    </div>
                  </div>

                  <Link
                    href={tool.slug === 'vitalssniper-pro' ? '/products/vitalssniper-pro' : `/tools/${tool.slug}`}
                    className={`w-full py-3 rounded-xl text-center text-xs font-bold transition-all block ${
                      tool.slug === 'vitalssniper-pro'
                        ? 'bg-accent text-white hover:bg-accent-dark shadow-sm'
                        : 'border border-sand-300 bg-[#F7F4EE] text-charcoal hover:border-accent/40 hover:text-accent hover:bg-white'
                    }`}
                  >
                    {tool.slug === 'vitalssniper-pro' ? 'Explore VitalsSniper PRO' : 'Learn More'} &rarr;
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
                Free Tools (Instant In-Browser Diagnostic Utilities)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FREE_TOOLS.map((tool) => (
                <div
                  key={tool.slug}
                  className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-accent/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <span className="editorial-pill">
                        100% Free
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                      {tool.shortDescription}
                    </p>

                    {tool.referenceBenchmark && (
                      <div className="rounded-lg bg-[#F7F4EE] border border-sand-300 px-3 py-1.5 text-[11px] font-medium text-charcoal mb-4">
                        {tool.referenceBenchmark}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/tools/${tool.slug}`}
                    className="w-full rounded-xl border border-sand-300 bg-[#F7F4EE] py-2.5 text-center text-xs font-bold text-charcoal hover:border-accent/40 hover:text-accent hover:bg-white transition-all block"
                  >
                    Launch Free Tool &rarr;
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
