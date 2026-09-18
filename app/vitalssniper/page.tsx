
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import LicenseActivation from '@/components/LicenseActivation';
import LiveAuditor from '@/components/LiveAuditor';
import WhyWeBuiltThis from '@/components/WhyWeBuiltThis';
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
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 text-center bg-white border-b border-[#E5E7EB] overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 relative z-10">

          {/* Back to Home */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#0F0F0F] transition-colors mb-6">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Web Audits</span>
          </Link>
          
          {/* Top Authority Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-[#2563EB] mb-8 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
            <span>Public Beta Active: Client Acquisition Infrastructure for Digital Agencies</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F0F0F] leading-[1.12] mb-6">
            Find Website Problems. Prove Them Visually. <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">
              Build Better Client Proposals.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base text-[#4B5563] max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            VitalsSniper PRO is an in-browser diagnostic inspector built for web agencies, SEO consultants, and performance specialists. Audit live tabs in milliseconds, isolate LCP elements visually on screen, export branded proof sheets, and organize prospective client leads without third-party API quotas.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#auditor"
              className="w-full sm:w-auto rounded-xl bg-[#2563EB] px-8 py-4 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#1D4ED8] hover:scale-[1.01] flex items-center justify-center gap-2.5"
            >
              <Sparkles className="h-4 w-4" />
              <span>Test Live in Browser (Public Beta: Free)</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#deliverables"
              className="w-full sm:w-auto rounded-xl border border-[#E5E7EB] bg-white px-7 py-4 text-sm font-semibold text-[#0F0F0F] transition-all hover:bg-[#F3F4F6] flex items-center justify-center gap-2"
            >
              <span>Explore Diagnostic Features</span>
            </a>
          </div>

          {/* Helper link for beta testers */}
          <div className="text-xs text-[#6B7280] mb-14">
            Currently in open public testing &bull;{' '}
            <a href="#auditor" className="text-[#2563EB] hover:underline font-semibold">
              Scan your domain for free &rarr;
            </a>
          </div>

          {/* Enterprise KPI Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 text-left">
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4 shadow-xs">
              <div className="flex items-center gap-2 text-[#2563EB] mb-1">
                <Zap className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-[#0F0F0F]">Active-Tab</span>
              </div>
              <p className="text-xs text-[#4B5563]">Local Diagnostics. Inspects active browser tabs with zero server queues.</p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4 shadow-xs">
              <div className="flex items-center gap-2 text-[#2563EB] mb-1">
                <Lock className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-[#0F0F0F]">100% Local</span>
              </div>
              <p className="text-xs text-[#4B5563]">Data Privacy. Target URLs inspected locally without third-party tracking.</p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4 shadow-xs">
              <div className="flex items-center gap-2 text-[#2563EB] mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-[#0F0F0F]">Agency Core</span>
              </div>
              <p className="text-xs text-[#4B5563]">Visual Evidence. LCP highlighter, competitor comparison &amp; White-Label PDF.</p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4 shadow-xs">
              <div className="flex items-center gap-2 text-[#2563EB] mb-1">
                <FileSpreadsheet className="h-4 w-4" />
                <span className="text-lg font-black tracking-tight text-[#0F0F0F]">Public Beta</span>
              </div>
              <p className="text-xs text-[#4B5563]">Free Testing Active. Inspect live tabs and test pitch copy with zero cost.</p>
            </div>
          </div>

        </div>

        {/* Product Preview Window Chrome */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#111827] p-3 sm:p-4 shadow-xl relative">
            
            {/* macOS Chrome Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-gray-300">
                Web Audits: Active Tab Forensic Diagnostic Inspector
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

      {/* Founder Manifesto & Persona Transformations */}
      <WhyWeBuiltThis />

      {/* Commercial Deliverables (9 Powerhouse Features) */}
      <Deliverables />

      {/* Competitive Comparison Matrix */}
      <ComparisonTable />

      {/* Agency ROI & Unit Economics Calculator */}
      <RoiCalculator />

      {/* Dedicated Voucher Redemption & License Portal */}
      <section id="activate" className="py-20 border-t border-[#E5E7EB] bg-[#F8F8F8]">
        <div className="mx-auto max-w-4xl px-6 text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4">
            <Key className="h-3.5 w-3.5" />
            <span>Early Access &amp; License Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] mb-3">
            Redeem Your License &amp; Download Extension
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-sm sm:text-base">
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
      <section className="py-20 border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl border border-blue-200 bg-blue-50/40 p-8 sm:p-12 relative overflow-hidden shadow-xs">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-xs font-bold text-[#2563EB] mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Public Beta Research Cohort</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F0F0F] mb-3 tracking-tight">
              Test VitalsSniper In-Browser For Free
            </h2>
            <p className="text-xs sm:text-base text-[#4B5563] max-w-xl mx-auto mb-8">
              Audit live websites directly from your browser in 50 milliseconds. Help shape our empirical benchmark dataset while beta testing on random sites for free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#auditor"
                className="w-full sm:w-auto rounded-xl bg-[#2563EB] px-8 py-4 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#1D4ED8] hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>Launch Free Web Auditor</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#activate"
                className="w-full sm:w-auto rounded-xl border border-[#E5E7EB] bg-white px-6 py-4 text-sm font-semibold text-[#0F0F0F] transition-all hover:bg-[#F3F4F6] flex items-center justify-center gap-2"
              >
                <Key className="h-4 w-4 text-[#2563EB]" />
                <span>Redeem Early Access Key</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#6B7280]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
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
