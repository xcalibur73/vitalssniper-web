import React from 'react';
import Link from 'next/link';
import { BarChart3, ArrowRight, FileCheck, Users } from 'lucide-react';
import { ResearchStudy } from '@/data/research';

interface ResearchCardProps {
  study: ResearchStudy;
}

export default function ResearchCard({ study }: ResearchCardProps) {
  return (
    <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm hover:border-accent/40 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-sand-300">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider">
              <BarChart3 className="h-3 w-3" /> Original Data Report
            </span>
            <span className="text-xs text-charcoal-muted">Sample: {study.sampleSize}</span>
          </div>
          <Link href={`/research/${study.slug}`}>
            <h3 className="font-editorial text-2xl md:text-3xl font-bold text-charcoal hover:text-accent transition-colors">
              {study.title}
            </h3>
          </Link>
          <p className="text-sm text-charcoal-muted mt-2 max-w-3xl">
            {study.subtitle}
          </p>
        </div>

        <Link
          href={`/research/${study.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-charcoal px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-black transition-all flex-shrink-0"
        >
          <span>Read Full Study</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 4 Metric Callout Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-sand-300">
        {study.metrics.map((metric, idx) => (
          <div key={idx} className="rounded-xl bg-[#F7F4EE] p-4 border border-sand-300">
            <span className="font-editorial text-2xl font-bold text-accent block mb-1">
              {metric.value}
            </span>
            <span className="text-xs font-bold text-charcoal block mb-0.5">
              {metric.label}
            </span>
            <span className="text-[11px] text-charcoal-muted leading-tight block">
              {metric.description}
            </span>
          </div>
        ))}
      </div>

      {/* Key Findings List */}
      <div className="pt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
          Key Empirical Findings:
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-charcoal-muted">
          {study.keyFindings.map((finding, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent font-bold">&bull;</span>
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
