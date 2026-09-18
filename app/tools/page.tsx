import type { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsPageClient from '@/components/ToolsPageClient';

export const metadata: Metadata = {
  title: 'Free Website Audit Tools | Web Audits',
  description: 'Free in browser diagnostic tools for TTFB, DOM depth, LCP detection, page weight analysis, and SEO meta tag validation.',
  alternates: {
    canonical: 'https://www.webaudits.pro/tools'
  }
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />
      <ToolsPageClient />
      <Footer />
    </main>
  );
}
