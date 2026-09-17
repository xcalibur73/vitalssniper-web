import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-sand-300 bg-[#242321] py-16 text-xs text-[#F7F4EE]/70">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Masthead Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-editorial text-2xl font-bold text-[#F7F4EE]">Web Audits</span>
              <span className="rounded border border-accent/30 bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent-light uppercase tracking-wider">
                Digital Publication &amp; Tools
              </span>
            </div>
            <p className="text-sm text-[#F7F4EE]/70 max-w-xl">
              Practical web intelligence for better websites. Independent benchmarks, technical performance guides, and actionable audit tools.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-accent-dark"
            >
              <span>Explore All Web Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Multi-Column Publication Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-white/10">
          
          {/* Column 1: Editorial Articles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F4EE] mb-4">
              Articles
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/articles/web-performance" className="hover:text-accent-light transition-colors">
                  Web Performance
                </Link>
              </li>
              <li>
                <Link href="/articles/seo" className="hover:text-accent-light transition-colors">
                  SEO &amp; Structured Data
                </Link>
              </li>
              <li>
                <Link href="/articles/ai-search" className="hover:text-accent-light transition-colors">
                  AI Search &amp; GEO
                </Link>
              </li>
              <li>
                <Link href="/articles/web-design" className="hover:text-accent-light transition-colors">
                  Web Design &amp; 0 CLS
                </Link>
              </li>
              <li>
                <Link href="/articles/conversion" className="hover:text-accent-light transition-colors">
                  Conversion &amp; CRO
                </Link>
              </li>
              <li>
                <Link href="/articles/tools" className="hover:text-accent-light transition-colors">
                  Tools &amp; Workflows
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Web Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F4EE] mb-4">
              Web Tools
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/products/vitalssniper-pro" className="font-semibold text-accent-light hover:underline">
                  VitalsSniper PRO
                </Link>
              </li>
              <li>
                <Link href="/tools/website-speed-test" className="hover:text-accent-light transition-colors">
                  Website Speed Test
                </Link>
              </li>
              <li>
                <Link href="/tools/lcp-checker" className="hover:text-accent-light transition-colors">
                  LCP Element Finder
                </Link>
              </li>
              <li>
                <Link href="/tools/page-weight-checker" className="hover:text-accent-light transition-colors">
                  Page Weight Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/directory" className="hover:text-accent-light transition-colors">
                  Public Tool Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Reviews & Comparisons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F4EE] mb-4">
              Reviews &amp; Compares
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/reviews" className="hover:text-accent-light transition-colors">
                  All Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/comparisons" className="hover:text-accent-light transition-colors">
                  Head-to-Head Comparisons
                </Link>
              </li>
              <li>
                <Link href="/reviews/cloudways" className="hover:text-accent-light transition-colors">
                  Cloudways Review
                </Link>
              </li>
              <li>
                <Link href="/reviews/rank-math" className="hover:text-accent-light transition-colors">
                  Rank Math Review
                </Link>
              </li>
              <li>
                <Link href="/reviews/generatepress" className="hover:text-accent-light transition-colors">
                  GeneratePress Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Research & Showroom */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F4EE] mb-4">
              Research &amp; Data
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/research" className="hover:text-accent-light transition-colors">
                  Original Research Reports
                </Link>
              </li>
              <li>
                <Link href="/teardowns" className="hover:text-accent-light transition-colors">
                  Website Teardowns
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-accent-light transition-colors">
                  The Web Audits Brief
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-accent-light transition-colors">
                  Resource Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Policy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F4EE] mb-4">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-accent-light transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-accent-light transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent-light transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-accent-light transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* FTC Disclosure & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-[#F7F4EE]/60">
          <div>
            <p className="mb-1">
              &copy; {new Date().getFullYear()} Web Audits &bull; webaudits.pro &bull; All rights reserved.
            </p>
            <p className="max-w-3xl text-[10px] leading-relaxed text-[#F7F4EE]/50">
              Editorial &amp; Affiliate Disclosure: Web Audits is an independent digital publication. We test all software, web hosts, and SEO plugins in laboratory and field conditions. Outbound affiliate links carry rel=&quot;sponsored&quot;. We may earn a commission if you make a purchase through our links at zero extra cost to you. This never compromises our testing data or verdicts.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 text-charcoal-muted">
            <span className="font-editorial italic text-sand-300">Better insights. Better websites.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
