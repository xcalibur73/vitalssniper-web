import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TEARDOWNS } from '@/data/teardowns';
import { BLOG_POSTS } from '@/data/posts';
import { ArrowLeft, ArrowRight, Eye, ShieldAlert, CheckCircle2, Cpu, Wrench, BookOpen, Layers } from 'lucide-react';

interface TeardownPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return TEARDOWNS.map((td) => ({
    slug: td.slug,
  }));
}

export function generateMetadata({ params }: TeardownPageProps) {
  const td = TEARDOWNS.find((t) => t.slug === params.slug);
  if (!td) return { title: 'Teardown Not Found | Web Audits' };

  const description =
    td.metaDescription ||
    (td.seoFinding.length > 155 ? `${td.seoFinding.slice(0, 152)}...` : td.seoFinding);

  return {
    title: td.metaTitle || `${td.title.slice(0, 44)}... | Web Audits`,
    description,
  };
}

export default function TeardownDetailPage({ params }: TeardownPageProps) {
  const td = TEARDOWNS.find((t) => t.slug === params.slug);

  if (!td) {
    notFound();
  }

  // Sibling teardowns
  const otherTeardowns = TEARDOWNS.filter((t) => t.slug !== td.slug);

  // Relevant forensic guides
  const relatedGuides = BLOG_POSTS.filter((p) => {
    if (td.slug === 'website-teardown-027') {
      return (
        p.slug === 'why-your-lcp-score-tanks-on-mobile-how-to-fix-it' ||
        p.slug === 'zero-cls-web-design-principles'
      );
    }
    if (td.slug === 'website-teardown-028') {
      return (
        p.slug === 'how-many-dom-elements-is-too-many' ||
        p.slug === 'how-to-score-100-on-pagespeed-without-breaking-your-site'
      );
    }
    if (td.slug === 'website-teardown-029') {
      return (
        p.slug === 'why-mobile-lcp-is-slow-on-shopify' ||
        p.slug === 'why-your-hero-image-becomes-the-lcp-element'
      );
    }
    if (td.slug === 'website-teardown-030') {
      return (
        p.slug === 'how-many-dom-elements-is-too-many' ||
        p.slug === 'we-measured-it-elementor-vs-gutenberg-performance'
      );
    }
    return (
      p.slug === 'why-your-lcp-score-tanks-on-mobile-how-to-fix-it' ||
      p.slug === 'how-to-audit-50-client-sites-in-1-week'
    );
  }).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: td.title,
    description: td.seoFinding,
    url: `https://www.webaudits.pro/teardowns/${td.slug}`,
    image: ['https://www.webaudits.pro/assets/appsumo_hero_1920x1080.png'],
    datePublished: '2026-03-01',
    author: {
      '@type': 'Organization',
      name: 'Web Audits Editorial Team',
      url: 'https://www.webaudits.pro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Web Audits',
      url: 'https://www.webaudits.pro',
    },
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.webaudits.pro/favicon.svg',
    },
    about: {
      '@type': 'Thing',
      name: td.targetType,
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
        name: 'Teardowns',
        item: 'https://www.webaudits.pro/teardowns',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: td.title,
        item: `https://www.webaudits.pro/teardowns/${td.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      {/* Schema.org TechArticle & Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <span className="text-[#9CA3AF]" aria-hidden="true">/</span>
            <Link href="/teardowns" className="hover:text-[#0F0F0F] transition-colors">
              Teardowns
            </Link>
            <span className="text-[#9CA3AF]" aria-hidden="true">/</span>
            <span className="text-[#0F0F0F] font-semibold" aria-current="page">
              {td.title}
            </span>
          </nav>

          <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-3">
            <span className="rounded bg-[#111827] px-2 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
              {td.id}
            </span>
            <span>Target: {td.targetType}</span>
            <span>&bull;</span>
            <span>{td.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F0F] mb-4 leading-tight">
            {td.title}
          </h1>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center shadow-xs">
            <span className="text-xs text-[#6B7280] block mb-1">Mobile LCP</span>
            <span className="text-3xl font-bold text-[#EF4444] block">
              {td.lcpScore}
            </span>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center shadow-xs">
            <span className="text-xs text-[#6B7280] block mb-1">Total DOM Elements</span>
            <span className="text-3xl font-bold text-[#0F0F0F] block">
              {td.domElements}
            </span>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center shadow-xs">
            <span className="text-xs text-[#6B7280] block mb-1">Total Page Weight</span>
            <span className="text-3xl font-bold text-[#0F0F0F] block">
              {td.totalWeight}
            </span>
          </div>
        </div>

        {/* Diagnostic Findings */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-2">
              Primary Bottleneck Discovered
            </h2>
            <p className="text-sm text-[#0F0F0F] leading-relaxed">
              {td.seoFinding}
            </p>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] mb-2">
              User Experience Observation
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {td.uxObservation}
            </p>
          </div>

          {/* VitalsSniper Proof Box */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] mb-1">
              <Cpu className="h-4 w-4" />
              <span>VitalsSniper PRO Forensic Telemetry:</span>
            </div>
            <p className="text-xs text-[#0F0F0F]">
              {td.vitalsSniperProof}
            </p>
          </div>
        </div>

        {/* Actionable Engineering Recommendations */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-xs">
          <h2 className="text-xl font-bold text-[#0F0F0F] mb-4">
            Actionable Optimization Roadmap
          </h2>
          <ul className="space-y-3 text-xs text-[#0F0F0F]">
            {td.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Technical Guides */}
        {relatedGuides.length > 0 && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-xl font-bold text-[#0F0F0F]">
                Related Forensic Guides &amp; Architecture Tutorials
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/articles/${guide.slug}`}
                  className="group block p-4 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] hover:border-[#2563EB] hover:bg-white transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-[#4B5563]">{guide.category}</span>
                    <span className="text-[11px] text-[#6B7280]">{guide.readTime}</span>
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

        {/* Sibling Teardowns */}
        {otherTeardowns.length > 0 && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-xl font-bold text-[#0F0F0F]">
                Explore More Real-World Website Teardowns
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherTeardowns.map((other) => (
                <Link
                  key={other.slug}
                  href={`/teardowns/${other.slug}`}
                  className="group block p-4 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] hover:border-[#2563EB] hover:bg-white transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="rounded bg-[#111827] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      {other.id}
                    </span>
                    <span className="text-xs text-[#EF4444] font-bold">LCP {other.lcpScore}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-1 line-clamp-2">
                    {other.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] line-clamp-2">
                    {other.seoFinding}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Commercial Tool Bridge */}
        <div className="rounded-2xl bg-[#111827] text-[#F9FAFB] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1F2937]">
          <div>
            <p className="text-xl font-bold mb-1 text-white">
              Run this exact diagnostic on any live website
            </p>
            <p className="text-xs text-gray-400">
              VitalsSniper PRO inspects live tabs in 50ms and outputs white-label client tear sheets.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/tools/website-speed-test"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              <span>Free Speed Test</span>
            </Link>
            <Link
              href="/products/vitalssniper-pro"
              className="rounded-xl bg-[#2563EB] px-5 py-3 text-xs font-bold text-white hover:bg-[#1D4ED8] transition-all shadow-sm"
            >
              <span>Learn About VitalsSniper PRO</span>
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
