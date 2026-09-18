import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RESEARCH_DATASETS } from '@/data/research';
import { Database, ShieldCheck, ArrowLeft, BarChart3, CheckCircle2, FileCode } from 'lucide-react';

export const metadata = {
  title: 'Research Methodology & Dataset Registry | Web Audits',
  description: 'Complete transparency into our empirical research datasets, testing environments, emulation profiles, and statistical sampling methods.',
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Research Reports</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB] mb-4 shadow-xs">
            <Database className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Open Science &amp; Dataset Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            Testing Methodology &amp; Datasets
          </h1>

          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl leading-relaxed">
            We publish verifiable web performance and SEO benchmarks. This registry documents our active datasets, testing hardware profiles, and statistical treatment methods.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-12">
        
        {/* Dataset Reconciliation Registry */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-[#2563EB]" />
            <h2 className="text-2xl font-bold text-[#0F0F0F]">
              Active Research Cohorts &amp; Telemetry
            </h2>
          </div>

          <div className="space-y-6">
            {RESEARCH_DATASETS.map((dataset) => (
              <div
                key={dataset.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-[#E5E7EB]">
                  <h3 className="text-xl font-bold text-[#0F0F0F]">
                    {dataset.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">{dataset.sampleSize}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div className="p-3.5 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[10px] uppercase font-bold mb-1">Observation Window:</span>
                    <span className="font-semibold text-[#0F0F0F]">{dataset.dateRange}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[10px] uppercase font-bold mb-1">Primary Objective:</span>
                    <span className="font-semibold text-[#0F0F0F]">{dataset.primaryPurpose}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#0F0F0F] block mb-1">Selection &amp; Sampling Protocol:</span>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {dataset.selectionMethod}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Standard Laboratory Testing Parameters */}
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-4">
            Standard Testing Rig &amp; Network Profiles
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
            To ensure statistical reproducibility, our synthetic lab audits execute within containerized Chromium headless environments configured with standard W3C mobile network profiles:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] space-y-2">
              <h3 className="font-bold text-[#0F0F0F]">Mobile Device Emulation</h3>
              <ul className="space-y-1.5 text-[#4B5563]">
                <li>&bull; Viewport: 390 x 844 pixels (DPR: 3.0)</li>
                <li>&bull; CPU Throttling: 4x slowdown (simulating mid-tier mobile hardware)</li>
                <li>&bull; User-Agent: Chrome Mobile Android (Linux; Android 14)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] space-y-2">
              <h3 className="font-bold text-[#0F0F0F]">Network Emulation</h3>
              <ul className="space-y-1.5 text-[#4B5563]">
                <li>&bull; Simulated 4G Profile: 4.0 Mbps download, 3.0 Mbps upload</li>
                <li>&bull; Latency: 40ms RTT round-trip delay</li>
                <li>&bull; Runs per URL: 3 runs (1 cold cache, 2 warm cache averaged)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Correlation vs Causation Standard */}
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-4">
            Correlation vs. Causation Standard
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
            Our editorial integrity standard strictly differentiates between observed empirical correlations and demonstrated causal relationships. When our studies report that websites utilizing lightweight themes load faster, this reflects observed data across our measured cohort rather than an assertion that a single theme inherently solves all architectural bottlenecks.
          </p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Similarly, our research into AI crawlers (GPTBot, ClaudeBot, PerplexityBot) measures access frequency and text extraction success in live server logs; it does not claim to decode proprietary ranking algorithms.
          </p>
        </section>

      </div>

      <Footer />
    </main>
  );
}
