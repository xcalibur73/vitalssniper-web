import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090a10] py-14 text-xs text-gray-500">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-white text-sm">VitalsSniper PRO</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>Single-User & Agency Commercial License.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/docs" className="hover:text-white transition-colors">
            Documentation
          </Link>
          <Link href="/license" className="hover:text-white transition-colors">
            License Portal
          </Link>
          <a href="mailto:support@vitalssniper.com" className="hover:text-white transition-colors">
            Support Desk
          </a>
        </div>

      </div>
    </footer>
  );
}
