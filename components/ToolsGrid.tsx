'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';

const CATEGORIES = [
  'All',
  'Speed & Performance',
  'Hosting & CDN',
  'Page Builders',
  'SEO Tools',
  'Analytics',
  'Security'
];

interface ToolsGridProps {
  products: Product[];
  limit?: number;
  showFilters?: boolean;
}

export default function ToolsGrid({ products, limit, showFilters = false }: ToolsGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'All') return true;
    return product.category === activeCategory;
  });

  const displayProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;
  const showSeeAll = limit ? filteredProducts.length > limit : false;

  return (
    <div className="w-full">
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product) => {
          const isVitals = product.isOwnProduct;
          const href = isVitals ? '/vitalssniper' : `/tools/${product.slug}`;
          const ctaText = isVitals ? 'See Full Details' : 'View Review';

          return (
            <div
              key={product.slug}
              className="group rounded-2xl border border-white/10 bg-[#11131c] hover:bg-[#151824] p-6 transition-all flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={product.name}>
                    {product.iconEmoji}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-lg">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-gray-400">
                        {product.category}
                      </span>
                      {isVitals && (
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
                          Our Product
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-xs text-white font-mono">
                  {product.pricingModel}
                </span>
                <span className="text-xs text-gray-400 truncate">{product.observedMetric}</span>
              </div>

              <p className="text-sm text-gray-300 line-clamp-1 mb-4 flex-grow">
                {product.verdict}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs text-emerald-400 font-semibold">{product.pricing}</span>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm text-white group-hover:text-emerald-400 transition-colors"
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {showSeeAll && (
        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
          >
            See All Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
