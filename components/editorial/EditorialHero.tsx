'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Check,
  Search,
  Activity,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
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
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E5E7EB] bg-[#F8F8F8] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, and URL Form */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-6">
              <span>WEB INTELLIGENCE</span>
              <span className="text-[#9CA3AF]">/</span>
              <span>WEBSITE AUDITING</span>
            </div>

            {/* Major Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F0F0F] leading-[1.12] mb-6">
              Understand what is happening inside your website.
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed mb-8">
              Analyze performance, SEO, page weight, technical issues and more: in one place.
            </p>

            {/* Interactive URL Analyzer Bar */}
            <form onSubmit={handleAnalyze} className="w-full max-w-xl mb-4">
              <div className="flex flex-col sm:flex-row items-stretch rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-none focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10 transition-all gap-2">
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="h-4 w-4 text-[#6B7280] mr-2.5 flex-shrink-0" />
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter a website URL (e.g. example.com)"
                    aria-label="Target website URL for audit"
                    className="w-full bg-transparent text-sm text-[#0F0F0F] placeholder-[#6B7280] focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-none transition-colors hover:bg-[#1D4ED8] flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-75"
                >
                  <span>{isSubmitting ? 'Analyzing...' : 'Analyze Website'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6B7280] font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#047857]" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#047857]" />
                <span>Fast analysis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#047857]" />
                <span>Instant results</span>
              </div>
            </div>

          </div>

          {/* Right Column: Honest Product Preview Card */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-none">
              
              {/* Preview Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#047857]" />
                  <span className="text-xs font-mono text-[#4B5563]">https://example.com</span>
                </div>
                <span className="text-[11px] font-semibold text-[#047857] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/25">
                  Audit Completed
                </span>
              </div>

              {/* Overall Health Score Banner */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] mb-4">
                <div>
                  <div className="text-xs font-medium text-[#6B7280]">Overall Health Score</div>
                  <div className="text-2xl font-bold text-[#0F0F0F] font-mono mt-0.5">
                    92<span className="text-sm font-normal text-[#6B7280]">/100</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#047857] text-xs font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                  <span>Good</span>
                </div>
              </div>

              {/* Category Breakdown (4 Core Pillars) */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-white">
                  <div className="text-[11px] font-medium text-[#6B7280]">Performance</div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-bold text-[#0F0F0F] font-mono">92</span>
                    <span className="text-[11px] text-[#047857] font-medium">LCP 1.8s</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-white">
                  <div className="text-[11px] font-medium text-[#6B7280]">Technical SEO</div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-bold text-[#0F0F0F] font-mono">87</span>
                    <span className="text-[11px] text-[#047857] font-medium">Valid JSON-LD</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-white">
                  <div className="text-[11px] font-medium text-[#6B7280]">Technical Health</div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-bold text-[#0F0F0F] font-mono">94</span>
                    <span className="text-[11px] text-[#047857] font-medium">HTTP/2 OK</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-white">
                  <div className="text-[11px] font-medium text-[#6B7280]">UX / Stability</div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-bold text-[#0F0F0F] font-mono">90</span>
                    <span className="text-[11px] text-[#047857] font-medium">CLS 0.02</span>
                  </div>
                </div>
              </div>

              {/* Issues Summary Pill */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-xs">
                <div className="flex items-center gap-2 text-[#B45309] font-medium">
                  <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                  <span>3 issues need attention</span>
                </div>
                <Link
                  href="/tools/website-speed-test?url=https%3A%2F%2Fexample.com"
                  aria-label="Inspect sample audit report"
                  className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
                >
                  <span>Inspect Sample</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
