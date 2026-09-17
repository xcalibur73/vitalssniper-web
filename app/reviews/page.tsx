import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import ReviewsPageClient from '@/components/ReviewsPageClient';

export const metadata: Metadata = {
  title: 'Software Reviews & Benchmarks | Web Audits',
  description: 'Independent, data-driven reviews of hosting providers, page builders, caching plugins, and SEO tools tested under controlled lab conditions.',
  alternates: {
    canonical: 'https://www.webaudits.pro/reviews'
  }
};

const CATEGORIES = ['All', 'Speed & Performance', 'Hosting & CDN', 'Page Builders', 'SEO Tools', 'Analytics'];

export default function ReviewsPage() {
  return <ReviewsPageClient products={PRODUCTS} categories={CATEGORIES} />;
}
