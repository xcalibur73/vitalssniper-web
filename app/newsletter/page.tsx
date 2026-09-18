import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterBrief from '@/components/NewsletterBrief';
import { Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'The Web Audits Brief | Weekly Dispatch',
  description: 'Subscribe to The Web Audits Brief. Every Thursday: 1 empirical benchmark finding, 1 vetted web tool, 1 teardown lesson, and zero marketing fluff.',
};

export default function NewsletterPage() {
  const previousIssues = [
    {
      issue: 'Issue #041',
      date: 'March 12, 2026',
      title: 'Why 68% of WordPress Sites Fail Mobile LCP (and How LiteSpeed Cache Fixes It)',
      summary: 'Our 500-domain empirical benchmark results, plus an analysis of unused JavaScript execution delays.',
    },
    {
      issue: 'Issue #040',
      date: 'March 5, 2026',
      title: 'How Generative AI Crawlers Parse llms.txt and Knowledge Graph Entities',
      summary: 'Analyzing server access logs for GPTBot and PerplexityBot across 50 production tech articles.',
    },
    {
      issue: 'Issue #039',
      date: 'February 26, 2026',
      title: 'Head-to-Head: Cloudways vs SiteGround Under 200 Concurrent K6 Requests',
      summary: 'Real-world TTFB measurements, database concurrency limits, and staging workflow teardowns.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200 mb-4">Weekly Publication</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            The Web Audits Brief
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
            Delivered every Thursday morning. 1 empirical benchmark finding, 1 vetted web tool, 1 teardown lesson, and zero sponsored fluff.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-12">
        <NewsletterBrief />

        {/* Past Dispatches Archive */}
        <div>
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">
            Recent Editorial Dispatches
          </h2>

          <div className="space-y-4">
            {previousIssues.map((issue) => (
              <div
                key={issue.issue}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs hover:border-[#2563EB]/40 transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-2">
                  <span className="font-bold text-[#2563EB]">{issue.issue}</span>
                  <span>&bull;</span>
                  <span>{issue.date}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                  {issue.title}
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {issue.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
