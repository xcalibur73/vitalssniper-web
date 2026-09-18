
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileSpreadsheet, FileText, Download, CheckCircle2, ArrowRight, BookOpen, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agency Resources & Pitch Templates | Web Audits',
  description: 'Downloadable cold outreach swipe files, executive speed proposal templates, and Core Web Vitals remediation checklists for web agencies.',
  alternates: {
    canonical: 'https://www.webaudits.pro/resources',
  },
};

export default function ResourcesPage() {
  const resources = [
    {
      title: 'The 3-Sentence Speed Pitch Swipe File',
      category: 'Cold Outreach',
      format: 'Markdown / PDF',
      description: 'Battle-tested cold email, LinkedIn DM, and 30-second Loom scripts citing prospect DOM bloat and LCP flaws that generate 28%+ reply rates.',
      highlights: ['Non-salesy peer-to-peer framing', 'Specific flaw variables (LCP element, DOM count)', 'Calendly invitation closing script'],
      href: '/docs#pitch-templates',
    },
    {
      title: 'Executive Speed Remediation Proposal Template',
      category: 'Agency Growth',
      format: 'Word / Google Docs',
      description: 'The exact proposal template used to bridge the gap between technical Core Web Vitals diagnostics and high-ticket $3,000 to $5,000 client retainers.',
      highlights: ['Scope of work definition (SOW)', 'Before vs After metric benchmarks', 'Deliverable timeline and payment milestones'],
      href: '/docs#proposal-template',
    },
    {
      title: 'WordPress Core Web Vitals Checklist (2026)',
      category: 'Checklist',
      format: 'Interactive Sheet',
      description: 'A 24-point audit checklist covering server configuration, Redis object caching, Brotli compression, image budgets, and script delaying.',
      highlights: ['Step-by-step remediation order', 'Zero-CLS layout stability guidelines', 'Tested plugins compatibility matrix'],
      href: '/docs#speed-checklist',
    },
    {
      title: 'AI & GEO Search Readiness Schema Template',
      category: 'Technical SEO',
      format: 'JSON-LD Snippet',
      description: 'Copy-and-paste Schema.org JSON-LD templates linking Organization identity, author credentials, and primary semantic entities for ChatGPT and Perplexity citations.',
      highlights: ['Valid Schema.org syntax', 'Author E-E-A-T property links', 'llms.txt configuration guide'],
      href: '/docs#schema-templates',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-2xs">
            <BookOpen className="h-3.5 w-3.5 text-terracotta" />
            <span>Free Agency Playbooks</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Resources &amp; Agency Playbooks
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Free checklists, proposal templates, and cold outreach swipe files to help web professionals turn technical site flaws into closed retainers.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {resources.map((item) => (
            <div
              key={item.title}
              className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="editorial-pill">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-bold text-charcoal-subtle bg-sand-200 px-2.5 py-0.5 rounded font-mono">
                    {item.format}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-5">
                  {item.description}
                </p>

                <div className="space-y-2 text-xs text-charcoal-light border-t border-sand-300 pt-4 mb-6">
                  {item.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={item.href}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-charcoal text-xs font-bold text-white hover:bg-black transition-all shadow-xs"
              >
                <span>Access Resource</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}
