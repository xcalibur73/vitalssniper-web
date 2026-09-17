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
  if (!author) return { title: 'Author Not Found | Web Audits Helper' };

  return {
    title: `${author.name} - ${author.role} | Web Audits Helper`,
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
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      knowsAbout: author.specialization,
      worksFor: {
        '@type': 'Organization',
        name: 'Web Audits Helper',
        url: 'https://www.webaudits.pro',
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      {/* Schema.org ProfilePage & Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navbar />

      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Editorial Archive</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-sand-200 border border-sand-300 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
              <User className="h-10 w-10 text-charcoal-muted" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-[#F7F4EE] px-3 py-1 text-xs font-semibold text-charcoal-muted mb-2 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>Verified Technical Contributor</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
                {author.name}
              </h1>

              <p className="text-sm font-semibold text-accent mt-1">
                {author.role}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-sand-300">
            <p className="text-sm text-charcoal-muted leading-relaxed max-w-3xl">
              {author.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-4xl px-6 flex-1 w-full space-y-12">
        
        {/* Testing Experience & Specialization */}
        <div className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-editorial text-xl font-bold text-charcoal mb-4">
            Laboratory Experience &amp; Specialization
          </h2>

          <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300 mb-6 text-xs text-charcoal leading-relaxed">
            <strong className="text-charcoal block mb-1">Testing Background:</strong>
            {author.testingExperience}
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
            Core Technical Focus:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-muted">
            {author.specialization.map((spec, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Authored Research Studies */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-4 w-4 text-accent" />
            <h2 className="font-editorial text-xl font-bold text-charcoal">
              Empirical Research &amp; Datasets
            </h2>
          </div>

          <div className="space-y-4">
            {authorStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/research/${study.slug}`}
                className="block p-5 rounded-2xl border border-sand-300 bg-white hover:border-accent/40 transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="editorial-pill">Original Study</span>
                  <span className="text-xs text-charcoal-muted">{study.date}</span>
                </div>
                <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-accent transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  {study.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Authored Editorial Articles */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-4 w-4 text-accent" />
            <h2 className="font-editorial text-xl font-bold text-charcoal">
              Published Guides &amp; Benchmarks
            </h2>
          </div>

          <div className="space-y-4">
            {authorArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block p-5 rounded-2xl border border-sand-300 bg-white hover:border-accent/40 transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="editorial-pill">{article.category}</span>
                  <span className="text-xs text-charcoal-muted">{article.readTime}</span>
                </div>
                <h3 className="font-editorial text-lg font-bold text-charcoal group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
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
