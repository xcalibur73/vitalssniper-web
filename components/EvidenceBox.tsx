import React from 'react';
import { ShieldCheck, Beaker, CheckCircle2, FileText } from 'lucide-react';
import { EvidenceData } from '@/data/posts';

interface EvidenceBoxProps {
  evidence: EvidenceData;
  compact?: boolean;
}

export default function EvidenceBox({ evidence, compact = false }: EvidenceBoxProps) {
  if (compact) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#2563EB] mb-1">
          <Beaker className="h-4 w-4" />
          <span>Empirical Testing Evidence</span>
        </div>
        <p className="text-[#4B5563]">
          <strong className="text-[#0F0F0F]">Tested:</strong> {evidence.whatWeTested}
        </p>
        <p className="text-[#4B5563] mt-1">
          <strong className="text-[#0F0F0F]">Observed:</strong> {evidence.observedResult}
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
            <Beaker className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-[#0F0F0F]">
              Empirical Testing Evidence
            </div>
            <span className="text-[11px] text-[#6B7280]">
              Standard Laboratory &amp; Production Verification
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Verified Data
        </span>
      </div>

      <div className="space-y-3.5 text-xs">
        <div>
          <span className="font-bold uppercase tracking-wider text-[10px] text-[#6B7280] block mb-1">
            What We Tested
          </span>
          <p className="text-[#0F0F0F] leading-relaxed bg-[#F8F8F8] p-3 rounded-lg border border-[#E5E7EB]">
            {evidence.whatWeTested}
          </p>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wider text-[10px] text-[#6B7280] block mb-1">
            Observed Result
          </span>
          <p className="text-[#0F0F0F] leading-relaxed bg-[#F8F8F8] p-3 rounded-lg border border-[#E5E7EB] font-medium">
            {evidence.observedResult}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 text-[11px] text-[#6B7280] border-t border-[#E5E7EB]">
          <FileText className="h-3.5 w-3.5 text-[#2563EB]" />
          <span><strong>Source:</strong> {evidence.source}</span>
        </div>
      </div>
    </div>
  );
}
