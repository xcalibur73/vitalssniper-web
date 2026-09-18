'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FREE_TOOLS, PRO_TOOLS } from '@/data/tools';
import { Wrench, Sparkles, ArrowRight, FolderSearch } from 'lucide-react';

export default function ToolsPageClient() {
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'pro'>('all');

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1 text-xs font-semibold text-[#4B5563] mb-4 shadow-xs">
          <Wrench className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Web Performance &amp; Diagnostic Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F0F0F] mb-4">
          Web Tools Catalog
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          Free forensic utilities to uncover bottlenecks in 50 milliseconds, paired with our agency grade commercial platform to close optimization retainers.
        </p>

        {/* Directory Quick Link */}
        <div className="mt-4">
          <Link
            href="/tools/directory"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
          >
            <FolderSearch className="h-3.5 w-3.5" />
            <span>Looking for external SEO &amp; hosting tools? Browse the Public Tool Directory</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 inline-flex items-center rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-1 text-xs font-semibold shadow-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'all'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#0F0F0F]'
            }`}
          >
            All Tools ({FREE_TOOLS.length + PRO_TOOLS.length})
          </button>
          <button
            onClick={() => setActiveTab('free')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'free'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#0F0F0F]'
            }`}
          >
            Free Tools ({FREE_TOOLS.length})
          </button>
          <button
            onClick={() => setActiveTab('pro')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'pro'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#0F0F0F]'
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
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F]">
              Pro Tools (Monetization &amp; Agency Scale)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PRO_TOOLS.map((tool) => (
              <div
                key={tool.slug}
                className={`p-6 rounded-xl flex flex-col justify-between transition-colors bg-white ${
                  tool.slug === 'vitalssniper-pro'
                    ? 'border-2 border-[#2563EB] shadow-xs relative'
                    : 'border border-[#E5E7EB] hover:border-[#D1D5DB]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{tool.icon}</span>
                      <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider font-mono">
                        {tool.category}
                      </span>
                    </div>
                    {tool.slug === 'vitalssniper-pro' && (
                      <span className="text-[10px] font-bold text-white bg-[#2563EB] px-2.5 py-0.5 rounded-full">
                        Flagship
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed mb-5">
                    {tool.fullDescription}
                  </p>

                  <div className="p-3 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] text-xs text-[#4B5563] mb-6">
                    <strong className="text-[#0F0F0F] block mb-0.5">Workflow Advantage:</strong>
                    {tool.whatItMeans}
                  </div>
                </div>

                <Link
                  href={tool.slug === 'vitalssniper-pro' ? '/products/vitalssniper-pro' : `/tools/${tool.slug}`}
                  className={`w-full py-2.5 rounded-lg text-center text-xs font-semibold transition-colors block ${
                    tool.slug === 'vitalssniper-pro'
                      ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                      : 'border border-[#E5E7EB] bg-white text-[#0F0F0F] hover:border-[#2563EB] hover:text-[#2563EB]'
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
            <Wrench className="h-4 w-4 text-[#10B981]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F]">
              Free Tools (Instant In Browser Diagnostic Utilities)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_TOOLS.map((tool) => (
              <div
                key={tool.slug}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between hover:border-[#D1D5DB] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      100% Free
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                    {tool.shortDescription}
                  </p>

                  {tool.referenceBenchmark && (
                    <div className="rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1.5 text-[11px] font-medium text-[#4B5563] mb-4">
                      {tool.referenceBenchmark}
                    </div>
                  )}
                </div>

                <Link
                  href={`/tools/${tool.slug}`}
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2 text-center text-xs font-semibold text-[#0F0F0F] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors block"
                >
                  Launch Free Tool &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
