'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Gauge, Search, Layers, CheckCircle2 } from 'lucide-react';

const SECONDARY_TOOLS = [
  {
    name: 'LCP Element Finder',
    description: 'Pinpoint the Largest Contentful Paint node, calculate render delays, and optimize hero media.',
    link: '/tools/lcp-checker',
    icon: Gauge,
    metric: '< 2.5s Target',
  },
  {
    name: 'Page Weight Checker',
    description: 'Inspect asset distribution, JavaScript payload size, font budgets, and uncompressed CSS.',
    link: '/tools/page-weight-checker',
    icon: Layers,
    metric: '< 1.5MB Target',
  },
  {
    name: 'Technical SEO Inspector',
    description: 'Validate Schema.org JSON-LD, Open Graph tags, canonical headers, and robots directives.',
    link: '/tools/website-speed-test',
    icon: Search,
    metric: '100% Validated',
  },
];

export default function WebsiteIntelligenceSection() {
  return (
    <section className="py-16 md:py-20 border-b border-[#E5E7EB] bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Diagnostic Suite
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F0F0F]">
              Website Intelligence Tools
            </h2>
            <p className="text-base text-[#4B5563] mt-1">
              Deterministic tools for performance engineering, technical audits, and Core Web Vitals.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <span>View all tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Featured Card + Secondary Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Prominent Featured Card: Website Audit */}
          <div className="lg:col-span-6 rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-none transition-colors hover:border-[#D1D5DB]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg border border-[#2563EB]/20 bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/10 text-[#1D4ED8]">
                  Featured Tool
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F0F0F] mb-3">
                Comprehensive Website Audit
              </h3>
              
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6">
                Run an end-to-end synthetic scan measuring TTFB, Core Web Vitals (LCP, INP, CLS), DOM depth, page weight, security headers, and structured data in one unified report.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-[#F8F8F8]">
                  <div className="text-xs text-[#6B7280]">Speed &amp; Vitals</div>
                  <div className="text-sm font-bold text-[#0F0F0F] mt-0.5">LCP, INP, CLS, TTFB</div>
                </div>
                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-[#F8F8F8]">
                  <div className="text-xs text-[#6B7280]">Code &amp; Health</div>
                  <div className="text-sm font-bold text-[#0F0F0F] mt-0.5">DOM Tree, Schemas, Cache</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                <span>Zero registration required</span>
              </div>
              <Link
                href="/tools/website-speed-test"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
              >
                <span>Run Free Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Secondary 3 Tools Column */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {SECONDARY_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.name}
                  href={tool.link}
                  className="rounded-xl border border-[#E5E7EB] bg-white p-5 flex items-start gap-4 transition-colors hover:border-[#D1D5DB] group"
                >
                  <div className="h-10 w-10 rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] flex items-center justify-center text-[#2563EB] flex-shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors">
                        {tool.name}
                      </h4>
                      <span className="text-[11px] font-mono font-medium text-[#6B7280] bg-[#F8F8F8] px-2 py-0.5 rounded border border-[#E5E7EB]">
                        {tool.metric}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              );
            })}

            {/* VitalsSniper Pro Promotion Strip */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#047857]" />
                <span className="text-xs font-semibold text-[#0F0F0F]">Need automated monitoring?</span>
                <span className="text-xs text-[#6B7280] hidden sm:inline">VitalsSniper PRO runs 24/7 audits.</span>
              </div>
              <Link
                href="/vitalssniper"
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 flex-shrink-0"
              >
                <span>Explore VitalsSniper</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
