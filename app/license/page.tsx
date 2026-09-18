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
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar onOpenCheckout={() => setCheckoutOpen(true)} />

      <div className="mx-auto max-w-2xl px-6 py-20 flex-1 w-full">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#0F0F0F] mb-8 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Store</span>
        </Link>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-10 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB]">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F0F0F]">AppSumo Voucher &amp; License Redemption</h1>
              <p className="text-xs text-[#6B7280]">Enter your AppSumo voucher code to unlock your lifetime key and download.</p>
            </div>
          </div>

          {/* Quick steps banner */}
          <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4 mt-6 text-xs text-[#4B5563] space-y-1.5">
            <div className="font-bold text-[#0F0F0F] flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>How to redeem your AppSumo purchase:</span>
            </div>
            <p>1. Open your <strong>AppSumo account &rarr; Products</strong> and copy your VitalsSniper code.</p>
            <p>2. Paste the code below (e.g. <code>VS-PRO-XXXX-XXXX</code>) and click <strong>Verify &amp; Unlock</strong>.</p>
            <p>3. Download <code>vitalssniper_pro.zip</code> and install via Chrome Developer Mode in 30 seconds.</p>
          </div>

          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                AppSumo Redemption Code or License Key
              </label>
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. VS-PRO-XXXX-XXXX"
                className="w-full rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] px-4 py-3 text-sm font-mono uppercase tracking-wider text-[#0F0F0F] outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2563EB] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] disabled:opacity-50 shadow-xs"
            >
              {loading ? 'Verifying with License Server...' : 'Verify Code & Unlock Download'}
            </button>
          </form>

          {error && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-center gap-3">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {licenseInfo && (
            <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Active License Confirmed</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#4B5563] border-b border-emerald-200/60 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Tier:</span>
                  <span className="font-bold text-[#0F0F0F]">{licenseInfo.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Seats:</span>
                  <span className="font-bold text-[#0F0F0F]">{licenseInfo.seats} Active Seats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">License Key:</span>
                  <span className="font-mono font-bold text-[#2563EB] select-all">{licenseInfo.key}</span>
                </div>
              </div>

              <a
                href={licenseInfo.downloadUrl}
                download
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white transition-all hover:bg-emerald-700 shadow-xs"
              >
                <Download className="h-4 w-4" />
                <span>Download VitalsSniper PRO v1.2.0 (.zip)</span>
              </a>
            </div>
          )}

          <div className="mt-8 border-t border-[#E5E7EB] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
            <div className="flex items-center gap-1.5">
              <span>Want to test without a code?</span>
              <Link
                href="/vitalssniper#auditor"
                className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Run Free In-Browser Audit &rarr;</span>
              </Link>
            </div>
            <a href="mailto:support@vitalssniper.com" className="text-[#6B7280] hover:text-[#0F0F0F] transition-colors">
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
