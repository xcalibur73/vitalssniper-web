import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RESEARCH_STUDIES } from '@/data/research';
import { BLOG_POSTS } from '@/data/posts';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, ShieldCheck, Database, FileSpreadsheet, BookOpen, Layers } from 'lucide-react';

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

  const description =
    study.metaDescription ||
    (study.summary.length > 155 ? `${study.summary.slice(0, 152)}...` : study.summary);

  return {
    title: study.metaTitle || `${study.title.slice(0, 44)}... | Web Audits`,
    description,
  };
}

export default function ResearchDetailPage({ params }: ResearchPageProps) {
  const study = RESEARCH_STUDIES.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  // Sibling research studies
  const otherStudies = RESEARCH_STUDIES.filter((s) => s.slug !== study.slug);

  // Relevant articles mapped from study context
  const relatedGuides = BLOG_POSTS.filter((p) => {
    if (study.slug === 'website-performance-report') {
      return (
        p.slug === 'how-many-dom-elements-is-too-many' ||
        p.slug === 'why-your-lcp-score-tanks-on-mobile-how-to-fix-it'
      );
    }
    if (study.slug === 'agency-websites-study') {
      return (
        p.slug === '100-agency-websites-study-speed-and-seo' ||
        p.slug === 'the-agency-guide-to-white-label-website-audits'
      );
    }
    if (study.slug === 'ai-search-readiness') {
      return (
        p.slug === 'how-to-make-your-website-discoverable-by-ai-search-engines' ||
        p.slug === 'does-llms-txt-actually-matter-test'
      );
    }
    if (study.slug === 'javascript-payload-study') {
      return (
        p.slug === 'how-to-score-100-on-pagespeed-without-breaking-your-site' ||
        p.slug === '5-best-wordpress-speed-plugins-2026'
      );
    }
    return p.category === 'Web Performance';
  }).slice(0, 2);

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
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
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

      <div className="py-12 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6">
          {/* Semantic 3-Tier Visual Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-1.5 text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#0F0F0F] transition-colors">
              Home
            </Link>
            <span className="text-[#9CA3AF]">/</span>
            <Link href="/research" className="hover:text-[#0F0F0F] transition-colors">
              Research
            </Link>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F0F0F] font-semibold" aria-current="page">
              {study.title}
            </span>
          </nav>

          <div className="flex items-center gap-3 text-xs text-[#4B5563] mb-3">
            <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2.5 py-0.5 text-xs font-semibold">Primary Dataset</span>
            <span>Sample: {study.sampleSize}</span>
            <span>&bull;</span>
            <span>{study.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0F] mb-4 leading-tight">
            {study.title}
          </h1>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-3xl">
            {study.subtitle}
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
              <span className="text-3xl font-bold text-[#2563EB] block mb-1">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-[#0F0F0F] block mb-1">
                {metric.label}
              </span>
              <span className="text-[11px] text-[#4B5563] leading-tight block">
                {metric.description}
              </span>
            </div>
          ))}
        </div>

        {/* Executive Summary & Findings */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] mb-4">
            Executive Summary &amp; Empirical Findings
          </h2>
          <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
            {study.summary}
          </p>

          <div className="rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] mb-4">
              Core Technical Conclusions:
            </h3>
            <ul className="space-y-3 text-xs text-[#4B5563]">
              {study.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Methodology Specification */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-[#0F0F0F] mb-3">
            Testing Methodology &amp; Reproducibility
          </h2>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            {study.methodology}
          </p>
        </div>

        {/* Related Technical Guides */}
        {relatedGuides.length > 0 && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-lg font-bold text-[#0F0F0F]">
                Related Research Guides &amp; Actionable Analysis
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/articles/${guide.slug}`}
                  className="group block p-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#2563EB] hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2 py-0.5 text-[10px] font-semibold">{guide.category}</span>
                    <span className="text-[11px] text-[#4B5563]">{guide.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-1.5">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] line-clamp-2">
                    {guide.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sibling Research Studies */}
        {otherStudies.length > 0 && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-lg font-bold text-[#0F0F0F]">
                Explore More Original Benchmark Datasets
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherStudies.map((other) => (
                <Link
                  key={other.slug}
                  href={`/research/${other.slug}`}
                  className="group block p-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#2563EB] hover:bg-white transition-colors"
                >
                  <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2 py-0.5 text-[10px] font-semibold mb-2 inline-block">Sample: {other.sampleSize}</span>
                  <h3 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-1">
                    {other.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] line-clamp-2">
                    {other.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation & Research CTA */}
        <div className="rounded-xl bg-[#111827] text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1F2937] shadow-xs">
          <div>
            <p className="text-xl font-bold mb-1">
              Want custom performance telemetry for your site?
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Run our in-browser diagnostic tools or test your site with VitalsSniper PRO.
            </p>
          </div>
          <Link
            href="/tools/website-speed-test"
            className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors flex-shrink-0 shadow-xs"
          >
            <span>Run Free Speed Audit</span>
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
