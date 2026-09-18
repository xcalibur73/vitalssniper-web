'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Activity,
  Gauge,
  Layers,
} from 'lucide-react';

export default function EditorialHero() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let targetUrl = urlInput.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    setIsSubmitting(true);
    router.push(`/tools/website-speed-test?url=${encodeURIComponent(targetUrl)}`);
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-sand-300 bg-[#F7F4EE] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Diagnostic Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow Breadcrumb / Categories */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-4">
              <span>Audits</span>
              <span className="text-sand-400">/</span>
              <span>Tools</span>
              <span className="text-sand-400">/</span>
              <span>Research</span>
              <span className="text-sand-400">/</span>
              <span>Reviews</span>
            </div>

            {/* Major Editorial Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.12] mb-6">
              Practical Web Intelligence for Better Websites.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl leading-relaxed mb-8">
              Actionable insights for performance, SEO, AI search, web design, conversion and more. Independent research, in-depth reviews, and powerful tools to help you build better websites.
            </p>

            {/* Interactive URL Analyzer Bar */}
            <form onSubmit={handleAnalyze} className="w-full max-w-xl mb-4">
              <div className="flex flex-col sm:flex-row items-stretch rounded-2xl border border-sand-300 bg-white p-2 shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all gap-2">
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="h-4 w-4 text-charcoal-muted mr-2.5 flex-shrink-0" />
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter a website URL (e.g. example.com)"
                    className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-action px-6 py-3.5 text-sm font-bold text-white shadow-[0_2px_8px_rgba(194,65,12,0.22)] transition-all hover:bg-action-hover hover:scale-[1.01] hover:shadow-[0_4px_14px_rgba(194,65,12,0.32)] active:scale-[0.99] flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-75"
                >
                  <span>{isSubmitting ? 'Connecting...' : 'Analyze Website'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* 3-Point Trust Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-charcoal-muted font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Free audit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>No sign up required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Instant results</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dark Forensic Diagnostic Terminal (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-white/10 bg-[#12131A] p-5 sm:p-6 shadow-2xl text-white relative">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                    <Zap className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <span className="font-bold text-sm text-white tracking-tight">VitalsSniper PRO</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Audit</span>
                </div>
              </div>

              {/* URL Address Bar Mock */}
              <div className="rounded-lg bg-black/40 border border-white/5 px-3 py-2 text-xs font-mono text-gray-400 flex items-center gap-2 mb-4">
                <Search className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                <span className="truncate text-gray-300">https://example.com</span>
              </div>

              {/* 6 Metric Grid (3 cols x 2 rows) */}
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                <div className="rounded-xl bg-white/[0.04] border border-white/5 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-gray-400">LCP</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono tabular-nums">1.8s</div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" /> Good
                  </span>
                </div>

                <div className="rounded-xl bg-white/[0.04] border border-white/5 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-gray-400">INP</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono tabular-nums">142ms</div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" /> Good
                  </span>
                </div>

                <div className="rounded-xl bg-white/[0.04] border border-white/5 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-gray-400">CLS</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono tabular-nums">0.04</div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" /> Good
                  </span>
                </div>

                <div className="rounded-xl bg-white/[0.04] border border-white/5 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-gray-400">TTFB</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono tabular-nums">0.6s</div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" /> Good
                  </span>
                </div>

                <div className="rounded-xl bg-white/[0.04] border border-white/5 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Page Weight</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono tabular-nums">1.2 MB</div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" /> Good
                  </span>
                </div>

                <div className="rounded-xl bg-white/[0.04] border border-white/5 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-gray-400">DOM Count</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono tabular-nums">842</div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" /> Good
                  </span>
                </div>
              </div>

              {/* Bottom Visual Split: Sparkline Graph + Browser Viewport Preview */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 items-center">
                
                {/* Performance Sparklines */}
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <div className="text-[11px] font-semibold text-gray-300 mb-1.5 flex items-center justify-between">
                    <span>Performance Overview</span>
                  </div>
                  {/* SVG Multi-curve Waveform */}
                  <svg viewBox="0 0 160 50" className="w-full h-9 overflow-visible">
                    <path
                      d="M 0 38 Q 25 15, 50 28 T 100 22 T 160 14"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                    />
                    <path
                      d="M 0 42 Q 35 30, 70 34 T 120 28 T 160 22"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <path
                      d="M 0 46 Q 30 40, 60 44 T 110 38 T 160 32"
                      fill="none"
                      stroke="#818CF8"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="flex items-center gap-2.5 text-[9px] text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> LCP</span>
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> INP</span>
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> CLS</span>
                  </div>
                </div>

                {/* Viewport Preview with Annotated LCP Element */}
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5 flex flex-col justify-between h-full">
                  <div className="relative rounded-lg bg-gray-900 border border-white/10 p-2 overflow-hidden mb-2">
                    {/* Simulated webpage content with orange LCP box */}
                    <div className="h-1.5 w-12 rounded bg-gray-700 mb-1.5" />
                    <div className="relative rounded border border-dashed border-accent bg-accent/15 p-1 text-[9px] text-accent font-mono text-center mb-1">
                      LCP Element (Hero)
                    </div>
                    <div className="h-1 w-16 rounded bg-gray-800" />
                  </div>

                  <Link
                    href="/vitalssniper"
                    className="w-full rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 py-1.5 px-2 text-center text-[10px] font-bold text-white transition-all flex items-center justify-center gap-1"
                  >
                    <span>View Full Report</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
