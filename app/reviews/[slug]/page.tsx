import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { PRODUCTS, Product } from '@/data/products';
import { COMPARISONS } from '@/data/comparisons';
import { BLOG_POSTS } from '@/data/posts';
import {
  ArrowLeft,
  Check,
  X as XIcon,
  Star,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Beaker,
  CheckCircle2,
  Trophy,
  BookOpen,
} from 'lucide-react';

interface ReviewPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ReviewPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Review Not Found | Web Audits' };

  const description =
    product.metaDescription ||
    (product.description.length > 155
      ? `${product.description.slice(0, 152)}...`
      : product.description);

  return {
    title: `${product.name} Review & Benchmarks | Web Audits`,
    description,
    alternates: {
      canonical: `https://www.webaudits.pro/reviews/${product.slug}`,
    },
  };
}

export default function ProductReviewPage({ params }: ReviewPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Find head-to-head comparisons featuring this product
  const relatedComparisons = COMPARISONS.filter(
    (c) =>
      c.toolA.toLowerCase().includes(product.name.toLowerCase()) ||
      c.toolB.toLowerCase().includes(product.name.toLowerCase()) ||
      product.name.toLowerCase().includes(c.toolA.toLowerCase()) ||
      product.name.toLowerCase().includes(c.toolB.toLowerCase())
  );

  // Alternative tools in the same category (or fallback)
  const categoryAlternatives = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  );
  const fallbackAlternatives = PRODUCTS.filter(
    (p) => p.slug !== product.slug && !categoryAlternatives.some((ca) => ca.slug === p.slug)
  );
  const relatedTools = [...categoryAlternatives, ...fallbackAlternatives].slice(0, 3);

  // Related editorial articles
  const relatedGuides = BLOG_POSTS.filter((p) => {
    if (product.category === 'Hosting & CDN' || product.category === 'Speed & Performance') {
      return p.category === 'Web Performance';
    }
    if (product.category === 'Page Builders') {
      return p.category === 'Web Design' || p.category === 'Web Performance';
    }
    if (product.category === 'SEO Tools') {
      return p.category === 'SEO' || p.category === 'AI Search';
    }
    return true;
  }).slice(0, 2);

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: product.name,
      applicationCategory: product.category,
      operatingSystem: 'All Platforms',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: product.editorialRating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: product.verdict,
    author: {
      '@type': 'Organization',
      name: 'Web Audits Editorial Team',
      url: 'https://www.webaudits.pro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Web Audits',
      url: 'https://www.webaudits.pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.webaudits.pro/favicon.svg',
      },
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
        name: 'Reviews',
        item: 'https://www.webaudits.pro/reviews',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${product.name} Review`,
        item: `https://www.webaudits.pro/reviews/${product.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      {/* Schema.org Review & Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
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
            <Link href="/reviews" className="hover:text-[#0F0F0F] transition-colors">
              Reviews
            </Link>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F0F0F] font-semibold" aria-current="page">
              {product.name}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-3xl">{product.iconEmoji}</span>
            <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2.5 py-0.5 text-xs font-semibold">{product.category}</span>
            {product.isOwnProduct && (
              <span className="rounded-md bg-[#2563EB] px-2.5 py-0.5 text-xs font-semibold text-white">
                Our Flagship Software
              </span>
            )}
            <span className="rounded-md bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-0.5 text-xs font-semibold text-[#4B5563]">
              {product.pricingModel}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0F] mb-4 leading-tight">
            {product.name} Review &amp; Empirical Speed Benchmark
          </h1>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-3xl">
            {product.description}
          </p>

          <div className="mt-6">
            <AffiliateDisclosure compact={false} />
          </div>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Factual Attributes Matrix (Section 8) */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="h-4 w-4 text-[#2563EB]" />
            <h2 className="text-xl font-bold text-[#0F0F0F]">
              Factual Testing &amp; Technical Attributes
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/20">
              <span className="text-[#2563EB] block text-[10px] uppercase font-bold">Benchmark Score:</span>
              <span className="font-bold text-[#2563EB] text-sm">{product.editorialRating} / 5.0</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB]">
              <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Tested Environment:</span>
              <span className="font-bold text-[#0F0F0F]">{product.testedStack}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB]">
              <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Observed Metric:</span>
              <span className="font-bold text-[#0F0F0F]">{product.observedMetric}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB]">
              <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Best For:</span>
              <span className="font-bold text-[#0F0F0F]">{product.bestFor}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB]">
              <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Pricing Model:</span>
              <span className="font-bold text-[#0F0F0F]">{product.pricingModel}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB]">
              <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Primary Limitation:</span>
              <span className="font-bold text-[#0F0F0F]">{product.primaryLimitation}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB]">
              <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Testing Duration:</span>
              <span className="font-bold text-[#0F0F0F]">{product.testingPeriod}</span>
            </div>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] mb-2">
            The Editorial Verdict
          </h3>
          <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
            {product.verdict}
          </p>

          {/* Strengths & Limitations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs">
            <div>
              <h4 className="font-bold text-[#10B981] mb-3 flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#10B981]" />
                <span>Documented Strengths</span>
              </h4>
              <ul className="space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#4B5563]">
                    <Check className="h-3.5 w-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#EF4444] mb-3 flex items-center gap-1.5">
                <XIcon className="h-4 w-4 text-[#EF4444]" />
                <span>Documented Limitations</span>
              </h4>
              <ul className="space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#4B5563]">
                    <XIcon className="h-3.5 w-3.5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What We Tested & Testing Notes */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl font-bold text-[#0F0F0F] mb-3">
            Testing Methodology &amp; Lab Notes
          </h3>
          <p className="text-xs text-[#4B5563] leading-relaxed mb-6">
            {product.methodologyNotes}
          </p>

          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] mb-3">
            Key Evaluated Features:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#4B5563]">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Head-to-Head Comparisons Bridge */}
        {relatedComparisons.length > 0 && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-4 w-4 text-[#2563EB]" />
              <h3 className="text-xl font-bold text-[#0F0F0F]">
                Head-to-Head Benchmark Showdowns
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedComparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/comparisons/${c.slug}`}
                  className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#2563EB] transition-colors block group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                    {c.category} Showdown
                  </span>
                  <h4 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-[#4B5563] line-clamp-2 mb-3">
                    {c.summary}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]">
                    <span>View Scorecard &amp; Verdict</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Alternative Software Reviews */}
        {relatedTools.length > 0 && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-xl font-bold text-[#0F0F0F]">
                Alternative Tools &amp; Tested Software
              </h3>
              <Link
                href="/reviews"
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
              >
                <span>All Reviews</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((alt) => (
                <Link
                  key={alt.slug}
                  href={`/reviews/${alt.slug}`}
                  className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#2563EB] transition-colors block group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{alt.iconEmoji}</span>
                    <span className="text-[11px] font-bold text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded">
                      {alt.editorialRating} / 5.0
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-1">
                    {alt.name}
                  </h4>
                  <p className="text-xs text-[#4B5563] line-clamp-2 mb-2">
                    {alt.description}
                  </p>
                  <span className="text-[11px] text-[#6B7280] font-medium block">
                    {alt.pricingModel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Technical Articles */}
        {relatedGuides.length > 0 && (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-[#2563EB]" />
              <h3 className="text-xl font-bold text-[#0F0F0F]">
                Related Optimization Guides
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/articles/${guide.slug}`}
                  className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#2563EB] transition-colors block group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                    {guide.category} Guide
                  </span>
                  <h4 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-1">
                    {guide.title}
                  </h4>
                  <p className="text-xs text-[#4B5563] line-clamp-2">
                    {guide.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Commercial Action Bar */}
        <div className="rounded-xl bg-[#111827] text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1F2937] shadow-xs">
          <div>
            <span className="text-xs text-[#9CA3AF] font-mono block mb-1">
              Pricing: {product.pricing}
            </span>
            <h4 className="text-2xl font-bold">
              Ready to test {product.name}?
            </h4>
          </div>

          <div className="flex items-center gap-3">
            {product.isOwnProduct ? (
              <Link
                href="/products/vitalssniper-pro"
                className="rounded-lg bg-[#2563EB] px-6 py-3 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
              >
                <span>View Product Teardown</span>
              </Link>
            ) : (
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
              >
                <span>Visit Official {product.name}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
