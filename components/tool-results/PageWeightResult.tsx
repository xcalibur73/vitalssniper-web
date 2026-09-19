'use client';

import React from 'react';
import { PageWeightAuditResult } from '@/lib/tool-analyzers/pageWeightAnalyzer';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, HardDrive, Zap, ExternalLink, HelpCircle, Wrench } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  HTML: '#2563EB',
  JavaScript: '#F59E0B',
  CSS: '#8B5CF6',
  Images: '#10B981',
  Fonts: '#EC4899',
};

export default function PageWeightResult({ result }: { result: PageWeightAuditResult }) {
  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;
  const impact = result.isWithinBudget ? 'safe' : result.totalTransferMb <= 2.5 ? 'warning' : 'critical';

  const heaviestCategory = result.categories.reduce(
    (max, cat) => (cat.estimatedBytes > max.estimatedBytes ? cat : max),
    result.categories[0] || { name: 'Assets', estimatedBytes: 0 }
  );

  const headline = result.isWithinBudget
    ? 'Your page is lean and fast (' + result.totalTransferMb + ' MB), within mobile budgets.'
    : 'Your page is ' +
      result.totalTransferMb +
      ' MB: heavier than the recommended 1.5 MB mobile threshold.';

  const summary =
    'When someone visits on mobile, their phone has to download ' +
    result.totalTransferMb +
    ' MB of data (' +
    result.totalTransferKb +
    ' KB). ' +
    (result.isWithinBudget
      ? 'This fits well within Google 1.5 MB performance budget for mobile cellular connections.'
      : 'The biggest weight contributor is ' +
        heaviestCategory.name +
        ' (' +
        heaviestCategory.estimatedKb +
        ' KB). Trimming this will deliver faster page loads on phones.');

  const businessImpact = result.isWithinBudget
    ? 'Minimal data transfer costs and rapid loading on mobile networks with low bounce rates.'
    : 'Heavy pages drain visitor phone batteries, burn mobile data limits, and cause noticeable loading delays on cellular signals.';

  const topFix =
    result.recommendations[0] ||
    'Compress oversized images to WebP/AVIF and remove unused third-party tracking scripts.';

  const budgetPercent = Math.min(
    Math.round((result.totalTransferMb / result.budgetLimitMb) * 100),
    200
  );

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="Page Weight Checker"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="In WordPress, install an automatic image compressor (ShortPixel, Smush, or Imagify) and audit your plugins to deactivate tracking tools you are no longer using."
      />

      {/* 2. Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            Payload Weight Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Total Transfer: <span className="font-bold text-[#0F0F0F] font-mono">{result.totalTransferMb} MB</span> ({result.totalTransferKb} KB) against {result.budgetLimitMb} MB budget
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Weight Score</span>
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
            <span>{result.grade}</span>
          </div>
        </div>
      </div>

      {/* ELI5 Jargon Explainer Box */}
      <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F0F0F]">
          <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Explain Like I am 5: What is Page Weight?</span>
        </div>
        <p className="leading-relaxed">
          Think of your webpage like a suitcase. If your suitcase is 25kg when the overhead limit is 5kg, you get stuck at security. A heavy webpage forces a visitor's phone to download megabytes of giant photos and unnecessary scripts over cellular data before the page finishes loading.
        </p>
      </div>

      {/* Budget Meter Card */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Mobile Cellular Budget: {result.budgetLimitMb} MB Recommended
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-[#4B5563]">
            {budgetPercent}% of budget
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#E5E7EB] h-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              result.isWithinBudget ? 'bg-[#10B981]' : 'bg-[#DC2626]'
            }`}
            style={{ width: `${Math.min(budgetPercent, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#6B7280] pt-1">
          <span>0 MB</span>
          <span className="font-semibold text-[#0F0F0F]">
            {result.isWithinBudget ? (
              <span className="text-[#059669]">Within Budget ({result.totalTransferMb} MB)</span>
            ) : (
              <span className="text-[#DC2626]">Exceeded Budget by +{(result.totalTransferMb - result.budgetLimitMb).toFixed(2)} MB</span>
            )}
          </span>
          <span>{result.budgetLimitMb} MB</span>
        </div>
      </div>

      {/* Category Breakdown Bar & Table */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
          Payload Breakdown by Resource Type
        </h3>

        {/* Multi-segment stacked bar */}
        <div className="w-full h-4 rounded-lg overflow-hidden flex bg-[#E5E7EB]">
          {result.categories.map((cat) => (
            <div
              key={cat.name}
              style={{
                width: `${cat.percentageOfTotal}%`,
                backgroundColor: CATEGORY_COLORS[cat.name] || '#9CA3AF',
              }}
              className="h-full first:rounded-l-lg last:rounded-r-lg transition-all"
              title={`${cat.name}: ${cat.estimatedKb} KB (${cat.percentageOfTotal}%)`}
            />
          ))}
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {result.categories.map((cat) => (
            <div key={cat.name} className="p-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[cat.name] || '#9CA3AF' }}
                />
                <span className="text-[11px] font-bold text-[#0F0F0F] truncate">{cat.name}</span>
              </div>
              <div className="font-mono text-sm font-bold text-[#0F0F0F]">{cat.estimatedKb} KB</div>
              <div className="text-[10px] text-[#6B7280] font-mono mt-0.5">
                {cat.count} files ({cat.percentageOfTotal}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heaviest Assets */}
      {result.heaviestAssets.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#F59E0B]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Top External / Head-Loaded Resources
            </h3>
          </div>
          <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-mono text-[10px] border-b border-[#E5E7EB]">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Asset URL</th>
                  <th className="p-3">Host Origin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {result.heaviestAssets.map((asset, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#2563EB]/10 text-[#2563EB] font-mono uppercase text-[10px] font-bold">
                        {asset.type}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#4B5563] max-w-[360px] truncate">
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#2563EB] hover:underline inline-flex items-center gap-1"
                      >
                        {asset.url}
                        <ExternalLink className="h-3 w-3 inline flex-shrink-0" />
                      </a>
                    </td>
                    <td className="p-3 text-[11px] font-semibold text-[#6B7280]">
                      {asset.isExternal ? (
                        <span className="text-[#DC2626]">3rd-Party Domain</span>
                      ) : (
                        <span className="text-[#059669]">Self-Hosted</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dual Remediation Guidance */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Lighten Your Page Weight
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
                <span><strong>Images:</strong> Run your pictures through TinyPNG.com or install WebP Express on WordPress before uploading.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Fonts:</strong> Limit your custom fonts to 1 or 2 families rather than loading 4 different Google fonts.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers:
            </span>
            <ul className="space-y-2 text-[#4B5563]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F0F0F] mt-1.5 flex-shrink-0" />
                <span>Enable server-side Brotli compression (reduces text payload by an additional 15-20% over Gzip).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F0F0F] mt-1.5 flex-shrink-0" />
                <span>Tree-shake unused JavaScript dependencies and load heavy tracking libraries (Hotjar, HubSpot) via Google Tag Manager with deferred triggers.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
