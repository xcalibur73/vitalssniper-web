'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WebTool } from '@/data/tools';
import {
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Wrench,
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
      const res = await fetch('/api/audit', {
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
      <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-accent" />
          <h2 className="font-editorial text-xl font-bold text-charcoal">
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
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-sand-300 bg-[#F7F4EE] focus-within:border-accent focus-within:bg-white transition-all">
            <Globe className="h-5 w-5 text-muted flex-shrink-0" />
            <input
              type="text"
              required
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter target URL (e.g. yoursite.com)"
              className="w-full bg-transparent text-sm text-charcoal placeholder-muted focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={running}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-accent-dark transition-all disabled:opacity-75 flex-shrink-0"
          >
            {running ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                <span>Scanning DOM...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Run Audit</span>
              </>
            )}
          </button>
        </form>

        {tool.referenceBenchmark && (
          <div className="mt-3 text-[11px] text-charcoal-muted">
            {tool.referenceBenchmark}
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="mt-8 rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs text-rose-800 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-1">Audit Failed</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Stage 2: Interactive Result Display */}
        {analyzed && auditResult && (
          <div className="mt-8 rounded-xl border border-sand-300 bg-[#F7F4EE] p-6 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-300">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                  Live Telemetry for:
                </span>
                <div className="font-mono text-sm font-bold text-charcoal break-all">
                  {auditResult.domain}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-charcoal-muted block">Performance Score</span>
                  <span className={`font-editorial text-3xl font-bold ${
                    auditResult.score >= 80 ? 'text-emerald-700' : auditResult.score >= 60 ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {auditResult.score}/100
                  </span>
                </div>
              </div>
            </div>

            {/* 6 Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-2xs">
                <span className="text-charcoal-muted block text-[10px] uppercase font-bold mb-1">Server TTFB</span>
                <span className="font-bold text-charcoal text-sm">{auditResult.ttfb} ms</span>
                <span className={`block text-[10px] mt-1 ${auditResult.ttfb < 300 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {auditResult.ttfb < 300 ? 'Fast Edge Delivery' : 'High Server Latency'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-2xs">
                <span className="text-charcoal-muted block text-[10px] uppercase font-bold mb-1">DOM Element Count</span>
                <span className="font-bold text-charcoal text-sm">{auditResult.telemetry.totalElements.toLocaleString()} nodes</span>
                <span className={`block text-[10px] mt-1 ${auditResult.telemetry.totalElements <= 1200 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {auditResult.telemetry.totalElements <= 1200 ? 'Optimal DOM Size' : 'Excessive Layout Nodes'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-2xs">
                <span className="text-charcoal-muted block text-[10px] uppercase font-bold mb-1">Max Tree Depth</span>
                <span className="font-bold text-charcoal text-sm">{auditResult.telemetry.maxDepth} levels</span>
                <span className={`block text-[10px] mt-1 ${auditResult.telemetry.maxDepth <= 18 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {auditResult.telemetry.maxDepth <= 18 ? 'Clean Nesting' : 'Deep Wrapper Nesting'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-2xs">
                <span className="text-charcoal-muted block text-[10px] uppercase font-bold mb-1">Document Payload</span>
                <span className="font-bold text-charcoal text-sm">{auditResult.telemetry.docKb} KB HTML</span>
                <span className={`block text-[10px] mt-1 ${auditResult.telemetry.docKb <= 50 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {auditResult.telemetry.docKb <= 50 ? 'Within Mobile Budget' : 'Exceeds 50KB Budget'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-2xs">
                <span className="text-charcoal-muted block text-[10px] uppercase font-bold mb-1">Detected Stack</span>
                <span className="font-bold text-charcoal text-sm truncate block">{auditResult.telemetry.detectedCms}</span>
                <span className="block text-[10px] text-charcoal-muted mt-1">CMS / Builder Engine</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-2xs">
                <span className="text-charcoal-muted block text-[10px] uppercase font-bold mb-1">Structured Data</span>
                <span className="font-bold text-charcoal text-sm block truncate">
                  {auditResult.telemetry.hasSchema ? auditResult.telemetry.schemaType : 'Missing'}
                </span>
                <span className={`block text-[10px] mt-1 ${auditResult.telemetry.hasSchema ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {auditResult.telemetry.hasSchema ? 'Knowledge Graph Active' : 'No JSON-LD Detected'}
                </span>
              </div>
            </div>

            {/* Primary Identified Flaw */}
            {auditResult.primaryFlaw && (
              <div className="p-4 rounded-xl bg-white border border-sand-300 shadow-2xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">
                  Primary Architectural Bottleneck:
                </div>
                <div className="text-xs font-semibold text-charcoal">
                  {auditResult.primaryFlaw}
                </div>
              </div>
            )}

            {/* Specific Improvement Steps */}
            {auditResult.improvements && auditResult.improvements.length > 0 && (
              <div className="p-4 rounded-xl bg-white border border-sand-300 shadow-2xs space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal mb-2">
                  Recommended Engineering Fixes:
                </div>
                <ul className="space-y-1.5">
                  {auditResult.improvements.map((fix: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-charcoal-light">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bridge to VitalsSniper Beta */}
            <div className="p-5 rounded-xl bg-charcoal text-sand-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <strong className="block text-xs font-bold text-white mb-0.5">
                  Want to highlight these offending DOM elements live on screen?
                </strong>
                <p className="text-[11px] text-sand-300">
                  VitalsSniper PRO runs in your Chromium tab with zero server latency and exports white label client tear sheets.
                </p>
              </div>
              <Link
                href={`/vitalssniper?url=${encodeURIComponent(auditResult.targetUrl || inputUrl)}#auditor`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent hover:bg-accent-dark text-white text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
              >
                <span>Open Free Public Beta</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
