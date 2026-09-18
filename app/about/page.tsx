
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
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-2xs">
            <Target className="h-3.5 w-3.5 text-terracotta" />
            <span>Independent Editorial Standards</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Practical Web Intelligence for Better Websites
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
            Web Audits is a digital publication and tooling platform committed to objective web performance research, software testing, and actionable flaw detection.
          </p>
        </div>

        {/* The 3 Connected Revenue Streams */}
        <div className="paper-card rounded-2xl p-8 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta block mb-2">
            Platform Architecture
          </span>
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-4">
            Our Three Connected Engines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-charcoal-muted">
            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <strong className="text-charcoal block text-sm mb-1">1. The Content Engine</strong>
              <p className="leading-relaxed">
                Independent articles, tutorials, Core Web Vitals benchmarks, and 100-site teardowns designed to build durable organic search authority.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <strong className="text-charcoal block text-sm mb-1">2. The Affiliate Engine</strong>
              <p className="leading-relaxed">
                Rigorous testing of web hosts, page builders, and SEO tools with transparent disclosures and unbiased pros and limitations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <strong className="text-charcoal block text-sm mb-1">3. The Proprietary Tools</strong>
              <p className="leading-relaxed">
                Free in-browser scanners for instant flaw discovery, feeding into VitalsSniper PRO for commercial agency client acquisition.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Standards & Testing Methodology */}
        <div className="space-y-8 mb-14 text-sm text-charcoal-light leading-relaxed">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              How We Benchmark Software &amp; Hosting
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              We never review software from promotional press kits or marketing screenshots. Every web host, caching plugin, and page builder we feature is deployed in isolated sandbox environments with simulated concurrency traffic (50 to 500 simultaneous virtual users) to measure true Time to First Byte (TTFB) and CPU usage under stress.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              Our Transparency &amp; Affiliate Policy
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              We believe in clear, uncompromised independence. While we earn affiliate commissions when readers purchase recommended tools through our links, our testing criteria and scores remain completely independent. If a tool causes DOM bloat or breaks layout stability, we document it clearly regardless of affiliate compensation.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
              About VitalsSniper PRO
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              VitalsSniper PRO is our proprietary browser extension engineered for web agencies, freelance developers, and performance consultants. It was built out of frustration with generic 50-page Lighthouse PDF dumps that prospective clients never read. By combining 50ms client-side execution, pulsing LCP visual element overlays, and white-label executive tear sheets, VitalsSniper turns technical bottlenecks into high-value retainers.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-2xl border border-sand-300 bg-white text-center shadow-sm">
          <h3 className="font-editorial text-2xl font-bold text-charcoal mb-2">Have a Question or Tool Suggestion?</h3>
          <p className="text-xs text-charcoal-muted max-w-md mx-auto mb-6">
            We welcome benchmark requests, bug reports, and editorial feedback from web developers and digital agencies.
          </p>
          <a
            href={`mailto:${SITE_CONFIG.supportEmail}?subject=Editorial%20Inquiry`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-terracotta text-xs font-bold text-white hover:bg-terracotta-dark transition-all shadow-xs"
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
