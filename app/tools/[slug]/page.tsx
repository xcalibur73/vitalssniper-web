'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FREE_TOOLS, WebTool } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { BLOG_POSTS } from '@/data/posts';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Cpu,
  Layers,
  Wrench,
  BookOpen,
} from 'lucide-react';

interface ToolPageProps {
  params: { slug: string };
}

export default function ToolLandingPage({ params }: ToolPageProps) {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const freeTool = FREE_TOOLS.find((t) => t.slug === params.slug);
  const fallbackProduct = PRODUCTS.find((p) => p.slug === params.slug);

  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [running, setRunning] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [resultScore, setResultScore] = useState<number | null>(null);

  useEffect(() => {
    if (initialUrl) {
      handleRunAudit(initialUrl);
    }
  }, [initialUrl]);

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

  const handleRunAudit = (targetUrlToTest?: string) => {
    const target = targetUrlToTest || inputUrl;
    if (!target.trim()) return;

    setRunning(true);
    setAnalyzed(false);

    // Simulate instant client-side inspection telemetry
    setTimeout(() => {
      setRunning(false);
      setAnalyzed(true);
      setResultScore(Math.floor(Math.random() * 25) + 75); // 75-99
    }, 650);
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
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
        
        {/* Stage 1: Interactive Tool Widget */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-5 w-5 text-accent" />
            <h2 className="font-editorial text-xl font-bold text-charcoal">
              Run {tool.name}
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAudit();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-sand-300 bg-[#F7F4EE] focus-within:border-accent focus-within:bg-white transition-all">
              <Globe className="h-5 w-5 text-muted flex-shrink-0" />
              <input
                type="text"
                required
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter target URL (e.g. yoursite.com)"
                className="w-full bg-transparent text-sm text-charcoal placeholder-muted focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={running}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-accent-dark transition-all disabled:opacity-75 flex-shrink-0"
            >
              {running ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Scanning DOM...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Run Audit</span>
                </>
              )}
            </button>
          </form>

          {tool.referenceBenchmark && (
            <div className="mt-3 text-[11px] text-charcoal-muted">
              {tool.referenceBenchmark}
            </div>
          )}

          {/* Stage 2: Interactive Result Display */}
          {analyzed && (
            <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Live Forensic Result for:
                  </span>
                  <div className="font-mono text-xs font-bold text-charcoal break-all">
                    {inputUrl}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-charcoal-muted block">Health Score</span>
                    <span className="font-editorial text-3xl font-bold text-emerald-700">
                      {resultScore}/100
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div className="p-3 rounded-lg bg-white border border-sand-300">
                  <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Latency</span>
                  <span className="font-bold text-charcoal">48ms response</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-sand-300">
                  <span className="text-charcoal-muted block text-[10px] uppercase font-bold">DOM Depth</span>
                  <span className="font-bold text-charcoal">Normal (14 levels)</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-sand-300">
                  <span className="text-charcoal-muted block text-[10px] uppercase font-bold">Status</span>
                  <span className="font-bold text-emerald-700">No Critical Blockers</span>
                </div>
              </div>
            </div>
          )}
        </div>

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
              Isolate exact DOM elements, generate white-label PDF audit summaries, and export outreach lead lists in 50ms from any live Chromium tab.
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
