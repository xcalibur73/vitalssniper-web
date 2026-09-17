import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090a10] py-16 text-xs text-gray-500">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Multi-Column Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          
          {/* Product */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/vitalssniper" className="hover:text-white transition-colors">
                  VitalsSniper PRO
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  License Portal
                </Link>
              </li>
              <li>
                <Link href="/free-audit-report" className="hover:text-white transition-colors">
                  Free Audit Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tools" className="hover:text-white transition-colors">
                  Tools Catalog
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Reviews &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.appsumoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  AppSumo Store
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Brand */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-500 leading-relaxed mb-3">
              New tool reviews, speed benchmarks, and web performance insights. No spam.
            </p>
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}?subject=Newsletter%20Subscribe`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-gray-300 hover:text-white hover:border-white/20 transition-colors"
            >
              Get Updates
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-white text-sm">Web Audits Helper</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>&copy; {new Date().getFullYear()} webaudits.pro</span>
          </div>

          <p className="text-[10px] text-gray-600 max-w-lg text-center sm:text-right leading-relaxed">
            Affiliate Disclosure: Some links on this site are affiliate links. We may earn a commission at no extra cost to you. We only recommend tools we have personally tested.
          </p>
        </div>

      </div>
    </footer>
  );
}
