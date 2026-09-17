'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Mail,
  Building,
  ExternalLink,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SITE_CONFIG } from '@/config/site';

export default function FreeAuditReportPage() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !email.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Run live forensic audit via our API
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

      // 2. Save lead into Supabase leads table if configured
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('leads').insert({
            email: email.trim(),
            url: auditData.domain || url.trim(),
            company_name: company.trim() || null,
            health_score: auditData.telemetry?.healthScore || 0,
            cms: auditData.telemetry?.cms || 'Custom',
            primary_flaw: auditData.flaw?.headline || null,
          });
        } catch (dbErr) {
          console.warn('Lead capture db insert notice:', dbErr);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during website analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08090e] bg-tech-grid text-[#f9fafb] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instant Forensic Performance Teardown</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Free Website Audit Report
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            See exactly what is killing your prospects&apos; mobile speed, Core Web Vitals, and conversion rates in 50 milliseconds.
          </p>
        </div>

        {/* Audit Form Container */}
        <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Target Website URL to Audit
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#090a10] px-3.5 py-3 focus-within:border-emerald-500 transition-colors">
                  <Globe className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="e.g. apple.com or yourprospect.com"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Your Work Email (Report Delivery)
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#090a10] px-3.5 py-3 focus-within:border-emerald-500 transition-colors">
                    <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@agency.com"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Agency or Company Name (Optional)
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#090a10] px-3.5 py-3 focus-within:border-emerald-500 transition-colors">
                    <Building className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Apex Digital Architecture"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white py-4 text-sm font-extrabold text-black hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.2)] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    <span>Executing 50ms Forensic Scan...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 text-emerald-600" />
                    <span>Generate Free Website Audit Report</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 pt-2">
                <span>100% Free</span>
                <span>&bull;</span>
                <span>No Credit Card Required</span>
                <span>&bull;</span>
                <span>Instant Forensic Telemetry</span>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Results Top Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Audit Complete &bull; {result.domain}
                  </span>
                  <h2 className="text-2xl font-black text-white">Forensic Performance Scorecard</h2>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-gray-400 hover:text-white underline"
                >
                  Audit Another Website
                </button>
              </div>

              {/* Score Dial & Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/5 bg-[#090a10] p-4 text-center">
                  <span className="text-gray-500 text-xs block mb-1">Health Score</span>
                  <span className="text-3xl font-black text-emerald-400">
                    {result.telemetry?.healthScore || 72}
                    <span className="text-xs text-gray-400 font-normal"> / 100</span>
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-[#090a10] p-4 text-center">
                  <span className="text-gray-500 text-xs block mb-1">CMS / Builder</span>
                  <span className="text-base font-bold text-white block mt-1">
                    {result.telemetry?.cms || 'Custom'}
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-[#090a10] p-4 text-center">
                  <span className="text-gray-500 text-xs block mb-1">DOM Elements</span>
                  <span className="text-base font-bold text-amber-400 block mt-1">
                    {result.telemetry?.domCount?.toLocaleString() || '1,840'}
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-[#090a10] p-4 text-center">
                  <span className="text-gray-500 text-xs block mb-1">HTML Payload</span>
                  <span className="text-base font-bold text-rose-400 block mt-1">
                    {result.telemetry?.htmlPayloadKB || 142} KB
                  </span>
                </div>
              </div>

              {/* Primary Bottleneck */}
              {result.flaw && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Sabotaging Performance Flaw
                  </span>
                  <h3 className="text-base font-bold text-white">{result.flaw.headline}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{result.flaw.explanation}</p>
                </div>
              )}

              {/* Pitch Hook */}
              {result.outreach?.email && (
                <div className="rounded-xl border border-white/10 bg-[#090a10] p-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Generated Agency Pitch Hook
                  </span>
                  <div className="font-mono text-xs text-gray-300 whitespace-pre-wrap bg-black/40 p-4 rounded-lg border border-white/5">
                    {result.outreach.email}
                  </div>
                </div>
              )}

              {/* Upsell to PRO */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Want to audit unlimited sites in 50ms?</h4>
                  <p className="text-xs text-gray-400">Get the full Chrome extension with white-label PDF reports and competitor comparison.</p>
                </div>

                <a
                  href={SITE_CONFIG.appsumoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-black hover:bg-gray-100 transition-all flex items-center gap-2 flex-shrink-0 shadow-md"
                >
                  <span>Get WebAudits PRO: $39</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          )}

        </div>

      </div>

      <Footer />
    </main>
  );
}
