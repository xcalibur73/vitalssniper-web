import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import { COMPARISONS } from '@/data/comparisons';
import { ArrowRight, Trophy, Sparkles, Scale } from 'lucide-react';

export const metadata = {
  title: 'Head-to-Head Web Tool & Hosting Comparisons | Web Audits',
  description: 'Data-driven comparisons of top WordPress hosting, SEO plugins, and performance tools tested under identical workloads.',
};

export default function ComparisonsPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1 text-xs font-semibold text-[#4B5563] mb-4 shadow-xs">
            <Scale className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Empirical Head-to-Head Tests</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F0F0F] mb-4">
            Head-to-Head Web Tool Comparisons
          </h1>
          <p className="text-base text-[#4B5563] max-w-2xl leading-relaxed">
            We deploy competitors onto identical server infrastructure and measure real-world speed, database queries, and feature limits so you can make informed decisions.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-5xl px-6 flex-1 w-full space-y-12">
        {COMPARISONS.map((comp) => (
          <article
            key={comp.slug}
            className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs hover:border-[#D1D5DB] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2.5 py-0.5 text-xs font-semibold">
                {comp.category}
              </span>
              <span className="text-xs font-bold text-[#2563EB]">
                {comp.toolA} vs {comp.toolB}
              </span>
            </div>

            <Link href={`/comparisons/${comp.slug}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] hover:text-[#2563EB] transition-colors mb-3">
                {comp.title}
              </h2>
            </Link>

            <p className="text-sm text-[#4B5563] mb-6 leading-relaxed">
              {comp.summary}
            </p>

            {/* Embedded Mini Comparison Table */}
            <ComparisonTable comparison={comp} />

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-[#4B5563]">
                <span className="font-bold text-[#0F0F0F]">Quick Recommendation:</span> {comp.bestForA}
              </div>

              <Link
                href={`/comparisons/${comp.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
              >
                <span>Read Full Investigation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </main>
  );
}
