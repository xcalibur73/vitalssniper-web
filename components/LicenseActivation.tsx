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
      try {
        localStorage.setItem('vs_pro_activated', 'true');
        window.dispatchEvent(new Event('vs_license_activated'));
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
    <div id="activate" className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB]">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F]">AppSumo Code Activation</h2>
              <p className="text-xs text-[#6B7280]">Enter your AppSumo voucher to unlock and download VitalsSniper PRO.</p>
            </div>
          </div>
          <span className="hidden sm:inline-block rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
            Instant Delivery
          </span>
        </div>

        {/* Instructions banner */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-3.5 mb-5 text-xs text-[#4B5563] flex items-start gap-2.5">
          <HelpCircle className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#0F0F0F]">Where is my code?</span> Look in your{' '}
            <strong className="text-[#0F0F0F]">AppSumo account &rarr; Products</strong>. It follows the format{' '}
            <code className="text-[11px] bg-[#E5E7EB] px-1 py-0.5 rounded text-[#0F0F0F] font-mono">VS-PRO-XXXX-XXXX</code>.
          </div>
        </div>

        {/* Redemption Form */}
        {!verifiedData ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                Enter Your AppSumo Redemption Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. VS-PRO-XXXX-XXXX"
                className="w-full rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] px-4 py-3 text-base font-mono uppercase tracking-wider text-[#0F0F0F] outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2563EB] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] disabled:opacity-50 shadow-xs flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>AppSumo License Verified & Unlocked</span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#4B5563]">
                <span className="text-[#6B7280]">Tier:</span>
                <span className="font-bold text-[#0F0F0F]">{verifiedData.tier}</span>
              </div>
              <div className="flex justify-between items-center text-[#4B5563]">
                <span className="text-[#6B7280]">Commercial Seats:</span>
                <span className="font-bold text-emerald-700">{verifiedData.seats} Active Users</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-emerald-200/60">
                <span className="text-[#4B5563] font-semibold">Your Lifetime Key:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#0F0F0F] text-sm bg-white px-2 py-1 rounded border border-[#E5E7EB] select-all">
                    {verifiedData.key}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(verifiedData.key)}
                    className="p-1 rounded bg-[#F8F8F8] border border-[#E5E7EB] text-[#4B5563] hover:text-[#0F0F0F]"
                    title="Copy Key"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Download Button */}
            <a
              href={verifiedData.downloadUrl}
              download
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#2563EB] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>Download VitalsSniper PRO (.zip)</span>
            </a>

            <div className="text-center">
              <a href="#docs" className="text-xs text-[#2563EB] hover:underline font-semibold">
                &darr; View 30-Second Chrome Installation Instructions
              </a>
            </div>
          </div>
        )}

        {/* Footer fallback */}
        <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6B7280]">
          <span>Want to test without a license key?</span>
          <a
            href="/vitalssniper#auditor"
            className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Run Free In-Browser Audit &rarr;</span>
          </a>
        </div>

      </div>
    </div>
  );
}
