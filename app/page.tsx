'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import LicenseActivation from '@/components/LicenseActivation';
import LiveAuditor from '@/components/LiveAuditor';
import Deliverables from '@/components/Deliverables';
import DocsSection from '@/components/DocsSection';
import Footer from '@/components/Footer';
import { Sparkles, ExternalLink, ShieldCheck, ArrowRight, Key } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Embedded License Activation */}
      <section className="relative pt-16 pb-16 text-center">
        <div className="mx-auto max-w-4xl px-6">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span>Official AppSumo Customer Hub &bull; Manifest V3 Certified</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
            Proof-of-Flaw Web Inspector & <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-emerald-400 bg-clip-text text-transparent">
              Agency Client Acquisition Engine
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Redeem your AppSumo voucher to download your commercial extension, test the 4-scan live demo, or read the 30-second installation guide.
          </p>

          {/* Embedded Activation Box */}
          <div className="mb-14">
            <LicenseActivation />
          </div>

          {/* Social Proof Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5 text-amber-400">
              ★★★★★ <span className="text-gray-300">Official AppSumo Partner</span>
            </span>
            <span>&bull;</span>
            <span>Instant ZIP Delivery</span>
            <span>&bull;</span>
            <span>60-Day AppSumo Guarantee</span>
          </div>

        </div>

        {/* Hero Product Preview Showcase */}
        <div className="mx-auto max-w-4xl px-6 mt-12">
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

      {/* Interactive Live Demo (4-Try Cap) */}
      <LiveAuditor />

      {/* What You Get / Deliverables */}
      <Deliverables />

      {/* Documentation & How to Use Playbook */}
      <DocsSection />

      {/* AppSumo Listing Callout Banner */}
      <section className="py-16 border-t border-white/[0.08] bg-gradient-to-b from-[#12141d] to-[#090a10]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Available Exclusively on AppSumo</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Get VitalsSniper PRO Lifetime Access Today
            </h2>
            <p className="text-xs sm:text-base text-gray-400 max-w-xl mx-auto mb-8">
              Audit unlimited websites directly from your browser toolbar in 50 milliseconds. No monthly fees, no server lag.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SITE_CONFIG.appsumoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-black shadow-[0_4px_20px_rgba(255,255,255,0.25)] transition-all hover:bg-gray-100 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Buy Lifetime Deal on AppSumo — $39</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="#activate"
                className="w-full sm:w-auto rounded-xl border border-white/20 bg-surface-card px-6 py-4 text-sm font-semibold text-gray-300 transition-all hover:border-white/30 hover:text-white flex items-center justify-center gap-2"
              >
                <Key className="h-4 w-4 text-emerald-400" />
                <span>Already Bought? Redeem Code Above</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>60-Day AppSumo Money-Back Guarantee</span>
              </div>
              <span>&bull;</span>
              <span>100% Client-Side Privacy</span>
              <span>&bull;</span>
              <span>Lifetime Updates</span>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
