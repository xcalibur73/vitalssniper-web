'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  UserCheck,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SITE_CONFIG } from '@/config/site';

interface LicenseData {
  license_id: string;
  email: string;
  tier: string;
  status: string;
  expiry_date: string;
  usage?: {
    audits_this_month: number;
    audits_limit: number;
  };
  features?: {
    bulk_audit?: boolean;
    scheduler?: boolean;
    white_label?: boolean;
    api_access?: boolean;
  };
}

export default function DashboardPage() {
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [license, setLicense] = useState<LicenseData | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const key = licenseKey.trim().toUpperCase();

      // 1. Try Supabase if configured
      if (isSupabaseConfigured && supabase) {
        const { data, error: sbError } = await supabase
          .from('licenses')
          .select('*')
          .eq('license_id', key)
          .single();

        if (data && !sbError) {
          setLicense(data as LicenseData);
          setLoading(false);
          return;
        }
      }

      // 2. Fallback to API license verification endpoint
      const res = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      const result = await res.json();
      if (!result.valid) {
        throw new Error(result.message || 'License key not found or expired.');
      }

      setLicense({
        license_id: key,
        email: result.email || 'customer@webaudits.pro',
        tier: result.tier || 'PRO Lifetime License',
        status: 'active',
        expiry_date: result.expiry || 'Lifetime (2036-12-31)',
        usage: {
          audits_this_month: 24,
          audits_limit: 1000,
        },
        features: {
          bulk_audit: true,
          scheduler: true,
          white_label: true,
          api_access: result.tier?.toLowerCase().includes('enterprise') || false,
        },
      });
    } catch (err: any) {
      setError(err.message || 'Failed to locate license details.');
      setLicense(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-[#2563EB] mb-4 shadow-xs">
            <Key className="h-3.5 w-3.5" />
            <span>Commercial License Management Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F0F0F] mb-3">
            Web Audits License Portal
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-xl mx-auto">
            Manage your commercial license key, monitor audit quota, view unlocked enterprise capabilities, and download release builds.
          </p>
        </div>

        {/* License Lookup Box */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs mb-8">
          {!license ? (
            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F0F0F] mb-2">
                  Enter Your License Key or AppSumo Voucher
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    placeholder="e.g. VS-PRO-XXXX-XXXX or VS-PRO-TEST-9999"
                    className="flex-1 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] px-4 py-3 font-mono text-sm uppercase tracking-wider text-[#0F0F0F] outline-none focus:border-[#2563EB] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold text-white hover:bg-[#1D4ED8] transition-all disabled:opacity-50 flex items-center justify-center gap-2 flex-shrink-0 shadow-xs"
                  >
                    {loading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Key className="h-4 w-4" />
                    )}
                    <span>Look Up License</span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="text-xs text-[#6B7280] flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <span>Testing the portal? Use sandbox key: <code className="text-[#2563EB] font-mono font-bold">VS-PRO-TEST-9999</code></span>
                <Link href="/vitalssniper#auditor" className="text-[#2563EB] hover:underline">
                  Test Free in Public Beta &rarr;
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Active License Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-[#0F0F0F]">Commercial License Active</h2>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 uppercase">
                        {license.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] font-mono mt-0.5">Key: {license.license_id}</p>
                  </div>
                </div>

                <button
                  onClick={() => setLicense(null)}
                  className="text-xs text-[#6B7280] hover:text-[#0F0F0F] underline"
                >
                  Look Up Different Key
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4">
                  <span className="text-[#6B7280] font-medium block mb-1">License Tier</span>
                  <span className="text-[#0F0F0F] font-bold text-sm">{license.tier}</span>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4">
                  <span className="text-[#6B7280] font-medium block mb-1">Registered Account</span>
                  <span className="text-[#0F0F0F] font-bold text-sm truncate block">{license.email}</span>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4">
                  <span className="text-[#6B7280] font-medium block mb-1">Expiry Date</span>
                  <span className="text-emerald-700 font-bold text-sm">{license.expiry_date}</span>
                </div>
              </div>

              {/* Quota Progress */}
              {license.usage && (
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-4 text-xs">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[#4B5563] font-medium">Audits Used This Month</span>
                    <span className="font-mono text-[#2563EB] font-bold">
                      {license.usage.audits_this_month} / {license.usage.audits_limit}
                    </span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                    <div
                      className="bg-[#2563EB] h-2 rounded-full"
                      style={{
                        width: `${Math.min(100, (license.usage.audits_this_month / license.usage.audits_limit) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Features Unlocked */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                  Unlocked Capabilities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#0F0F0F]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>White-Label PDF</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0F0F0F]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Live LCP Overlay</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0F0F0F]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Competitor Mode</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0F0F0F]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>CRM CSV Export</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E5E7EB]">
                <a
                  href={`/api/download?key=${license.license_id}`}
                  className="flex-1 rounded-xl bg-[#2563EB] px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Extension ZIP</span>
                </a>

                <Link
                  href="/docs"
                  className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0F0F0F] hover:bg-[#F3F4F6] transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="h-4 w-4 text-[#2563EB]" />
                  <span>30s Setup Guide</span>
                </Link>
              </div>

            </div>
          )}

        </div>

      </div>

      <Footer />
    </main>
  );
}
