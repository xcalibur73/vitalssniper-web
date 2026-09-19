'use client';

import React from 'react';
import { SeoMetaAuditResult } from '@/lib/tool-analyzers/seoMetaAnalyzer';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, Search, Share2, Globe, Shield, HelpCircle, Wrench } from 'lucide-react';

export default function SeoMetaResult({ result }: { result: SeoMetaAuditResult }) {
  const isGood = result.score >= 85;
  const isWarning = result.score >= 60 && result.score < 85;
  const impact = !result.indexingDirectives.isIndexable
    ? 'critical'
    : isGood
    ? 'safe'
    : isWarning
    ? 'warning'
    : 'critical';

  const headline = !result.indexingDirectives.isIndexable
    ? 'Warning: This page is hidden from Google (noindex tag present).'
    : isGood
    ? 'Your search title and snippet look compelling and fit well.'
    : result.title.status === 'TOO_LONG'
    ? 'Your title is too long: Google will cut off the end in search results.'
    : 'Your search preview and social tags have room for improvement.';

  const summary = !result.indexingDirectives.isIndexable
    ? 'A "noindex" tag was found in the code or headers. Googlebot is actively instructed not to show this page in search results.'
    : 'Your page title is ' +
      result.title.charCount +
      ' characters. ' +
      (result.title.status === 'TOO_LONG'
        ? 'Google usually cuts off titles over 60 characters with "...".'
        : 'It fits cleanly inside Google standard desktop and mobile preview cutoffs.') +
      (result.description.charCount === 0
        ? ' Note: Missing a custom meta description, so Google will auto-generate one from random page text.'
        : '');

  const businessImpact = !result.indexingDirectives.isIndexable
    ? 'Zero organic Google search traffic: customers searching for your products or articles will not see this page.'
    : 'A compelling title and description is your free digital billboard: it directly drives higher click-through rates against competitors.';

  const topFix = !result.indexingDirectives.isIndexable
    ? 'Remove the "noindex" robots directive to allow Google to index this page.'
    : result.title.charCount > 60
    ? 'Shorten your title to 50-60 characters and place your most important keyword near the beginning.'
    : result.recommendations[0] || 'Provide unique Open Graph social images so shared links look attractive on social media.';

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="SEO Meta Checker"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="In WordPress, scroll below your post in the editor to the Yoast or Rank Math box and type your custom 'SEO Title' and 'Meta Description'."
      />

      {/* 2. Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            SEO Meta Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Search Status:{' '}
            <span
              className={`font-bold ${
                result.indexingDirectives.isIndexable ? 'text-[#059669]' : 'text-[#DC2626]'
              }`}
            >
              {result.indexingDirectives.isIndexable
                ? 'INDEXABLE (Google Allowed)'
                : 'BLOCKED (noindex active)'}
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

      {/* ELI5 Jargon Explainer Box */}
      <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F0F0F]">
          <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Explain Like I am 5: What are Meta Tags & Canonical Tags?</span>
        </div>
        <p className="leading-relaxed">
          Your <strong>Title and Description</strong> are like the cover of your book on Google's library shelf: they convince people to pick up your book. A <strong>Canonical Tag</strong> is a simple note to Google saying: "This is the original edition of this page, please don't penalize me if someone copies it."
        </p>
      </div>

      {/* Google SERP Snippet Preview */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] flex items-center gap-2">
          <Search className="h-4 w-4 text-[#2563EB]" />
          <span>Google Search Result Simulation:</span>
        </div>

        <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] font-sans space-y-1 max-w-xl">
          <div className="text-xs text-[#202124] truncate flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[10px]">🌐</span>
            <span className="font-medium">{result.domain}</span>
            <span className="text-[#5F6368]">&rsaquo; {result.targetUrl.replace(/^https?:\/\/[^/]+/, '') || '/'}</span>
          </div>
          <div className="text-base sm:text-lg text-[#1A0DAB] hover:underline cursor-pointer font-medium leading-snug line-clamp-2">
            {result.title.text || '(Untitled Document)'}
          </div>
          <p className="text-xs text-[#4D5156] leading-relaxed line-clamp-2">
            {result.description.text || 'No meta description provided. Google will display an automated snippet from page content.'}
          </p>
        </div>
      </div>

      {/* Title & Description Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title Tag */}
        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">Title Tag</span>
            <span className={`text-xs font-mono font-bold ${
              result.title.status === 'TOO_LONG' ? 'text-[#DC2626]' : 'text-[#059669]'
            }`}>
              {result.title.charCount} chars (~{result.title.estimatedPixelWidth}px)
            </span>
          </div>
          <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${result.title.status === 'TOO_LONG' ? 'bg-[#DC2626]' : 'bg-[#10B981]'}`}
              style={{ width: `${Math.min((result.title.charCount / 60) * 100, 100)}%` }}
            />
          </div>
          <div className="text-[11px] text-[#6B7280] flex justify-between">
            <span>Ideal: 50-60 chars</span>
            <span>{result.title.status === 'TOO_LONG' ? 'Over 60 chars (Truncated)' : 'Safe length'}</span>
          </div>
        </div>

        {/* Meta Description */}
        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">Meta Description</span>
            <span className={`text-xs font-mono font-bold ${
              result.description.status === 'OPTIMAL' ? 'text-[#059669]' : 'text-[#B45309]'
            }`}>
              {result.description.charCount} chars
            </span>
          </div>
          <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${result.description.status === 'OPTIMAL' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`}
              style={{ width: `${Math.min((result.description.charCount / 160) * 100, 100)}%` }}
            />
          </div>
          <div className="text-[11px] text-[#6B7280] flex justify-between">
            <span>Ideal: 120-160 chars</span>
            <span>{result.description.charCount === 0 ? 'Missing' : result.description.status === 'OPTIMAL' ? 'Optimal' : 'Needs tuning'}</span>
          </div>
        </div>
      </div>

      {/* Canonical & Directives */}
      <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] block">
          Canonical Link & Directives
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
            <span className="text-[#6B7280] text-[10px] uppercase font-bold block">Canonical URL:</span>
            <span className="font-mono break-all text-[#0F0F0F]">
              {result.canonical.url || 'No canonical tag found'}
            </span>
            <div className="pt-1">
              {result.canonical.isSelfReferential ? (
                <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#059669] font-bold text-[10px]">
                  Self-Referential (Correct)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-[#F59E0B]/15 text-[#B45309] font-bold text-[10px]">
                  Non Self-Referential
                </span>
              )}
            </div>
          </div>

          <div className="p-3 rounded bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
            <span className="text-[#6B7280] text-[10px] uppercase font-bold block">Robots Directives:</span>
            <span className="font-mono text-[#0F0F0F]">
              {result.indexingDirectives.metaRobots || 'index, follow (default)'}
            </span>
            <div className="pt-1">
              {result.indexingDirectives.isIndexable ? (
                <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#059669] font-bold text-[10px]">
                  Google Indexing Allowed
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-[#EF4444]/15 text-[#DC2626] font-bold text-[10px]">
                  Blocked by noindex
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Preview (Open Graph) */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] flex items-center gap-2">
          <Share2 className="h-4 w-4 text-[#2563EB]" />
          <span>Social Media Preview (Facebook, LinkedIn, Slack):</span>
        </div>

        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden max-w-md bg-[#F9FAFB]">
          {result.openGraph.image ? (
            <div className="w-full h-40 bg-[#E5E7EB] relative overflow-hidden flex items-center justify-center">
              <img
                src={result.openGraph.image}
                alt="OG Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-full h-32 bg-[#E5E7EB] flex items-center justify-center text-xs text-[#6B7280]">
              No Open Graph image provided (Link previews will look blank)
            </div>
          )}
          <div className="p-3 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#6B7280] block">{result.domain}</span>
            <div className="font-bold text-xs text-[#0F0F0F] line-clamp-1">
              {result.openGraph.title || result.title.text || 'Untitled'}
            </div>
            <p className="text-[11px] text-[#4B5563] line-clamp-2">
              {result.openGraph.description || result.description.text || 'No social description.'}
            </p>
          </div>
        </div>
      </div>

      {/* Dual Guidance: How to Optimize */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Improve Your Search Snippet
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#2563EB]">
              For Site Owners (WordPress / Shopify):
            </span>
            <ul className="space-y-2 text-[#4B5563]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>WordPress:</strong> Install Rank Math or Yoast. Edit the snippet title until the character indicator turns green (50-60 characters).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Social Media Image:</strong> Upload a 1200x630px image in the 'Social' tab so your link looks professional on Facebook, LinkedIn, and X.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers:
            </span>
            <div className="p-2.5 rounded bg-[#111827] text-white/90 font-mono text-[10px] space-y-1 overflow-x-auto">
              <div>{`<title>Keyword-Focused Title | Brand</title>`}</div>
              <div>{`<meta name="description" content="Engaging 140-char summary.">`}</div>
              <div>{`<link rel="canonical" href="${result.targetUrl}">`}</div>
              <div>{`<meta property="og:image" content="https://.../og.jpg">`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
