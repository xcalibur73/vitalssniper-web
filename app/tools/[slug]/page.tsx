import React from 'react';
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

export default function ToolLandingPage({ params }: ToolPageProps) {
  const freeTool = FREE_TOOLS.find((t) => t.slug === params.slug);
  const fallbackProduct = PRODUCTS.find((p) => p.slug === params.slug);

  if (!freeTool && !fallbackProduct) {
    notFound();
  }

  // If a user navigated to a product slug under /tools, display a bridge to its full review
  if (!freeTool && fallbackProduct) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
        <Navbar />
        <div className="py-20 mx-auto max-w-4xl px-6 text-center">
          <span className="text-4xl mb-4 block">{fallbackProduct.iconEmoji}</span>
          <h1 className="font-editorial text-3xl font-bold mb-3">{fallbackProduct.name}</h1>
          <p className="text-sm text-charcoal-muted max-w-xl mx-auto mb-6">{fallbackProduct.description}</p>
          <Link
            href={`/reviews/${fallbackProduct.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-bold text-white hover:bg-accent-dark"
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
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
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
      <div className="py-12 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Web Tools</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-charcoal-muted mb-3">
            <span className="text-2xl">{tool.icon}</span>
            <span className="editorial-pill">{tool.category}</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              100% Free Utility
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-charcoal mb-4 leading-tight">
            {tool.name}
          </h1>

          <p className="text-base text-charcoal-muted leading-relaxed max-w-2xl">
            {tool.fullDescription}
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-12">
        
        {/* Stage 1: Interactive Tool Widget & Stage 2: Results */}
        <ToolRunnerClient tool={tool} />

        {/* Stage 3: What This Metric Means */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-2xl font-bold text-charcoal mb-3">
            What This Metric Means for Your Site
          </h2>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            {tool.whatItMeans}
          </p>
        </div>

        {/* Stage 4: How to Improve This Score */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="font-editorial text-xl font-bold text-charcoal mb-4">
            How to Improve Your Score (Actionable Fixes)
          </h3>
          <ul className="space-y-3 text-xs text-charcoal">
            {tool.howToImprove.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stage 5: Related Editorial Guide */}
        {relatedGuide && (
          <div className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="editorial-pill mb-2">Recommended Guide</span>
              <h4 className="font-editorial text-lg font-bold text-charcoal">
                {relatedGuide.title}
              </h4>
              <p className="text-xs text-charcoal-muted mt-1 line-clamp-1">
                {relatedGuide.excerpt}
              </p>
            </div>
            <Link
              href={`/articles/${relatedGuide.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline flex-shrink-0"
            >
              <span>Read Guide</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Stage 6: Related Sister Free Tool */}
        {relatedSisterTool && (
          <div className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{relatedSisterTool.icon}</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Sister Free Tool</span>
                <h4 className="font-editorial text-lg font-bold text-charcoal">
                  {relatedSisterTool.name}
                </h4>
                <p className="text-xs text-charcoal-muted line-clamp-1">
                  {relatedSisterTool.shortDescription}
                </p>
              </div>
            </div>
            <Link
              href={`/tools/${relatedSisterTool.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline flex-shrink-0"
            >
              <span>Launch Tool</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Stage 7: Relevant Product (VitalsSniper PRO Bridge) */}
        <div className="rounded-2xl bg-[#242321] text-[#F7F4EE] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-light block mb-1">
              Need Deeper Client Diagnostics?
            </span>
            <h4 className="font-editorial text-2xl font-bold mb-2">
              VitalsSniper PRO In-Tab Forensics
            </h4>
            <p className="text-xs text-[#F7F4EE]/70 max-w-xl leading-relaxed">
              Isolate exact DOM elements, generate white label PDF audit summaries, and export outreach lead lists in 50ms from any live Chromium tab.
            </p>
          </div>
          <Link
            href="/products/vitalssniper-pro"
            className="rounded-xl bg-accent px-6 py-3.5 text-xs font-bold text-white hover:bg-accent-dark transition-all flex-shrink-0 shadow-sm"
          >
            <span>Learn About VitalsSniper PRO</span>
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
