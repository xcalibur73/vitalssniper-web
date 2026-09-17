'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsGrid from '@/components/ToolsGrid';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { PRODUCTS } from '@/data/products';

export default function ToolsCatalog() {
  return (
    <div className="min-h-screen bg-[#08090e] bg-tech-grid text-[#f9fafb]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Curated Web Tool Reviews
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Web Tools Catalog</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Independent reviews and speed benchmarks of the best hosting, SEO, performance, and web development tools.
          </p>
        </header>

        <div className="mb-12">
          <AffiliateDisclosure />
        </div>

        <ToolsGrid products={PRODUCTS} showFilters={true} />
      </main>
      <Footer />
    </div>
  );
}
