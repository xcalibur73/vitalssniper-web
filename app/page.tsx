'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import LiveAuditor from '@/components/LiveAuditor';
import RoiCalculator from '@/components/RoiCalculator';
import PricingCards from '@/components/PricingCards';
import CheckoutModal from '@/components/CheckoutModal';
import Footer from '@/components/Footer';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  FileCode,
  Gauge,
  Smartphone,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<'solo' | 'agency'>('solo');

  function handleOpenCheckout(tier: 'solo' | 'agency') {
    setCheckoutTier(tier);
    setCheckoutOpen(true);
  }

  return (
    <main className="min-h-screen">
      
      {/* Navbar */}
      <Navbar onOpenCheckout={handleOpenCheckout} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 text-center">
        <div className="mx-auto max-w-4xl px-6">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-card px-4 py-1.5 text-xs font-semibold text-gray-300 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span>Chrome Manifest V3 Standard &bull; Firefox Compatible</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Proof-of-Flaw Web Inspector & <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-emerald-400 bg-clip-text text-transparent">
              Agency Client Acquisition Engine
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Audit any prospect's website in 1 second. Instantly detect page builder container bloat, cellular payload overages, and missing AI citation schemas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => handleOpenCheckout('solo')}
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-extrabold text-black shadow-[0_10px_30px_rgba(255,255,255,0.25)] transition-all hover:bg-gray-100 hover:scale-[1.02]"
            >
              <span>Get Lifetime Access — $39</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#auditor"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-surface-card px-6 py-4 text-base font-semibold text-gray-300 transition-all hover:border-white/30 hover:text-white"
            >
              <span>Try Live Scanner Below</span>
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5 text-amber-400">
              ★★★★★ <span className="text-gray-400">4.9/5 from 120+ agency founders</span>
            </span>
            <span>&bull;</span>
            <span>Zero External API Lag</span>
            <span>&bull;</span>
            <span>30-Day Money-Back Guarantee</span>
          </div>

        </div>

        {/* Hero Product Preview Showcase */}
        <div className="mx-auto max-w-5xl px-6 mt-16">
          <div className="rounded-2xl border border-white/15 bg-[#12141d] p-3 sm:p-4 shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
            <Image
              src="/assets/appsumo_hero_1920x1080.png"
              alt="VitalsSniper PRO Interface Preview"
              width={1920}
              height={1080}
              priority
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Interactive Live Scanner */}
      <LiveAuditor />

      {/* Feature Deep Dive Grid */}
      <section id="features" className="py-24 border-t border-white/[0.08] bg-[#0c0d14]/40">
        <div className="mx-auto max-w-6xl px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Engineered to Turn Flaws Into Retainers
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base">
              Everything you need to demonstrate immediate technical authority and pitch high-ticket remediation retainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-7 transition-all hover:border-white/20 hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1-Click CMS & Builder Detection</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Instantly identifies Elementor, Divi, WPBakery, Avada, Squarespace, Webflow, Shopify, or Next.js from live DOM footprints.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-7 transition-all hover:border-white/20 hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
                <FileCode className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">DOM Bloat & Container Overload</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Flags severe container nesting (&gt;1,400 elements) that freezes mobile viewports and crushes mobile PageSpeed scores.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-7 transition-all hover:border-white/20 hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5">
                <Gauge className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cellular Payload Weight Scanner</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Measures uncompressed document transfer weight against Google's recommended 50KB mobile cellular budget.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-7 transition-all hover:border-white/20 hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center mb-5">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile Zoom Lock Detection</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Flags locked viewport scaling tags (<code className="text-xs bg-black/40 px-1 py-0.5 rounded">user-scalable=0</code>) that hurt mobile usability and SEO rankings.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-7 transition-all hover:border-white/20 hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Citation Schema Readiness</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Validates Schema.org Knowledge Graph structured data required for ChatGPT, Perplexity, and Microsoft Copilot citations.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-7 transition-all hover:border-white/20 hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1-Page Executive PDF Teardowns</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Export print-optimized executive audit dossiers with 1 click to attach to cold outreach emails or proposal presentations.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ROI Calculator */}
      <RoiCalculator onOpenCheckout={handleOpenCheckout} />

      {/* Pricing Section */}
      <PricingCards onOpenCheckout={handleOpenCheckout} />

      {/* FAQ Section */}
      <section id="faq" className="py-24 border-t border-white/[0.08]">
        <div className="mx-auto max-w-4xl px-6">
          
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-base">
              Everything you need to know about VitalsSniper PRO.
            </p>
          </div>

          <div className="space-y-4">
            
            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6">
              <h4 className="text-base font-bold text-white mb-2">
                Does VitalsSniper need access to client server credentials?
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                No. VitalsSniper inspects publicly accessible DOM trees, HTML response sizes, and HTTP performance headers client-side in under 1 second. No passwords, API keys, or WordPress logins required.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6">
              <h4 className="text-base font-bold text-white mb-2">
                Which browsers are supported?
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                VitalsSniper PRO is built on the universal Manifest V3 standard and works smoothly on Google Chrome, Brave, Microsoft Edge, Arc, Opera, and Firefox Developer Edition.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6">
              <h4 className="text-base font-bold text-white mb-2">
                Can I customize the outreach scripts?
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Yes. The extension automatically tailors the script to cite the prospect's exact domain, page builder, and uncompressed payload size. You can edit or tweak the copy directly before copying.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6">
              <h4 className="text-base font-bold text-white mb-2">
                Is this a lifetime deal?
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Yes. All licenses purchased on this store include lifetime access with zero monthly recurring charges.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        defaultTier={checkoutTier}
      />

    </main>
  );
}
