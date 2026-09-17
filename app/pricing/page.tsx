'use client';

import React, { useState } from 'react';
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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'lifetime'>('lifetime');

  return (
    <main className="min-h-screen bg-[#08090e] bg-tech-grid text-[#f9fafb] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-20 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-4 shadow-sm">
            <Zap className="h-3.5 w-3.5" />
            <span>Commercial Agency Licensing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Find technical website flaws your prospects don&apos;t know they have and close 5-figure speed remediation retainers in days.
          </p>

          {/* Toggle Billing Pill */}
          <div className="mt-8 inline-flex items-center rounded-xl border border-white/10 bg-[#12141d] p-1 text-xs">
            <button
              onClick={() => setBillingCycle('lifetime')}
              className={`rounded-lg px-4 py-2 font-bold transition-all ${
                billingCycle === 'lifetime'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              AppSumo Lifetime Deal ($39)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-lg px-4 py-2 font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Standard SaaS Monthly ($49/mo)
            </button>
          </div>
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
                Test client-side DOM inspection and basic speed checks for occasional audits.
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-white/5 pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>1 live scan per week</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Basic DOM bloat detection</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-500">
                  <X className="h-4 w-4 text-gray-600 flex-shrink-0" />
                  <span>No CSV CRM export</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-500">
                  <X className="h-4 w-4 text-gray-600 flex-shrink-0" />
                  <span>No White-Label PDF teardowns</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-500">
                  <X className="h-4 w-4 text-gray-600 flex-shrink-0" />
                  <span>No competitor comparison mode</span>
                </div>
              </div>
            </div>

            <Link
              href="/#auditor"
              className="w-full rounded-xl border border-white/15 bg-white/5 py-3 text-center text-xs font-bold text-white hover:bg-white/10 transition-all block"
            >
              Try Free Live Demo
            </Link>
          </div>

          {/* Card 2: PRO (Featured) */}
          <div className="rounded-2xl border-2 border-emerald-500/50 bg-[#141724] p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(16,185,129,0.15)] relative scale-100 md:scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-black shadow-md">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Web Audits Helper PRO</div>
              
              {billingCycle === 'lifetime' ? (
                <div>
                  <div className="flex items-baseline gap-2 my-3">
                    <span className="text-4xl sm:text-5xl font-black text-white">$39</span>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Lifetime Deal
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Exclusive AppSumo lifetime license. Pay once, use forever. Single and agency seats.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-4xl sm:text-5xl font-black text-white">$49</span>
                    <span className="text-xs text-gray-500 font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Flexible recurring monthly subscription for growing digital agencies.
                  </p>
                </div>
              )}

              <div className="space-y-3 text-xs text-gray-200 border-t border-white/10 pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> client-side tab audits</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>White-Label PDF</strong> with Calendly booking CTA</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Competitor Comparison</strong> battle scorecard</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Live LCP Highlighter</strong> with pulsing overlay</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>1-Click Lead CRM</strong> & RFC-4180 CSV export</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>AI Search & Knowledge Graph schema validator</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Multi-channel pitch generator (Email, DM, Loom)</span>
                </div>
              </div>
            </div>

            {billingCycle === 'lifetime' ? (
              <a
                href={SITE_CONFIG.appsumoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-white py-3.5 text-center text-xs sm:text-sm font-extrabold text-black hover:bg-gray-100 transition-all block shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
              >
                Get Lifetime License on AppSumo ($39)
              </a>
            ) : (
              <a
                href="#checkout"
                className="w-full rounded-xl bg-white py-3.5 text-center text-xs sm:text-sm font-extrabold text-black hover:bg-gray-100 transition-all block shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
              >
                Start Monthly Subscription
              </a>
            )}
          </div>

          {/* Card 3: ENTERPRISE */}
          <div className="rounded-2xl border border-white/10 bg-[#11131c] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Enterprise Agency</div>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-4xl sm:text-5xl font-black text-white">$399</span>
                <span className="text-xs text-gray-500 font-medium">/ month</span>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                For established performance agencies with dedicated outbound SDR teams.
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-white/5 pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited team seats (25+ users)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Automated batch / bulk website auditing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>REST API access & Webhook triggers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Custom CRM webhooks (HubSpot & Salesforce)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Dedicated Slack channel & SLA support</span>
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
            <span>60-Day 100% Money-Back Guarantee through AppSumo</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Instant Extension Delivery</span>
            <span>&bull;</span>
            <span>Zero Tracking or Data Selling</span>
            <span>&bull;</span>
            <span>Lifetime Bug Fixes</span>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
