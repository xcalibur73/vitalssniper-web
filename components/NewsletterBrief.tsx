'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function NewsletterBrief() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="rounded-3xl bg-[#242321] text-[#F7F4EE] p-8 md:p-12 border border-white/10 shadow-lg">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/20 px-3 py-1 text-xs font-bold text-accent-light uppercase tracking-wider mb-4">
          <Mail className="h-3.5 w-3.5" /> Weekly Editorial Dispatch
        </span>

        <h3 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight text-[#F7F4EE] mb-4">
          The Web Audits Brief
        </h3>

        <p className="text-sm text-[#F7F4EE]/70 leading-relaxed mb-8">
          One concise email every Thursday: 1 empirical benchmark finding, 1 vetted web tool, 1 teardown lesson, and zero marketing fluff. Read by 4,200+ engineers, SEO specialists, and agency founders.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-fadeIn">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-white mb-1">
              You are on the dispatch list.
            </h4>
            <p className="text-xs text-white/80">
              Check your inbox for this week-s issue of The Web Audits Brief.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email address"
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-accent"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-accent-dark transition-all flex-shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}

        <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-[#F7F4EE]/50">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>No sponsored spam. 1-click unsubscribe anytime.</span>
        </div>
      </div>
    </div>
  );
}
