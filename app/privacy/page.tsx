
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Web Audits',
  description: 'Web Audits privacy policy and data governance practices. We prioritize client-side forensics and privacy-respecting analytics.',
  alternates: {
    canonical: 'https://www.webaudits.pro/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-[#4B5563] hover:text-[#0F0F0F] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Home
        </Link>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4 shadow-2xs">
            <Lock className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Privacy &amp; Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Last updated: March 2026. Web Audits is committed to absolute data privacy and transparency.
          </p>
        </header>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 space-y-6 text-sm text-[#4B5563] leading-relaxed shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F]">1. 100% Client-Side Execution Guarantee</h2>
          <p className="leading-relaxed">
            When you run VitalsSniper PRO or inspect a website using our browser extension, all DOM traversal, CSS calculations, and image metric inspections occur locally inside your browser process. We do not transmit, collect, or store target prospect URLs on external servers.
          </p>

          <h2 className="text-2xl font-bold text-[#0F0F0F] pt-4">2. Website Audits &amp; Lead Magnet Tools</h2>
          <p className="leading-relaxed">
            If you voluntarily submit your work email address via our free website audit report form, we use your email solely to deliver the requested technical tear sheet and relevant weekly web performance benchmarks. We never sell, rent, or trade your contact information.
          </p>

          <h2 className="text-2xl font-bold text-[#0F0F0F] pt-4">3. Affiliate Links &amp; Third-Party Services</h2>
          <p className="leading-relaxed">
            Some links on our website are affiliate referral links. When you click these links, the third-party merchant may place a tracking cookie on your browser to credit referral commissions. This tracking is governed by the third-party merchant&apos;s privacy policy.
          </p>

          <h2 className="text-2xl font-bold text-[#0F0F0F] pt-4">4. Contacting Our Data Protection Team</h2>
          <p className="leading-relaxed">
            For questions regarding data privacy or to request the deletion of your email address from our newsletter database, please contact support@webaudits.pro.
          </p>
        </div>

      </div>

      <Footer />
    </main>
  );
}
