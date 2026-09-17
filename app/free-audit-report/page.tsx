import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuditFormClient from '@/components/AuditFormClient';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Website Audit Report | Web Audits',
  description: 'Get a free automated website audit covering Core Web Vitals, DOM tree depth, payload budgets, and critical rendering path analysis.',
  alternates: {
    canonical: 'https://www.webaudits.pro/free-audit-report'
  }
};

export default function FreeAuditReportPage() {
  return (
    <main className="min-h-screen bg-[#08090e] bg-tech-grid text-[#f9fafb] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instant Forensic Performance Teardown</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Free Website Audit Report
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Inspect mobile performance, Core Web Vitals bottlenecks, and DOM complexity. Instant on-page results with zero gating.
          </p>
        </div>

        {/* Audit Form Container */}
        <AuditFormClient />

      </div>

      <Footer />
    </main>
  );
}
