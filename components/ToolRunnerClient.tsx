'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WebTool } from '@/data/tools';
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Clock,
  ArrowRight,
  Activity,
} from 'lucide-react';

export default function ToolRunnerClient({ tool }: { tool: WebTool }) {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [running, setRunning] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialUrl) {
      handleRunAudit(initialUrl);
    }
  }, [initialUrl]);

  const handleRunAudit = async (targetUrlToTest?: string) => {
    const target = (targetUrlToTest || inputUrl).trim();
    if (!target) return;

    setRunning(true);
    setAnalyzed(false);
    setError(null);

    try {
      const endpoint = tool.slug === 'geo-audit' ? '/api/geo' : '/api/audit';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Could not inspect target URL. Please check the domain name and try again.');
      } else {
        setAuditResult(data);
        setAnalyzed(true);
      }
    } catch (err: any) {
      setError(err.message || 'Network error while contacting forensic audit engine.');
    } finally {
      setRunning(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-none">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-8 w-8 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
            <Activity className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#0F0F0F]">
            Run {tool.name}
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunAudit();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] focus-within:border-[#2563EB] focus-within:bg-white transition-all">
            <Globe className="h-4 w-4 text-[#6B7280] flex-shrink-0" />
            <input
              type="text"
              required
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter target website URL (e.g. example.com)"
              className="w-full bg-transparent text-sm text-[#0F0F0F] placeholder-[#6B7280] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={running}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors disabled:opacity-75 flex-shrink-0"
          >
            {running ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                <span>Scanning Website...</span>
              </>
            ) : (
              <>
                <Activity className="h-4 w-4" />
                <span>Run Audit</span>
              </>
            )}
          </button>
        </form>

        {tool.referenceBenchmark && (
          <div className="mt-3 text-xs text-[#6B7280]">
            {tool.referenceBenchmark}
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="mt-8 rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 p-4 text-xs text-[#991B1B] flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Audit Failed</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Stage 2: Interactive Result Display */}
        {analyzed && auditResult && (
          <div className="mt-8 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-6 space-y-6 animate-fadeIn">
            {tool.slug === 'geo-audit' ? (
              /* GEO Citability Audit View */
              <>
                {/* Summary Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
                      GEO Citability Target
                    </span>
                    <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
                      {auditResult.domain}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">GEO Readiness</span>
                        <span className="text-2xl font-bold font-mono text-[#0F0F0F]">
                          {auditResult.overall_score}<span className="text-xs font-normal text-[#6B7280]">/100</span>
                        </span>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        auditResult.overall_score >= 70
                          ? 'bg-[#10B981]/15 text-[#10B981]'
                          : auditResult.overall_score >= 45
                          ? 'bg-[#F59E0B]/15 text-[#B45309]'
                          : 'bg-[#EF4444]/15 text-[#EF4444]'
                      }`}>
                        {auditResult.overall_score >= 70 ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        )}
                        <span>{auditResult.overall_score >= 70 ? 'High Citability' : auditResult.overall_score >= 45 ? 'Moderate' : 'Low Citability'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Scorecards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Google AI Overviews</span>
                    <span className="font-bold text-[#0F0F0F] text-xl font-mono">{auditResult.platform_scores?.google_ai_overviews}/100</span>
                    <p className="text-[11px] text-[#6B7280] mt-1">Schema entity graph + front-loaded answer blocks</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">ChatGPT Search</span>
                    <span className="font-bold text-[#0F0F0F] text-xl font-mono">{auditResult.platform_scores?.chatgpt_search}/100</span>
                    <p className="text-[11px] text-[#6B7280] mt-1">OAI-SearchBot crawl access + factual claims</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Perplexity AI</span>
                    <span className="font-bold text-[#0F0F0F] text-xl font-mono">{auditResult.platform_scores?.perplexity_ai}/100</span>
                    <p className="text-[11px] text-[#6B7280] mt-1">134-167w optimal passages + statistics (+37%)</p>
                  </div>
                </div>

                {/* 2026 AI Search Crawler Access */}
                {auditResult.crawler_results && (
                  <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
                      2026 AI Search Crawler Access (robots.txt):
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#E5E7EB] text-[#6B7280]">
                            <th className="py-2 pr-4 font-semibold">Crawler</th>
                            <th className="py-2 pr-4 font-semibold">Category</th>
                            <th className="py-2 pr-4 font-semibold">Governs</th>
                            <th className="py-2 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                          {auditResult.crawler_results.map((c: any, idx: number) => (
                            <tr key={idx} className="hover:bg-[#F9FAFB]">
                              <td className="py-2 pr-4 font-mono font-bold text-[#0F0F0F]">{c.name}</td>
                              <td className="py-2 pr-4 text-[#6B7280]">{c.type}</td>
                              <td className="py-2 pr-4 text-[#4B5563]">{c.governs}</td>
                              <td className="py-2">
                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                                  c.status === 'ALLOWED'
                                    ? 'bg-[#10B981]/15 text-[#059669]'
                                    : 'bg-[#EF4444]/15 text-[#DC2626]'
                                }`}>
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Top Citable Passages */}
                {auditResult.top_passages && auditResult.top_passages.length > 0 && (
                  <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
                      Top Extracted Citable Passages (Princeton KDD 2024 Heuristics):
                    </div>
                    <div className="space-y-3">
                      {auditResult.top_passages.map((p: any, pIdx: number) => (
                        <div key={pIdx} className="p-3.5 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-bold text-[#0F0F0F] font-mono">Candidate {pIdx + 1} - Citability: {p.score}/100</span>
                            <span className="text-[#6B7280]">{p.word_count} words ({p.length_verdict})</span>
                          </div>
                          <p className="text-xs text-[#374151] italic leading-relaxed">"{p.full_text}"</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {p.has_statistics && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#3B82F6]/10 text-[#2563EB]">
                                +37% Statistics Detected
                              </span>
                            )}
                            {p.has_quotes && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#8B5CF6]/10 text-[#7C3AED]">
                                +30% Quotation Detected
                              </span>
                            )}
                            {p.has_attributions && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#10B981]/10 text-[#059669]">
                                +40% Attribution Pattern
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highest-Impact GEO Recommendations */}
                {auditResult.recommendations && auditResult.recommendations.length > 0 && (
                  <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
                      Highest-Impact GEO Recommendations:
                    </div>
                    <ul className="space-y-2">
                      {auditResult.recommendations.map((rec: string, rIdx: number) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                          <CheckCircle2 className="h-4 w-4 text-[#B76345] flex-shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              /* Performance / Core Web Vitals Audit View */
              <>
                {/* Summary Top Bar: Summary First */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
                      Audit Target
                    </span>
                    <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
                      {auditResult.domain}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Health Score</span>
                        <span className="text-2xl font-bold font-mono text-[#0F0F0F]">
                          {auditResult.score}<span className="text-xs font-normal text-[#6B7280]">/100</span>
                        </span>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        auditResult.score >= 80
                          ? 'bg-[#10B981]/15 text-[#10B981]'
                          : auditResult.score >= 60
                          ? 'bg-[#F59E0B]/15 text-[#B45309]'
                          : 'bg-[#EF4444]/15 text-[#EF4444]'
                      }`}>
                        {auditResult.score >= 80 ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : auditResult.score >= 60 ? (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        ) : (
                          <AlertCircle className="h-3.5 w-3.5" />
                        )}
                        <span>{auditResult.score >= 80 ? 'Good' : auditResult.score >= 60 ? 'Needs Attention' : 'Critical'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6 Metric Grid with Standardized Severity Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Server TTFB</span>
                    <span className="font-bold text-[#0F0F0F] text-base font-mono">{auditResult.ttfb} ms</span>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        auditResult.ttfb < 300
                          ? 'bg-[#10B981]/10 text-[#10B981]'
                          : 'bg-[#F59E0B]/10 text-[#B45309]'
                      }`}>
                        {auditResult.ttfb < 300 ? 'Optimal Edge Delivery' : 'High Server Latency'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">DOM Element Count</span>
                    <span className="font-bold text-[#0F0F0F] text-base font-mono">{auditResult.telemetry?.totalElements.toLocaleString()} nodes</span>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        auditResult.telemetry?.totalElements <= 1200
                          ? 'bg-[#10B981]/10 text-[#10B981]'
                          : 'bg-[#F59E0B]/10 text-[#B45309]'
                      }`}>
                        {auditResult.telemetry?.totalElements <= 1200 ? 'Optimal DOM Size' : 'Excessive Layout Nodes'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Max Tree Depth</span>
                    <span className="font-bold text-[#0F0F0F] text-base font-mono">{auditResult.telemetry?.maxDepth} levels</span>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        auditResult.telemetry?.maxDepth <= 18
                          ? 'bg-[#10B981]/10 text-[#10B981]'
                          : 'bg-[#EF4444]/10 text-[#EF4444]'
                      }`}>
                        {auditResult.telemetry?.maxDepth <= 18 ? 'Clean Nesting' : 'Deep Wrapper Nesting'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Document Payload</span>
                    <span className="font-bold text-[#0F0F0F] text-base font-mono">{auditResult.telemetry?.docKb} KB HTML</span>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        auditResult.telemetry?.docKb <= 50
                          ? 'bg-[#10B981]/10 text-[#10B981]'
                          : 'bg-[#EF4444]/10 text-[#EF4444]'
                      }`}>
                        {auditResult.telemetry?.docKb <= 50 ? 'Within Mobile Budget' : 'Exceeds 50KB Budget'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Detected Stack</span>
                    <span className="font-bold text-[#0F0F0F] text-base truncate block">{auditResult.telemetry?.detectedCms}</span>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563]">
                        CMS / Builder Engine
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block text-[11px] font-medium mb-1">Structured Data</span>
                    <span className="font-bold text-[#0F0F0F] text-base block truncate">
                      {auditResult.telemetry?.hasSchema ? auditResult.telemetry?.schemaType : 'Missing'}
                    </span>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        auditResult.telemetry?.hasSchema
                          ? 'bg-[#10B981]/10 text-[#10B981]'
                          : 'bg-[#F59E0B]/10 text-[#B45309]'
                      }`}>
                        {auditResult.telemetry?.hasSchema ? 'Schema Validated' : 'No JSON-LD Detected'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Identified Flaw */}
                {auditResult.primaryFlaw && (
                  <div className="p-4 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B45309] mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-[#F59E0B]" />
                      <span>Primary Performance Bottleneck:</span>
                    </div>
                    <div className="text-sm font-semibold text-[#0F0F0F]">
                      {auditResult.primaryFlaw}
                    </div>
                  </div>
                )}

                {/* Specific Improvement Steps */}
                {auditResult.improvements && auditResult.improvements.length > 0 && (
                  <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
                      Recommended Engineering Fixes:
                    </div>
                    <ul className="space-y-2">
                      {auditResult.improvements.map((fix: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                          <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Bottom Action Card */}
            <div className="p-6 rounded-lg bg-[#111827] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <strong className="block text-sm font-bold text-white mb-1">
                  Want to highlight offending elements live in your browser?
                </strong>
                <p className="text-xs text-[#9CA3AF]">
                  VitalsSniper PRO highlights LCP candidates and DOM depth on active tabs with zero latency.
                </p>
              </div>
              <Link
                href={`/vitalssniper?url=${encodeURIComponent(auditResult.targetUrl || inputUrl)}#auditor`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors whitespace-nowrap flex-shrink-0"
              >
                <span>Explore VitalsSniper</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
