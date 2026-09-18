import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BLOG_POSTS, EDITORIAL_BEATS } from '@/data/posts';
import { FREE_TOOLS } from '@/data/tools';
import { PRODUCTS } from '@/data/products';
import { RESEARCH_STUDIES } from '@/data/research';
import { TEARDOWNS } from '@/data/teardowns';
import { COMPARISONS } from '@/data/comparisons';
import { FileText, Wrench, Shield, BookOpen, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap & Index Directory | Web Audits',
  description: 'Complete directory of articles, speed benchmarks, free diagnostic tools, software reviews, and teardown studies published on Web Audits.',
  alternates: {
    canonical: 'https://www.webaudits.pro/sitemap-page',
  },
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-14 w-full">
        <header className="max-w-[760px] mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4 shadow-2xs">
            <Layers className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Site Index & Content Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            HTML Content Sitemap
          </h1>
          <p className="text-base text-[#4B5563] leading-relaxed">
            Index of published web performance benchmarks, technical SEO articles, diagnostic tools, and teardown studies.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              <Layers className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Topical Pillars</h2>
            </div>
            <ul className="space-y-2.5 text-xs">
              {EDITORIAL_BEATS.map((beat) => (
                <li key={beat.slug}>
                  <Link
                    href={`/articles/${beat.slug}`}
                    className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors"
                  >
                    {beat.name} Hub
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              <Wrench className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Diagnostic Tools</h2>
            </div>
            <ul className="space-y-2.5 text-xs">
              {FREE_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Research &amp; Teardowns</h2>
            </div>
            <ul className="space-y-2.5 text-xs">
              {RESEARCH_STUDIES.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/research/${study.slug}`}
                    className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors"
                  >
                    {study.title}
                  </Link>
                </li>
              ))}
              {TEARDOWNS.map((td) => (
                <li key={td.slug}>
                  <Link
                    href={`/teardowns/${td.slug}`}
                    className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors"
                  >
                    {td.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              <Shield className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Software Reviews</h2>
            </div>
            <ul className="space-y-2.5 text-xs">
              {PRODUCTS.map((prod) => (
                <li key={prod.slug}>
                  <Link
                    href={`/reviews/${prod.slug}`}
                    className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors"
                  >
                    {prod.name} Review
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Comparisons</h2>
            </div>
            <ul className="space-y-2.5 text-xs">
              {COMPARISONS.map((comp) => (
                <li key={comp.slug}>
                  <Link
                    href={`/comparisons/${comp.slug}`}
                    className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors"
                  >
                    {comp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Forensic Articles ({BLOG_POSTS.length})</h2>
            </div>
            <ul className="space-y-2 text-xs max-h-[340px] overflow-y-auto pr-2">
              {BLOG_POSTS.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/articles/${post.slug}`}
                    className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors block truncate"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Agency Playbooks &amp; Trust Architecture</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
            <Link href="/resources" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              Agency Resources &amp; Pitch Files
            </Link>
            <Link href="/docs" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              VitalsSniper PRO Documentation
            </Link>
            <Link href="/free-audit-report" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              Free Audit Report Generator
            </Link>
            <Link href="/pricing" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              Pricing &amp; Commercial Licenses
            </Link>
            <Link href="/about" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              About Web Audits
            </Link>
            <Link href="/about/methodology" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              Testing Methodology
            </Link>
            <Link href="/editorial-policy" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              Editorial Policy
            </Link>
            <Link href="/affiliate-disclosure" className="font-medium text-[#0F0F0F] hover:text-[#2563EB] transition-colors">
              Affiliate Disclosure
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
