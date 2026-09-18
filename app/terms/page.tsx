import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Web Audits',
  description: 'Terms of Service and legal usage conditions for Web Audits and VitalsSniper software.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB] mb-4 shadow-xs">
            <FileText className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl leading-relaxed">
            Last updated: March 2026. Please read these terms carefully before accessing Web Audits or using our software.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-8">
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            By accessing or using Web Audits (webaudits.pro) or purchasing VitalsSniper PRO, you agree to be bound by these Terms of Service. If you do not agree to these terms, you should not access our website or utilize our tools.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            2. Permitted Use of Diagnostic Software
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
            Our diagnostic utilities and VitalsSniper browser software are provided to help website owners, performance consultants, and digital agencies inspect publicly accessible web pages for performance and technical SEO diagnostics.
          </p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            You agree not to use our tools to conduct denial-of-service attempts, circumvent rate limits, scrape automated data without permission, or execute malicious security scanning against third-party servers.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            3. Software Licensing &amp; AppSumo Lifetime Deals
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
            Licenses purchased via AppSumo grant the licensee lifetime single-user access to core VitalsSniper PRO browser extension features, including future core bug fixes and diagnostic updates.
          </p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            License keys are non-transferable and may not be resold, leased, or distributed publicly. We reserve the right to revoke license keys found to be abused or shared on unauthorized forums.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            4. Disclaimers &amp; Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
            All audits, benchmarks, reviews, and diagnostic metrics provided on this site are for informational and educational purposes. While we strive for precision in our empirical laboratory testing, web performance varies across network profiles, server conditions, and device hardware.
          </p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Web Audits is not liable for any direct, indirect, or consequential damages resulting from technical modifications made to client websites or business decisions based on our audit reports.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            5. Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            For legal notices or questions regarding these terms, please contact{' '}
            <a href="mailto:support@webaudits.pro" className="text-[#2563EB] underline font-semibold">
              support@webaudits.pro
            </a>.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
