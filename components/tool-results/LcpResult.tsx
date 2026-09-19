'use client';

import React from 'react';
import { LcpAuditResult } from '@/lib/tool-analyzers/lcpAnalyzer';
import { CheckCircle2, AlertTriangle, AlertCircle, Image as ImageIcon, Code, Clock } from 'lucide-react';

export default function LcpResult({ result }: { result: LcpAuditResult }) {
  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            LCP Diagnostic Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Estimated LCP: <span className="font-bold text-[#0F0F0F] font-mono">{result.timingEstimate.estimatedLcpMs} ms</span> (75th percentile lab model)
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
            <code>{result.lcpCandidate.htmlSnippet}</code>
          </div>
        )}

        {result.lcpCandidate.resourceUrl && (
          <div className="text-xs text-[#4B5563] space-y-1">
            <span className="font-semibold text-[#0F0F0F]">Asset Resource URL:</span>
            <div className="font-mono text-[11px] text-[#2563EB] break-all bg-[#F8F8F8] p-2 rounded border border-[#E5E7EB]">
              {result.lcpCandidate.resourceUrl}
            </div>
          </div>
        )}
      </div>

      {/* Timing Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Server TTFB</span>
          <span className="font-bold text-[#0F0F0F] text-base font-mono">{result.timingEstimate.ttfbMs} ms</span>
          <p className="text-[10px] text-[#6B7280] mt-1">Initial document delivery</p>
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Load Delay</span>
          <span className="font-bold text-[#0F0F0F] text-base font-mono">{result.timingEstimate.resourceLoadDelayMs} ms</span>
          <p className="text-[10px] text-[#6B7280] mt-1">{result.lcpCandidate.hasPreload ? 'Preloaded in <head>' : 'Discovery delay'}</p>
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Load Duration</span>
          <span className="font-bold text-[#0F0F0F] text-base font-mono">{result.timingEstimate.resourceLoadDurationMs} ms</span>
          <p className="text-[10px] text-[#6B7280] mt-1">Format: {result.lcpCandidate.format || 'Text'}</p>
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Render Delay</span>
          <span className="font-bold text-[#0F0F0F] text-base font-mono">{result.timingEstimate.elementRenderDelayMs} ms</span>
          <p className="text-[10px] text-[#6B7280] mt-1">{result.lcpCandidate.hasFetchPriorityHigh ? 'Priority: high' : 'Standard priority'}</p>
        </div>
      </div>

      {/* LCP Optimization Checklist */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
          LCP Optimization Checks:
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {result.checks.map((c, idx) => (
            <div key={idx} className="py-2.5 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#0F0F0F] block">{c.label}</span>
                <span className="text-[#6B7280]">{c.detail}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                  c.severity === 'PASS'
                    ? 'bg-[#10B981]/15 text-[#059669]'
                    : c.severity === 'WARNING'
                    ? 'bg-[#F59E0B]/15 text-[#B45309]'
                    : 'bg-[#EF4444]/15 text-[#DC2626]'
                }`}
              >
                {c.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
            Actionable LCP Engineering Fixes:
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
