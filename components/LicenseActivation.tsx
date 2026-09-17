'use client';

import React, { useState } from 'react';
import { Key, CheckCircle2, AlertCircle, Download, ExternalLink, HelpCircle, ShieldCheck, Copy, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function LicenseActivation() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setVerifiedData(null);

    try {
      const res = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: code.trim() }),
      });

      const data = await res.json();
      if (!data.valid) {
        throw new Error(data.message || 'Invalid or unrecognized AppSumo code.');
      }
      setVerifiedData(data);
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
    <div id="activate" className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-white/15 bg-[#12141d] p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">AppSumo Code Activation</h2>
              <p className="text-xs text-gray-400">Enter your AppSumo voucher to unlock and download VitalsSniper PRO.</p>
            </div>
          </div>
          <span className="hidden sm:inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
            Instant Delivery
          </span>
        </div>

        {/* Instructions banner */}
        <div className="rounded-xl border border-white/10 bg-[#090a10]/70 p-3.5 mb-5 text-xs text-gray-400 flex items-start gap-2.5">
          <HelpCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-300">Where is my code?</span> Look in your{' '}
            <strong className="text-white">AppSumo account &rarr; Products</strong>. It follows the format{' '}
            <code className="text-[11px] bg-black/60 px-1 py-0.5 rounded text-emerald-300 font-mono">VS-PRO-XXXX-XXXX</code>.
          </div>
        </div>

        {/* Redemption Form */}
        {!verifiedData ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Enter Your AppSumo Redemption Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. VS-PRO-XXXX-XXXX"
                className="w-full rounded-xl border border-white/10 bg-[#090a10] px-4 py-3 text-base font-mono uppercase tracking-wider text-white outline-none focus:border-emerald-500 transition-colors shadow-inner"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-extrabold text-black transition-all hover:bg-emerald-400 disabled:opacity-50 shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  <span>Verifying Code with Server...</span>
                </>
              ) : (
                <>
                  <Key className="h-4 w-4" />
                  <span>Verify Code & Unlock ZIP Download</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Verified State */
          <div className="py-2 animate-in fade-in space-y-5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4" />
              <span>AppSumo License Verified & Unlocked</span>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-300">
                <span className="text-gray-500">Tier:</span>
                <span className="font-bold text-white">{verifiedData.tier}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="text-gray-500">Commercial Seats:</span>
                <span className="font-bold text-emerald-400">{verifiedData.seats} Active Users</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-gray-400 font-semibold">Your Lifetime Key:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm bg-black/60 px-2 py-1 rounded border border-white/10 select-all">
                    {verifiedData.key}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(verifiedData.key)}
                    className="p-1 rounded bg-white/10 text-gray-300 hover:text-white"
                    title="Copy Key"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Download Button */}
            <a
              href={verifiedData.downloadUrl}
              download
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black transition-all hover:bg-gray-100 shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
            >
              <Download className="h-4 w-4" />
              <span>Download VitalsSniper PRO (.zip)</span>
            </a>

            <div className="text-center">
              <a href="#docs" className="text-xs text-emerald-400 hover:underline font-semibold">
                &darr; View 30-Second Chrome Installation Instructions
              </a>
            </div>
          </div>
        )}

        {/* Footer fallback */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>Haven't purchased your license yet?</span>
          <a
            href={SITE_CONFIG.appsumoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Get VitalsSniper PRO on AppSumo ($39)</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
