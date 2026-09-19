'use client';

import React, { useState } from 'react';
import { BrokenLinkAuditResult, LinkRecord } from '@/lib/tool-analyzers/brokenLinkAnalyzer';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, ExternalLink, Link2, Filter, HelpCircle, Wrench } from 'lucide-react';

export default function BrokenLinkResult({ result }: { result: BrokenLinkAuditResult }) {
  const [activeTab, setActiveTab] = useState<'broken' | 'all' | 'internal' | 'external'>('broken');

  const isGood = result.score >= 90 && result.stats.brokenCount === 0;
  const isWarning = result.score >= 60 && result.score < 90;
  const impact = result.stats.brokenCount === 0 ? 'safe' : result.stats.brokenCount <= 2 ? 'warning' : 'critical';

  const headline =
    result.stats.brokenCount === 0
      ? 'All tested links are healthy: zero dead ends or 404 errors.'
      : 'Found ' +
        result.stats.brokenCount +
        ' broken link(s) leading visitors to a dead end.';

  const summary =
    'Tested ' +
    result.stats.testedCount +
    ' on-page links. ' +
    (result.stats.brokenCount === 0
      ? 'Every link successfully responded with an active HTTP 200 OK or valid redirect.'
      : result.stats.brokenCount +
        ' link(s) returned a dead 404 Not Found error, giving visitors a frustrating dead-end page.');

  const businessImpact =
    result.stats.brokenCount === 0
      ? 'Smooth visitor navigation and zero wasted crawl budget for search engines.'
      : 'Dead links cause visitors to abandon your site and signal to Google that your content is outdated or unmaintained.';

  const topFix =
    result.stats.brokenCount > 0
      ? 'Update or remove the ' +
        result.stats.brokenCount +
        ' broken link(s) identified in the table below, or set up 301 redirects.'
      : 'Maintain healthy links by auditing outgoing affiliate or resource links quarterly.';

  const filteredLinks = result.allLinks.filter((link) => {
    if (activeTab === 'broken') return link.status === 'BROKEN';
    if (activeTab === 'internal') return link.type === 'internal';
    if (activeTab === 'external') return link.type === 'external';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="Broken Link Checker"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="In WordPress, install the free 'Redirection' plugin to create simple 301 redirects pointing old or deleted URLs to your active pages."
      />

      {/* 2. Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            Link Health Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Crawled <span className="font-bold text-[#0F0F0F] font-mono">{result.stats.totalLinksFound}</span> links: tested top <span className="font-bold text-[#0F0F0F] font-mono">{result.stats.testedCount}</span> concurrent targets
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Health Score</span>
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
          <span>Explain Like I am 5: What is a Broken Link (404 Error)?</span>
        </div>
        <p className="leading-relaxed">
          Imagine giving a customer driving directions to your store, but the road ends at an empty ditch. When a visitor clicks a link on your site and sees "Page Not Found", they lose trust and go back to Google to click your competitor.
        </p>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Broken Links</span>
          <span className={`text-xl font-mono font-bold ${result.stats.brokenCount > 0 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
            {result.stats.brokenCount}
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Internal Links</span>
          <span className="text-xl font-mono font-bold text-[#0F0F0F]">
            {result.stats.internalCount}
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">External Links</span>
          <span className="text-xl font-mono font-bold text-[#0F0F0F]">
            {result.stats.externalCount}
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">In-Page Anchors</span>
          <span className="text-xl font-mono font-bold text-[#0F0F0F]">
            {result.stats.fragmentCount}
          </span>
        </div>
      </div>

      {/* Filter Tabs & Link Table */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Link Inventory & HTTP Status
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#F3F4F6] rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('broken')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'broken'
                  ? 'bg-white text-[#DC2626] shadow-sm font-bold'
                  : 'text-[#6B7280] hover:text-[#0F0F0F]'
              }`}
            >
              Broken ({result.stats.brokenCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-[#0F0F0F] shadow-sm font-bold'
                  : 'text-[#6B7280] hover:text-[#0F0F0F]'
              }`}
            >
              All Tested ({result.allLinks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('internal')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'internal'
                  ? 'bg-white text-[#0F0F0F] shadow-sm font-bold'
                  : 'text-[#6B7280] hover:text-[#0F0F0F]'
              }`}
            >
              Internal
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('external')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'external'
                  ? 'bg-white text-[#0F0F0F] shadow-sm font-bold'
                  : 'text-[#6B7280] hover:text-[#0F0F0F]'
              }`}
            >
              External
            </button>
          </div>
        </div>

        {filteredLinks.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-[#E5E7EB] rounded-lg">
            <CheckCircle2 className="h-8 w-8 text-[#059669] mx-auto mb-2" />
            <p className="text-xs font-semibold text-[#0F0F0F]">No links match the selected filter.</p>
            {activeTab === 'broken' && (
              <p className="text-[11px] text-[#6B7280] mt-1">
                Zero dead or 404 links detected across the tested sample.
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-mono text-[10px] border-b border-[#E5E7EB]">
                <tr>
                  <th className="p-3">Status</th>
                  <th className="p-3">Anchor Text</th>
                  <th className="p-3">Destination URL</th>
                  <th className="p-3">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredLinks.map((link, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      {link.status === 'OK' ? (
                        <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#059669] font-mono font-bold text-[11px]">
                          {link.statusCode || 200} OK
                        </span>
                      ) : link.status === 'BROKEN' ? (
                        <span className="px-2 py-0.5 rounded bg-[#EF4444]/15 text-[#DC2626] font-mono font-bold text-[11px]">
                          {link.statusCode || 'ERR'} BROKEN
                        </span>
                      ) : link.status === 'REDIRECT' ? (
                        <span className="px-2 py-0.5 rounded bg-[#F59E0B]/15 text-[#B45309] font-mono font-bold text-[11px]">
                          {link.statusCode || 301} REDIR
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#9CA3AF]/15 text-[#6B7280] font-mono text-[11px]">
                          SKIPPED
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-medium text-[#0F0F0F] max-w-[200px] truncate">
                      {link.anchorText || '[Empty Anchor]'}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#4B5563] max-w-[320px] truncate">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#2563EB] hover:underline inline-flex items-center gap-1"
                      >
                        {link.url}
                        <ExternalLink className="h-3 w-3 inline flex-shrink-0" />
                      </a>
                    </td>
                    <td className="p-3 text-[11px] uppercase font-semibold text-[#6B7280]">
                      {link.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dual Remediation Guidance */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Fix Broken Links
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#2563EB]">
              For Site Owners (No Code):
            </span>
            <ul className="space-y-2 text-[#4B5563]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Edit the Post:</strong> Click into the article or page containing the broken anchor and swap the URL for a live equivalent.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>301 Redirect:</strong> If the deleted page has backlinks, create a 301 redirect to the most relevant surviving page.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers:
            </span>
            <p className="text-[#4B5563]">
              Configure server redirect rules (e.g. <code>rewrite ^/old-path$ /new-path permanent;</code> in Nginx or <code>Redirect 301 /old /new</code> in Apache .htaccess).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
