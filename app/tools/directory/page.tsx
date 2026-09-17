import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DIRECTORY_TOOLS } from '@/data/tools';
import { Wrench, Star, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Public Web Tools & Software Directory | Web Audits Helper',
  description: 'Curated directory of vetted web performance, SEO, hosting, analytics, and speed optimization tools with transparent pricing and review links.',
};

export default function ToolDirectoryPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-[#F7F4EE] px-3 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-xs">
            <Wrench className="h-3.5 w-3.5 text-accent" />
            <span>Curated Software Index</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Web Tools Directory
          </h1>
          <p className="text-base text-charcoal-muted max-w-2xl leading-relaxed">
            An index of vetted website performance, hosting, SEO, and analytics tools. We document verified pricing models, free plan availability, and empirical testing reviews.
          </p>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-5xl px-6 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIRECTORY_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm hover:border-accent/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="editorial-pill">{tool.category}</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                  {tool.name}
                </h3>

                <div className="space-y-1.5 text-xs text-charcoal-muted mb-4 bg-[#F7F4EE] p-3 rounded-xl border border-sand-300">
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Pricing:</span>
                    <span className="font-bold text-charcoal">{tool.pricing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Free Plan:</span>
                    <span className="font-bold text-charcoal">{tool.freePlan ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sand-300 flex items-center justify-between">
                <Link
                  href={tool.url}
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
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
