import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Affiliate Disclosure & Commercial Transparency | Web Audits Helper',
  description: 'FTC compliance disclosure explaining our affiliate partnerships, rel="sponsored" link standards, and editorial boundaries.',
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <span className="editorial-pill mb-4">FTC Compliance</span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Affiliate Disclosure
          </h1>
          <p className="text-base text-charcoal-muted max-w-2xl leading-relaxed">
            Full transparency regarding how Web Audits Helper generates revenue, how affiliate links work, and our strict boundaries between editorial testing and commercial partnerships.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm space-y-6 text-sm text-charcoal-muted leading-relaxed">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              1. What Is an Affiliate Link?
            </h2>
            <p>
              Some of the outbound links on Web Audits Helper are affiliate links. If you click on an affiliate link and make a purchase from the third-party merchant (such as a web hosting provider, theme developer, or SEO software platform), Web Audits Helper may receive a referral commission. This commission comes at zero additional cost to you: in many instances, our partnership agreements secure discounted introductory pricing or extended trial periods for our readers.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              2. Strict Link Attribute Standards (rel=&quot;sponsored&quot;)
            </h2>
            <p>
              In accordance with Google Search Quality guidelines, FTC regulations, and industry transparency standards, all outbound affiliate and commercial links on Web Audits Helper are programmatically tagged with rel=&quot;sponsored noopener&quot; or rel=&quot;nofollow sponsored&quot;. We do not participate in paid link schemes, hidden redirects, or undisclosed promotional endorsements.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              3. Independence of Empirical Benchmarks
            </h2>
            <p>
              Our testing procedures and data collection methodologies are completely decoupled from affiliate partnerships. We do not accept payment to review software favorably, and high commission rates never influence product positioning or review verdicts. If a product fails our performance or security criteria, we state that finding clearly regardless of commercial arrangements.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              4. Proprietary Software Products
            </h2>
            <p>
              Web Audits Helper also owns and develops proprietary software, including our flagship browser extension VitalsSniper PRO. When we recommend VitalsSniper PRO on article pages or free tool landing pages, we disclose our ownership transparently so readers understand the commercial relationship.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
