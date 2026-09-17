'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import { Key, CheckCircle2, AlertCircle, Download, ArrowLeft, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function LicensePage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [licenseInfo, setLicenseInfo] = useState<any | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setLicenseInfo(null);

    try {
      const isEmail = query.includes('@');
      const payload = isEmail ? { email: query.trim() } : { key: query.trim() };

      const res = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.valid) {
        throw new Error(data.message || 'License key not found.');
      }
      setLicenseInfo(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar onOpenCheckout={() => setCheckoutOpen(true)} />

      <div className="mx-auto max-w-2xl px-6 py-20 flex-1 w-full">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Store</span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#12141d] p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AppSumo Voucher & License Redemption</h1>
              <p className="text-xs text-gray-400">Enter your AppSumo voucher code to unlock your lifetime key and download.</p>
            </div>
          </div>

          {/* Quick steps banner */}
          <div className="rounded-xl border border-white/10 bg-[#090a10]/60 p-4 mt-6 text-xs text-gray-400 space-y-1.5">
            <div className="font-bold text-gray-300 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>How to redeem your AppSumo purchase:</span>
            </div>
            <p>1. Open your <strong>AppSumo account &rarr; Products</strong> and copy your VitalsSniper code.</p>
            <p>2. Paste the code below (e.g. <code>VS-PRO-XXXX-XXXX</code>) and click <strong>Verify & Unlock</strong>.</p>
            <p>3. Download <code>vitalssniper_pro.zip</code> and install via Chrome Developer Mode in 30 seconds.</p>
          </div>

          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                AppSumo Redemption Code or License Key
              </label>
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. VS-PRO-XXXX-XXXX"
                className="w-full rounded-xl border border-white/10 bg-[#090a10] px-4 py-3 text-sm font-mono uppercase tracking-wider text-white outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white py-3.5 text-sm font-bold text-black transition-all hover:bg-gray-100 disabled:opacity-50 shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
            >
              {loading ? 'Verifying with License Server...' : 'Verify Code & Unlock Download'}
            </button>
          </form>

          {error && (
            <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-center gap-3">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {licenseInfo && (
            <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 className="h-4 w-4" />
                <span>Active License Confirmed</span>
              </div>

              <div className="space-y-2.5 text-xs text-gray-300 border-b border-white/10 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tier:</span>
                  <span className="font-bold text-white">{licenseInfo.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seats:</span>
                  <span className="font-bold text-white">{licenseInfo.seats} Active Seats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">License Key:</span>
                  <span className="font-mono font-bold text-emerald-400 select-all">{licenseInfo.key}</span>
                </div>
              </div>

              <a
                href={licenseInfo.downloadUrl}
                download
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 py-3 text-xs font-bold text-black transition-all hover:bg-emerald-400 shadow-md"
              >
                <Download className="h-4 w-4" />
                <span>Download VitalsSniper PRO v1.2.0 (.zip)</span>
              </a>
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span>Want to test without a code?</span>
              <Link
                href="/vitalssniper#auditor"
                className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Run Free In-Browser Audit &rarr;</span>
              </Link>
            </div>
            <a href="mailto:support@vitalssniper.com" className="text-gray-500 hover:text-white transition-colors">
              Support Desk
            </a>
          </div>
        </div>

      </div>

      <Footer />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        defaultTier="solo"
      />
    </main>
  );
}
