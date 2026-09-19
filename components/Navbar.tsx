'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, Search, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenCheckout?: (tier?: any) => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Tools', href: '/tools' },
    { label: 'Research', href: '/research' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Articles', href: '/articles' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6">
        
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F8F8F8] p-1 flex items-center justify-center transition-transform group-hover:scale-105">
            <Image
              src="/favicon.svg"
              alt="WebAudits.pro"
              width={24}
              height={24}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0F0F0F]">
            WebAudits<span className="text-[#2563EB]">.pro</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#0F0F0F]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Area: Search + Free Audit CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors"
            title="Search WebAudits"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <Link
            href="/tools/website-speed-test"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Run Free Audit</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-[#E5E7EB] text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Quick Search Overlay */}
      {searchOpen && (
        <div className="border-t border-[#E5E7EB] bg-white px-6 py-4 shadow-sm animate-fadeIn">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/articles?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="max-w-2xl mx-auto flex items-center gap-2"
          >
            <Search className="h-4 w-4 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search performance guides, tool reviews, or benchmarks..."
              aria-label="Search performance guides, tool reviews, or benchmarks"
              className="flex-1 border-none bg-transparent px-2 py-1 text-sm text-[#0F0F0F] placeholder-[#6B7280] focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-md bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-6 py-5 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#4B5563] hover:text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E5E7EB]">
            <Link
              href="/tools/website-speed-test"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors min-h-[44px]"
            >
              <Activity className="h-4 w-4" />
              <span>Run Free Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
