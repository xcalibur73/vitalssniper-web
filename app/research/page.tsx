import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResearchCard from '@/components/ResearchCard';
import { RESEARCH_STUDIES } from '@/data/research';
import { BarChart3, Database, FileSpreadsheet, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Web Performance & SEO Research Reports | Web Audits',
  description: 'Empirical datasets and primary industry research analyzing Core Web Vitals, DOM bloat, and AI crawler readiness across hundreds of production websites.',
};

export default function ResearchIndexPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1 text-xs font-semibold text-[#4B5563] mb-4 shadow-xs">
            <Database className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Primary Industry Datasets</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F0F0F] mb-4">
            Original Empirical Research
          </h1>
          <p className="text-base text-[#4B5563] max-w-2xl leading-relaxed">
            We crawl and analyze large production cohorts to publish original findings that AI search competitors cannot fabricate. Verifiable methodology, open datasets, and actionable engineering takeaways.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-5xl px-6 flex-1 w-full space-y-10">
        {RESEARCH_STUDIES.map((study) => (
          <ResearchCard key={study.slug} study={study} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
