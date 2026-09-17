import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/config/site';
import {
  Check,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  Clock,
  Cpu,
  Mail,
  Users,
} from 'lucide-react';

export const metadata = {
  title: 'VitalsSniper PRO: Proof-of-Flaw Web Inspector & Outreach Engine',
  description: 'Instant Chromium tab forensics, live LCP element highlighting, white-label client tear sheets, and lead CRM export for performance agencies.',
};

export default function VitalsSniperProductPage() {
  const coreWorkflow = [
    {
      num: '01',
      title: 'Audit',
      subtitle: '50ms In-Tab Scan',
      desc: 'Injects directly into any active browser tab. Audits DOM element depth, third-party payload bloat, and CMS stack with zero server lag.',
    },
    {
      num: '02',
      title: 'Diagnose',
      subtitle: 'Isolate Bottlenecks',
      desc: 'Pinpoints the exact DOM node triggering Largest Contentful Paint (LCP) and render-blocking scripts causing high Interaction to Next Paint (INP).',
    },
    {
      num: '03',
      title: 'Visual Proof',
      subtitle: 'Live Element Outline',
      desc: 'In-viewport pulsing red highlight around the offending hero element or uncompressed asset. Undeniable evidence for prospect outreach.',
    },
    {
      num: '04',
      title: 'Report',
      subtitle: 'White-Label PDF Teardown',
      desc: 'Generates a crisp 1-page executive summary stamped with your agency branding, Calendly booking link, and specific technical flaw documentation.',
    },
    {
      num: '05',
      title: 'Proposal',
      subtitle: 'Ready-to-Send Outreach',
      desc: 'Pre-written 3-sentence email hooks and proposal copy designed to turn speed flaws into $3,500+ monthly optimization retainers.',
    },
    {
      num: '06',
      title: 'Monitor',
      subtitle: 'Regression Tracking',
      desc: 'Save audited domains into your local CRM database. Export structured CSV lists formatted for Lemlist and Instantly outreach campaigns.',
    },
  ];

  const planFeatures = [
    'Chromium browser extension with lifetime license',
    'Instant 50ms client-side performance diagnostics',
    'Live in-tab LCP visual target overlay',
    'DOM tree depth and element bloat inspector',
    'Executive 1-page white-label PDF tear sheet generator',
    'Custom agency branding and Calendly booking CTA injection',
    'Outreach proposal generator with 3-sentence high-reply scripts',
    'Local domain CRM with 1-click CSV export',
    'Zero monthly subscription fees: all future core updates included',
  ];

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VitalsSniper PRO',
    operatingSystem: 'Chromium browsers (Chrome, Edge, Brave, Arc, Opera)',
    applicationCategory: 'DeveloperApplication',
    description:
      'Proof-of-flaw web inspector and outreach engine for performance agencies and technical SEO consultants.',
    url: 'https://www.webaudits.pro/products/vitalssniper-pro',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Free public beta access with full in-tab telemetry and white-label tear sheets.',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.webaudits.pro/#organization',
      name: 'Web Audits',
      url: 'https://www.webaudits.pro',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.webaudits.pro',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://www.webaudits.pro/vitalssniper',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'VitalsSniper PRO',
        item: 'https://www.webaudits.pro/products/vitalssniper-pro',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      {/* Schema.org SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent mb-6 shadow-xs">
            <Sparkles className="h-4 w-4" />
            <span>VitalsSniper PRO &bull; Flagship Agency Software</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal mb-6 leading-tight">
            Find the Problem. <br />
            Prove It. <span className="italic font-normal text-accent">Sell the Solution.</span>
          </h1>

          <p className="text-base sm:text-xl text-charcoal-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            The in-browser performance forensics and client outreach engine. Built for web agencies, SEO specialists, and freelance consultants to close speed optimization retainers in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/vitalssniper#auditor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-accent-dark hover:scale-[1.01] transition-all"
            >
              <span>Join Free Public Beta</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/tools/website-speed-test"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-sand-300 bg-white px-8 py-4 text-sm font-bold text-charcoal shadow-sm hover:border-accent hover:text-accent transition-all"
            >
              <span>Try Free In-Browser Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Screenshot Container */}
          <div className="rounded-3xl border border-charcoal bg-[#242321] p-3 sm:p-5 shadow-2xl max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-xs text-white/60 mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-white/70">
                Chromium Active Tab Forensics &bull; VitalsSniper PRO
              </span>
              <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">50ms Telemetry</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/assets/appsumo_hero_1920x1080.png"
                alt="VitalsSniper PRO Browser Extension Interface"
                width={1920}
                height={1080}
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The 6-Stage Core Workflow (Section 11) */}
      <section className="py-20 border-b border-sand-300 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-pill mb-2">The Complete Workflow</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              From Flaw Detection to Signed Contract
            </h2>
            <p className="text-sm text-charcoal-muted mt-2 leading-relaxed">
              VitalsSniper PRO is not just a passive checker: it is an end-to-end client acquisition engine designed to convert technical issues into revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreWorkflow.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-accent">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted bg-[#F7F4EE] px-2.5 py-1 rounded">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table (Section 11 & 25) */}
      <section className="py-20 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="editorial-pill mb-2">Public Beta Program</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              Open Beta: 100% Free Testing
            </h2>
            <p className="text-sm text-charcoal-muted mt-2">
              Test in-browser tab diagnostics and client proposal generation for free. No credit card, no paywall, and zero risk.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-accent bg-[#F7F4EE] p-8 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-[11px] font-bold uppercase tracking-wider px-6 py-1.5 rounded-bl-xl">
              Public Beta
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-sand-300 mb-8">
              <div>
                <h3 className="font-editorial text-3xl font-bold text-charcoal">
                  VitalsSniper PRO
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Full agency client-acquisition suite with free access during public beta.
                </p>
              </div>

              <div className="text-right">
                <span className="font-editorial text-5xl font-bold text-charcoal">$0</span>
                <span className="text-xs text-charcoal-muted ml-2 font-medium">during open beta</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-xs text-charcoal">
              {planFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/vitalssniper#auditor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-accent-dark transition-all"
              >
                <span>Launch In-Browser Beta Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <span className="text-xs text-charcoal-muted flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>100% Free Public Beta</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
