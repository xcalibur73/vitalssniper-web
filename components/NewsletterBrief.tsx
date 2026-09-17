'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <div className="w-full py-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Info Column */}
        <div className="flex items-start gap-4 max-w-xl">
          <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-charcoal leading-tight">
              The Web Audits Brief
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
              Weekly insights on performance, SEO, AI search, tools and more. No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Right Input Form */}
        <div className="w-full lg:w-auto">
          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-500/30 px-4 py-2.5 text-xs font-bold text-emerald-700 animate-fadeIn">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>You are subscribed to the weekly brief.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-96">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-accent shadow-xs"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-accent-dark transition-all flex-shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
