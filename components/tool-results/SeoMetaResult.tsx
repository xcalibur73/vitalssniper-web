'use client';

import React from 'react';
import { SeoMetaAuditResult } from '@/lib/tool-analyzers/seoMetaAnalyzer';
import { CheckCircle2, AlertTriangle, AlertCircle, Search, Share2, Globe, Shield } from 'lucide-react';

export default function SeoMetaResult({ result }: { result: SeoMetaAuditResult }) {
  const isGood = result.score >= 85;
  const isWarning = result.score >= 60 && result.score < 85;

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            SEO Meta Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Indexability: <span className={`font-bold ${result.indexingDirectives.isIndexable ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {result.indexingDirectives.isIndexable ? 'INDEXABLE (Search Engines Allowed)' : 'BLOCKED (noindex tag present)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Meta Score</span>
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

      {/* Google SERP Snippet Preview */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] flex items-center gap-2">
          <Search className="h-4 w-4 text-[#2563EB]" />
          <span>Google Search SERP Snippet Preview:</span>
        </div>

        <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] max-w-xl space-y-1">
          <div className="text-xs text-[#202124] flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[9px] font-bold">G</span>
            <span className="truncate">{result.serpPreview.displayUrl}</span>
          </div>
          <div className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer leading-snug">
            {result.serpPreview.title}
          </div>
          <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
            {result.serpPreview.snippet}
          </p>
        </div>
      </div>

      {/* Title & Description Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Card */}
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">Title Tag</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                result.title.status === 'OPTIMAL'
                  ? 'bg-[#10B981]/15 text-[#059669]'
                  : 'bg-[#F59E0B]/15 text-[#B45309]'
              }`}
            >
              {result.title.status} ({result.title.charCount} chars)
            </span>
          </div>
          <p className="text-xs text-[#0F0F0F] font-semibold bg-[#F8F8F8] p-2.5 rounded border border-[#E5E7EB] break-all">
            {result.title.text || '[Missing Title Tag]'}
          </p>
          <div className="text-[11px] text-[#6B7280] space-y-1">
            <div>Target: 50 to 60 characters (~580px width)</div>
            <div className="text-[#4B5563]">{result.title.recommendation}</div>
          </div>
        </div>

        {/* Description Card */}
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">Meta Description</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                result.description.status === 'OPTIMAL'
                  ? 'bg-[#10B981]/15 text-[#059669]'
                  : 'bg-[#F59E0B]/15 text-[#B45309]'
              }`}
            >
              {result.description.status} ({result.description.charCount} chars)
            </span>
          </div>
          <p className="text-xs text-[#0F0F0F] bg-[#F8F8F8] p-2.5 rounded border border-[#E5E7EB] break-all">
            {result.description.text || '[Missing Meta Description]'}
          </p>
          <div className="text-[11px] text-[#6B7280] space-y-1">
            <div>Target: 140 to 160 characters</div>
            <div className="text-[#4B5563]">{result.description.recommendation}</div>
          </div>
        </div>
      </div>

      {/* Canonical & Indexing Directives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Canonical Card */}
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">Canonical Tag</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                result.canonical.status === 'PASS'
                  ? 'bg-[#10B981]/15 text-[#059669]'
                  : 'bg-[#F59E0B]/15 text-[#B45309]'
              }`}
            >
              {result.canonical.status}
            </span>
          </div>
          <div className="bg-[#F8F8F8] p-2 rounded border border-[#E5E7EB] font-mono text-[11px] text-[#4B5563] break-all">
            {result.canonical.url || 'No <link rel="canonical"> tag detected.'}
          </div>
          <p className="text-[11px] text-[#6B7280]">{result.canonical.recommendation}</p>
        </div>

        {/* Robots & Viewport Card */}
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] block">
            Indexing Directives
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
              <span className="text-[#6B7280]">Meta Robots:</span>
              <span className="font-mono font-semibold text-[#0F0F0F]">
                {result.indexingDirectives.metaRobots || 'Default (index, follow)'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
              <span className="text-[#6B7280]">Mobile Viewport:</span>
              <span className="font-mono font-semibold text-[#10B981]">
                {result.indexingDirectives.hasViewport ? 'Configured' : 'Missing'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#6B7280]">Social OpenGraph:</span>
              <span className="font-mono font-semibold text-[#2563EB]">
                {result.openGraph.hasOg ? 'Detected' : 'Missing'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Card Preview */}
      {result.openGraph.hasOg && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] flex items-center gap-2">
            <Share2 className="h-4 w-4 text-[#2563EB]" />
            <span>Social Open Graph & Twitter Card Preview:</span>
          </div>

          <div className="p-3 bg-[#F8F8F8] rounded-lg border border-[#E5E7EB] max-w-sm space-y-2">
            {result.openGraph.image && (
              <img
                src={result.openGraph.image}
                alt="OG Preview"
                className="w-full h-36 object-cover rounded border border-[#E5E7EB]"
              />
            )}
            <div className="space-y-1">
              <div className="text-[10px] text-[#6B7280] uppercase font-bold">
                {result.openGraph.siteName || result.domain}
              </div>
              <div className="text-xs font-bold text-[#0F0F0F] line-clamp-1">
                {result.openGraph.title || result.title.text}
              </div>
              <p className="text-[11px] text-[#6B7280] line-clamp-2">
                {result.openGraph.description || result.description.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
            Recommended Meta Tag Fixes:
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
