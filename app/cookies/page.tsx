import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cookie, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy | Web Audits',
  description: 'Learn how Web Audits uses cookies and local storage. We prioritize privacy with cookieless analytics and zero third-party advertising trackers.',
};

export default function CookiePolicyPage() {
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
            <Cookie className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Transparency &amp; Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            Cookie Policy
          </h1>

          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl leading-relaxed">
            Last updated: March 2026. This policy explains our minimal use of cookies and local browser storage across webaudits.pro.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-8">
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            1. Our Minimal Cookie Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
            Web Audits is designed from the ground up as a privacy-conscious technical publication. Unlike ad-supported media sites that deploy dozens of third-party behavioral cookies, we keep cookie usage to the absolute minimum necessary to deliver core application functionality.
          </p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            We do not sell user data, we do not run third-party advertising retargeting pixels (such as Meta Pixel or TikTok Pixel), and we do not profile your browsing habits across external domains.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            2. Categories of Storage We Use
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#4B5563]">
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
              <h3 className="font-bold text-[#0F0F0F] mb-1">Strictly Necessary Storage (Essential)</h3>
              <p className="leading-relaxed">
                These cookies and local storage tokens are essential for authenticated sessions and license key activation. For example, if you activate a VitalsSniper PRO license key, your verified token is stored locally in your browser so you do not need to re-enter it on every diagnostic check.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
              <h3 className="font-bold text-[#0F0F0F] mb-1">Cookieless Privacy Analytics</h3>
              <p className="leading-relaxed">
                For website traffic analytics, we utilize Plausible Analytics, an open-source, privacy-first platform. Plausible does not use cookies, does not collect personal information, and does not track individual user identities across devices or days. All traffic measurements are aggregated and fully compliant with GDPR, CCPA, and PECR without requiring cookie consent popups.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
              <h3 className="font-bold text-[#0F0F0F] mb-1">Affiliate Attribution Cookies (Third-Party)</h3>
              <p className="leading-relaxed">
                When you click an outbound affiliate link on our site (for example, to Cloudways or GeneratePress), you are directed to an external merchant website. That third-party platform may place an attribution cookie on your device to credit our publication with referral commissions. These cookies are governed by the respective merchant-s privacy and cookie policies.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            3. How to Manage and Disable Cookies
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
            You can control or delete cookies at any time through your browser settings. Most modern web browsers allow you to view existing cookies, delete cookies on browser exit, or block third-party cookies altogether.
          </p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Please note that disabling essential local storage may prevent license key verification or remembered preferences from persisting between browser sessions.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
            4. Inquiries &amp; Contact
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            If you have any questions regarding our cookie practices or privacy safeguards, please reach out to our editorial compliance team at{' '}
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
