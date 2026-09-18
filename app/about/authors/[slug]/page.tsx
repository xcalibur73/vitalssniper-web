import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AUTHORS, AUTHORS_LIST } from '@/data/authors';
import { BLOG_POSTS } from '@/data/posts';
import { RESEARCH_STUDIES } from '@/data/research';
import { User, ShieldCheck, ArrowLeft, BookOpen, BarChart3, CheckCircle2 } from 'lucide-react';

interface AuthorPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return AUTHORS_LIST.map((author) => ({
    slug: author.slug,
  }));
}

export function generateMetadata({ params }: AuthorPageProps) {
  const author = AUTHORS[params.slug];
  if (!author) return { title: 'Author Not Found | Web Audits' };

  return {
    title: `${author.name} - ${author.role} | Web Audits`,
    description: author.bio,
    alternates: {
      canonical: `https://www.webaudits.pro/about/authors/${author.slug}`,
    },
  };
}

export default function AuthorProfilePage({ params }: AuthorPageProps) {
  const author = AUTHORS[params.slug];

  if (!author) {
    notFound();
  }

  // Filter articles and research authored by or relevant to this author
  const authorArticles = BLOG_POSTS.slice(0, 3);
  const authorStudies = RESEARCH_STUDIES.slice(0, 2);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `https://www.webaudits.pro/about/authors/${author.slug}#person`,
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      url: `https://www.webaudits.pro/about/authors/${author.slug}`,
      knowsAbout: author.specialization,
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://www.webaudits.pro/#organization',
        name: 'Web Audits',
        url: 'https://www.webaudits.pro',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.webaudits.pro',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://www.webaudits.pro/about',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: author.name,
        item: `https://www.webaudits.pro/about/authors/${author.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      {/* Schema.org ProfilePage & Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Editorial Archive</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gray-100 border border-[#E5E7EB] flex items-center justify-center text-3xl shadow-xs flex-shrink-0">
              <User className="h-10 w-10 text-[#6B7280]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB] mb-2 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>Verified Technical Contributor</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F0F]">
                {author.name}
              </h1>

              <p className="text-sm font-semibold text-[#2563EB] mt-1">
                {author.role}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
            <p className="text-sm text-[#4B5563] leading-relaxed max-w-3xl">
              {author.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-12">
        
        {/* Testing Experience & Specialization */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-[#0F0F0F] mb-4">
            Laboratory Experience &amp; Specialization
          </h2>

          <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] mb-6 text-xs text-[#0F0F0F] leading-relaxed">
            <strong className="text-[#0F0F0F] block mb-1">Testing Background:</strong>
            {author.testingExperience}
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] mb-3">
            Core Technical Focus:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4B5563]">
            {author.specialization.map((spec, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] flex-shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Authored Research Studies */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-4 w-4 text-[#2563EB]" />
            <h2 className="text-xl font-bold text-[#0F0F0F]">
              Empirical Research &amp; Datasets
            </h2>
          </div>

          <div className="space-y-4">
            {authorStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/research/${study.slug}`}
                className="block p-5 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#2563EB]/40 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">Original Study</span>
                  <span className="text-xs text-[#6B7280]">{study.date}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-[#4B5563] mt-1">
                  {study.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Authored Editorial Articles */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-4 w-4 text-[#2563EB]" />
            <h2 className="text-xl font-bold text-[#0F0F0F]">
              Published Guides &amp; Benchmarks
            </h2>
          </div>

          <div className="space-y-4">
            {authorArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block p-5 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#2563EB]/40 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-[#4B5563]">{article.category}</span>
                  <span className="text-xs text-[#6B7280]">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-[#4B5563] mt-1">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
