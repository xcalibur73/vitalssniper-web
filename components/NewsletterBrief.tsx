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
    <div className="w-full py-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Info Column */}
        <div className="flex items-start gap-4 max-w-xl">
          <div className="h-10 w-10 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] flex-shrink-0 mt-0.5">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg sm:text-xl font-bold tracking-tight text-[#0F0F0F] leading-tight">
              The Web Audits Brief
            </p>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
              Weekly field notes on performance engineering, SEO schemas, AI search, and web tools. Zero spam.
            </p>
          </div>
        </div>

        {/* Right Input Form */}
        <div className="w-full lg:w-auto">
          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2.5 text-xs font-semibold text-[#10B981] animate-fadeIn">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
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
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0F0F0F] placeholder-[#6B7280] focus:outline-none focus:border-[#2563EB] transition-colors"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors flex-shrink-0"
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
