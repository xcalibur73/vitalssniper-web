import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure & Transparency | Web Audits',
  description: 'FTC compliance disclosure explaining our affiliate partnerships, rel="sponsored" link standards, and editorial boundaries.',
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 mb-4">FTC Compliance</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            Affiliate Disclosure
          </h1>
          <p className="text-base text-[#4B5563] max-w-2xl leading-relaxed">
            Full transparency regarding how Web Audits generates revenue, how affiliate links work, and our strict boundaries between editorial testing and commercial partnerships.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-xs space-y-6 text-sm text-[#4B5563] leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              1. What Is an Affiliate Link?
            </h2>
            <p>
              Some of the outbound links on Web Audits are affiliate links. If you click on an affiliate link and make a purchase from the third-party merchant (such as a web hosting provider, theme developer, or SEO software platform), Web Audits may receive a referral commission. This commission comes at zero additional cost to you: in many instances, our partnership agreements secure discounted introductory pricing or extended trial periods for our readers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              2. Strict Link Attribute Standards (rel=&quot;sponsored&quot;)
            </h2>
            <p>
              In accordance with Google Search Quality guidelines, FTC regulations, and industry transparency standards, all outbound affiliate and commercial links on Web Audits are programmatically tagged with rel=&quot;sponsored noopener&quot; or rel=&quot;nofollow sponsored&quot;. We do not participate in paid link schemes, hidden redirects, or undisclosed promotional endorsements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              3. Independence of Empirical Benchmarks
            </h2>
            <p>
              Our testing procedures and data collection methodologies are completely decoupled from affiliate partnerships. We do not accept payment to review software favorably, and high commission rates never influence product positioning or review verdicts. If a product fails our performance or security criteria, we state that finding clearly regardless of commercial arrangements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              4. Proprietary Software Products
            </h2>
            <p>
              Web Audits also owns and develops proprietary software, including our flagship browser extension VitalsSniper PRO. When we recommend VitalsSniper PRO on article pages or free tool landing pages, we disclose our ownership transparently so readers understand the commercial relationship.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
