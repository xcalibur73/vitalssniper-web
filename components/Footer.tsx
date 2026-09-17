import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-sand-300 bg-[#f4f0ea] py-16 text-xs text-charcoal-muted">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Masthead Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-sand-300">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-editorial text-2xl font-bold text-charcoal">Web Audits Helper</span>
              <span className="rounded bg-sand-300 px-2 py-0.5 text-[10px] font-bold text-charcoal-light uppercase tracking-wider">
                Digital Publication &amp; Tools
              </span>
            </div>
            <p className="text-sm text-charcoal-muted max-w-xl">
              Practical web intelligence for better websites. Independent benchmarks, technical performance guides, and actionable audit tools.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-charcoal px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-black"
            >
              <span>Explore All Web Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Multi-Column Publication Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-sand-300">
          
          {/* Column 1: Editorial Articles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              Editorial Beats
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/articles" className="hover:text-terracotta transition-colors">
                  Web Performance &amp; CWV
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-terracotta transition-colors">
                  Technical SEO &amp; Crawlability
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-terracotta transition-colors">
                  AI &amp; GEO (Generative Search)
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-terracotta transition-colors">
                  Conversion Rate Optimization
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-terracotta transition-colors">
                  Modern Web Design &amp; CSS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Web Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              Web Tools Suite
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/vitalssniper" className="font-semibold text-terracotta hover:underline">
                  VitalsSniper PRO (Flagship)
                </Link>
              </li>
              <li>
                <Link href="/free-audit-report" className="hover:text-terracotta transition-colors">
                  Free Website Audit Report
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-terracotta transition-colors">
                  Page Weight &amp; DOM Bloat Checker
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-terracotta transition-colors">
                  SEO &amp; Knowledge Graph Schema Tester
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-terracotta transition-colors">
                  License &amp; Verification Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Affiliate Reviews */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              Reviews &amp; Comparisons
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/reviews" className="hover:text-terracotta transition-colors">
                  Best WordPress Hosting 2026
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-terracotta transition-colors">
                  Semrush vs Ahrefs Comparison
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-terracotta transition-colors">
                  Cloudways vs SiteGround Speed Test
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-terracotta transition-colors">
                  Best AI Tools for Web Agencies
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-terracotta transition-colors">
                  All Software Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Publication & Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              Publication Standards
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="hover:text-terracotta transition-colors">
                  About &amp; Editorial Mission
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terracotta transition-colors">
                  Testing Methodology &amp; Benchmarks
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-terracotta transition-colors">
                  Free Agency Resources &amp; Playbooks
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-terracotta transition-colors">
                  Technical Documentation
                </Link>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="hover:text-terracotta transition-colors">
                  Contact Editorial Team
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* FTC Disclosure & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-charcoal-subtle">
          <div>
            <p className="mb-1">
              &copy; {new Date().getFullYear()} Web Audits Helper &bull; webaudits.pro &bull; All rights reserved.
            </p>
            <p className="max-w-2xl text-[10px] leading-relaxed text-charcoal-muted">
              Editorial &amp; Affiliate Disclosure: Web Audits Helper is an independent digital publication. We test all software and hosting providers in real-world environments. When you purchase through links on our site, we may earn an affiliate commission at zero additional cost to you. This never influences our scores or editorial rankings.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/about" className="hover:underline">Methodology</Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
