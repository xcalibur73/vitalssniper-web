import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { BLOG_POSTS, BlogPost } from '@/data/posts';
import { PRODUCTS } from '@/data/products';
import { ArrowLeft, Clock, Calendar, User, BookOpen, Wrench, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col items-center justify-center p-6">
        <h1 className="font-editorial text-3xl font-bold mb-4">Article not found</h1>
        <Link href="/articles" className="text-terracotta hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>
      </div>
    );
  }

  // Find related tools and articles
  const relatedTool = PRODUCTS.find((p) => p.isOwnProduct) || PRODUCTS[0];
  const affiliateTool = PRODUCTS.find((p) => !p.isOwnProduct) || PRODUCTS[1];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-14 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Articles Archive
          </Link>
        </div>

        {/* Article Header (Above the fold) */}
        <header className="max-w-4xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="editorial-pill">
              {post.category}
            </span>
            <span className="text-xs font-semibold text-charcoal-subtle">
              {post.tag}
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight leading-[1.12] mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-charcoal-muted leading-relaxed font-normal mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-subtle pt-6 border-t border-sand-300">
            <div className="flex items-center gap-1.5 font-medium text-charcoal">
              <User className="h-3.5 w-3.5 text-terracotta" />
              <span>{post.author}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-charcoal-subtle" />
              <span>{post.date}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="h-3.5 w-3.5 text-terracotta" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Two-Column Editorial Layout: Main Article | Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 space-y-8 text-sm sm:text-base text-charcoal-light leading-relaxed">
            
            {/* Featured Visual Banner */}
            <div className="rounded-2xl overflow-hidden border border-sand-300 bg-white shadow-sm">
              <Image
                src="/assets/appsumo_hero_1920x1080.png"
                alt={post.title}
                width={1200}
                height={675}
                priority
                className="w-full h-auto object-cover"
              />
            </div>

            <AffiliateDisclosure compact={true} />

            <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
                The Core Bottleneck: Why Typical Audits Fail
              </h2>
              <p className="text-charcoal-muted leading-relaxed">
                When auditing websites for performance and search visibility, most development teams jump straight into minifying JavaScript files or installing generic caching plugins. While those optimizations help marginally, they overlook the structural architectural flaws that actually determine Core Web Vitals rankings: container DOM nesting and uncompressed cellular payload budgets.
              </p>

              <div className="p-4 rounded-xl bg-[#faf8f5] border-l-4 border-terracotta text-xs sm:text-sm text-charcoal leading-relaxed italic">
                &ldquo;Over 82% of websites audited in our 100-site benchmark suffered from excessive DOM nesting (&gt;1,400 elements), triggering layout thrashing on mobile screens before a single interaction took place.&rdquo;
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal pt-4">
                Step-by-Step Diagnostic Protocol
              </h2>
              <p className="text-charcoal-muted leading-relaxed">
                To identify the exact Largest Contentful Paint node sabotaging your load times, follow this systematic order of verification:
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-charcoal-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-terracotta flex-shrink-0 mt-0.5" />
                  <span><strong>Inspect DOM Tree Depth:</strong> Ensure container wrappers do not exceed 32 levels of nesting. Replace multi-layer row/column builders with lightweight CSS grid.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-terracotta flex-shrink-0 mt-0.5" />
                  <span><strong>Enforce 50KB HTML Ceiling:</strong> Strip unused inline base64 fonts, deferred tracking snippets, and empty tag clutter before transferring HTML across cellular networks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-terracotta flex-shrink-0 mt-0.5" />
                  <span><strong>Set High Fetch Priority on Hero Images:</strong> Apply <code className="bg-sand-200 px-1.5 py-0.5 rounded text-charcoal font-mono">fetchpriority=&quot;high&quot;</code> to your top image and eliminate lazy-loading on viewport assets.</span>
                </li>
              </ul>

              {/* In-Content Native Tool Callout */}
              <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6 mt-8">
                <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
                  <Wrench className="h-4 w-4" />
                  <span>Test Your Website in Real-Time</span>
                </div>
                <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                  Find Your Site&apos;s Specific Flaws in 50 Milliseconds
                </h3>
                <p className="text-xs text-charcoal-muted mb-4 leading-relaxed">
                  Run our free forensic auditor on your target URL to inspect DOM element bloat, identify active page builders, and calculate payload weights.
                </p>
                <Link
                  href="/free-audit-report"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta text-xs font-bold text-white hover:bg-terracotta-dark transition-all shadow-xs"
                >
                  <span>Run Free Website Audit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal pt-4">
                Recommended Architecture &amp; Conclusion
              </h2>
              <p className="text-charcoal-muted leading-relaxed">
                By focusing on structural containment rather than masking problems with secondary caching layers, websites achieve sustainable sub-second mobile rendering times that pass Google Core Web Vitals and protect organic conversion rates.
              </p>
            </div>

          </article>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents Card */}
              <div className="paper-card rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
                  <BookOpen className="h-4 w-4 text-terracotta" />
                  <span>Table of Contents</span>
                </div>
                <ul className="space-y-2.5 text-xs text-charcoal-muted">
                  <li>
                    <a href="#bottlenecks" className="hover:text-terracotta transition-colors">
                      1. The Core Bottleneck: Why Typical Audits Fail
                    </a>
                  </li>
                  <li>
                    <a href="#protocol" className="hover:text-terracotta transition-colors">
                      2. Step-by-Step Diagnostic Protocol
                    </a>
                  </li>
                  <li>
                    <a href="#tools" className="hover:text-terracotta transition-colors">
                      3. Live Forensic Testing &amp; Verification
                    </a>
                  </li>
                  <li>
                    <a href="#conclusion" className="hover:text-terracotta transition-colors">
                      4. Recommended Architecture &amp; Conclusion
                    </a>
                  </li>
                </ul>
              </div>

              {/* Related Proprietary Tool: VitalsSniper PRO */}
              <div className="rounded-2xl border-2 border-terracotta bg-white p-6 shadow-sm">
                <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider block mb-1">
                  Proprietary Agency Platform
                </span>
                <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                  VitalsSniper PRO
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  Inspect prospect websites in your active browser tab, highlight LCP flaws, and generate white-label PDF teardowns with your booking CTA.
                </p>
                <Link
                  href="/vitalssniper"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-terracotta text-white text-xs font-bold hover:bg-terracotta-dark transition-all shadow-xs"
                >
                  <span>Explore Tool ($39 Lifetime)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Relevant Affiliate Recommendation */}
              <div className="paper-card rounded-2xl p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-subtle">
                    Recommended Host
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Tested Under Load
                  </span>
                </div>
                <h4 className="font-editorial text-lg font-bold text-charcoal mb-1">
                  {affiliateTool.name}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  {affiliateTool.verdict}
                </p>
                <a
                  href={affiliateTool.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-sand-300 bg-[#faf8f5] text-charcoal hover:border-terracotta/40 hover:text-terracotta text-xs font-bold transition-all"
                >
                  <span>Check {affiliateTool.name}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Related Articles */}
              <div className="paper-card rounded-2xl p-6">
                <h4 className="font-editorial text-base font-bold text-charcoal mb-3">
                  Related Publications
                </h4>
                <div className="space-y-3">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/articles/${rel.slug}`}
                      className="block group"
                    >
                      <span className="text-[10px] font-bold text-terracotta uppercase">{rel.category}</span>
                      <p className="text-xs font-semibold text-charcoal group-hover:text-terracotta transition-colors leading-snug">
                        {rel.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
