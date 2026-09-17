import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TEARDOWNS } from '@/data/teardowns';
import { ArrowLeft, ArrowRight, Eye, ShieldAlert, CheckCircle2, Cpu, Wrench } from 'lucide-react';

interface TeardownPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return TEARDOWNS.map((td) => ({
    slug: td.slug,
  }));
}

export function generateMetadata({ params }: TeardownPageProps) {
  const td = TEARDOWNS.find((t) => t.slug === params.slug);
  if (!td) return { title: 'Teardown Not Found | Web Audits' };

  return {
    title: `${td.title} | Web Audits`,
    description: td.seoFinding,
  };
}

export default function TeardownDetailPage({ params }: TeardownPageProps) {
  const td = TEARDOWNS.find((t) => t.slug === params.slug);

  if (!td) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-12 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/teardowns"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Teardowns</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-charcoal-muted mb-3">
            <span className="rounded bg-charcoal px-2 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
              {td.id}
            </span>
            <span>Target: {td.targetType}</span>
            <span>&bull;</span>
            <span>{td.date}</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mb-4 leading-tight">
            {td.title}
          </h1>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-sand-300 bg-white p-5 text-center shadow-xs">
            <span className="text-xs text-charcoal-muted block mb-1">Mobile LCP</span>
            <span className="font-editorial text-3xl font-bold text-rose-600 block">
              {td.lcpScore}
            </span>
          </div>
          <div className="rounded-2xl border border-sand-300 bg-white p-5 text-center shadow-xs">
            <span className="text-xs text-charcoal-muted block mb-1">Total DOM Elements</span>
            <span className="font-editorial text-3xl font-bold text-charcoal block">
              {td.domElements}
            </span>
          </div>
          <div className="rounded-2xl border border-sand-300 bg-white p-5 text-center shadow-xs">
            <span className="text-xs text-charcoal-muted block mb-1">Total Page Weight</span>
            <span className="font-editorial text-3xl font-bold text-charcoal block">
              {td.totalWeight}
            </span>
          </div>
        </div>

        {/* Diagnostic Findings */}
        <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
              Primary Bottleneck Discovered
            </h2>
            <p className="text-sm text-charcoal leading-relaxed">
              {td.seoFinding}
            </p>
          </div>

          <div className="pt-4 border-t border-sand-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
              User Experience Observation
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {td.uxObservation}
            </p>
          </div>

          {/* VitalsSniper Proof Box */}
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-accent mb-1">
              <Cpu className="h-4 w-4" />
              <span>VitalsSniper PRO Forensic Telemetry:</span>
            </div>
            <p className="text-xs text-charcoal">
              {td.vitalsSniperProof}
            </p>
          </div>
        </div>

        {/* Actionable Engineering Recommendations */}
        <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm">
          <h3 className="font-editorial text-xl font-bold text-charcoal mb-4">
            Actionable Optimization Roadmap
          </h3>
          <ul className="space-y-3 text-xs text-charcoal">
            {td.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Commercial Tool Bridge */}
        <div className="rounded-2xl bg-[#242321] text-[#F7F4EE] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-editorial text-xl font-bold mb-1">
              Run this exact diagnostic on any live website
            </h4>
            <p className="text-xs text-[#F7F4EE]/70">
              VitalsSniper PRO inspects live tabs in 50ms and outputs white-label client tear sheets.
            </p>
          </div>
          <Link
            href="/products/vitalssniper-pro"
            className="rounded-xl bg-accent px-5 py-3 text-xs font-bold text-white hover:bg-accent-dark transition-all flex-shrink-0 shadow-sm"
          >
            <span>Learn About VitalsSniper PRO</span>
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
