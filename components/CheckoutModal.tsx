'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Download, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licenseData, setLicenseData] = useState<any | null>(null);

  useEffect(() => {
    setTier(defaultTier);
  }, [defaultTier]);

  if (!isOpen) return null;

  const price = tier === 'solo' ? 39 : 79;

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/license/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          tier,
          paymentMethod: payMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      setLicenseData(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#141724] p-6 sm:p-8 shadow-[0_40px_90px_rgba(0,0,0,0.8)]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!licenseData ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                Secure Checkout
              </div>
              <h3 className="text-2xl font-extrabold text-white">Complete Your License</h3>
              <p className="text-xs text-gray-400 mt-1">
                One-time lifetime payment &bull; Instant license key delivery & access
              </p>
            </div>

            {/* Tier Selector in Checkout */}
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
            <form onSubmit={handleOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">Full Name</label>
                <input
                  type="text"
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
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Your activation key and download receipt will be delivered here.
                </span>
              </div>

              {/* Payment Method Selector */}
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
                disabled={isSubmitting}
                className="w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black transition-all hover:bg-gray-100 disabled:opacity-50 mt-2 shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
              >
                {isSubmitting ? 'Processing Payment...' : `Complete Order — Pay $${price}`}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>30-Day Money-Back Guarantee &bull; 256-Bit SSL Encryption</span>
            </div>
          </div>
        ) : (
          /* Order Confirmation State */
          <div className="text-center py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
              <Check className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-1">Order Confirmed!</h3>
            <p className="text-xs text-gray-400 mb-6">
              Thank you for your order, <strong>{licenseData.name}</strong>. Here is your official lifetime activation key:
            </p>

            <div className="rounded-xl border border-dashed border-emerald-500/50 bg-[#090a10] p-4 mb-6">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Your Lifetime License Key
              </div>
              <div className="font-mono text-xl font-bold tracking-widest text-emerald-400 select-all">
                {licenseData.key}
              </div>
            </div>

            <a
              href="/vitalssniper_pro.zip"
              download
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black transition-all hover:bg-gray-100 shadow-[0_4px_16px_rgba(255,255,255,0.2)] mb-3"
            >
              <Download className="h-4 w-4" />
              <span>Download VitalsSniper PRO (.zip)</span>
            </a>

            <p className="text-[11px] text-gray-500">
              A copy of your license key and installation instructions has been sent to {licenseData.email}.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
