'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Mail,
  Linkedin,
  Video,
  Layers,
  FileCode,
  Gauge,
  Smartphone,
  Sparkles,
  Lock,
  Code,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function LiveAuditor() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'email' | 'dm' | 'loom' | 'raw'>('email');
  const [copied, setCopied] = useState(false);

  // Beta Cohort Lead Capture State
  const [isBetaUnlocked, setIsBetaUnlocked] = useState(false);
  const [betaEmail, setBetaEmail] = useState('');
  const [betaAgency, setBetaAgency] = useState('');
  const [betaLoading, setBetaLoading] = useState(false);
  const [betaError, setBetaError] = useState<string | null>(null);
  const [betaSuccess, setBetaSuccess] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('vs_beta_unlocked') === 'true' || localStorage.getItem('vs_pro_activated') === 'true') {
        setIsBetaUnlocked(true);
      }
    } catch (e) {}

    const handleActivated = () => setIsBetaUnlocked(true);
    window.addEventListener('vs_license_activated', handleActivated);
    return () => window.removeEventListener('vs_license_activated', handleActivated);
  }, []);

  async function handleAudit(targetUrl?: string) {
    const finalUrl = targetUrl || url;
    if (!finalUrl.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze site.');
      }
      setResult(data);

      // Silently record anonymous empirical audit telemetry
      fetch('/api/audit/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: data.domain,
          url: data.targetUrl || finalUrl,
          score: data.score,
          telemetry: data.telemetry,
          primaryFlaw: data.primaryFlaw,
          source: 'public_beta_auditor_scan',
        }),
      }).catch(() => {});

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleBetaUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!betaEmail.trim()) return;

    setBetaLoading(true);
    setBetaError(null);

    try {
      const res = await fetch('/api/audit/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: betaEmail.trim(),
          agencyName: betaAgency.trim() || null,
          domain: result?.domain || 'unknown',
          url: result?.targetUrl || url,
          score: result?.score || null,
          telemetry: result?.telemetry || null,
          primaryFlaw: result?.primaryFlaw || null,
          source: 'beta_cohort_lead_form',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register for beta.');
      }

      setIsBetaUnlocked(true);
      setBetaSuccess(true);
      try {
        localStorage.setItem('vs_beta_unlocked', 'true');
      } catch (err) {}
    } catch (err: any) {
      setBetaError(err.message);
    } finally {
      setBetaLoading(false);
    }
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="auditor" className="py-20 border-b border-[#E5E7EB] bg-[#F8F8F8]">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Public Beta: Free Website Telemetry &amp; Pitches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] mb-3">
            Test Any Website in Real-Time
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base">
            Enter any prospect website URL to test live DOM bloat, Page Builder, and cellular payload telemetry.
          </p>
        </div>

        {/* Input Bar */}
        <div className="mx-auto max-w-2xl mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAudit();
            }}
            className="flex flex-col sm:flex-row gap-2.5 rounded-2xl border border-[#E5E7EB] bg-white p-2.5 shadow-xs focus-within:border-[#2563EB]"
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 text-[#6B7280]" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. interiorstudio.com or lawfirm.com"
                className="w-full bg-transparent text-sm sm:text-base text-[#0F0F0F] outline-none placeholder:text-[#6B7280]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Scanning...</span>
                </>
              ) : (
                <span>Scan Website</span>
              )}
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#6B7280] flex-wrap">
            <span>Try sample:</span>
            {['stripe.com', 'apple.com', 'squarespace.com', 'shopify.com'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setUrl(sample);
                  handleAudit(sample);
                }}
                className="rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1 text-[#4B5563] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-xs"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-auto max-w-2xl mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Audit Results Dashboard */}
        {result && (
          <div className="mt-10 rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs animate-in fade-in duration-300">
            
            {/* Header / Score Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6B7280] font-mono mb-1">
                  <span>AUDITED DOMAIN:</span>
                  <span className="text-[#0F0F0F] font-bold">{result.domain}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F] flex items-center gap-2">
                  <span>{result.primaryFlaw}</span>
                </h3>
              </div>

              {/* Health Score Dial */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl border font-mono font-bold ${
                    result.score >= 85
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : result.score >= 60
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-rose-200 bg-rose-50 text-rose-700'
                  }`}
                >
                  <span className="text-2xl">{result.score}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">Score / 100</span>
                </div>
              </div>
            </div>

            {/* Results Body: Telemetry + Improvements + Outreach */}
            <div className="mt-6 rounded-2xl">
              
              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
                
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-3.5">
                  <div className="text-[11px] font-medium text-[#6B7280] mb-1 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>CMS / Builder</span>
                  </div>
                  <div className="text-sm font-bold text-[#0F0F0F] truncate" title={result.telemetry.detectedCms}>
                    {result.telemetry.detectedCms}
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-3.5">
                  <div className="text-[11px] font-medium text-[#6B7280] mb-1 flex items-center gap-1.5">
                    <FileCode className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>DOM Elements</span>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      result.telemetry.totalElements > 1400 ? 'text-amber-700' : 'text-[#0F0F0F]'
                    }`}
                  >
                    {result.telemetry.totalElements.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-3.5">
                  <div className="text-[11px] font-medium text-[#6B7280] mb-1 flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>Document Size</span>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      result.telemetry.docKb > 50 ? 'text-rose-700' : 'text-emerald-700'
                    }`}
                  >
                    {result.telemetry.docKb} KB
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-3.5">
                  <div className="text-[11px] font-medium text-[#6B7280] mb-1 flex items-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>Mobile Zoom</span>
                  </div>
                  <div className="text-sm font-bold">
                    {result.telemetry.isZoomLocked ? (
                      <span className="text-rose-700">Locked ✕</span>
                    ) : (
                      <span className="text-emerald-700">Scalable ✓</span>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-3.5">
                  <div className="text-[11px] font-medium text-[#6B7280] mb-1 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>AI Schema</span>
                  </div>
                  <div className="text-sm font-bold truncate">
                    {result.telemetry.hasSchema ? (
                      <span className="text-emerald-700">{result.telemetry.schemaType}</span>
                    ) : (
                      <span className="text-rose-700">Missing ✕</span>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-3.5">
                  <div className="text-[11px] font-medium text-[#6B7280] mb-1 flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>Server TTFB</span>
                  </div>
                  <div className="text-sm font-bold text-[#0F0F0F]">
                    {result.ttfb} ms
                  </div>
                </div>

              </div>

              {/* Recommended Technical Improvements */}
              {result.improvements && result.improvements.length > 0 && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F0F0F]">Recommended Technical Improvements</h4>
                      <span className="text-[11px] text-emerald-700 font-medium">100% Visual Design Invariance Guarantee : Zero Aesthetic Disruption</span>
                    </div>
                  </div>
                  <div className="grid gap-2.5">
                    {result.improvements.map((imp: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pitch Generation & Telemetry Section */}
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  
                  {/* Channel Switcher */}
                  <div className="flex items-center gap-1.5 rounded-lg bg-white p-1 border border-[#E5E7EB] flex-wrap">
                    <button
                      onClick={() => setActiveTab('email')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'email' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#0F0F0F]'
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Cold Email</span>
                      <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${activeTab === 'email' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>FREE</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('dm')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'dm' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#0F0F0F]'
                      }`}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      <span>LinkedIn DM</span>
                      {!isBetaUnlocked && <Lock className="h-3 w-3 text-amber-500" />}
                    </button>

                    <button
                      onClick={() => setActiveTab('loom')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'loom' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#0F0F0F]'
                      }`}
                    >
                      <Video className="h-3.5 w-3.5" />
                      <span>30s Loom Script</span>
                      {!isBetaUnlocked && <Lock className="h-3 w-3 text-amber-500" />}
                    </button>

                    <button
                      onClick={() => setActiveTab('raw')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'raw' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#0F0F0F]'
                      }`}
                    >
                      <Code className="h-3.5 w-3.5" />
                      <span>Raw Forensics</span>
                      {!isBetaUnlocked && <Lock className="h-3 w-3 text-amber-500" />}
                    </button>
                  </div>

                  {/* Copy Button (only enabled for unlocked views) */}
                  {(activeTab === 'email' || isBetaUnlocked) && (
                    <button
                      onClick={() => {
                        if (activeTab === 'raw') {
                          handleCopy(JSON.stringify(result.telemetry, null, 2));
                        } else {
                          handleCopy(result.outreach[activeTab]);
                        }
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors shadow-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy to Clipboard</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Main Content Display */}
                {activeTab === 'email' || isBetaUnlocked ? (
                  <div className="relative">
                    {activeTab === 'raw' ? (
                      <pre className="whitespace-pre font-mono text-xs text-emerald-400 bg-[#111827] p-4 rounded-lg overflow-x-auto max-h-64 border border-white/10">
                        {JSON.stringify(
                          {
                            domain: result.domain,
                            score: result.score,
                            primaryFlaw: result.primaryFlaw,
                            serverLatencyMs: result.ttfb,
                            forensicTelemetry: result.telemetry,
                          },
                          null,
                          2
                        )}
                      </pre>
                    ) : (
                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#0F0F0F] leading-relaxed max-h-64 overflow-y-auto pr-2 bg-white p-4 rounded-lg border border-[#E5E7EB]">
                        {result.outreach[activeTab]}
                      </pre>
                    )}

                    {isBetaUnlocked && (
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Public Beta Cohort Member: All Multi-Channel Scripts &amp; Raw Forensics Unlocked</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Inline Free Beta Cohort Signup Gate */
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB] border border-blue-200">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0F0F0F] mb-1.5">
                      Join the Public Beta to Unlock LinkedIn DMs, Loom Scripts &amp; Raw JSON
                    </h4>
                    <p className="text-xs text-[#4B5563] max-w-md mx-auto mb-5 leading-relaxed">
                      Enter your email to join our research cohort. You will immediately unlock all pitch channels and raw forensics for <strong className="text-[#0F0F0F]">{result.domain}</strong> with zero cost or credit card required.
                    </p>

                    <form onSubmit={handleBetaUnlock} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={betaEmail}
                        onChange={(e) => setBetaEmail(e.target.value)}
                        placeholder="your@agency.com"
                        className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-xs text-[#0F0F0F] placeholder:text-[#6B7280] outline-none focus:border-[#2563EB]"
                      />
                      <input
                        type="text"
                        value={betaAgency}
                        onChange={(e) => setBetaAgency(e.target.value)}
                        placeholder="Agency Name (optional)"
                        className="sm:w-36 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-xs text-[#0F0F0F] placeholder:text-[#6B7280] outline-none focus:border-[#2563EB]"
                      />
                      <button
                        type="submit"
                        disabled={betaLoading}
                        className="rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1D4ED8] disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        {betaLoading ? 'Unlocking...' : 'Unlock Free'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </form>

                    {betaError && (
                      <p className="text-xs text-rose-600 mt-2">{betaError}</p>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        100% Free Public Beta
                      </span>
                      <span>&bull;</span>
                      <span>Zero Spam</span>
                      <span>&bull;</span>
                      <span>Instant Access</span>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
