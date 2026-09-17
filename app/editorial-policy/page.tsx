import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, CheckCircle2, Beaker, Lock } from 'lucide-react';

export const metadata = {
  title: 'Editorial Policy & Independence Standards | Web Audits',
  description: 'Our testing standards, independence policy, review criteria, and commercial relationship boundaries at Web Audits.',
};

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <span className="editorial-pill mb-4">Integrity &amp; Standards</span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Editorial Policy &amp; Testing Methodology
          </h1>
          <p className="text-base text-charcoal-muted max-w-2xl leading-relaxed">
            How Web Audits evaluates web performance tools, manages commercial affiliations, and protects empirical accuracy.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm space-y-6 text-sm text-charcoal-muted leading-relaxed">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              1. Empirical Testing Standards
            </h2>
            <p>
              We do not accept vendor marketing claims at face value. Every software review, hosting benchmark, or speed comparison published on Web Audits undergoes at least 14 days of isolated staging and production testing. We measure concrete technical attributes: Time to First Byte (TTFB), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), DOM node counts, and database query serialization under simulated concurrency loads.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              2. Anti-Thin-Affiliate Mandate
            </h2>
            <p>
              In accordance with Google Search Quality guidelines and ethical publishing standards, we never publish mass-produced pages whose sole purpose is affiliate link distribution. We do not manufacture arbitrary ratings (e.g. 9.8/10) to promote high-commission tools. Instead, we document verified factual attributes: pricing models, API availability, staging capabilities, and concrete limitations.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              3. Commercial Relationship Boundaries
            </h2>
            <p>
              While Web Audits maintains affiliate relationships with vetted software providers (and sells our proprietary VitalsSniper PRO software), commercial considerations never dictate editorial conclusions. If a popular tool introduces excessive DOM bloat or fails mobile Core Web Vitals, we document that flaw explicitly. All outbound commercial links enforce rel=&quot;sponsored&quot;.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              4. Corrections &amp; Dataset Updates
            </h2>
            <p>
              Web performance is a constantly evolving discipline. When software releases updates that resolve previously identified limitations, or when browser rendering engines alter Core Web Vitals definitions, we re-test the software and update our guides with visible modification dates.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
