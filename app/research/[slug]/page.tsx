import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RESEARCH_STUDIES } from '@/data/research';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, ShieldCheck, Database, FileSpreadsheet } from 'lucide-react';

interface ResearchPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return RESEARCH_STUDIES.map((study) => ({
    slug: study.slug,
  }));
}

export function generateMetadata({ params }: ResearchPageProps) {
  const study = RESEARCH_STUDIES.find((s) => s.slug === params.slug);
  if (!study) return { title: 'Research Study Not Found | Web Audits' };

  return {
    title: `${study.title} | Web Audits`,
    description: study.summary,
  };
}

export default function ResearchDetailPage({ params }: ResearchPageProps) {
  const study = RESEARCH_STUDIES.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: study.title,
    description: study.summary,
    url: `https://www.webaudits.pro/research/${study.slug}`,
    creator: {
      '@type': 'Organization',
      name: 'Web Audits',
      url: 'https://www.webaudits.pro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Web Audits',
      url: 'https://www.webaudits.pro',
    },
    datePublished: study.date,
    temporalCoverage: '2025/2026',
    spatialCoverage: 'Global',
    variableMeasured: study.metrics.map((m) => m.label),
    measurementTechnique: study.methodology,
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
        name: 'Research',
        item: 'https://www.webaudits.pro/research',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: study.title,
        item: `https://www.webaudits.pro/research/${study.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      {/* Schema.org Dataset & Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      <div className="py-12 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Research Studies</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-charcoal-muted mb-3">
            <span className="editorial-pill">Primary Dataset</span>
            <span>Sample: {study.sampleSize}</span>
            <span>&bull;</span>
            <span>{study.date}</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-charcoal mb-4 leading-tight">
            {study.title}
          </h1>

          <p className="text-base text-charcoal-muted leading-relaxed max-w-3xl">
            {study.subtitle}
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="rounded-2xl border border-sand-300 bg-white p-5 shadow-xs">
              <span className="font-editorial text-3xl font-bold text-accent block mb-1">
                {metric.value}
              </span>
              <span className="text-xs font-bold text-charcoal block mb-1">
                {metric.label}
              </span>
              <span className="text-[11px] text-charcoal-muted leading-tight block">
                {metric.description}
              </span>
            </div>
          ))}
        </div>

        {/* Executive Summary & Findings */}
        <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-4">
            Executive Summary &amp; Empirical Findings
          </h2>
          <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
            {study.summary}
          </p>

          <div className="rounded-xl bg-[#F7F4EE] border border-sand-300 p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              Core Technical Conclusions:
            </h3>
            <ul className="space-y-3 text-xs text-charcoal">
              {study.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Methodology Specification */}
        <div className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm">
          <h3 className="font-editorial text-xl font-bold text-charcoal mb-3">
            Testing Methodology &amp; Reproducibility
          </h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            {study.methodology}
          </p>
        </div>

        {/* Navigation & Research CTA */}
        <div className="rounded-2xl bg-[#242321] text-[#F7F4EE] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-editorial text-xl font-bold mb-1">
              Want custom performance telemetry for your site?
            </h4>
            <p className="text-xs text-[#F7F4EE]/70">
              Run our in-browser diagnostic tools or test your site with VitalsSniper PRO.
            </p>
          </div>
          <Link
            href="/tools/website-speed-test"
            className="rounded-xl bg-accent px-5 py-3 text-xs font-bold text-white hover:bg-accent-dark transition-all flex-shrink-0 shadow-sm"
          >
            <span>Run Free Speed Audit</span>
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
