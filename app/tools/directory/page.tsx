import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DIRECTORY_TOOLS } from '@/data/tools';
import { Wrench, Star, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Public Web Tools & Software Directory | Web Audits',
  description: 'Curated directory of vetted web performance, SEO, hosting, analytics, and speed optimization tools with transparent pricing and review links.',
};

export default function ToolDirectoryPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB] mb-4 shadow-xs">
            <Wrench className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Curated Software Index</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            Web Tools Directory
          </h1>
          <p className="text-base text-[#4B5563] max-w-2xl leading-relaxed">
            An index of vetted website performance, hosting, SEO, and analytics tools. We document verified pricing models, free plan availability, and empirical testing reviews.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-5xl px-6 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIRECTORY_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-[#4B5563]">{tool.category}</span>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-[#F8F8F8] px-2 py-0.5 rounded border border-[#E5E7EB]">
                    Verified
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                  {tool.name}
                </h3>

                <div className="space-y-1.5 text-xs text-[#4B5563] mb-4 bg-[#F8F8F8] p-3 rounded-xl border border-[#E5E7EB]">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Observed Metric:</span>
                    <span className="font-semibold text-[#0F0F0F] truncate">{tool.testedMetric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Pricing:</span>
                    <span className="font-bold text-[#0F0F0F]">{tool.pricing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Best For:</span>
                    <span className="font-semibold text-[#0F0F0F] truncate">{tool.bestFor}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <Link
                  href={tool.url}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
