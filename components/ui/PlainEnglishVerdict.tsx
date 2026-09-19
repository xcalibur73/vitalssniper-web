'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Sparkles, Copy, Check, MessageSquare, ArrowRight } from 'lucide-react';

export type ImpactLevel = 'safe' | 'warning' | 'critical';

export interface PlainEnglishVerdictProps {
  toolName: string;
  targetDomain: string;
  impact: ImpactLevel;
  headline: string;
  summary: string;
  businessImpact: string;
  topFix: string;
  developerNote?: string;
  noCodeTip?: string;
}

export default function PlainEnglishVerdict({
  toolName,
  targetDomain,
  impact,
  headline,
  summary,
  businessImpact,
  topFix,
  developerNote,
  noCodeTip,
}: PlainEnglishVerdictProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyNote = () => {
    const textToCopy =
      developerNote ||
      `Hey team, quick update from our ${toolName} on ${targetDomain}:\n- Status: ${headline}\n- Impact: ${businessImpact}\n- Priority Fix: ${topFix}\nReport: https://webaudits.pro`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isSafe = impact === 'safe';
  const isWarning = impact === 'warning';

  return (
    <div
      className={`p-5 rounded-xl border transition-all ${
        isSafe
          ? 'bg-[#10B981]/5 border-[#10B981]/30'
          : isWarning
          ? 'bg-[#F59E0B]/5 border-[#F59E0B]/30'
          : 'bg-[#EF4444]/5 border-[#EF4444]/30'
      }`}
    >
      {/* Top Badge & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              isSafe
                ? 'bg-[#10B981]/20 text-[#059669]'
                : isWarning
                ? 'bg-[#F59E0B]/20 text-[#B45309]'
                : 'bg-[#EF4444]/20 text-[#DC2626]'
            }`}
          >
            {isSafe ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            ) : isWarning ? (
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7280] block">
              In Plain English: The 10-Second Summary
            </span>
            <h3 className="text-base font-bold text-[#0F0F0F] leading-tight">{headline}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-wide ${
              isSafe
                ? 'bg-[#10B981]/15 text-[#059669]'
                : isWarning
                ? 'bg-[#F59E0B]/15 text-[#B45309]'
                : 'bg-[#EF4444]/15 text-[#DC2626]'
            }`}
          >
            {isSafe ? 'Looking Good' : isWarning ? 'Room to Improve' : 'Action Needed'}
          </span>

          <button
            type="button"
            onClick={handleCopyNote}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors shadow-sm"
            title="Copy a quick 3-line note to send to your developer or team"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#059669]" />
                <span className="text-[#059669]">Copied Note</span>
              </>
            ) : (
              <>
                <MessageSquare className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>Send to Developer</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary Content */}
      <div className="pt-3 space-y-2.5 text-xs text-[#374151] leading-relaxed">
        <p className="text-xs sm:text-sm font-medium text-[#0F0F0F]">{summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
          {/* Business & Search Impact */}
          <div className="p-3 rounded-lg bg-white/80 border border-[#E5E7EB] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block">
              What This Means for Your Visitors:
            </span>
            <p className="text-xs text-[#4B5563]">{businessImpact}</p>
          </div>

          {/* Top Priority Action */}
          <div className="p-3 rounded-lg bg-white/80 border border-[#E5E7EB] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#2563EB] tracking-wider block">
              Top Priority Fix:
            </span>
            <p className="text-xs text-[#0F0F0F] font-medium">{topFix}</p>
          </div>
        </div>

        {/* CMS / No-Code Tip if provided */}
        {noCodeTip && (
          <div className="p-2.5 rounded-lg bg-white/60 border border-[#E5E7EB] text-[11px] text-[#4B5563] flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0F0F0F]">No-Code / CMS Quick Tip:</strong> {noCodeTip}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
