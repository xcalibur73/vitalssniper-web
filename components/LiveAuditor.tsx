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
    <section id="auditor" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Public Beta: Free Website Telemetry &amp; Pitches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Test Any Website in Real-Time
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
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
            className="flex flex-col sm:flex-row gap-2.5 rounded-2xl border border-white/10 bg-[#12141d] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-emerald-500/50"
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. interiorstudio.com or lawfirm.com"
                className="w-full bg-transparent text-sm sm:text-base text-white outline-none placeholder:text-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  <span>Scanning...</span>
                </>
              ) : (
                <span>Scan Website</span>
              )}
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500 flex-wrap">
            <span>Try sample:</span>
            {['stripe.com', 'apple.com', 'squarespace.com', 'shopify.com'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setUrl(sample);
                  handleAudit(sample);
                }}
                className="rounded-md border border-white/10 bg-[#171a25] px-2.5 py-1 text-gray-400 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-auto max-w-2xl mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Audit Results Dashboard */}
        {result && (
          <div className="mt-10 rounded-2xl border border-white/15 bg-[#141724] p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.6)] animate-in fade-in duration-300">
            
            {/* Header / Score Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-1">
                  <span>AUDITED DOMAIN:</span>
                  <span className="text-white font-bold">{result.domain}</span>
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{result.primaryFlaw}</span>
                </h3>
              </div>

              {/* Health Score Dial */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl border font-mono font-bold ${
                    result.score >= 85
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : result.score >= 60
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                  }`}
                >
                  <span className="text-2xl">{result.score}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">Score / 100</span>
                </div>
              </div>
            </div>

            {/* Results Body: Telemetry + Improvements + Outreach */}
            <div className="mt-6 rounded-2xl">
              
              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
                
                <div className="rounded-xl border border-white/10 bg-[#0e1017] p-3.5">
                  <div className="text-[11px] font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-emerald-400" />
                    <span>CMS / Builder</span>
                  </div>
                  <div className="text-sm font-bold text-white truncate" title={result.telemetry.detectedCms}>
                    {result.telemetry.detectedCms}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0e1017] p-3.5">
                  <div className="text-[11px] font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <FileCode className="h-3.5 w-3.5 text-blue-400" />
                    <span>DOM Elements</span>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      result.telemetry.totalElements > 1400 ? 'text-amber-400' : 'text-white'
                    }`}
                  >
                    {result.telemetry.totalElements.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0e1017] p-3.5">
                  <div className="text-[11px] font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-purple-400" />
                    <span>Document Size</span>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      result.telemetry.docKb > 50 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {result.telemetry.docKb} KB
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0e1017] p-3.5">
                  <div className="text-[11px] font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5 text-yellow-400" />
                    <span>Mobile Zoom</span>
                  </div>
                  <div className="text-sm font-bold">
                    {result.telemetry.isZoomLocked ? (
                      <span className="text-rose-400">Locked ✕</span>
                    ) : (
                      <span className="text-emerald-400">Scalable ✓</span>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0e1017] p-3.5">
                  <div className="text-[11px] font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    <span>AI Schema</span>
                  </div>
                  <div className="text-sm font-bold truncate">
                    {result.telemetry.hasSchema ? (
                      <span className="text-emerald-400">{result.telemetry.schemaType}</span>
                    ) : (
                      <span className="text-rose-400">Missing ✕</span>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0e1017] p-3.5">
                  <div className="text-[11px] font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-teal-400" />
                    <span>Server TTFB</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {result.ttfb} ms
                  </div>
                </div>

              </div>

              {/* Recommended Technical Improvements (Actionable & 0 Design Changes) */}
              {result.improvements && result.improvements.length > 0 && (
                <div className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Recommended Technical Improvements</h4>
                      <span className="text-[11px] text-emerald-400 font-medium">100% Visual Design Invariance Guarantee &bull; Zero Aesthetic Disruption</span>
                    </div>
                  </div>
                  <div className="grid gap-2.5">
                    {result.improvements.map((imp: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[11px] font-bold text-emerald-400 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pitch Generation & Telemetry Section */}
              <div className="rounded-xl border border-white/10 bg-[#0b0d14] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  
                  {/* Channel Switcher */}
                  <div className="flex items-center gap-1.5 rounded-lg bg-[#12141d] p-1 border border-white/10 flex-wrap">
                    <button
                      onClick={() => setActiveTab('email')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'email' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Cold Email</span>
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] text-emerald-400 font-bold">FREE</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('dm')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'dm' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      <span>LinkedIn DM</span>
                      {!isBetaUnlocked && <Lock className="h-3 w-3 text-amber-400" />}
                    </button>

                    <button
                      onClick={() => setActiveTab('loom')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'loom' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Video className="h-3.5 w-3.5" />
                      <span>30s Loom Script</span>
                      {!isBetaUnlocked && <Lock className="h-3 w-3 text-amber-400" />}
                    </button>

                    <button
                      onClick={() => setActiveTab('raw')}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                        activeTab === 'raw' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Code className="h-3.5 w-3.5" />
                      <span>Raw Forensics</span>
                      {!isBetaUnlocked && <Lock className="h-3 w-3 text-amber-400" />}
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
                      className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
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
                      <pre className="whitespace-pre font-mono text-xs text-emerald-400 bg-black/50 p-4 rounded-lg overflow-x-auto max-h-64 border border-white/5">
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
                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-gray-300 leading-relaxed max-h-64 overflow-y-auto pr-2">
                        {result.outreach[activeTab]}
                      </pre>
                    )}

                    {isBetaUnlocked && (
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Public Beta Cohort Member: All Multi-Channel Scripts &amp; Raw Forensics Unlocked</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Inline Free Beta Cohort Signup Gate */
                  <div className="rounded-xl border border-emerald-500/30 bg-[#121522] p-6 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
                      Join the Public Beta to Unlock LinkedIn DMs, Loom Scripts &amp; Raw JSON
                    </h4>
                    <p className="text-xs text-gray-400 max-w-md mx-auto mb-5 leading-relaxed">
                      Enter your email to join our research cohort. You will immediately unlock all pitch channels and raw forensics for <strong className="text-white">{result.domain}</strong> with zero cost or credit card required.
                    </p>

                    <form onSubmit={handleBetaUnlock} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={betaEmail}
                        onChange={(e) => setBetaEmail(e.target.value)}
                        placeholder="your@agency.com"
                        className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        value={betaAgency}
                        onChange={(e) => setBetaAgency(e.target.value)}
                        placeholder="Agency Name (optional)"
                        className="sm:w-36 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={betaLoading}
                        className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-emerald-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                      >
                        {betaLoading ? 'Unlocking...' : 'Unlock Free'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </form>

                    {betaError && (
                      <p className="text-xs text-rose-400 mt-2">{betaError}</p>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
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
