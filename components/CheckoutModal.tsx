'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Download, CreditCard, Sparkles, ShieldCheck, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier: 'solo' | 'agency';
}

export default function CheckoutModal({ isOpen, onClose, defaultTier }: CheckoutModalProps) {
  const [tier, setTier] = useState<'solo' | 'agency'>(defaultTier);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [payMethod, setPayMethod] = useState<'card' | 'payoneer'>('card');
  const [step, setStep] = useState<'select' | 'payment_pending'>('select');
  const [redemptionCode, setRedemptionCode] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setTier(defaultTier);
    setStep('select');
    setVerifiedData(null);
    setErrorMessage(null);
  }, [defaultTier, isOpen]);

  if (!isOpen) return null;

  const price = tier === 'solo' ? 39 : 79;

  // Checkout URLs (Can be connected to Lemon Squeezy, Gumroad, or Payoneer)
  function handleProceedToPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    // Transition to payment pending state with instruction
    setStep('payment_pending');
  }

  async function handleVerifyPaymentCode(e: React.FormEvent) {
    e.preventDefault();
    if (!redemptionCode.trim()) return;

    setVerifyLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: redemptionCode.trim() }),
      });
      const data = await res.json();
      if (!data.valid) {
        throw new Error(data.message || 'Payment code could not be verified.');
      }
      setVerifiedData(data);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setVerifyLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#141724] p-6 sm:p-8 shadow-[0_40px_90px_rgba(0,0,0,0.8)]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 'select' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <Lock className="h-3.5 w-3.5" />
                Locked &bull; Secure Commercial Checkout
              </div>
              <h3 className="text-2xl font-extrabold text-white">Purchase Lifetime License</h3>
              <p className="text-xs text-gray-400 mt-1">
                Select your license package to proceed to the secure checkout processor.
              </p>
            </div>

            {/* Tier Selector */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => setTier('solo')}
                className={`rounded-xl border p-3 text-left transition-all ${
                  tier === 'solo'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/10 bg-[#0e1017] hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold text-white">Solo License</div>
                <div className="text-base font-extrabold text-emerald-400">$39</div>
                <div className="text-[10px] text-gray-400">1 User Lifetime</div>
              </button>

              <button
                type="button"
                onClick={() => setTier('agency')}
                className={`rounded-xl border p-3 text-left transition-all ${
                  tier === 'agency'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/10 bg-[#0e1017] hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold text-white">Agency Team</div>
                <div className="text-base font-extrabold text-emerald-400">$79</div>
                <div className="text-[10px] text-gray-400">5 Team Seats</div>
              </button>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-white/10 bg-[#090a10] px-3.5 py-2.5 text-sm text-white outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Email Address <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@agency.com"
                  className="w-full rounded-lg border border-white/10 bg-[#090a10] px-3.5 py-2.5 text-sm text-white outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPayMethod('card')}
                    className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 px-3 text-xs font-bold transition-all ${
                      payMethod === 'card'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 bg-[#0e1017] text-gray-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayMethod('payoneer')}
                    className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 px-3 text-xs font-bold transition-all ${
                      payMethod === 'payoneer'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 bg-[#0e1017] text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>🅿️ Payoneer / PayPal</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black transition-all hover:bg-gray-100 mt-2 shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
              >
                Proceed to Secure Checkout (${price})
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                30-Day Guarantee
              </span>
              <button
                type="button"
                onClick={() => setStep('payment_pending')}
                className="text-emerald-400 hover:underline"
              >
                Have an AppSumo / voucher code?
              </button>
            </div>
          </div>
        )}

        {step === 'payment_pending' && !verifiedData && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Lock className="h-3.5 w-3.5" />
                Payment Required &bull; Download Locked
              </div>
              <h3 className="text-2xl font-extrabold text-white">Unlock Your License</h3>
              <p className="text-xs text-gray-400 mt-1">
                Enter your payment confirmation code, AppSumo voucher, or license key to unlock your download.
              </p>
            </div>

            <form onSubmit={handleVerifyPaymentCode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Enter License or Redemption Code
                </label>
                <input
                  type="text"
                  required
                  value={redemptionCode}
                  onChange={(e) => setRedemptionCode(e.target.value)}
                  placeholder="e.g. VS-PRO-XXXX-XXXX"
                  className="w-full rounded-lg border border-white/10 bg-[#090a10] px-3.5 py-3 text-sm font-mono text-white uppercase outline-none focus:border-emerald-500 transition-colors tracking-wider"
                />
              </div>

              {errorMessage && (
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={verifyLoading}
                className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-extrabold text-black transition-all hover:bg-emerald-400 disabled:opacity-50"
              >
                {verifyLoading ? 'Verifying...' : 'Verify Code & Unlock Download'}
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-4 text-center">
              <p className="text-xs text-gray-500 mb-3">Haven't completed checkout yet?</p>
              <button
                type="button"
                onClick={() => setStep('select')}
                className="text-xs text-gray-300 hover:text-white underline font-semibold"
              >
                &larr; Back to plan selection
              </button>
            </div>
          </div>
        )}

        {verifiedData && (
          <div className="text-center py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
              <Check className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-1">License Verified!</h3>
            <p className="text-xs text-gray-400 mb-6">
              Your license is active. Your commercial package has been unlocked:
            </p>

            <div className="rounded-xl border border-dashed border-emerald-500/50 bg-[#090a10] p-4 mb-6">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Active License Key
              </div>
              <div className="font-mono text-xl font-bold tracking-widest text-emerald-400 select-all">
                {verifiedData.key}
              </div>
            </div>

            <a
              href={verifiedData.downloadUrl}
              download
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black transition-all hover:bg-gray-100 shadow-[0_4px_16px_rgba(255,255,255,0.2)] mb-3"
            >
              <Download className="h-4 w-4" />
              <span>Download VitalsSniper PRO (.zip)</span>
            </a>

            <p className="text-[11px] text-gray-500">
              Valid for lifetime updates and support across Chromium and Firefox browsers.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
