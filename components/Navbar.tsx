'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface NavbarProps {
  onOpenCheckout?: (tier?: any) => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Tools', href: '/tools' },
    { label: 'Reviews', href: '/blog' },
    { label: 'VitalsSniper PRO', href: '/vitalssniper' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Free Audit', href: '/free-audit-report' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090a10]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/20 shadow-[0_0_16px_rgba(16,185,129,0.25)] transition-transform group-hover:scale-105">
            <Image
              src="/assets/appsumo_icon_512x512.png"
              alt="Web Audits Helper Logo"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-white">Web Audits</span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
              Helper
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                link.label === 'VitalsSniper PRO'
                  ? 'text-emerald-400 hover:text-emerald-300'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/vitalssniper"
            className="hidden sm:flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black shadow-[0_4px_14px_rgba(255,255,255,0.2)] transition-all hover:bg-gray-100 hover:scale-[1.02]"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Get VitalsSniper PRO</span>
            <span className="rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-extrabold">$39</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#090a10]/95 backdrop-blur-xl px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.06]">
            <Link
              href="/vitalssniper"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black hover:bg-gray-100 transition-all"
            >
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Get VitalsSniper PRO: $39</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
