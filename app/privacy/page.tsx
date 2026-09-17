'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Home
        </Link>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-2xs">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            <span>Privacy &amp; Data Governance</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Last updated: March 2026. Web Audits Helper is committed to absolute data privacy and transparency.
          </p>
        </header>

        <div className="paper-card rounded-2xl p-8 space-y-6 text-sm text-charcoal-light leading-relaxed">
          <h2 className="font-editorial text-2xl font-bold text-charcoal">1. 100% Client-Side Execution Guarantee</h2>
          <p className="text-charcoal-muted leading-relaxed">
            When you run VitalsSniper PRO or inspect a website using our browser extension, all DOM traversal, CSS calculations, and image metric inspections occur locally inside your browser process. We do not transmit, collect, or store target prospect URLs on external servers.
          </p>

          <h2 className="font-editorial text-2xl font-bold text-charcoal pt-4">2. Website Audits &amp; Lead Magnet Tools</h2>
          <p className="text-charcoal-muted leading-relaxed">
            If you voluntarily submit your work email address via our free website audit report form, we use your email solely to deliver the requested technical tear sheet and relevant weekly web performance benchmarks. We never sell, rent, or trade your contact information.
          </p>

          <h2 className="font-editorial text-2xl font-bold text-charcoal pt-4">3. Affiliate Links &amp; Third-Party Services</h2>
          <p className="text-charcoal-muted leading-relaxed">
            Some links on our website are affiliate referral links. When you click these links, the third-party merchant may place a tracking cookie on your browser to credit referral commissions. This tracking is governed by the third-party merchant&apos;s privacy policy.
          </p>

          <h2 className="font-editorial text-2xl font-bold text-charcoal pt-4">4. Contacting Our Data Protection Team</h2>
          <p className="text-charcoal-muted leading-relaxed">
            For questions regarding data privacy or to request the deletion of your email address from our newsletter database, please contact support@webaudits.pro.
          </p>
        </div>

      </div>

      <Footer />
    </main>
  );
}
