'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Activity, Layers, Terminal } from 'lucide-react';

const ARTICLES = [
  {
    title: 'How to Fix High LCP in WordPress',
    href: '/articles/why-your-lcp-score-tanks-on-mobile-how-to-fix-it',
    category: 'Performance',
    date: 'March 14, 2026',
    readTime: '8 min read',
    excerpt: 'A surgical guide to isolate and eliminate the real causes of Largest Contentful Paint delays on mobile viewports.',
    previewType: 'lcp',
  },
  {
    title: 'The Complete Guide to Technical SEO in 2026',
    href: '/articles/rank-math-vs-yoast-definitive-seo-plugin-comparison',
    category: 'Technical SEO',
    date: 'March 10, 2026',
    readTime: '7 min read',
    excerpt: 'Selecting the right schema architecture determines how cleanly search engines index entity graphs and knowledge bases.',
    previewType: 'terminal',
  },
  {
    title: 'How to Optimize for ChatGPT Search and GEO',
    href: '/articles/how-to-make-your-website-discoverable-by-ai-search-engines',
    category: 'AI Search',
    date: 'March 06, 2026',
    readTime: '6 min read',
    excerpt: 'Configure JSON-LD entity structures, llms.txt endpoints, and answer-ready passage formatting for generative engines.',
    previewType: 'ai',
  },
  {
    title: 'Modern Web Design Trends That Improve Performance',
    href: '/articles/zero-cls-web-design-principles',
    category: 'Web Design',
    date: 'March 02, 2026',
    readTime: '5 min read',
    excerpt: 'How aspect ratio containers and fluid typography scales eliminate cumulative layout shift without sacrificing aesthetic craft.',
    previewType: 'cls',
  },
  {
    title: 'Best Website Audit Tools for Agencies in 2026',
    href: '/articles/cloudways-vs-siteground-which-host-loads-faster',
    category: 'Tools',
    date: 'February 27, 2026',
    readTime: '9 min read',
    excerpt: 'Comparing in-browser forensics against synthetic laboratory probes to diagnose client performance bottlenecks accurately.',
    previewType: 'tools',
  },
  {
    title: '10 CRO Fixes That Actually Increase Revenue',
    href: '/articles/the-agency-guide-to-white-label-website-audits',
    category: 'Conversion',
    date: 'February 22, 2026',
    readTime: '6 min read',
    excerpt: 'How technical proof-of-flaw audit teardowns convert cold website evaluations into high-value optimization contracts.',
    previewType: 'cro',
  },
];

export default function LatestArticlesSection() {
  return (
    <section className="py-16 md:py-20 border-b border-[#E5E7EB] bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Editorial Insights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F0F0F]">
              Latest Articles &amp; Guides
            </h2>
            <p className="text-base text-[#4B5563] mt-1">
              Field-tested performance engineering, Core Web Vitals remediation, and technical SEO.
            </p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <span>View all articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 3-Column Clean Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.href}
              className="rounded-xl border border-[#E5E7EB] bg-white p-6 flex flex-col justify-between shadow-none transition-colors hover:border-[#D1D5DB] group"
            >
              <div>
                {/* 16:10 Aspect Ratio Graphic Preview */}
                <div className="aspect-[16/10] w-full rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-4 mb-4 flex flex-col justify-center overflow-hidden">
                  {article.previewType === 'lcp' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#6B7280]">
                        <span>Performance Lab</span>
                        <span className="text-[#047857] font-bold">LCP 1.6s</span>
                      </div>
                      <div className="h-1.5 w-3/4 rounded bg-[#E5E7EB]" />
                      <div className="rounded border border-dashed border-[#2563EB]/40 bg-[#2563EB]/5 p-2 text-center text-xs font-mono text-[#2563EB]">
                        fetchpriority=&quot;high&quot;
                      </div>
                    </div>
                  )}

                  {article.previewType === 'terminal' && (
                    <div className="rounded bg-[#111827] p-3 text-[11px] font-mono text-gray-300 space-y-1">
                      <div className="text-[#10B981]">$ curl -I https://example.com</div>
                      <div className="text-[#9CA3AF]">HTTP/2 200 OK</div>
                      <div className="text-[#60A5FA]">schema: JSON-LD Valid</div>
                    </div>
                  )}

                  {article.previewType === 'ai' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-[#0F0F0F]">
                        <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
                        <span>AI Engine Crawler</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E5E7EB] rounded" />
                      <div className="text-[11px] font-mono text-[#2563EB]">llms.txt indexed</div>
                    </div>
                  )}

                  {article.previewType === 'cls' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#6B7280]">
                        <span>Cumulative Layout Shift</span>
                        <span className="text-[#047857] font-bold">0.000</span>
                      </div>
                      <div className="h-1.5 w-4/5 rounded bg-[#E5E7EB]" />
                      <div className="text-[11px] font-mono text-[#047857]">0 layout shifts observed</div>
                    </div>
                  )}

                  {article.previewType === 'tools' && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-[#6B7280]">
                        <span>Synthetic TTFB</span>
                        <span className="text-[#047857] font-bold">340ms</span>
                      </div>
                      <div className="h-1.5 w-2/3 rounded bg-[#E5E7EB]" />
                      <div className="text-[11px] text-[#2563EB]">DevTools + VitalsSniper</div>
                    </div>
                  )}

                  {article.previewType === 'cro' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between font-mono text-[#6B7280]">
                        <span>Audit Conversion Rate</span>
                        <span className="text-[#047857] font-bold">+28%</span>
                      </div>
                      <div className="h-1.5 w-3/4 rounded bg-[#E5E7EB]" />
                      <div className="text-[11px] font-mono text-[#2563EB]">Proof-of-flaw sheet</div>
                    </div>
                  )}
                </div>

                {/* Category Pill */}
                <span className="inline-block rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#4B5563] mb-3">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-2">
                  <Link href={article.href}>
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Meta Date & Read Time */}
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
