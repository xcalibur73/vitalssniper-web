import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FREE_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { BLOG_POSTS } from '@/data/posts';
import ToolRunnerClient from '@/components/ToolRunnerClient';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface ToolPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const freeTool = FREE_TOOLS.find((t) => t.slug === params.slug);
  const fallbackProduct = PRODUCTS.find((p) => p.slug === params.slug);

  if (freeTool) {
    return {
      title: `${freeTool.name} | Free SEO Tool`,
      description: freeTool.shortDescription || freeTool.fullDescription,
      alternates: {
        canonical: `https://www.webaudits.pro/tools/${freeTool.slug}`,
      },
    };
  }

  if (fallbackProduct) {
    return {
      title: `${fallbackProduct.name} | Review`,
      description: fallbackProduct.description,
      alternates: {
        canonical: `https://www.webaudits.pro/tools/${fallbackProduct.slug}`,
      },
    };
  }

  return {};
}

export function generateStaticParams() {
  return FREE_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export default function ToolLandingPage({ params }: ToolPageProps) {
  const freeTool = FREE_TOOLS.find((t) => t.slug === params.slug);
  const fallbackProduct = PRODUCTS.find((p) => p.slug === params.slug);

  if (!freeTool && !fallbackProduct) {
    notFound();
  }

  // If a user navigated to a product slug under /tools, display a bridge to its full review
  if (!freeTool && fallbackProduct) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
        <Navbar />
        <div className="py-20 mx-auto max-w-4xl px-6 text-center">
          <span className="text-4xl mb-4 block">{fallbackProduct.iconEmoji}</span>
          <h1 className="text-3xl font-bold mb-3 text-[#0F0F0F]">{fallbackProduct.name}</h1>
          <p className="text-sm text-[#4B5563] max-w-xl mx-auto mb-6 leading-relaxed">{fallbackProduct.description}</p>
          <Link
            href={`/reviews/${fallbackProduct.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
          >
            <span>Read Full Empirical Review</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const tool = freeTool!;
  const relatedGuide = BLOG_POSTS.find((p) => p.slug === tool.relatedGuideSlug) || BLOG_POSTS[0];
  const relatedSisterTool = FREE_TOOLS.find((t) => t.slug === tool.relatedToolSlug) || FREE_TOOLS[0];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.fullDescription || tool.shortDescription,
    url: `https://www.webaudits.pro/tools/${tool.slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All modern browsers',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@type': 'Organization',
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
        name: 'Tools',
        item: 'https://www.webaudits.pro/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `https://www.webaudits.pro/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      {/* Schema.org WebApplication & Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Header Breadcrumb */}
      <div className="py-12 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6">
          {/* Semantic 3-Tier Visual Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-1.5 text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#0F0F0F] transition-colors">
              Home
            </Link>
            <span className="text-[#9CA3AF]" aria-hidden="true">/</span>
            <Link href="/tools" className="hover:text-[#0F0F0F] transition-colors">
              Tools
            </Link>
            <span className="text-[#9CA3AF]" aria-hidden="true">/</span>
            <span className="text-[#0F0F0F] font-semibold" aria-current="page">
              {tool.name}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#4B5563] mb-3">
            <span className="text-2xl">{tool.icon}</span>
            <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2.5 py-0.5 text-xs font-semibold">{tool.category}</span>
            <span className="text-[#10B981] font-semibold bg-[#10B981]/10 px-2.5 py-0.5 rounded border border-[#10B981]/20">
              100% Free Utility
            </span>
            {tool.githubUrl && (
              <a
                href={tool.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#E5E7EB] bg-[#F8F8F8] hover:bg-[#E5E7EB] text-xs font-medium text-[#0F0F0F] transition-colors"
              >
                <ExternalLink className="h-3 w-3 text-[#4B5563]" />
                <span>Open-Source CLI</span>
              </a>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0F] mb-4 leading-tight">
            {tool.name}
          </h1>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-2xl">
            {tool.fullDescription}
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-12">
        
        {/* Stage 1: Interactive Tool Widget & Stage 2: Results */}
        <Suspense fallback={<div className="p-8 text-center text-sm text-[#4B5563]">Loading diagnostic engine...</div>}>
          <ToolRunnerClient tool={tool} />
        </Suspense>

        {/* Stage 3: What This Metric Means */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] mb-3">
            What This Metric Means for Your Site
          </h2>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            {tool.whatItMeans}
          </p>
        </div>

        {/* Stage 4: How to Improve This Score */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-[#0F0F0F] mb-4">
            How to Improve Your Score (Actionable Fixes)
          </h2>
          <ul className="space-y-3 text-xs text-[#4B5563]">
            {tool.howToImprove.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stage 5: Related Editorial Guide */}
        {relatedGuide && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2.5 py-0.5 text-xs font-semibold mb-2 inline-block">Recommended Guide</span>
              <p className="text-base font-bold text-[#0F0F0F]">
                {relatedGuide.title}
              </p>
              <p className="text-xs text-[#4B5563] mt-1 line-clamp-1">
                {relatedGuide.excerpt}
              </p>
            </div>
            <Link
              href={`/articles/${relatedGuide.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex-shrink-0"
            >
              <span>Read Guide</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Stage 6: Related Sister Free Tool */}
        {relatedSisterTool && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{relatedSisterTool.icon}</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Sister Free Tool</span>
                <p className="text-base font-bold text-[#0F0F0F]">
                  {relatedSisterTool.name}
                </p>
                <p className="text-xs text-[#4B5563] line-clamp-1">
                  {relatedSisterTool.shortDescription}
                </p>
              </div>
            </div>
            <Link
              href={`/tools/${relatedSisterTool.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex-shrink-0"
            >
              <span>Launch Tool</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Stage 7: Relevant Product (VitalsSniper PRO Bridge) */}
        <div className="rounded-xl bg-[#111827] text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1F2937] shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
              Need Deeper Client Diagnostics?
            </span>
            <p className="text-2xl font-bold mb-2">
              VitalsSniper PRO In-Tab Forensics
            </p>
            <p className="text-xs text-[#9CA3AF] max-w-xl leading-relaxed">
              Isolate exact DOM elements, generate white label PDF audit summaries, and export outreach lead lists in 50ms from any live Chromium tab.
            </p>
          </div>
          <Link
            href="/products/vitalssniper-pro"
            className="rounded-lg bg-[#2563EB] px-6 py-3 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors flex-shrink-0 shadow-xs"
          >
            <span>Learn About VitalsSniper PRO</span>
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
