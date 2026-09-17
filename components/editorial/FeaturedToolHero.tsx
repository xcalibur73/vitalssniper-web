'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Sparkles, ExternalLink, Zap, ShieldCheck, Search, Tag, Cpu } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function FeaturedToolHero() {
  const featuredTools = [
    {
      name: 'VitalsSniper PRO',
      desc: 'Deep website diagnostics for agencies and performance consultants.',
      tag: 'Flagship Software',
      href: '/products/vitalssniper-pro',
      icon: '🎯',
      isPro: true,
    },
    {
      name: 'Free Website Audit',
      desc: 'Quick performance and technical Core Web Vitals checks.',
      tag: 'Free Web Tool',
      href: '/tools/website-speed-test',
      icon: '⚡',
      isPro: false,
    },
    {
      name: 'SEO Checker',
      desc: 'Find important on-page meta and indexability problems.',
      tag: 'Free Web Tool',
      href: '/tools/seo-meta-checker',
      icon: '🔍',
      isPro: false,
    },
    {
      name: 'Schema Validator',
      desc: 'Inspect structured data and Knowledge Graph entities.',
      tag: 'Free Web Tool',
      href: '/tools/schema-validator',
      icon: '🏷️',
      isPro: false,
    },
  ];

  const workflowSteps = [
    { label: 'Audit', desc: '50ms in-tab scan' },
    { label: 'Diagnose', desc: 'DOM bloat & LCP' },
    { label: 'Visual Proof', desc: 'Pulsing element outline' },
    { label: 'Report', desc: 'White-label PDF' },
    { label: 'Proposal', desc: '3-sentence pitch' },
    { label: 'Monitor', desc: 'Automated regressions' },
  ];

  return (
    <section className="py-20 border-b border-sand-300 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tools That Do The Work</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
              Engineered Web Intelligence Tools
            </h2>
            <p className="text-charcoal-muted max-w-xl text-sm mt-2">
              Proprietary diagnostic software and in-browser utilities to audit, diagnose, and optimize web performance.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
          >
            <span>View All Tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4 Featured Tool Cards (Section 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {featuredTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="p-5 rounded-2xl border border-sand-300 bg-[#F7F4EE] hover:border-accent/40 hover:bg-white transition-all shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    tool.isPro
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'bg-sand-200 text-charcoal-muted'
                  }`}>
                    {tool.tag}
                  </span>
                </div>
                <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-accent transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-sand-300/60 flex items-center justify-between text-xs font-bold text-accent">
                <span>Launch</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* The 6-Stage VitalsSniper PRO Workflow */}
        <div className="rounded-3xl border border-sand-300 bg-[#F7F4EE] p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Commercial Workflow Engine
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal mt-1">
              Find The Problem. Prove It. Sell The Solution.
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
              VitalsSniper PRO automates client prospecting: turn technical diagnostics into closed optimization contracts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.label}
                className="p-3 rounded-xl border border-sand-300 bg-white text-center shadow-xs"
              >
                <span className="text-[10px] font-bold text-accent font-mono block">0{idx + 1}</span>
                <span className="text-xs font-bold text-charcoal block mt-0.5">{step.label}</span>
                <span className="text-[11px] text-charcoal-muted block mt-0.5">{step.desc}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 border-t border-sand-300">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3 text-xs text-charcoal">
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
                  href="/products/vitalssniper-pro"
                  className="rounded-xl bg-accent px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-accent-dark transition-all text-center shadow-sm"
                >
                  Explore VitalsSniper PRO
                </Link>

                <a
                  href={SITE_CONFIG.appsumoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-sand-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-charcoal hover:border-accent/40 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>AppSumo Lifetime Deal ($39)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-accent" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-charcoal bg-[#242321] p-3 shadow-xl text-white">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="font-mono text-[11px] text-gray-300">
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
