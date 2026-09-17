'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Key, Sparkles, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface NavbarProps {
  onOpenCheckout?: (tier: 'solo' | 'agency') => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps) {
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

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          <a href="/#auditor" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
            Live Demo
          </a>
          <a href="/#deliverables" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
            Capabilities
          </a>
          <Link href="/pricing" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
            Pricing
          </Link>
          <a href="/#activate" className="text-sm font-medium text-gray-400 transition-colors hover:text-emerald-400 flex items-center gap-1.5">
            <Key className="h-3.5 w-3.5" />
            <span>Redeem & Download</span>
          </a>
          <a href="/#docs" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
            Playbook
          </a>
          <a href="/#faq" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
            FAQ
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="#activate"
            className="hidden rounded-lg border border-white/10 bg-surface px-3.5 py-2 text-xs font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white sm:flex items-center gap-1.5"
          >
            <Key className="h-3 w-3 text-emerald-400" />
            <span>Redeem Code</span>
          </a>

          <a
            href={SITE_CONFIG.appsumoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black shadow-[0_4px_14px_rgba(255,255,255,0.2)] transition-all hover:bg-gray-100 hover:scale-[1.02]"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Buy on AppSumo</span>
            <span className="rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-extrabold">$39</span>
          </a>
        </div>

      </div>
    </header>
  );
}
