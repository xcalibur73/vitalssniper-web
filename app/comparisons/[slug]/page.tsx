import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import { COMPARISONS } from '@/data/comparisons';
import { ArrowLeft, ArrowRight, CheckCircle2, Trophy, ExternalLink, ShieldCheck } from 'lucide-react';

interface ComparisonPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return COMPARISONS.map((comp) => ({
    slug: comp.slug,
  }));
}

export function generateMetadata({ params }: ComparisonPageProps) {
  const comp = COMPARISONS.find((c) => c.slug === params.slug);
  if (!comp) return { title: 'Comparison Not Found | Web Audits' };

  return {
    title: `${comp.title} | Web Audits`,
    description: comp.summary,
  };
}

export default function ComparisonDetailPage({ params }: ComparisonPageProps) {
  const comp = COMPARISONS.find((c) => c.slug === params.slug);

  if (!comp) {
    notFound();
  }

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
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      <div className="py-12 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/comparisons"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Comparisons</span>
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <span className="editorial-pill">{comp.category}</span>
            <span className="text-xs text-charcoal-muted">Independent Testing</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-charcoal mb-4 leading-tight">
            {comp.title}
          </h1>

          <p className="text-base text-charcoal-muted leading-relaxed max-w-3xl">
            {comp.summary}
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Quick Verdict Box */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-accent" />
            <h2 className="font-editorial text-2xl font-bold text-charcoal">
              The Bottom-Line Verdict
            </h2>
          </div>
          <p className="text-sm text-charcoal leading-relaxed mb-6">
            {comp.verdict}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <strong className="text-charcoal block mb-1">Pick {comp.toolA} if:</strong>
              <p className="text-charcoal-muted">{comp.bestForA}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <strong className="text-charcoal block mb-1">Pick {comp.toolB} if:</strong>
              <p className="text-charcoal-muted">{comp.bestForB}</p>
            </div>
          </div>
        </div>

        {/* Head-to-Head Comparison Scorecard */}
        <ComparisonTable comparison={comp} />

        {/* Detailed In-Depth Analysis */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="font-editorial text-2xl font-bold text-charcoal mb-4">
            Laboratory Testing Notes &amp; Stress Analysis
          </h3>
          <div className="prose prose-stone text-sm text-charcoal-muted leading-relaxed space-y-4">
            <p>{comp.detailedAnalysis}</p>
            <p>
              In our multi-threaded concurrency audits, we isolated CPU throttling, database query serialization, and edge caching behaviors under simulated mobile traffic. When evaluating hosting and software, remember that lab benchmarks provide a standardized baseline, but your specific theme and plugin configuration will dictate actual production results.
            </p>
          </div>
        </div>

        {/* FTC Disclosure & Navigation */}
        <div className="rounded-xl border border-sand-300 bg-white p-4 text-xs text-charcoal-muted flex items-center justify-between">
          <span className="text-[11px]">
            Affiliate Disclosure: Links on this page may be sponsored. Read our full <Link href="/editorial-policy" className="text-accent underline">Editorial Policy</Link>.
          </span>
          <Link
            href="/comparisons"
            className="inline-flex items-center gap-1 font-bold text-accent hover:underline text-xs"
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
