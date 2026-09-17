'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import LicenseActivation from '@/components/LicenseActivation';
import LiveAuditor from '@/components/LiveAuditor';
import Deliverables from '@/components/Deliverables';
import ComparisonTable from '@/components/ComparisonTable';
import RoiCalculator from '@/components/RoiCalculator';
import DocsSection from '@/components/DocsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Key,
  Zap,
  Lock,
  FileSpreadsheet,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

export default function VitalsSniperPage() {
  return (
    <main className="min-h-screen bg-[#08090e] bg-tech-grid relative selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 text-center overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 relative z-10">

          {/* Back to Home */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Web Audits Helper</span>
          </Link>
          
          {/* Top Authority Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-8 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span>Public Beta Active: Client Acquisition Infrastructure for Digital Agencies</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
            Find Website Problems. Prove Them Visually. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-gray-200 to-emerald-400 bg-clip-text text-transparent">
              Build Better Client Proposals.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            VitalsSniper PRO is an in-browser diagnostic inspector built for web agencies, SEO consultants, and performance specialists. Audit live tabs in milliseconds, isolate LCP elements visually on screen, export branded proof sheets, and organize prospective client leads without third-party API quotas.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#auditor"
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-black shadow-[0_4px_24px_rgba(255,255,255,0.25)] transition-all hover:bg-gray-100 hover:scale-[1.02] flex items-center justify-center gap-2.5"
            >
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Test Live in Browser (Public Beta: Free)</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#deliverables"
              className="w-full sm:w-auto rounded-xl border border-white/20 bg-surface-card px-7 py-4 text-sm font-semibold text-gray-300 transition-all hover:border-emerald-500/40 hover:text-white flex items-center justify-center gap-2"
            >
              <span>Explore Diagnostic Features</span>
            </a>
          </div>

          {/* Helper link for beta testers */}
          <div className="text-xs text-gray-500 mb-14">
            Currently in open public testing &bull;{' '}
            <a href="#auditor" className="text-emerald-400 hover:underline font-semibold">
              Scan your domain for free &rarr;
            </a>
          </div>

          {/* Enterprise KPI Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 text-left">
            <div className="rounded-xl border border-white/10 bg-[#11131c]/80 backdrop-blur p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Zap className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-white">Active-Tab</span>
              </div>
              <p className="text-xs text-gray-400">Local Diagnostics. Inspects active browser tabs with zero server queues.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#11131c]/80 backdrop-blur p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Lock className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-white">100% Local</span>
              </div>
              <p className="text-xs text-gray-400">Data Privacy. Target URLs inspected locally without third-party tracking.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#11131c]/80 backdrop-blur p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-white">Agency Core</span>
              </div>
              <p className="text-xs text-gray-400">Visual Evidence. LCP highlighter, competitor comparison &amp; White-Label PDF.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#11131c]/80 backdrop-blur p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <FileSpreadsheet className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-white">Public Beta</span>
              </div>
              <p className="text-xs text-gray-400">Free Testing Active. Inspect live tabs and test pitch copy with zero cost.</p>
            </div>
          </div>

        </div>

        {/* Product Preview Window Chrome */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-white/15 bg-[#12141d] p-3 sm:p-4 shadow-[0_30px_90px_rgba(0,0,0,0.7)] relative">
            
            {/* macOS Chrome Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-gray-400">
                Web Audits Helper: Active Tab Forensic Diagnostic Inspector
              </span>
              <span className="text-[11px] text-emerald-400 font-bold hidden sm:inline">Manifest V3 Certified</span>
            </div>

            <Image
              src="/assets/appsumo_hero_1920x1080.png"
              alt="VitalsSniper PRO Interface Preview"
              width={1920}
              height={1080}
              priority
              className="rounded-xl w-full h-auto object-cover border border-white/5"
            />
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <LiveAuditor />

      {/* Commercial Deliverables (9 Powerhouse Features) */}
      <Deliverables />

      {/* Competitive Comparison Matrix */}
      <ComparisonTable />

      {/* Agency ROI & Unit Economics Calculator */}
      <RoiCalculator onOpenCheckout={() => {}} />

      {/* Dedicated Voucher Redemption & License Portal */}
      <section id="activate" className="py-20 border-t border-white/[0.08] bg-[#090b12]">
        <div className="mx-auto max-w-4xl px-6 text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <Key className="h-3.5 w-3.5" />
            <span>Early Access &amp; License Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Redeem Your License &amp; Download Extension
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Have an early access or voucher key? Enter your code below to generate your direct extension download link.
          </p>
        </div>

        <LicenseActivation />
      </section>

      {/* Documentation & 30-Second Setup Playbook */}
      <DocsSection />

      {/* Interactive FAQ Section */}
      <FaqSection />

      {/* Public Beta Callout Banner */}
      <section className="py-20 border-t border-white/[0.08] bg-gradient-to-b from-[#12141d] to-[#090a10]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Public Beta Research Cohort</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Test VitalsSniper In-Browser For Free
            </h2>
            <p className="text-xs sm:text-base text-gray-400 max-w-xl mx-auto mb-8">
              Audit client websites directly from your browser in 50 milliseconds. Help shape our empirical benchmark dataset while testing client pitches for free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#auditor"
                className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-black shadow-[0_4px_20px_rgba(255,255,255,0.25)] transition-all hover:bg-gray-100 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Launch Free Web Auditor</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#activate"
                className="w-full sm:w-auto rounded-xl border border-white/20 bg-surface-card px-6 py-4 text-sm font-semibold text-gray-300 transition-all hover:border-white/30 hover:text-white flex items-center justify-center gap-2"
              >
                <Key className="h-4 w-4 text-emerald-400" />
                <span>Redeem Early Access Key</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Free Public Beta</span>
              </div>
              <span>&bull;</span>
              <span>Zero Credit Card Required</span>
              <span>&bull;</span>
              <span>100% Client-Side Privacy</span>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
