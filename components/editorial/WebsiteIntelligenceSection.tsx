'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Gauge, Search, Layers } from 'lucide-react';

const INTELLIGENCE_TOOLS = [
  {
    name: 'VitalsSniper PRO',
    badge: 'Premium',
    badgeType: 'premium',
    description: 'In-depth Core Web Vitals & technical SEO audits with visual diagnostics.',
    link: '/vitalssniper',
    linkText: 'Learn more',
    icon: Zap,
  },
  {
    name: 'LCP Checker',
    badge: 'Free',
    badgeType: 'free',
    description: 'Measure and analyze your Largest Contentful Paint (LCP) instantly.',
    link: '/tools/lcp-checker',
    linkText: 'Try it now',
    icon: Gauge,
  },
  {
    name: 'SEO Inspector',
    badge: 'Free',
    badgeType: 'free',
    description: 'Check on-page SEO, schema, headers and more in seconds.',
    link: '/tools/website-speed-test',
    linkText: 'Try it now',
    icon: Search,
  },
  {
    name: 'Page Weight Checker',
    badge: 'Free',
    badgeType: 'free',
    description: 'Analyze page size, resource breakdown and optimization opportunities.',
    link: '/tools/website-speed-test',
    linkText: 'Try it now',
    icon: Layers,
  },
];

export default function WebsiteIntelligenceSection() {
  return (
    <section className="py-14 sm:py-16 border-b border-sand-300 bg-[#F7F4EE]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
              Website Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Powerful tools for deeper insights and better decisions.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider hover:underline"
          >
            <span>View all tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4-Card Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INTELLIGENCE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="bento-card flex flex-col justify-between p-5 shadow-xs hover:shadow-sm transition-all group"
              >
                <div>
                  {/* Icon + Badge Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-action/10 border border-action/20 flex items-center justify-center text-action group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        tool.badgeType === 'premium'
                          ? 'border-action/30 bg-action/10 text-action'
                          : 'border-emerald-500/30 bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  {/* Tool Title */}
                  <h3 className="text-base font-bold text-charcoal group-hover:text-action transition-colors mb-2">
                    {tool.name}
                  </h3>

                  {/* Tool Description */}
                  <p className="text-xs text-charcoal-muted leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <Link
                  href={tool.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-action hover:underline group/link"
                >
                  <span>{tool.linkText}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
