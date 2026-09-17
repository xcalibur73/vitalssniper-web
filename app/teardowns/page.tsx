import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeardownCard from '@/components/TeardownCard';
import { TEARDOWNS } from '@/data/teardowns';
import { Eye, ShieldAlert, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Website Teardowns: Forensic Speed & SEO Case Studies | Web Audits Helper',
  description: 'In-depth website teardowns analyzing real production sites for DOM bloat, mobile LCP failures, and render-blocking scripts using VitalsSniper PRO.',
};

export default function TeardownsIndexPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-[#F7F4EE] px-3 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-xs">
            <Eye className="h-3.5 w-3.5 text-accent" />
            <span>The VitalsSniper Showroom</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Forensic Website Teardowns
          </h1>
          <p className="text-base text-charcoal-muted max-w-2xl leading-relaxed">
            Real production teardowns documenting exact DOM nodes, script evaluation freezes, and mobile Core Web Vitals failures. See how our diagnostic tools uncover flaws that general audit checkers miss.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-5xl px-6 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEARDOWNS.map((teardown) => (
            <TeardownCard key={teardown.slug} teardown={teardown} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
