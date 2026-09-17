import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cookie, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy | Web Audits Helper',
  description: 'Learn how Web Audits Helper uses cookies and local storage. We prioritize privacy with cookieless analytics and zero third-party advertising trackers.',
};

export default function CookiePolicyPage() {
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
            <Cookie className="h-3.5 w-3.5 text-accent" />
            <span>Transparency &amp; Privacy</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Cookie Policy
          </h1>

          <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl leading-relaxed">
            Last updated: March 2026. This policy explains our minimal use of cookies and local browser storage across webaudits.pro.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full prose-editorial space-y-8">
        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            1. Our Minimal Cookie Architecture
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
            Web Audits Helper is designed from the ground up as a privacy-conscious technical publication. Unlike ad-supported media sites that deploy dozens of third-party behavioral cookies, we keep cookie usage to the absolute minimum necessary to deliver core application functionality.
          </p>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            We do not sell user data, we do not run third-party advertising retargeting pixels (such as Meta Pixel or TikTok Pixel), and we do not profile your browsing habits across external domains.
          </p>
        </section>

        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            2. Categories of Storage We Use
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-charcoal-muted">
            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <h3 className="font-bold text-charcoal mb-1">Strictly Necessary Storage (Essential)</h3>
              <p className="leading-relaxed">
                These cookies and local storage tokens are essential for authenticated sessions and license key activation. For example, if you activate a VitalsSniper PRO license key, your verified token is stored locally in your browser so you do not need to re-enter it on every diagnostic check.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <h3 className="font-bold text-charcoal mb-1">Cookieless Privacy Analytics</h3>
              <p className="leading-relaxed">
                For website traffic analytics, we utilize Plausible Analytics, an open-source, privacy-first platform. Plausible does not use cookies, does not collect personal information, and does not track individual user identities across devices or days. All traffic measurements are aggregated and fully compliant with GDPR, CCPA, and PECR without requiring cookie consent popups.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <h3 className="font-bold text-charcoal mb-1">Affiliate Attribution Cookies (Third-Party)</h3>
              <p className="leading-relaxed">
                When you click an outbound affiliate link on our site (for example, to Cloudways or GeneratePress), you are directed to an external merchant website. That third-party platform may place an attribution cookie on your device to credit our publication with referral commissions. These cookies are governed by the respective merchant-s privacy and cookie policies.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            3. How to Manage and Disable Cookies
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
            You can control or delete cookies at any time through your browser settings. Most modern web browsers allow you to view existing cookies, delete cookies on browser exit, or block third-party cookies altogether.
          </p>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Please note that disabling essential local storage may prevent license key verification or remembered preferences from persisting between browser sessions.
          </p>
        </section>

        <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            4. Inquiries &amp; Contact
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            If you have any questions regarding our cookie practices or privacy safeguards, please reach out to our editorial compliance team at{' '}
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
