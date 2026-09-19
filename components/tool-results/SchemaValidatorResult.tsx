'use client';

import React, { useState } from 'react';
import { SchemaValidatorResult as SchemaValidatorResultType } from '@/lib/tool-analyzers/schemaValidator';
import { CheckCircle2, AlertTriangle, AlertCircle, FileCode, Check, Copy, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function SchemaValidatorResult({ result }: { result: SchemaValidatorResultType }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            Schema Diagnostic Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Found <span className="font-bold text-[#0F0F0F] font-mono">{result.totalBlocksFound}</span> JSON-LD script block{result.totalBlocksFound === 1 ? '' : 's'} with <span className="font-bold text-[#0F0F0F] font-mono">{result.totalEntitiesExtracted}</span> extracted entit{result.totalEntitiesExtracted === 1 ? 'y' : 'ies'}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Schema Score</span>
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

      {/* Detected Types Pills */}
      <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
          Detected Schema.org Entity Types
        </span>
        {result.detectedTypes.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {result.detectedTypes.map((type, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono font-medium"
              >
                @{type}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-xs text-[#DC2626] font-medium py-1">
            No structured JSON-LD schema entities detected in source HTML.
          </div>
        )}
      </div>

      {/* Rich Snippet Eligibility */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            Google Rich Snippet Eligibility Matrix
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {result.richSnippetEligibility.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                item.eligible
                  ? 'bg-[#10B981]/5 border-[#10B981]/30 text-[#0F0F0F]'
                  : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              {item.eligible ? (
                <CheckCircle2 className="h-4 w-4 text-[#059669] flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-[#0F0F0F]">{item.feature}</div>
                <div className="mt-0.5 text-[11px] leading-relaxed">{item.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Issues */}
      {result.validationIssues.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Schema Diagnostics & Warnings ({result.validationIssues.length})
            </h3>
          </div>
          <div className="space-y-2">
            {result.validationIssues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                  issue.severity === 'ERROR'
                    ? 'bg-[#EF4444]/5 border-[#EF4444]/30 text-[#DC2626]'
                    : 'bg-[#F59E0B]/5 border-[#F59E0B]/30 text-[#B45309]'
                }`}
              >
                {issue.severity === 'ERROR' ? (
                  <AlertCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-[#B45309] flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold uppercase tracking-wider text-[10px] mr-2">
                    {issue.type}
                  </span>
                  <span>{issue.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JSON-LD Raw Blocks Inspector */}
      {result.blocks.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
                Detected JSON-LD Blocks ({result.blocks.length})
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {result.blocks.map((block) => {
              const isExpanded = expandedIndex === block.index;
              return (
                <div key={block.index} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                  <div
                    onClick={() => setExpandedIndex(isExpanded ? null : block.index)}
                    className="flex items-center justify-between p-3 bg-[#F9FAFB] cursor-pointer hover:bg-[#F3F4F6] transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-[#0F0F0F]">Block #{block.index + 1}</span>
                      <span className="text-[#6B7280]">
                        ({block.entityCount} entit{block.entityCount === 1 ? 'y' : 'ies'})
                      </span>
                      {block.isValidJson ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#059669] font-sans font-bold">
                          Valid JSON
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EF4444]/15 text-[#DC2626] font-sans font-bold">
                          Parse Error
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(block.rawJson, block.index);
                        }}
                        className="text-xs text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 font-medium px-2 py-1 rounded bg-white border border-[#E5E7EB]"
                      >
                        {copiedIndex === block.index ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#059669]" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" /> Copy Code
                          </>
                        )}
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-[#6B7280]" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#6B7280]" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-3 bg-[#0F0F0F] overflow-x-auto text-[11px] font-mono text-[#E5E7EB] leading-relaxed">
                      <pre>{block.rawJson}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            Schema Optimization Recommendations
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
