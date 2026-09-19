'use client';

import React from 'react';
import { LcpAuditResult } from '@/lib/tool-analyzers/lcpAnalyzer';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, Image as ImageIcon, Code, Clock, HelpCircle, Wrench } from 'lucide-react';

export default function LcpResult({ result }: { result: LcpAuditResult }) {
  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;
  const impact = isGood ? 'safe' : isWarning ? 'warning' : 'critical';

  const lcpSeconds = (result.timingEstimate.estimatedLcpMs / 1000).toFixed(1);

  const headline = isGood
    ? 'Your main visual content loads quickly and smoothly.'
    : isWarning
    ? 'Your main content takes ' + lcpSeconds + ' seconds to appear on mobile screens.'
    : 'Your main hero picture is causing noticeable loading delays.';

  const summary = isGood
    ? 'Visitors on mobile phones can see your principal headline or image in ~' + lcpSeconds + ' seconds, meeting Google Core Web Vitals standards.'
    : 'Phone visitors have to wait ~' + lcpSeconds + ' seconds before your main content appears. Google recommends under 2.5 seconds to prevent visitors from bouncing.';

  const businessImpact = isGood
    ? 'Zero drop-off risk from visual loading delays. Your visitors see your headline almost immediately.'
    : 'Pages taking over 2.5s to render their main picture see up to 24% higher mobile bounce rates.';

  const topFix = result.recommendations[0] || 'Give your above-the-fold image high loading priority and modern WebP compression.';

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="LCP Element Finder"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="In WordPress caching plugins (WP Rocket, LiteSpeed, FlyingPress), exclude your hero image from lazy loading and turn on WebP conversion."
      />

      {/* 2. Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            LCP Diagnostic Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Estimated LCP: <span className="font-bold text-[#0F0F0F] font-mono">{result.timingEstimate.estimatedLcpMs} ms</span> (Google 75th percentile mobile model)
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">LCP Score</span>
            <span className="text-2xl font-bold font-mono text-[#0F0F0F]">
              {result.score}<span className="text-xs font-normal text-[#6B7280]">/100</span>
            </span>
          </div>

          <div
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
              isGood
                ? 'bg-[#10B981]/15 text-[#059669]'
                : isWarning
                ? 'bg-[#F59E0B]/15 text-[#B45309]'
                : 'bg-[#EF4444]/15 text-[#DC2626]'
            }`}
          >
            {isGood ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            ) : isWarning ? (
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            <span>{result.grade.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* ELI5 Jargon Explainer Box */}
      <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F0F0F]">
          <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Explain Like I am 5: What is LCP?</span>
        </div>
        <p className="leading-relaxed">
          Think of LCP as the front page headline of a newspaper. When someone taps your link, LCP measures how many seconds they stare at a blank screen before the biggest picture or headline actually shows up.
        </p>
      </div>

      {/* LCP Candidate Element Box */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[#2563EB]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">
              Identified LCP Candidate Element
            </span>
          </div>
          <span className="text-xs font-mono font-bold bg-[#F3F4F6] px-2.5 py-0.5 rounded text-[#4B5563]">
            {result.lcpCandidate.type.toUpperCase()}
          </span>
        </div>

        <div className="bg-[#F8F8F8] border border-[#E5E7EB] rounded-lg p-3 font-mono text-xs text-[#0F0F0F] break-all">
          <code>{result.lcpCandidate.elementSelector}</code>
        </div>

        {result.lcpCandidate.htmlSnippet && (
          <div className="bg-[#111827] text-white/90 rounded-lg p-3 font-mono text-[11px] overflow-x-auto">
            <pre>{result.lcpCandidate.htmlSnippet}</pre>
          </div>
        )}

        {result.lcpCandidate.resourceUrl && (
          <div className="text-xs text-[#6B7280] break-all pt-1">
            <span className="font-semibold text-[#0F0F0F]">Asset URL: </span>
            <a
              href={result.lcpCandidate.resourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#2563EB] hover:underline font-mono"
            >
              {result.lcpCandidate.resourceUrl}
            </a>
          </div>
        )}
      </div>

      {/* Checklist & Optimization Flags */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-1">
          <span className="text-[#6B7280] block text-[11px] font-medium">Fetch Priority Hint</span>
          <div className="flex items-center gap-1.5 font-bold">
            {result.lcpCandidate.hasFetchPriorityHigh ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#059669]" />
                <span className="text-[#059669]">fetchpriority="high" set</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-[#DC2626]" />
                <span className="text-[#DC2626]">Missing Priority Hint</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-1">
            Tells the browser to download this hero asset immediately before scripts.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-1">
          <span className="text-[#6B7280] block text-[11px] font-medium">Lazy Load Anti-Pattern</span>
          <div className="flex items-center gap-1.5 font-bold">
            {result.lcpCandidate.hasLazyLoadingAntiPattern ? (
              <>
                <AlertCircle className="h-4 w-4 text-[#DC2626]" />
                <span className="text-[#DC2626]">Lazy Loaded (Bad for LCP)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#059669]" />
                <span className="text-[#059669]">Eager Loaded (Correct)</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-1">
            Above-the-fold hero images should never be lazy loaded.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-1">
          <span className="text-[#6B7280] block text-[11px] font-medium">Explicit Dimensions</span>
          <div className="flex items-center gap-1.5 font-bold">
            {result.lcpCandidate.hasExplicitDimensions ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#059669]" />
                <span className="text-[#059669]">Width and Height set</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-[#B45309]" />
                <span className="text-[#B45309]">Missing Dimensions</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-1">
            Prevents layout jumping while the photo downloads.
          </p>
        </div>
      </div>

      {/* Dual Remediation Guidance: Non-Coder vs Developer */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Fix This (Step by Step)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* For Site Owners */}
          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#2563EB]">
              For Site Owners (No Code / WordPress / Shopify):
            </span>
            <ul className="space-y-2 text-[#4B5563]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>WordPress:</strong> Open your caching plugin (WP Rocket, LiteSpeed, or Perfmatters) and find "Excluded Images from Lazy Load". Add your hero image URL.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Shopify / Webflow:</strong> Ensure your hero image is compressed to under 150KB and placed in a standard image block rather than a CSS background.</span>
              </li>
            </ul>
          </div>

          {/* For Developers */}
          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers (Code Snippet):
            </span>
            <div className="p-2.5 rounded bg-[#111827] text-white/90 font-mono text-[11px] overflow-x-auto">
              <code>{`<img src="hero.webp" fetchpriority="high" loading="eager" width="1200" height="630" alt="Hero">`}</code>
            </div>
            <p className="text-[11px] text-[#6B7280]">
              Add <code>fetchpriority="high"</code> and ensure no CSS rules delay element discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
