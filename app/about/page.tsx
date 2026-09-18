
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Target, Award, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Web Audits - Editorial Standards & Mission',
  description: 'Learn about Web Audits, our testing lab methodology, independent editorial standards, and commitment to reproducible web performance benchmarks.',
  alternates: {
    canonical: 'https://www.webaudits.pro/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4 shadow-2xs">
            <Target className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Independent Editorial Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] mb-4">
            Practical Web Intelligence for Better Websites
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
            Web Audits is a digital publication and tooling platform committed to objective web performance research, software testing, and actionable flaw detection.
          </p>
        </div>

        {/* The 3 Connected Revenue Streams */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 mb-12 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-2">
            Platform Architecture
          </span>
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-4">
            Our Three Connected Engines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4B5563]">
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
              <strong className="text-[#0F0F0F] block text-sm mb-1">1. The Content Engine</strong>
              <p className="leading-relaxed">
                Independent articles, tutorials, Core Web Vitals benchmarks, and 100-site teardowns designed to build durable organic search authority.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
              <strong className="text-[#0F0F0F] block text-sm mb-1">2. The Affiliate Engine</strong>
              <p className="leading-relaxed">
                Rigorous testing of web hosts, page builders, and SEO tools with transparent disclosures and unbiased pros and limitations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
              <strong className="text-[#0F0F0F] block text-sm mb-1">3. The Proprietary Tools</strong>
              <p className="leading-relaxed">
                Free in-browser scanners for instant flaw discovery, feeding into VitalsSniper PRO for commercial agency client acquisition.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Standards & Testing Methodology */}
        <div className="space-y-8 mb-14 text-sm text-[#4B5563] leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              How We Benchmark Software &amp; Hosting
            </h2>
            <p className="leading-relaxed">
              We never review software from promotional press kits or marketing screenshots. Every web host, caching plugin, and page builder we feature is deployed in isolated sandbox environments with simulated concurrency traffic (50 to 500 simultaneous virtual users) to measure true Time to First Byte (TTFB) and CPU usage under stress.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              Our Transparency &amp; Affiliate Policy
            </h2>
            <p className="leading-relaxed">
              We believe in clear, uncompromised independence. While we earn affiliate commissions when readers purchase recommended tools through our links, our testing criteria and scores remain completely independent. If a tool causes DOM bloat or breaks layout stability, we document it clearly regardless of affiliate compensation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              About VitalsSniper: Why We Built It
            </h2>
            <p className="leading-relaxed mb-4">
              VitalsSniper was born out of frustration with how broken website auditing had become. We spent years watching agencies burn hours assembling 50-page PDF reports that clients deleted in seconds, solo freelancers struggle to pitch without an army of sales staff, and solo website owners panic over abstract red scores they could not understand.
            </p>
            <p className="leading-relaxed font-semibold text-[#0F0F0F] mb-4">
              We built VitalsSniper because we were exhausted by this entire charade.
            </p>
            <p className="leading-relaxed mb-4">
              By moving diagnostics directly into the browser toolbar with 50-millisecond local execution, VitalsSniper replaces confusing scorecards with visible, undeniable proof:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4B5563] list-disc list-inside">
              <li><strong className="text-[#0F0F0F]">Solo Website Owners:</strong> Identify the exact heavy hero image or bloated plugin slowing your mobile site and fix it in 10 minutes free without hiring a consultant.</li>
              <li><strong className="text-[#0F0F0F]">Solo Freelancers:</strong> Pitch prospective clients with 3-sentence proof-of-flaw notes and 1-page branded tear sheets that establish instant technical authority.</li>
              <li><strong className="text-[#0F0F0F]">Digital Agencies:</strong> Triage 50 prospect domains in an afternoon directly from active tabs and close speed retainers with undeniable visual evidence.</li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-2xl border border-[#E5E7EB] bg-white text-center shadow-xs">
          <h3 className="text-2xl font-bold text-[#0F0F0F] mb-2">Have a Question or Tool Suggestion?</h3>
          <p className="text-xs text-[#6B7280] max-w-md mx-auto mb-6">
            We welcome benchmark requests, bug reports, and editorial feedback from web developers and digital agencies.
          </p>
          <a
            href={`mailto:${SITE_CONFIG.supportEmail}?subject=Editorial%20Inquiry`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] text-xs font-bold text-white hover:bg-[#1D4ED8] transition-all shadow-xs"
          >
            <span>Email the Editorial Team ({SITE_CONFIG.supportEmail})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>

      <Footer />
    </main>
  );
}
