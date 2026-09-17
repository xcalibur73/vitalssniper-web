import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Shield, Zap, ExternalLink, Key, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function PricingCards({ onOpenCheckout }: { onOpenCheckout?: (tier: 'solo' | 'agency') => void }) {
  return (
    <section id="pricing" className="py-24 border-t border-white/[0.08]">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <Zap className="h-3.5 w-3.5" />
            Lifetime Access &bull; No Monthly Fees
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Pay once, own forever. Land one client sprint and VitalsSniper pays for itself 50x over.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Solo License */}
          <div className="rounded-2xl border border-white/10 bg-[#12141d] p-8 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Solo License</h3>
                <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-gray-300">
                  Freelancers
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Perfect for independent digital consultants, freelance designers, and solo agency founders.
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white tracking-tight">$39</span>
                  <span className="text-gray-500 text-sm line-through font-semibold">$99</span>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save 60%
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">One-time payment &bull; Lifetime license</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>1 User Lifetime License Key</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited Website Performance Audits</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>CMS & Page Builder Bloat Detection</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>3-Channel Pitch Generator (Email, DM, Loom)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>1-Page Executive PDF Teardown Exports</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Chrome, Brave, Edge & Firefox Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Lifetime Free Updates & Bug Fixes</span>
                </li>
              </ul>
            </div>

            <Link
              href="/vitalssniper#auditor"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/20 bg-surface-elevated py-3.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-black hover:scale-[1.01]"
            >
              <span>Start Free Beta Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Agency Team */}
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 via-[#141724] to-[#12141d] p-8 sm:p-10 flex flex-col justify-between shadow-[0_25px_60px_rgba(16,185,129,0.15)] relative">
            
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black shadow-md">
              Most Popular For Agencies
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 className="text-2xl font-bold text-white">Agency Team</h3>
                <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300">
                  Growth Teams
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Engineered for SDR teams, digital agencies, and web optimization firms closing high-ticket retainers.
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white tracking-tight">$79</span>
                  <span className="text-gray-500 text-sm line-through font-semibold">$199</span>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save 60%
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">One-time payment &bull; 5 Team Seats</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-gray-200">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>5 Team Member Seats Included</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>White-Label Executive PDF Teardowns</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited Website Audits & Prospecting</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Full Cold Email, LinkedIn & Loom Script Engine</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>DOM Bloat & AI Citation Schema Readiness</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Dedicated Team License Management Portal</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Priority Support & Early Feature Access</span>
                </li>
              </ul>
            </div>

            <Link
              href="/vitalssniper#auditor"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black transition-all hover:bg-gray-100 hover:scale-[1.01] shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
            >
              <span>Join Public Beta (Free)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>

        {/* Voucher Redemption Banner */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Have an early access code or voucher?{' '}
            <Link href="/license" className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1">
              <Key className="h-3 w-3" />
              Redeem Voucher & Download Extension &rarr;
            </Link>
          </p>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>100% Free Public Beta</span>
          </div>
          <div className="hidden sm:block text-gray-600">&bull;</div>
          <div className="flex items-center gap-2">
            <span>🔒 Zero Tracking &amp; Client-Side Privacy</span>
          </div>
          <div className="hidden sm:block text-gray-600">&bull;</div>
          <div className="flex items-center gap-2">
            <span>⚡ Instant In-Browser Telemetry</span>
          </div>
        </div>

      </div>
    </section>
  );
}
