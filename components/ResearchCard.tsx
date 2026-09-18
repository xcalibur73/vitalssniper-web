import React from 'react';
import Link from 'next/link';
import { BarChart3, ArrowRight } from 'lucide-react';
import { ResearchStudy } from '@/data/research';

interface ResearchCardProps {
  study: ResearchStudy;
}

export default function ResearchCard({ study }: ResearchCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs hover:border-[#D1D5DB] transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
              <BarChart3 className="h-3 w-3" /> Original Data Report
            </span>
            <span className="text-xs text-[#4B5563]">Sample: {study.sampleSize}</span>
          </div>
          <Link href={`/research/${study.slug}`}>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              {study.title}
            </h3>
          </Link>
          <p className="text-sm text-[#4B5563] mt-2 max-w-3xl leading-relaxed">
            {study.subtitle}
          </p>
        </div>

        <Link
          href={`/research/${study.slug}`}
          className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 text-xs font-semibold text-white transition-colors flex-shrink-0"
        >
          <span>Read Full Study</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 4 Metric Callout Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-[#E5E7EB]">
        {study.metrics.map((metric, idx) => (
          <div key={idx} className="rounded-lg bg-[#F3F4F6] p-4 border border-[#E5E7EB]">
            <span className="text-2xl font-bold text-[#2563EB] block mb-1">
              {metric.value}
            </span>
            <span className="text-xs font-semibold text-[#0F0F0F] block mb-0.5">
              {metric.label}
            </span>
            <span className="text-[11px] text-[#4B5563] leading-tight block">
              {metric.description}
            </span>
          </div>
        ))}
      </div>

      {/* Key Findings List */}
      <div className="pt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] mb-3">
          Key Empirical Findings:
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#4B5563]">
          {study.keyFindings.map((finding, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#2563EB] font-bold">&bull;</span>
              <span className="leading-relaxed">{finding}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
