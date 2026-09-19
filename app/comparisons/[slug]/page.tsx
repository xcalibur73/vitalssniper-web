import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import { COMPARISONS } from '@/data/comparisons';
import { PRODUCTS } from '@/data/products';
import { BLOG_POSTS } from '@/data/posts';
import { ArrowLeft, ArrowRight, CheckCircle2, Trophy, ExternalLink, ShieldCheck, BookOpen, Layers } from 'lucide-react';

interface ComparisonPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return COMPARISONS.map((comp) => ({
    slug: comp.slug,
  }));
}

export function generateMetadata({ params }: ComparisonPageProps): Metadata {
  const comp = COMPARISONS.find((c) => c.slug === params.slug);
  if (!comp) return { title: 'Comparison Not Found | Web Audits' };

  const title = comp.metaTitle || `${comp.toolA} vs ${comp.toolB} | Web Audits`;
  const description = comp.summary;
  const url = `https://www.webaudits.pro/comparisons/${comp.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Web Audits',
      type: 'article',
      images: [
        {
          url: '/assets/appsumo_hero_1920x1080.png',
          width: 1200,
          height: 675,
          alt: `${comp.toolA} vs ${comp.toolB}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/appsumo_hero_1920x1080.png'],
    },
  };
}

export default function ComparisonDetailPage({ params }: ComparisonPageProps) {
  const comp = COMPARISONS.find((c) => c.slug === params.slug);

  if (!comp) {
    notFound();
  }

  // Cross-reference tools with in-depth product reviews
  const productA = PRODUCTS.find(
    (p) => p.name.toLowerCase() === comp.toolA.toLowerCase() || comp.toolA.toLowerCase().includes(p.name.toLowerCase())
  );
  const productB = PRODUCTS.find(
    (p) => p.name.toLowerCase() === comp.toolB.toLowerCase() || comp.toolB.toLowerCase().includes(p.name.toLowerCase())
  );

  // Sibling comparisons
  const otherComparisons = COMPARISONS.filter((c) => c.slug !== comp.slug);

  // Related technical guides
  const relatedGuides = BLOG_POSTS.filter((p) => {
    if (comp.slug === 'cloudways-vs-siteground') {
      return (
        p.slug === 'cloudways-vs-siteground-which-host-loads-faster' ||
        p.slug === 'why-your-lcp-score-tanks-on-mobile-how-to-fix-it'
      );
    }
    if (comp.slug === 'rank-math-vs-yoast') {
      return (
        p.slug === 'rank-math-vs-yoast-definitive-seo-plugin-comparison' ||
        p.slug === 'how-to-make-your-website-discoverable-by-ai-search-engines'
      );
    }
    if (comp.slug === 'wp-rocket-vs-litespeed') {
      return (
        p.slug === '5-best-wordpress-speed-plugins-2026' ||
        p.slug === 'how-to-score-100-on-pagespeed-without-breaking-your-site'
      );
    }
    if (comp.slug === 'perfmatters-vs-wp-rocket') {
      return (
        p.slug === '5-best-wordpress-speed-plugins-2026' ||
        p.slug === 'the-real-cost-of-third-party-scripts'
      );
    }
    if (comp.slug === 'nitropack-vs-wp-rocket') {
      return (
        p.slug === '5-best-wordpress-speed-plugins-2026' ||
        p.slug === 'how-to-score-100-on-pagespeed-without-breaking-your-site'
      );
    }
    if (comp.slug === 'elementor-vs-bricks') {
      return (
        p.slug === 'we-measured-it-elementor-vs-gutenberg-performance' ||
        p.slug === 'how-many-dom-elements-is-too-many'
      );
    }
    return p.category === 'Web Performance';
  }).slice(0, 2);

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
        name: 'Comparisons',
        item: 'https://www.webaudits.pro/comparisons',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: comp.title,
        item: `https://www.webaudits.pro/comparisons/${comp.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      {/* Schema.org BreadcrumbList JSON-LD */}
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
            <Link href="/comparisons" className="hover:text-[#0F0F0F] transition-colors">
              Comparisons
            </Link>
            <span className="text-[#9CA3AF]" aria-hidden="true">/</span>
            <span className="text-[#0F0F0F] font-semibold" aria-current="page">
              {comp.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">{comp.category}</span>
            <span className="text-xs text-[#6B7280]">Independent Testing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] mb-4 leading-tight">
            {comp.title}
          </h1>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-3xl">
            {comp.summary}
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Quick Verdict Box */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-[#2563EB]" />
            <h2 className="text-2xl font-bold text-[#0F0F0F]">
              The Bottom-Line Verdict
            </h2>
          </div>
          <p className="text-sm text-[#0F0F0F] leading-relaxed mb-6">
            {comp.verdict}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] flex flex-col justify-between">
              <div>
                <strong className="text-[#0F0F0F] block mb-1">
                  Pick {productA ? (
                    <Link href={`/reviews/${productA.slug}`} className="hover:underline text-[#2563EB]">
                      {comp.toolA}
                    </Link>
                  ) : (
                    comp.toolA
                  )} if:
                </strong>
                <p className="text-[#4B5563]">{comp.bestForA}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2">
                {productA && (
                  <Link
                    href={`/reviews/${productA.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>Read {productA.name} review</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
                {comp.urlA && (
                  <a
                    href={comp.urlA}
                    target="_blank"
                    rel="nofollow noopener"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4B5563] hover:text-[#0F0F0F] hover:underline"
                  >
                    <span>Visit {comp.toolA}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] flex flex-col justify-between">
              <div>
                <strong className="text-[#0F0F0F] block mb-1">
                  Pick {productB ? (
                    <Link href={`/reviews/${productB.slug}`} className="hover:underline text-[#2563EB]">
                      {comp.toolB}
                    </Link>
                  ) : (
                    comp.toolB
                  )} if:
                </strong>
                <p className="text-[#4B5563]">{comp.bestForB}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2">
                {productB && (
                  <Link
                    href={`/reviews/${productB.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>Read {productB.name} review</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
                {comp.urlB && (
                  <a
                    href={comp.urlB}
                    target="_blank"
                    rel="nofollow noopener"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4B5563] hover:text-[#0F0F0F] hover:underline"
                  >
                    <span>Visit {comp.toolB}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Head-to-Head Comparison Scorecard */}
        <ComparisonTable comparison={comp} />

        {/* Detailed In-Depth Analysis */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-4">
            Laboratory Testing Notes &amp; Stress Analysis
          </h2>
          <div className="text-sm text-[#4B5563] leading-relaxed space-y-4">
            <p>{comp.detailedAnalysis}</p>
            <p>
              In our multi-threaded concurrency audits, we isolated CPU throttling, database query serialization, and edge caching behaviors under simulated mobile traffic. When evaluating hosting and software, remember that lab benchmarks provide a standardized baseline, but your specific theme and plugin configuration will dictate actual production results.
            </p>
          </div>
        </div>

        {/* Related Technical Guides */}
        {relatedGuides.length > 0 && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-xl font-bold text-[#0F0F0F]">
                Related Forensic Guides &amp; Benchmarks
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

        {/* Other Head-to-Head Comparisons */}
        {otherComparisons.length > 0 && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-xl font-bold text-[#0F0F0F]">
                Explore Sibling Benchmark Showdowns
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherComparisons.map((other) => (
                <Link
                  key={other.slug}
                  href={`/comparisons/${other.slug}`}
                  className="group block p-4 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] hover:border-[#2563EB] hover:bg-white transition-all duration-200"
                >
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 mb-2 inline-block">{other.category}</span>
                  <h3 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-1">
                    {other.toolA} vs {other.toolB}
                  </h3>
                  <p className="text-xs text-[#4B5563] line-clamp-2">
                    {other.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FTC Disclosure & Navigation */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 text-xs text-[#4B5563] flex items-center justify-between">
          <span className="text-[11px]">
            Affiliate Disclosure: Links on this page may be sponsored. Read our full <Link href="/editorial-policy" className="text-[#2563EB] underline">Editorial Policy</Link>.
          </span>
          <Link
            href="/comparisons"
            className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline text-xs"
          >
            <span>More Comparisons</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
