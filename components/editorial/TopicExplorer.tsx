'use client';

import React from 'react';
import Link from 'next/link';
import { EDITORIAL_BEATS } from '@/data/posts';
import { ArrowRight, Gauge, Search, Bot, Palette, TrendingUp, Cpu } from 'lucide-react';

export default function TopicExplorer() {
  const getBeatIcon = (name: string) => {
    switch (name) {
      case 'Performance':
        return <Gauge className="h-5 w-5 text-terracotta" />;
      case 'SEO':
        return <Search className="h-5 w-5 text-terracotta" />;
      case 'AI & GEO':
        return <Bot className="h-5 w-5 text-terracotta" />;
      case 'Web Design':
        return <Palette className="h-5 w-5 text-terracotta" />;
      case 'Conversion':
        return <TrendingUp className="h-5 w-5 text-terracotta" />;
      default:
        return <Cpu className="h-5 w-5 text-terracotta" />;
    }
  };

  return (
    <section className="py-16 border-b border-sand-300 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
            Taxonomy
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal mt-1">
            Explore by Technical Discipline
          </h2>
          <p className="text-charcoal-muted max-w-lg mx-auto text-xs sm:text-sm mt-1">
            Deep-dive into performance benchmarks, search engine architecture, and conversion optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EDITORIAL_BEATS.map((beat) => (
            <Link
              key={beat.name}
              href={`/articles?topic=${encodeURIComponent(beat.name)}`}
              className="p-5 rounded-2xl border border-sand-300 bg-[#F7F4EE] hover:border-terracotta/40 hover:bg-white transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white border border-sand-300 shadow-2xs group-hover:scale-105 transition-transform">
                    {getBeatIcon(beat.name)}
                  </div>
                  <span className="text-[11px] font-bold text-charcoal-subtle bg-sand-300/60 px-2 py-0.5 rounded-md font-mono">
                    {beat.count} guides
                  </span>
                </div>
                <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
                  {beat.name}
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  {beat.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-sand-300/60 flex items-center justify-between text-[11px] font-semibold text-terracotta">
                <span>View {beat.name} archive</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
