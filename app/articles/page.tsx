import type { Metadata } from 'next';
import { BLOG_POSTS, EDITORIAL_BEATS } from '@/data/posts';
import ArticlesPageClient from '@/components/ArticlesPageClient';

export const metadata: Metadata = {
  title: 'Articles & Guides | Web Audits',
  description: 'In-depth forensic guides on Core Web Vitals, DOM optimization, technical SEO, and conversion architecture.',
  alternates: {
    canonical: 'https://www.webaudits.pro/articles',
  },
};

export default function ArticlesPage() {
  return <ArticlesPageClient posts={BLOG_POSTS} beats={EDITORIAL_BEATS} />;
}
