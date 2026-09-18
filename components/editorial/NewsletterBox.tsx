'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 border-b border-sand-300 bg-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        
        <div className="p-8 sm:p-12 rounded-3xl border border-sand-300 bg-[#F7F4EE] shadow-xs">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4">
            <Mail className="h-3.5 w-3.5 text-terracotta" />
            <span>Weekly Publication Dispatch</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-charcoal mb-3">
            Get useful web intelligence without the fluff.
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Real performance benchmarks, breakdown of new Google Core Web Vitals changes, and objective software teardowns delivered every Thursday morning.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@agency.com"
                className="flex-1 rounded-xl border border-sand-300 bg-white px-4 py-3 text-xs sm:text-sm text-charcoal outline-none placeholder:text-charcoal-subtle focus:border-terracotta shadow-xs"
              />
              <button
                type="submit"
                className="rounded-xl bg-action px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-action-hover transition-all flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(194,65,12,0.22)] hover:shadow-[0_4px_12px_rgba(194,65,12,0.3)]"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-white border border-sand-300 max-w-md mx-auto text-xs text-emerald-800 flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Thank you! You are subscribed to our Thursday dispatch.</span>
            </div>
          )}

          <p className="text-[11px] text-charcoal-subtle mt-4">
            Zero marketing spam &bull; Unsubscribe with 1 click at any time.
          </p>
        </div>

      </div>
    </section>
  );
}
