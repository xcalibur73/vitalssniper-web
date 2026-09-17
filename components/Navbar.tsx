'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Menu, X, ArrowRight, Wrench, Search } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface NavbarProps {
  onOpenCheckout?: (tier?: any) => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Articles', href: '/articles' },
    { label: 'Tools', href: '/tools' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Comparisons', href: '/comparisons' },
    { label: 'Research', href: '/research' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-300 bg-[#F7F4EE]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        
        {/* Brand Logo & Editorial Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-sand-300 bg-white shadow-sm transition-transform group-hover:scale-105">
            <Image
              src="/assets/appsumo_icon_512x512.png"
              alt="Web Audits"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-editorial text-2xl font-bold tracking-tight text-charcoal">
              Web Audits
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
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

        {/* Right Action Area: Search + Free Audit CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-sand-300 text-charcoal-muted hover:text-charcoal hover:bg-white transition-colors"
            title="Search Web Audits"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <Link
            href="/tools/website-speed-test"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow hover:scale-[1.02]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Free Audit</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-sand-300 text-charcoal hover:bg-sand-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Quick Search Overlay */}
      {searchOpen && (
        <div className="border-t border-sand-300 bg-white px-6 py-4 shadow-sm animate-fadeIn">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/articles?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="max-w-2xl mx-auto flex items-center gap-2"
          >
            <Search className="h-5 w-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search performance guides, tool reviews, or benchmarks..."
              className="flex-1 border-none bg-transparent px-2 py-1 text-sm text-charcoal placeholder-muted focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-lg bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent-dark"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-sand-300 bg-[#F7F4EE] px-6 py-5 space-y-2 shadow-lg">
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
              href="/tools/website-speed-test"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-accent-dark transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Run Free Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
