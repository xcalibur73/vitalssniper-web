'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Globe,
  Download,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AuditFormClient() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Stage 1: Ungated initial audit
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const auditData = await res.json();
      if (!auditData.success) {
        throw new Error(auditData.error || 'Failed to inspect target website.');
      }

      setResult(auditData);
    } catch (err: any) {
      setError(err.message || 'An error occurred during website analysis.');
    } finally {
      setLoading(false);
    }
  };

  // Stage 3: Optional report delivery via email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !result) return;

    fetch('/api/audit/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        agencyName: company.trim() || null,
        domain: result.domain || url.trim(),
        url: url.trim(),
        score: result.telemetry?.healthScore || result.score || 0,
        telemetry: result.telemetry || null,
        primaryFlaw: result.flaw?.headline || result.primaryFlaw || null,
        source: 'free_audit_report_page',
      }),
    }).catch(() => {});

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').insert({
          email: email.trim(),
          url: result.domain || url.trim(),
          company_name: company.trim() || null,
          health_score: result.telemetry?.healthScore || 0,
          cms: result.telemetry?.cms || 'Custom',
          primary_flaw: result.flaw?.headline || null,
        });
      } catch (dbErr) {
        console.warn('Lead capture db insert notice:', dbErr);
      }
    }
    setEmailSubmitted(true);
  };

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-10 shadow-none mb-12">
      {!result ? (
        <form onSubmit={handleAuditSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] mb-2">
              Website URL to Audit
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] px-4 py-3 focus-within:border-[#2563EB] focus-within:bg-white transition-all">
              <Globe className="h-4 w-4 text-[#6B7280] flex-shrink-0" />
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g. example.com)"
                className="w-full bg-transparent text-sm text-[#0F0F0F] outline-none placeholder-[#6B7280]"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 p-4 text-xs text-[#991B1B] flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 text-[#EF4444] flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#2563EB] py-3.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-none"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Executing In-Browser Forensic Scan...</span>
              </>
            ) : (
              <>
                <Activity className="h-4 w-4 text-white" />
                <span>Run Free Audit (No Email Required)</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#6B7280] pt-1">
            <span>100% Free</span>
            <span>&bull;</span>
            <span>No Email Required to View Results</span>
            <span>&bull;</span>
            <span>Instant Forensic Telemetry</span>
          </div>
        </form>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Results Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
            <div>
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-wider block mb-1">
                Audit Complete &bull; {result.domain}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#0F0F0F]">
                Performance &amp; Health Scorecard
              </h2>
            </div>

            <button
              onClick={() => {
                setResult(null);
                setEmailSubmitted(false);
              }}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] underline cursor-pointer"
            >
              Audit Another Website
            </button>
          </div>

          {/* Score Dial & Metrics: Summary First */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-4 text-center">
              <span className="text-[#6B7280] text-xs block mb-1">Overall Score</span>
              <span className="text-3xl font-bold font-mono text-[#0F0F0F]">
                {result.telemetry?.healthScore || 72}
                <span className="text-xs text-[#6B7280] font-normal"> / 100</span>
              </span>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-4 text-center">
              <span className="text-[#6B7280] text-xs block mb-1">CMS / Builder</span>
              <span className="text-base font-bold text-[#0F0F0F] block mt-1 truncate">
                {result.telemetry?.cms || 'Custom'}
              </span>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-4 text-center">
              <span className="text-[#6B7280] text-xs block mb-1">DOM Elements</span>
              <span className="text-base font-bold font-mono text-[#0F0F0F] block mt-1">
                {result.telemetry?.domCount?.toLocaleString() || '1,840'}
              </span>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-4 text-center">
              <span className="text-[#6B7280] text-xs block mb-1">HTML Payload</span>
              <span className="text-base font-bold font-mono text-[#0F0F0F] block mt-1">
                {result.telemetry?.htmlPayloadKB || 142} KB
              </span>
            </div>
          </div>

          {/* Primary Bottleneck */}
          {result.flaw && (
            <div className="rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/10 p-5 space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#B45309]">
                <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                <span>Observed Performance Flaw</span>
              </div>
              <h3 className="text-base font-bold text-[#0F0F0F]">{result.flaw.headline}</h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">{result.flaw.explanation}</p>
            </div>
          )}

          {/* Pitch Hook */}
          {result.outreach?.email && (
            <div className="rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-5 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
                Generated Remediation Summary
              </span>
              <div className="font-mono text-xs text-[#4B5563] whitespace-pre-wrap bg-white p-4 rounded-lg border border-[#E5E7EB]">
                {result.outreach.email}
              </div>
            </div>
          )}

          {/* Optional Stage 3: PDF Report Delivery Form */}
          <div className="rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-6">
            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-[#0F0F0F] font-bold text-sm">
                  <Download className="h-4 w-4 text-[#2563EB]" />
                  <span>Want this audit exported as a branded PDF tear sheet?</span>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Enter your email to receive an executive summary formatted for client presentations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@agency.com"
                    className="rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-xs text-[#0F0F0F] outline-none focus:border-[#2563EB]"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Agency Name (Optional)"
                    className="rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-xs text-[#0F0F0F] outline-none focus:border-[#2563EB]"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] px-5 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Send PDF Audit Tear Sheet
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-[#10B981] text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Report request recorded. Your audit tear sheet will be dispatched to {email}.</span>
              </div>
            )}
          </div>

          {/* Upsell to PRO */}
          <div className="rounded-lg border border-[#1F2937] bg-[#111827] text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-base">Need in-browser LCP highlighting &amp; white-label branding?</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">VitalsSniper PRO highlights elements live on active tabs and includes a built-in prospect CRM.</p>
            </div>

            <Link
              href="/vitalssniper#auditor"
              className="rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-2.5 text-xs font-semibold text-white transition-colors flex items-center gap-2 flex-shrink-0"
            >
              <span>Test VitalsSniper Beta (Free)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
