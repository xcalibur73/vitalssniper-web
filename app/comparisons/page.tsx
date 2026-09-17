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
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-[#F7F4EE] px-3 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-xs">
            <Scale className="h-3.5 w-3.5 text-accent" />
            <span>Empirical Head-to-Head Tests</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Head-to-Head Web Tool Comparisons
          </h1>
          <p className="text-base text-charcoal-muted max-w-2xl leading-relaxed">
            We deploy competitors onto identical server infrastructure and measure real-world speed, database queries, and feature limits so you can make informed decisions.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-5xl px-6 flex-1 w-full space-y-12">
        {COMPARISONS.map((comp) => (
          <article
            key={comp.slug}
            className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm hover:border-accent/40 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <span className="editorial-pill">
                {comp.category}
              </span>
              <span className="text-xs font-bold text-accent">
                {comp.toolA} vs {comp.toolB}
              </span>
            </div>

            <Link href={`/comparisons/${comp.slug}`}>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal hover:text-accent transition-colors mb-3">
                {comp.title}
              </h2>
            </Link>

            <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
              {comp.summary}
            </p>

            {/* Embedded Mini Comparison Table */}
            <ComparisonTable comparison={comp} />

            <div className="mt-6 pt-4 border-t border-sand-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-charcoal-muted">
                <span className="font-bold text-charcoal">Quick Recommendation:</span> {comp.bestForA}
              </div>

              <Link
                href={`/comparisons/${comp.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white hover:bg-accent-dark transition-all shadow-sm"
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
