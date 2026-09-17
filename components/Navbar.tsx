'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Menu, X, ArrowRight, Wrench } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface NavbarProps {
  onOpenCheckout?: (tier?: any) => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Articles', href: '/articles' },
    { label: 'Tools', href: '/tools' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-300 bg-[#faf8f5]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        
        {/* Brand Logo & Editorial Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-sand-300 bg-white shadow-sm transition-transform group-hover:scale-105">
            <Image
              src="/assets/appsumo_icon_512x512.png"
              alt="Web Audits Helper"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-editorial text-2xl font-bold tracking-tight text-charcoal">
              Web Audits
            </span>
            <span className="rounded-md border border-terracotta/20 bg-terracotta/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-terracotta">
              Helper
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-charcoal-muted transition-colors hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Primary Header CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-terracotta px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-terracotta-dark hover:shadow hover:scale-[1.02]"
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>Try Free Tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-sand-300 text-charcoal hover:bg-sand-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sand-300 bg-[#faf8f5] px-6 py-5 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-charcoal hover:bg-sand-200 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-sand-300">
            <Link
              href="/tools"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-terracotta px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-terracotta-dark transition-all"
            >
              <Wrench className="h-4 w-4" />
              <span>Try Free Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
