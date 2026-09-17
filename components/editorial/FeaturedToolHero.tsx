'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Sparkles, ExternalLink, Zap, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function FeaturedToolHero() {
  const lifecycleSteps = [
    { label: 'Audit', desc: '50ms in-tab scan' },
    { label: 'Analyze', desc: 'DOM bloat & LCP' },
    { label: 'Explain', desc: 'Client impact' },
    { label: 'Report', desc: 'White-label PDF' },
    { label: 'Pitch', desc: '3-sentence hook' },
    { label: 'Monitor', desc: 'Recurring checks' },
  ];

  return (
    <section className="py-20 border-b border-sand-300 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-3 py-1 text-xs font-semibold text-terracotta mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Flagship Proprietary Tool</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
              Find Website Problems. Turn Them into Opportunities.
            </h2>
            <p className="text-charcoal-muted max-w-xl text-sm mt-2">
              VitalsSniper PRO transforms confusing technical Core Web Vitals diagnostics into visual, undeniable client-winning proof.
            </p>
          </div>

          <Link
            href="/vitalssniper"
            className="inline-flex items-center gap-2 text-xs font-bold text-terracotta hover:underline"
          >
            <span>View Full Product Documentation</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* The 6-Stage Lifecycle Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {lifecycleSteps.map((step, idx) => (
            <div
              key={step.label}
              className="p-3 rounded-xl border border-sand-300 bg-[#faf8f5] text-center"
            >
              <span className="text-[10px] font-bold text-terracotta font-mono block">0{idx + 1}</span>
              <span className="text-xs font-bold text-charcoal block mt-0.5">{step.label}</span>
              <span className="text-[11px] text-charcoal-subtle block mt-0.5">{step.desc}</span>
            </div>
          ))}
        </div>

        {/* Large Visual Feature Showcase Container */}
        <div className="rounded-3xl border border-sand-300 bg-[#faf8f5] p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Product Value Props & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                  Client Acquisition Platform
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal mt-1">
                  VitalsSniper PRO
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-2 leading-relaxed">
                  The in-browser inspector built specifically for web agencies, freelance developers, and performance consultants to close speed optimization retainers without manual DevTools analysis.
                </p>
              </div>

              <div className="space-y-3 text-xs text-charcoal-light">
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>50ms In-Tab Telemetry:</strong> Detects Elementor, Divi, Shopify, and DOM element bloat with zero server lag.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Live LCP Visual Target Overlay:</strong> Injects a pulsing outline around the exact element causing mobile speed failure.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Executive White-Label PDF:</strong> 1-page client-ready tear sheet stamped with your Calendly booking CTA.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>1-Click Lead CRM:</strong> Save audited domains and export clean CSV files formatted for Instantly and Lemlist.</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/vitalssniper"
                  className="rounded-xl bg-terracotta px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-terracotta-dark transition-all text-center shadow-sm"
                >
                  Explore VitalsSniper PRO
                </Link>

                <a
                  href={SITE_CONFIG.appsumoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-sand-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-charcoal hover:border-terracotta/40 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>AppSumo Lifetime Deal ($39)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-terracotta" />
                </a>
              </div>
            </div>

            {/* Right Column: In-Tab Diagnostic Window Preview (Contrast Dark Chrome) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-charcoal bg-[#0f111a] p-3 shadow-xl text-white">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="font-mono text-[11px] text-gray-400">
                    Active Tab Inspector &bull; VitalsSniper PRO
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">50ms Telemetry</span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/5">
                  <Image
                    src="/assets/appsumo_hero_1920x1080.png"
                    alt="VitalsSniper PRO Forensic Inspection Interface"
                    width={1920}
                    height={1080}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
