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
  ExternalLink,
  Layers,
  FileCode,
  Gauge,
  Smartphone,
  Sparkles,
  Lock,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

const MAX_DEMO_TRIES = 4;

export default function LiveAuditor() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'email' | 'dm' | 'loom'>('email');
  const [copied, setCopied] = useState(false);
  const [triesLeft, setTriesLeft] = useState<number>(MAX_DEMO_TRIES);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vs_demo_tries_left');
      if (stored !== null) {
        setTriesLeft(parseInt(stored, 10));
      } else {
        localStorage.setItem('vs_demo_tries_left', MAX_DEMO_TRIES.toString());
      }
    } catch (e) {}
  }, []);

  async function handleAudit(targetUrl?: string) {
    const finalUrl = targetUrl || url;
    if (!finalUrl.trim()) return;

    if (triesLeft <= 0) {
      setError('You have used all 4 free demo audits. Please activate your AppSumo license or purchase access to run unlimited audits.');
      return;
    }

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

      const nextTries = Math.max(0, triesLeft - 1);
      setTriesLeft(nextTries);
      try {
        localStorage.setItem('vs_demo_tries_left', nextTries.toString());
      } catch (e) {}
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold mb-4 transition-colors ${
            triesLeft > 0
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
          }`}>
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              Live Demo &bull; {triesLeft > 0 ? `${triesLeft} of ${MAX_DEMO_TRIES} Free Scans Remaining` : '0 Free Scans Left (Demo Limit Reached)'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Test Any Website in Real-Time
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Type any prospect’s website URL to test live DOM bloat, Page Builder, and cellular payload telemetry.
          </p>
        </div>

        {/* Locked Banner when 0 tries left */}
        {triesLeft <= 0 && (
          <div className="mx-auto max-w-2xl mb-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 text-center shadow-lg animate-in fade-in">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 mb-3">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Free Demo Limit Reached (4/4 Audits Used)</h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto mb-5 leading-relaxed">
              You've used all 4 free web demo audits. To run unlimited audits in 50ms directly from your Chrome toolbar with 0 server queues, activate your AppSumo voucher above or buy a lifetime license.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#activate"
                className="w-full sm:w-auto rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-emerald-400"
              >
                Activate AppSumo Key & Download (.zip)
              </a>
              <a
                href={SITE_CONFIG.appsumoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-gray-100 flex items-center justify-center gap-1.5"
              >
                <span>Buy on AppSumo ($39)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="mx-auto max-w-2xl mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAudit();
            }}
            className={`flex flex-col sm:flex-row gap-2.5 rounded-2xl border bg-[#12141d] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-emerald-500/50 ${
              triesLeft <= 0 ? 'opacity-60 border-white/5' : 'border-white/10'
            }`}
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                disabled={triesLeft <= 0}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={triesLeft > 0 ? "e.g. interiorstudio.com or lawfirm.com" : "Demo limit reached — activate license above"}
                className="w-full bg-transparent text-sm sm:text-base text-white outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={loading || triesLeft <= 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  <span>Scanning...</span>
                </>
              ) : triesLeft <= 0 ? (
                <span>Demo Locked</span>
              ) : (
                <span>Scan Website</span>
              )}
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500 flex-wrap">
            <span>Try sample:</span>
            {['stripe.com', 'apple.com', 'squarespace.com'].map((sample) => (
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

            {/* Telemetry Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 my-6">
              
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

            {/* Generated Outreach Copy Box */}
            <div className="rounded-xl border border-white/10 bg-[#0b0d14] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                
                {/* Channel Switcher */}
                <div className="flex items-center gap-1.5 rounded-lg bg-surface p-1 border border-white/10">
                  <button
                    onClick={() => setActiveTab('email')}
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                      activeTab === 'email' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Cold Email</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('dm')}
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                      activeTab === 'dm' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn DM</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('loom')}
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                      activeTab === 'loom' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Video className="h-3.5 w-3.5" />
                    <span>30s Loom Script</span>
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(result.outreach[activeTab])}
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
                      <span>Copy Pitch Script</span>
                    </>
                  )}
                </button>
              </div>

              {/* Pitch Script Preview */}
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-gray-300 leading-relaxed max-h-64 overflow-y-auto pr-2">
                {result.outreach[activeTab]}
              </pre>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
