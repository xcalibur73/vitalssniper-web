import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, Eye, Layers, Activity } from 'lucide-react';
import { TeardownStudy } from '@/data/teardowns';

interface TeardownCardProps {
  teardown: TeardownStudy;
}

export default function TeardownCard({ teardown }: TeardownCardProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs hover:border-[#2563EB]/40 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="rounded bg-[#111827] px-2 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
            {teardown.id}
          </span>
          <span className="text-[11px] text-[#6B7280] font-medium">
            {teardown.targetType}
          </span>
        </div>

        <Link href={`/teardowns/${teardown.slug}`}>
          <h2 className="text-lg font-bold text-[#0F0F0F] hover:text-[#2563EB] transition-colors mb-3 leading-snug">
            {teardown.title}
          </h2>
        </Link>

        {/* Metric Badges */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5E7EB] my-4 bg-[#F8F8F8] rounded-lg p-2 text-center text-xs">
          <div>
            <span className="text-[10px] text-[#6B7280] block">Mobile LCP</span>
            <span className="font-bold text-[#EF4444]">{teardown.lcpScore}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B7280] block">DOM Depth</span>
            <span className="font-bold text-[#0F0F0F]">{teardown.domElements} Nodes</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B7280] block">Page Weight</span>
            <span className="font-bold text-[#0F0F0F]">{teardown.totalWeight}</span>
          </div>
        </div>

        <p className="text-xs text-[#4B5563] line-clamp-3 mb-4 leading-relaxed">
          <strong className="text-[#0F0F0F]">Flaw Discovered:</strong> {teardown.seoFinding}
        </p>
      </div>

      <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
        <span className="text-[11px] text-[#6B7280]">
          Diagnosed via VitalsSniper PRO
        </span>
        <Link
          href={`/teardowns/${teardown.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <span>View Teardown</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
