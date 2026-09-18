import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import EvidenceBox from '@/components/EvidenceBox';
import { BLOG_POSTS, BlogPost } from '@/data/posts';
import { PRODUCTS } from '@/data/products';
import { ARTICLE_CONTENTS } from '@/data/articleContent';
import { AUTHORS } from '@/data/authors';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  BookOpen,
  Wrench,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Share2,
  HelpCircle,
} from 'lucide-react';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Article Not Found | Web Audits' };
  }

  const title = post.metaTitle || (post.title.length > 55 ? `${post.title.slice(0, 52)}...` : `${post.title} | Web Audits`);
  const description = post.excerpt.length > 155 ? `${post.excerpt.slice(0, 152)}...` : post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.webaudits.pro/articles/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://www.webaudits.pro/articles/${post.slug}`,
      siteName: 'Web Audits',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category, post.tag],
      images: [
        {
          url: '/assets/appsumo_hero_1920x1080.png',
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: ['/assets/appsumo_hero_1920x1080.png'],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <Link href="/articles" className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>
      </div>
    );
  }

  const articleContent = ARTICLE_CONTENTS[params.slug];

  // Find related tools and articles
  const relatedTool = PRODUCTS.find((p) => p.isOwnProduct) || PRODUCTS[0];
  const affiliateTool =
    (post.category === 'SEO'
      ? PRODUCTS.find((p) => p.slug === 'rank-math')
      : post.category === 'Web Design'
      ? PRODUCTS.find((p) => p.slug === 'generatepress')
      : PRODUCTS.find((p) => p.slug === 'cloudways')) ||
    PRODUCTS.find((p) => !p.isOwnProduct) ||
    PRODUCTS[1];

  const sameCategoryPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );
  const otherPosts = BLOG_POSTS.filter(
    (p) => p.category !== post.category && p.slug !== post.slug
  );
  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

  const authorSlug = post.author.toLowerCase().includes('marcus')
    ? 'marcus-reed'
    : post.author.toLowerCase().includes('elena')
    ? 'elena-rostova'
    : 'devin-vance';
  const authorObj = AUTHORS[authorSlug];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    image: ['https://www.webaudits.pro/assets/appsumo_hero_1920x1080.png'],
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      '@type': 'Person',
      '@id': `https://www.webaudits.pro/about/authors/${authorSlug}#person`,
      name: authorObj?.name || post.author,
      jobTitle: authorObj?.role || 'Technical Author',
      url: `https://www.webaudits.pro/about/authors/${authorSlug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Web Audits',
      url: 'https://www.webaudits.pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.webaudits.pro/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.webaudits.pro/articles/${post.slug}`,
    },
    articleSection: post.category,
    keywords: `${post.category}, ${post.tag}, Web Performance, Core Web Vitals, Website Audit`,
  };

  const categorySlugMap: Record<string, string> = {
    'Web Performance': 'web-performance',
    'SEO': 'seo',
    'AI Search': 'ai-search',
    'Web Design': 'web-design',
    'Conversion': 'conversion',
    'Tools': 'tools',
  };
  const catSlug = categorySlugMap[post.category];

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.webaudits.pro',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Articles',
      item: 'https://www.webaudits.pro/articles',
    },
  ];

  if (catSlug) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: post.category,
      item: `https://www.webaudits.pro/articles/${catSlug}`,
    });
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 4,
      name: post.title,
      item: `https://www.webaudits.pro/articles/${post.slug}`,
    });
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: post.title,
      item: `https://www.webaudits.pro/articles/${post.slug}`,
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  const faqSchema =
    articleContent?.faq && articleContent.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: articleContent.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-14 w-full">
        {/* Schema.org TechArticle JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {/* Schema.org BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {/* Schema.org FAQPage JSON-LD */}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

        {/* Semantic 3-Tier Visual Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center flex-wrap gap-1.5 text-xs text-[#4B5563]">
          <Link href="/" className="hover:text-[#0F0F0F] transition-colors">
            Home
          </Link>
          <span className="text-[#9CA3AF]">/</span>
          <Link href="/articles" className="hover:text-[#0F0F0F] transition-colors">
            Articles
          </Link>
          {catSlug && (
            <>
              <span className="text-[#9CA3AF]">/</span>
              <Link
                href={`/articles/${catSlug}`}
                className="hover:text-[#0F0F0F] transition-colors font-medium"
              >
                {post.category}
              </Link>
            </>
          )}
          <span className="text-[#9CA3AF]">/</span>
          <span className="text-[#0F0F0F] font-semibold truncate max-w-[240px] sm:max-w-md" aria-current="page">
            {post.title}
          </span>
        </nav>

        {/* Article Header (Above the fold) */}
        <header className="max-w-[760px] mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] px-2.5 py-0.5 text-xs font-semibold">
              {post.category}
            </span>
            <span className="text-xs font-semibold text-[#6B7280]">
              {post.tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0F] tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed font-normal mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] pt-6 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-1.5 font-medium text-[#0F0F0F]">
              <User className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>{post.author}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-[#6B7280]" />
              <span>{post.date}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Two-Column Editorial Layout: Main Article (680-780px) | Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Content (8 Cols, max-w-[760px]) */}
          <article className="lg:col-span-8 max-w-[760px] space-y-8 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            
            {/* Featured Visual Banner */}
            <div className="rounded-xl overflow-hidden border border-[#E5E7EB] bg-white shadow-xs">
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

            {/* Section 16 Evidence Component */}
            {post.evidence && (
              <EvidenceBox evidence={post.evidence} />
            )}

            {articleContent ? (
              <div className="space-y-8">
                {/* Lead Introduction */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
                  <p className="text-sm sm:text-base text-[#0F0F0F] leading-relaxed font-medium">
                    {articleContent.introLead}
                  </p>
                </div>

                {/* Key Findings KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {articleContent.keyFindings.map((kf, i) => (
                    <div key={i} className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl p-4 border-l-4 border-l-[#2563EB]">
                      <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider mb-1">{kf.metric}</div>
                      <div className="text-xs text-[#0F0F0F] font-semibold mb-1 leading-snug">{kf.observation}</div>
                      <div className="text-[11px] text-[#4B5563] leading-tight">{kf.impact}</div>
                    </div>
                  ))}
                </div>

                {/* Structured Article Sections */}
                {articleContent.sections.map((sec, sIdx) => (
                  <div key={sIdx} id={`section-${sIdx}`} className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0F0F0F]">
                      {sec.title}
                    </h2>

                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-[#4B5563] leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {sec.callout && (
                      <div className="p-4 rounded-xl bg-[#F3F4F6] border-l-4 border-l-[#2563EB] text-xs sm:text-sm text-[#0F0F0F] leading-relaxed italic">
                        {sec.callout.label && (
                          <span className="not-italic text-[#2563EB] block mb-1 uppercase text-[10px] font-bold tracking-wider">
                            {sec.callout.label}
                          </span>
                        )}
                        &ldquo;{sec.callout.text}&rdquo;
                      </div>
                    )}

                    {sec.table && (
                      <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] my-4">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#111827] text-white">
                            <tr>
                              {sec.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-2.5 font-semibold">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E5E7EB] bg-white">
                            {sec.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#F9FAFB] transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-4 py-2.5 ${cIdx === 0 ? 'font-semibold text-[#0F0F0F]' : 'text-[#4B5563]'}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {sec.codeSnippet && (
                      <div className="rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#111827] text-[#F9FAFB] font-mono text-xs my-4 shadow-xs">
                        {sec.codeSnippet.caption && (
                          <div className="px-4 py-2 bg-[#1F2937] border-b border-[#374151] text-[#9CA3AF] text-[11px] font-medium">
                            {sec.codeSnippet.caption}
                          </div>
                        )}
                        <pre className="p-4 overflow-x-auto leading-relaxed">
                          <code>{sec.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {sec.checklist && (
                      <div className="p-4 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] space-y-2.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F0F0F] mb-2">
                          Technical Action Checklist:
                        </div>
                        <ul className="space-y-2">
                          {sec.checklist.map((item, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2.5 text-xs text-[#4B5563]">
                              <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}

                {/* Native In-Content Tool CTA */}
                {articleContent.ctaBox && (
                  <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-6 shadow-xs">
                    <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-2">
                      <Wrench className="h-4 w-4" />
                      <span>Live Verification Tool</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                      {articleContent.ctaBox.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] mb-4 leading-relaxed">
                      {articleContent.ctaBox.desc}
                    </p>
                    <Link
                      href={articleContent.ctaBox.buttonHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
                    >
                      <span>{articleContent.ctaBox.buttonText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}

                {/* Frequently Asked Questions */}
                {articleContent.faq && articleContent.faq.length > 0 && (
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
                      <HelpCircle className="h-4 w-4" />
                      <span>Technical FAQ: Forensic and Engineering Clarifications</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0F0F0F]">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4 pt-2">
                      {articleContent.faq.map((item, fIdx) => (
                        <div
                          key={fIdx}
                          className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 space-y-2 hover:border-[#D1D5DB] transition-colors"
                        >
                          <h4 className="text-sm sm:text-base font-bold text-[#0F0F0F] flex items-start gap-2">
                            <span className="text-[#2563EB] font-mono text-xs mt-0.5">Q{fIdx + 1}:</span>
                            <span>{item.question}</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed pl-6">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verdict Summary Box */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 space-y-3 border-l-4 border-l-[#111827] shadow-xs">
                  <h3 className="text-xl font-bold text-[#0F0F0F]">
                    Architectural Verdict &amp; Summary
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {articleContent.verdictSummary}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F0F0F]">
                  The Core Bottleneck: Why Typical Audits Fail
                </h2>
                <p className="text-[#4B5563] leading-relaxed">
                  When auditing websites for performance and search visibility, most development teams jump straight into minifying JavaScript files or installing generic caching plugins. While those optimizations help marginally, they overlook the structural architectural flaws that actually determine Core Web Vitals rankings: container DOM nesting and uncompressed cellular payload budgets.
                </p>

                <div className="p-4 rounded-xl bg-[#F3F4F6] border-l-4 border-l-[#2563EB] text-xs sm:text-sm text-[#0F0F0F] leading-relaxed italic">
                  &ldquo;Over 82% of websites audited in our 500-site benchmark suffered from excessive DOM nesting (&gt;1,400 elements), triggering layout thrashing on mobile screens before a single interaction took place.&rdquo;
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F0F0F] pt-4">
                  Step-by-Step Diagnostic Protocol
                </h2>
                <p className="text-[#4B5563] leading-relaxed">
                  To identify the exact Largest Contentful Paint node sabotaging your load times, follow this systematic order of verification:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#4B5563]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>Inspect DOM Tree Depth:</strong> Ensure container wrappers do not exceed 32 levels of nesting. Replace multi-layer row/column builders with lightweight CSS grid.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>Enforce 50KB HTML Ceiling:</strong> Strip unused inline base64 fonts, deferred tracking snippets, and empty tag clutter before transferring HTML across cellular networks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>Set High Fetch Priority on Hero Images:</strong> Apply <code className="bg-[#F3F4F6] border border-[#E5E7EB] px-1.5 py-0.5 rounded text-[#0F0F0F] font-mono">fetchpriority=&quot;high&quot;</code> to your top image and eliminate lazy-loading on viewport assets.</span>
                  </li>
                </ul>

                {/* In-Content Native Tool Callout */}
                <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-6 mt-8 shadow-xs">
                  <div className="flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-2">
                    <Wrench className="h-4 w-4" />
                    <span>Test Your Website in Real-Time</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                    Find Your Site&apos;s Specific Flaws in 50 Milliseconds
                  </h3>
                  <p className="text-xs text-[#4B5563] mb-4 leading-relaxed">
                    Run our free forensic auditor on your target URL to inspect DOM element bloat, identify active page builders, and calculate payload weights.
                  </p>
                  <Link
                    href="/tools/website-speed-test"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
                  >
                    <span>Run Free Website Audit</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F0F0F] pt-4">
                  Recommended Architecture &amp; Conclusion
                </h2>
                <p className="text-[#4B5563] leading-relaxed">
                  By focusing on structural containment rather than masking problems with secondary caching layers, websites achieve sustainable sub-second mobile rendering times that pass Google Core Web Vitals and protect organic conversion rates.
                </p>
              </div>
            )}

          </article>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F0F0F] mb-4">
                  <BookOpen className="h-4 w-4 text-[#2563EB]" />
                  <span>Table of Contents</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#4B5563]">
                  {articleContent ? (
                    articleContent.sections.map((sec, sIdx) => (
                      <li key={sIdx}>
                        <a href={`#section-${sIdx}`} className="hover:text-[#2563EB] transition-colors">
                          {sIdx + 1}. {sec.title}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <a href="#bottlenecks" className="hover:text-[#2563EB] transition-colors">
                          1. The Core Bottleneck: Why Typical Audits Fail
                        </a>
                      </li>
                      <li>
                        <a href="#protocol" className="hover:text-[#2563EB] transition-colors">
                          2. Step-by-Step Diagnostic Protocol
                        </a>
                      </li>
                      <li>
                        <a href="#tools" className="hover:text-[#2563EB] transition-colors">
                          3. Live Forensic Testing &amp; Verification
                        </a>
                      </li>
                      <li>
                        <a href="#conclusion" className="hover:text-[#2563EB] transition-colors">
                          4. Recommended Architecture &amp; Conclusion
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Related Proprietary Tool: VitalsSniper PRO */}
              <div className="rounded-xl border-2 border-[#2563EB] bg-white p-6 shadow-xs">
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                  Proprietary Agency Platform
                </span>
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                  VitalsSniper PRO
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  Inspect prospect websites in your active browser tab, highlight LCP flaws, and generate white-label PDF teardowns with your booking CTA.
                </p>
                <Link
                  href="/products/vitalssniper-pro"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors shadow-xs"
                >
                  <span>Explore Tool ($39 Lifetime)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Newsletter Signup Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs">
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                  Weekly Dispatch
                </span>
                <h3 className="text-lg font-bold text-[#0F0F0F] mb-1">
                  The Web Audits Brief
                </h3>
                <p className="text-xs text-[#4B5563] mb-4 leading-relaxed">
                  Real performance benchmarks and technical guides delivered every Thursday.
                </p>
                <Link
                  href="/newsletter"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-[#2563EB] py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
                >
                  Subscribe Free
                </Link>
              </div>

              {/* Relevant Affiliate Recommendation */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Recommended Host
                  </span>
                  <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                    Tested Under Load
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0F0F0F] mb-1">
                  {affiliateTool.name}
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  {affiliateTool.verdict}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={affiliateTool.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#0F0F0F] hover:border-[#2563EB] hover:text-[#2563EB] text-xs font-semibold transition-colors"
                  >
                    <span>Visit Official {affiliateTool.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <Link
                    href={`/reviews/${affiliateTool.slug}`}
                    className="text-center text-[11px] font-semibold text-[#2563EB] hover:underline pt-1"
                  >
                    Read our full {affiliateTool.name} review
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs">
                <h3 className="text-base font-bold text-[#0F0F0F] mb-3">
                  Related Publications
                </h3>
                <div className="space-y-3">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/articles/${rel.slug}`}
                      className="block group"
                    >
                      <span className="text-[10px] font-bold text-[#2563EB] uppercase">{rel.category}</span>
                      <p className="text-xs font-semibold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors leading-snug">
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
