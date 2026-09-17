import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Wrench } from 'lucide-react';
import { FREE_TOOLS } from '@/data/tools';

interface FreeToolsGridProps {
  limit?: number;
}

export default function FreeToolsGrid({ limit = 6 }: FreeToolsGridProps) {
  const tools = limit ? FREE_TOOLS.slice(0, limit) : FREE_TOOLS;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.slug}
            className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm hover:border-accent/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-2xl">{tool.icon}</span>
                <span className="rounded-md bg-sand-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                  {tool.category}
                </span>
              </div>

              <Link href={`/tools/${tool.slug}`}>
                <h3 className="font-editorial text-xl font-bold text-charcoal group-hover:text-accent transition-colors mb-2">
                  {tool.name}
                </h3>
              </Link>

              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                {tool.shortDescription}
              </p>

              {tool.referenceBenchmark && (
                <div className="rounded-lg bg-[#F7F4EE] border border-sand-300 px-3 py-1.5 text-[11px] font-medium text-charcoal mb-4">
                  {tool.referenceBenchmark}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-sand-300 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-600">
                100% Free Utility
              </span>
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform"
              >
                <span>Launch Tool</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {limit && FREE_TOOLS.length > limit && (
        <div className="mt-8 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-sand-300 bg-white px-6 py-3 text-xs font-bold text-charcoal hover:border-accent hover:text-accent transition-all shadow-sm"
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>View All {FREE_TOOLS.length} Free Web Tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
