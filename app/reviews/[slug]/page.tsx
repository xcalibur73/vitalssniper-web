import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { PRODUCTS, Product } from '@/data/products';
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
  if (!product) return { title: 'Review Not Found | Web Audits Helper' };

  return {
    title: `${product.name} Review & Benchmarks | Web Audits Helper`,
    description: product.description,
  };
}

export default function ProductReviewPage({ params }: ReviewPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedTools = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-12 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Reviews</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-3xl">{product.iconEmoji}</span>
            <span className="editorial-pill">{product.category}</span>
            {product.isOwnProduct && (
              <span className="rounded-md bg-accent px-2.5 py-0.5 text-xs font-bold text-white">
                Our Flagship Software
              </span>
            )}
            <span className="rounded-md bg-[#F7F4EE] border border-sand-300 px-2.5 py-0.5 text-xs font-semibold text-charcoal">
              {product.pricingModel}
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-charcoal mb-4 leading-tight">
            {product.name} Review &amp; Empirical Speed Benchmark
          </h1>

          <p className="text-base text-charcoal-muted leading-relaxed max-w-3xl">
            {product.description}
          </p>

          <div className="mt-6">
            <AffiliateDisclosure compact={false} />
          </div>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-10">
        
        {/* Factual Attributes Matrix (Section 8) */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="h-4 w-4 text-accent" />
            <h2 className="font-editorial text-xl font-bold text-charcoal">
              Factual Testing &amp; Technical Attributes
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Tested Environment:</span>
              <span className="font-bold text-charcoal">{product.testedStack}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Observed Metric:</span>
              <span className="font-bold text-charcoal">{product.observedMetric}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Best For:</span>
              <span className="font-bold text-charcoal">{product.bestFor}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Pricing Model:</span>
              <span className="font-bold text-charcoal">{product.pricingModel}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Primary Limitation:</span>
              <span className="font-bold text-charcoal">{product.primaryLimitation}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-sand-300">
              <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Testing Duration:</span>
              <span className="font-bold text-charcoal">{product.testingPeriod}</span>
            </div>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="font-editorial text-2xl font-bold text-charcoal mb-2">
            The Editorial Verdict
          </h3>
          <p className="text-sm text-charcoal leading-relaxed mb-6">
            {product.verdict}
          </p>

          {/* Strengths & Limitations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-xl bg-[#F7F4EE] border border-sand-300 text-xs">
            <div>
              <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Documented Strengths</span>
              </h4>
              <ul className="space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-charcoal">
                    <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-1.5">
                <XIcon className="h-4 w-4 text-rose-600" />
                <span>Documented Limitations</span>
              </h4>
              <ul className="space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-charcoal">
                    <XIcon className="h-3.5 w-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What We Tested & Testing Notes */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="font-editorial text-xl font-bold text-charcoal mb-3">
            Testing Methodology &amp; Lab Notes
          </h3>
          <p className="text-xs text-charcoal-muted leading-relaxed mb-6">
            {product.methodologyNotes}
          </p>

          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
            Key Evaluated Features:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-charcoal">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Commercial Action Bar */}
        <div className="rounded-2xl bg-[#242321] text-[#F7F4EE] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-xs text-[#F7F4EE]/70 font-mono block mb-1">
              Pricing: {product.pricing}
            </span>
            <h4 className="font-editorial text-2xl font-bold">
              Ready to test {product.name}?
            </h4>
          </div>

          <div className="flex items-center gap-3">
            {product.isOwnProduct ? (
              <Link
                href="/products/vitalssniper-pro"
                className="rounded-xl bg-accent px-6 py-3.5 text-xs font-bold text-white hover:bg-accent-dark transition-all shadow-sm"
              >
                <span>View Product Teardown</span>
              </Link>
            ) : (
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-xs font-bold text-white hover:bg-accent-dark transition-all shadow-sm"
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
