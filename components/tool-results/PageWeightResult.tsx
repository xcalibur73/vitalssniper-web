'use client';

import React from 'react';
import { PageWeightAuditResult } from '@/lib/tool-analyzers/pageWeightAnalyzer';
import { CheckCircle2, AlertTriangle, AlertCircle, HardDrive, Zap, ExternalLink } from 'lucide-react';

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

  const budgetPercent = Math.min(
    Math.round((result.totalTransferMb / result.budgetLimitMb) * 100),
    200
  );

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
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

      {/* Budget Meter Card */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Performance Budget: {result.budgetLimitMb} MB Mobile Threshold
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

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            Weight Reduction Recommendations
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#4B5563]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
