import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#111827] py-16 text-xs text-[#9CA3AF]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Masthead Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-[#1F2937]">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-md border border-[#374151] bg-[#1F2937] p-1 flex items-center justify-center">
                <Image
                  src="/favicon.svg"
                  alt="WebAudits.pro"
                  width={20}
                  height={20}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                WebAudits<span className="text-[#2563EB]">.pro</span>
              </span>
              <span className="rounded border border-[#2563EB]/30 bg-[#2563EB]/15 px-2 py-0.5 text-[10px] font-semibold text-[#60A5FA] uppercase tracking-wider">
                Web Intelligence &amp; Audits
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF] max-w-xl">
              Practical web intelligence for better websites. Independent benchmarks, technical performance guides, and actionable audit tools.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              <span>Explore All Web Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Multi-Column Publication Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-[#1F2937]">
          
          {/* Column 1: Editorial Articles */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Articles
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/articles/web-performance" className="hover:text-white transition-colors">
                  Web Performance
                </Link>
              </li>
              <li>
                <Link href="/articles/seo" className="hover:text-white transition-colors">
                  SEO &amp; Structured Data
                </Link>
              </li>
              <li>
                <Link href="/articles/ai-search" className="hover:text-white transition-colors">
                  AI Search &amp; GEO
                </Link>
              </li>
              <li>
                <Link href="/articles/web-design" className="hover:text-white transition-colors">
                  Web Design &amp; 0 CLS
                </Link>
              </li>
              <li>
                <Link href="/articles/conversion" className="hover:text-white transition-colors">
                  Conversion &amp; CRO
                </Link>
              </li>
              <li>
                <Link href="/articles/tools" className="hover:text-white transition-colors">
                  Tools &amp; Workflows
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Web Tools */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Web Tools
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tools/website-speed-test" className="font-medium text-[#60A5FA] hover:underline">
                  Website Speed Test
                </Link>
              </li>
              <li>
                <Link href="/tools/lcp-checker" className="hover:text-white transition-colors">
                  LCP Element Finder
                </Link>
              </li>
              <li>
                <Link href="/tools/page-weight-checker" className="hover:text-white transition-colors">
                  Page Weight Checker
                </Link>
              </li>
              <li>
                <Link href="/products/vitalssniper-pro" className="hover:text-white transition-colors">
                  VitalsSniper PRO
                </Link>
              </li>
              <li>
                <Link href="/tools/directory" className="hover:text-white transition-colors">
                  Public Tool Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Reviews & Comparisons */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Reviews &amp; Compares
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  All Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/comparisons" className="hover:text-white transition-colors">
                  Head-to-Head Comparisons
                </Link>
              </li>
              <li>
                <Link href="/reviews/cloudways" className="hover:text-white transition-colors">
                  Cloudways Review
                </Link>
              </li>
              <li>
                <Link href="/reviews/rank-math" className="hover:text-white transition-colors">
                  Rank Math Review
                </Link>
              </li>
              <li>
                <Link href="/reviews/generatepress" className="hover:text-white transition-colors">
                  GeneratePress Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Research & Showroom */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Research &amp; Data
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  Original Research Reports
                </Link>
              </li>
              <li>
                <Link href="/teardowns" className="hover:text-white transition-colors">
                  Website Teardowns
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-white transition-colors">
                  The Web Audits Brief
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Resource Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Policy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Trust &amp; Legal
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-white transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* FTC Disclosure & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-[#9CA3AF]">
          <div>
            <p className="mb-1 text-[#9CA3AF]">
              &copy; {new Date().getFullYear()} Web Audits &bull; webaudits.pro &bull; All rights reserved.
            </p>
            <p className="max-w-3xl text-[10px] leading-relaxed text-[#9CA3AF]">
              Editorial &amp; Affiliate Disclosure: Web Audits is an independent digital publication. We test all software, web hosts, and SEO plugins in laboratory and field conditions. Outbound affiliate links carry rel=&quot;sponsored&quot;. We may earn a commission if you make a purchase through our links at zero extra cost to you. This never compromises our testing data or verdicts.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 text-[#9CA3AF]">
            <span className="text-xs font-medium text-[#9CA3AF]">Better insights. Better websites.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
