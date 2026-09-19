'use client';

import React, { useState } from 'react';
import { SchemaValidatorResult as SchemaValidatorResultType } from '@/lib/tool-analyzers/schemaValidator';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, FileCode, Check, Copy, Sparkles, ChevronDown, ChevronUp, HelpCircle, Wrench } from 'lucide-react';

export default function SchemaValidatorResult({ result }: { result: SchemaValidatorResultType }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;
  const impact = isGood ? 'safe' : isWarning ? 'warning' : 'critical';

  const headline = isGood
    ? 'Google can clearly understand your structured page entities.'
    : isWarning
    ? 'Structured data is present, but missing recommended details.'
    : 'No structured data found: missing out on Google rich search features.';

  const summary =
    result.totalBlocksFound === 0
      ? 'Zero JSON-LD structured data blocks found in your source HTML. Google and AI search engines cannot automatically display rich snippets for this page.'
      : 'Found ' +
        result.totalBlocksFound +
        ' structured data block(s) with ' +
        result.totalEntitiesExtracted +
        ' entities (' +
        (result.detectedTypes.join(', ') || 'Schema') +
        '). ' +
        (result.validationIssues.length > 0
          ? result.validationIssues.length + ' warning(s) could prevent Google from granting rich snippets.'
          : 'All core required fields are valid.');

  const businessImpact = isGood
    ? 'Eligible for rich search features (review stars, author badges, and FAQ dropdowns) that boost organic CTR.'
    : 'Without structured data, your search results look like plain blue links without the eye-catching star ratings or badges competitors have.';

  const topFix =
    result.recommendations[0] ||
    'Embed valid Schema.org Article, Product, or Organization JSON-LD markup on this page.';

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="Schema Validator"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="In WordPress, your SEO plugin (Rank Math, Yoast, or Schema Pro) has a 'Schema' tab inside the post editor where you can pick Article, FAQ, or Product with one click."
      />

      {/* 2. Top Summary Bar */}
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

      {/* ELI5 Jargon Explainer Box */}
      <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F0F0F]">
          <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Explain Like I am 5: What is Schema.org Structured Data?</span>
        </div>
        <p className="leading-relaxed">
          Think of Schema as a nutrition facts label on a cereal box. Humans enjoy the colorful marketing graphics on the box, but search bots read the nutritional label to know the exact ingredients, manufacturer, publish date, and rating without guessing.
        </p>
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
            Google Rich Search Feature Eligibility
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
              Schema Diagnostics & Missing Fields ({result.validationIssues.length})
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
                Detected Code Blocks ({result.blocks.length})
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

      {/* Dual Guidance: How to Fix */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Implement Schema Markup
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
                <span><strong>WordPress:</strong> Install Rank Math or Yoast SEO. Enable Article schema and ensure your user profile has your full name and author bio.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Shopify:</strong> Modern themes (Dawn, Refresh) automatically inject Product schema with prices and stock status into your product pages.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers:
            </span>
            <p className="text-[#4B5563]">
              Inject a <code>{`<script type="application/ld+json">`}</code> block inside your page head or footer with valid <code>@context: "https://schema.org"</code> and required attributes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
