import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, Eye, Layers, Activity } from 'lucide-react';
import { TeardownStudy } from '@/data/teardowns';

interface TeardownCardProps {
  teardown: TeardownStudy;
}

export default function TeardownCard({ teardown }: TeardownCardProps) {
  return (
    <div className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm hover:border-accent/40 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="rounded bg-charcoal px-2 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
            {teardown.id}
          </span>
          <span className="text-[11px] text-charcoal-muted font-medium">
            {teardown.targetType}
          </span>
        </div>

        <Link href={`/teardowns/${teardown.slug}`}>
          <h4 className="font-editorial text-lg font-bold text-charcoal hover:text-accent transition-colors mb-3 leading-snug">
            {teardown.title}
          </h4>
        </Link>

        {/* Metric Badges */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-sand-300 my-4 bg-[#F7F4EE] rounded-lg p-2 text-center text-xs">
          <div>
            <span className="text-[10px] text-charcoal-muted block">Mobile LCP</span>
            <span className="font-bold text-rose-600">{teardown.lcpScore}</span>
          </div>
          <div>
            <span className="text-[10px] text-charcoal-muted block">DOM Depth</span>
            <span className="font-bold text-charcoal">{teardown.domElements} Nodes</span>
          </div>
          <div>
            <span className="text-[10px] text-charcoal-muted block">Page Weight</span>
            <span className="font-bold text-charcoal">{teardown.totalWeight}</span>
          </div>
        </div>

        <p className="text-xs text-charcoal-muted line-clamp-3 mb-4 leading-relaxed">
          <strong className="text-charcoal">Flaw Discovered:</strong> {teardown.seoFinding}
        </p>
      </div>

      <div className="pt-4 border-t border-sand-300 flex items-center justify-between">
        <span className="text-[11px] text-charcoal-muted">
          Diagnosed via VitalsSniper PRO
        </span>
        <Link
          href={`/teardowns/${teardown.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
        >
          <span>View Teardown</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
