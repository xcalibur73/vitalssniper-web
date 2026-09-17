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
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-[#F7F4EE] px-3 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-xs">
            <FileText className="h-3.5 w-3.5 text-accent" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl leading-relaxed">
            Last updated: March 2026. Please read these terms carefully before accessing Web Audits or using our software.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full prose-editorial space-y-8">
        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            By accessing or using Web Audits (webaudits.pro) or purchasing VitalsSniper PRO, you agree to be bound by these Terms of Service. If you do not agree to these terms, you should not access our website or utilize our tools.
          </p>
        </section>

        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            2. Permitted Use of Diagnostic Software
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
            Our diagnostic utilities and VitalsSniper browser software are provided to help website owners, performance consultants, and digital agencies inspect publicly accessible web pages for performance and technical SEO diagnostics.
          </p>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            You agree not to use our tools to conduct denial-of-service attempts, circumvent rate limits, scrape automated data without permission, or execute malicious security scanning against third-party servers.
          </p>
        </section>

        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            3. Software Licensing &amp; AppSumo Lifetime Deals
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
            Licenses purchased via AppSumo grant the licensee lifetime single-user access to core VitalsSniper PRO browser extension features, including future core bug fixes and diagnostic updates.
          </p>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            License keys are non-transferable and may not be resold, leased, or distributed publicly. We reserve the right to revoke license keys found to be abused or shared on unauthorized forums.
          </p>
        </section>

        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            4. Disclaimers &amp; Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
            All audits, benchmarks, reviews, and diagnostic metrics provided on this site are for informational and educational purposes. While we strive for precision in our empirical laboratory testing, web performance varies across network profiles, server conditions, and device hardware.
          </p>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Web Audits is not liable for any direct, indirect, or consequential damages resulting from technical modifications made to client websites or business decisions based on our audit reports.
          </p>
        </section>

        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            5. Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            For legal notices or questions regarding these terms, please contact{' '}
            <a href="mailto:support@webaudits.pro" className="text-accent underline font-semibold">
              support@webaudits.pro
            </a>.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
