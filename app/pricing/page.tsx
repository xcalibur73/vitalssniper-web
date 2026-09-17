import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  HelpCircle,
  Key,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: 'Pricing & Lifetime License | Web Audits',
  description: 'Transparent pricing for VitalsSniper PRO and agency auditing software. Lifetime license access with zero recurring subscriptions.',
  alternates: {
    canonical: 'https://www.webaudits.pro/pricing',
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#08090e] bg-tech-grid text-[#f9fafb] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-20 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-4 shadow-sm">
            <Zap className="h-3.5 w-3.5" />
            <span>Public Beta Program: Free In-Browser Auditing Active</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Transparent Pricing &amp; Open Beta Access
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            VitalsSniper is currently in Free Public Beta. In-browser auditing, DOM bloat analysis, and core telemetry are 100% free while we collect empirical benchmarks across the web.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          
          {/* Card 1: FREE */}
          <div className="rounded-2xl border border-white/10 bg-[#11131c] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Free Community</div>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-4xl sm:text-5xl font-black text-white">$0</span>
                <span className="text-xs text-gray-500 font-medium">/ forever</span>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Test client-side DOM inspection, server latency, and basic speed checks for any website.
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-white/5 pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited live in-browser scans</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>DOM bloat &amp; CMS builder detection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Server TTFB &amp; payload telemetry</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Cold email pitch script preview</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <Link
              href="/vitalssniper#auditor"
              className="w-full rounded-xl border border-white/15 bg-white/5 py-3 text-center text-xs font-bold text-white hover:bg-white/10 transition-all block"
            >
              Try Free Live Demo
            </Link>
          </div>

          {/* Card 2: PRO (Featured - Public Beta) */}
          <div className="rounded-2xl border-2 border-emerald-500/50 bg-[#141724] p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(16,185,129,0.15)] relative scale-100 md:scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-black shadow-md">
              Free During Beta
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">VitalsSniper PRO (Beta Cohort)</div>
              
              <div>
                <div className="flex items-baseline gap-2 my-3">
                  <span className="text-4xl sm:text-5xl font-black text-white">$0</span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Open Public Beta
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Join our research cohort to unlock full multi-channel outreach pitches and deep forensic telemetry for free.
                </p>
              </div>

              <div className="space-y-3 text-xs text-gray-200 border-t border-white/10 pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> client-side tab audits</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>LinkedIn DM</strong> &amp; 30s Loom pitch generator</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Raw JSON</strong> forensic telemetry export</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Live LCP Highlighter</strong> with visual pulse outline</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>AI Search &amp; Knowledge Graph schema validator</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Early access to upcoming Chrome extension builds</span>
                </div>
              </div>
            </div>

            <Link
              href="/vitalssniper#auditor"
              className="w-full rounded-xl bg-white py-3.5 text-center text-xs sm:text-sm font-extrabold text-black hover:bg-gray-100 transition-all block shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
            >
              Join Free Public Beta
            </Link>
          </div>

          {/* Card 3: ENTERPRISE */}
          <div className="rounded-2xl border border-white/10 bg-[#11131c] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Enterprise Agency</div>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl sm:text-4xl font-black text-white">Custom</span>
                <span className="text-xs text-gray-500 font-medium">/ SLA</span>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                For high-volume performance consultancies requiring bulk domain scanning and custom telemetry webhooks.
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-white/5 pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Automated batch / bulk website auditing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>REST API access &amp; Webhook triggers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Custom CRM webhooks (HubSpot &amp; Salesforce)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Dedicated Slack channel &amp; SLA support</span>
                </div>
              </div>
            </div>

            <a
              href={`mailto:${SITE_CONFIG.supportEmail}?subject=Enterprise%20Inquiry%20Web%20Audits%20Helper`}
              className="w-full rounded-xl border border-white/15 bg-white/5 py-3 text-center text-xs font-bold text-white hover:bg-white/10 transition-all block"
            >
              Contact Enterprise Sales
            </a>
          </div>

        </div>

        {/* Guarantees Strip */}
        <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Free Public Beta Testing</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Instant In-Browser Audits</span>
            <span>&bull;</span>
            <span>Zero Tracking or Data Selling</span>
            <span>&bull;</span>
            <span>Client-Side Privacy</span>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
