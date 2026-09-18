import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedArticlesGrid from '@/components/editorial/FeaturedArticlesGrid';
import { BLOG_POSTS } from '@/data/posts';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <header className="mb-14 flex flex-col items-center text-center">
          <div className="border border-sand-300 bg-white text-charcoal-muted px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-2xs">
            Editorial Publications &amp; Guides
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Web Performance &amp; Technical SEO Blog
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl leading-relaxed">
            In-depth guides, speed benchmarks, Core Web Vitals diagnostics, and hands-on case studies.
          </p>
        </header>

        <div className="mb-16">
          <FeaturedArticlesGrid posts={BLOG_POSTS} limit={12} />
        </div>

        <div className="text-center paper-card rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">Want our latest benchmarks in your inbox?</h3>
          <p className="text-xs text-charcoal-muted mb-4">
            Subscribe to our Thursday publication dispatch or reach out directly at{' '}
            <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-terracotta hover:underline font-semibold">
              {SITE_CONFIG.supportEmail}
            </a>
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black transition-colors"
          >
            <span>Browse Full Editorial Archive</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
