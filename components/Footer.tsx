import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090a10] py-14 text-xs text-gray-500">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-white text-sm">Web Audits Helper</span>
          <span className="text-[11px] text-gray-500">(VitalsSniper Core)</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>&copy; {new Date().getFullYear()} webaudits.pro</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>Commercial Agency License</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            License Portal
          </Link>
          <Link href="/free-audit-report" className="hover:text-white transition-colors">
            Free Report
          </Link>
          <Link href="/docs" className="hover:text-white transition-colors">
            Docs & Playbook
          </Link>
          <a href="mailto:support@webaudits.pro" className="hover:text-white transition-colors">
            support@webaudits.pro
          </a>
        </div>

      </div>
    </footer>
  );
}
