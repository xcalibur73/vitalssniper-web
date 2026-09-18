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
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs">
        <div className="flex items-center gap-2 font-bold text-accent mb-1">
          <Beaker className="h-4 w-4" />
          <span>Empirical Testing Evidence</span>
        </div>
        <p className="text-charcoal-muted">
          <strong className="text-charcoal">Tested:</strong> {evidence.whatWeTested}
        </p>
        <p className="text-charcoal-muted mt-1">
          <strong className="text-charcoal">Observed:</strong> {evidence.observedResult}
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 evidence-callout rounded-2xl p-6">
      <div className="flex items-center justify-between border-b border-sand-300 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-action/10 text-action">
            <Beaker className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal">
              Empirical Testing Evidence
            </h4>
            <span className="text-[11px] text-charcoal-muted">
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
          <span className="font-bold uppercase tracking-wider text-[10px] text-charcoal-muted block mb-1">
            What We Tested
          </span>
          <p className="text-charcoal leading-relaxed bg-[#F7F4EE] p-3 rounded-lg border border-sand-300">
            {evidence.whatWeTested}
          </p>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wider text-[10px] text-charcoal-muted block mb-1">
            Observed Result
          </span>
          <p className="text-charcoal leading-relaxed bg-[#F7F4EE] p-3 rounded-lg border border-sand-300 font-medium">
            {evidence.observedResult}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 text-[11px] text-charcoal-muted border-t border-sand-300">
          <FileText className="h-3.5 w-3.5 text-action" />
          <span><strong>Source:</strong> {evidence.source}</span>
        </div>
      </div>
    </div>
  );
}
