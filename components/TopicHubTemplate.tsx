import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost } from '@/data/posts';
import { WebTool } from '@/data/tools';
import { Product } from '@/data/products';
import { ResearchStudy } from '@/data/research';
import {
  ArrowRight,
  BookOpen,
  Wrench,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface TopicHubProps {
  slug: string;
  title: string;
  subtitle: string;
  pillarSummary: string;
  categoryName: string;
  articles: BlogPost[];
  tools: WebTool[];
  researchStudies: ResearchStudy[];
  products: Product[];
  faqs: FaqItem[];
}

export default function TopicHubTemplate({
  slug,
  title,
  subtitle,
  pillarSummary,
  categoryName,
  articles,
  tools,
  researchStudies,
  products,
  faqs,
}: TopicHubProps) {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      {/* Hero Header */}
      <div className="py-16 border-b border-sand-300 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <nav className="flex items-center gap-2 text-xs text-charcoal-muted mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:underline">Articles</Link>
            <span>/</span>
            <span className="font-semibold text-charcoal">{categoryName}</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-[#F7F4EE] px-3 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-xs">
            <BookOpen className="h-3.5 w-3.5 text-accent" />
            <span>Pillar Topic Knowledge Hub</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            {title}
          </h1>

          <p className="text-base text-charcoal-muted max-w-3xl leading-relaxed mb-6">
            {subtitle}
          </p>

          <div className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300 text-xs text-charcoal leading-relaxed max-w-3xl">
            <strong className="text-charcoal block mb-1">Pillar Synthesis:</strong>
            {pillarSummary}
          </div>
        </div>
      </div>

      <div className="py-16 mx-auto max-w-5xl px-6 flex-1 w-full space-y-16">
        
        {/* Curated Diagnostic Tools */}
        {tools.length > 0 && (
          <section>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="editorial-pill">Interactive Utilities</span>
                <h2 className="font-editorial text-2xl font-bold text-charcoal mt-1">
                  Topic Diagnostic Tools
                </h2>
              </div>
              <Link href="/tools" className="text-xs font-bold text-accent hover:underline">
                All Tools &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.slug}
                  className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl mb-3 block">{tool.icon}</span>
                    <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                      {tool.shortDescription}
                    </p>
                    {tool.referenceBenchmark && (
                      <div className="p-2 rounded bg-[#F7F4EE] border border-sand-300 text-[11px] text-charcoal mb-4">
                        {tool.referenceBenchmark}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center justify-between pt-3 border-t border-sand-300 text-xs font-bold text-accent hover:underline"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Latest Topic Articles & Benchmarks */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <span className="editorial-pill">Knowledge Base</span>
              <h2 className="font-editorial text-2xl font-bold text-charcoal mt-1">
                Articles, Benchmarks &amp; Guides
              </h2>
            </div>
            <Link href="/articles" className="text-xs font-bold text-accent hover:underline">
              Full Archive &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <Link
                key={art.slug}
                href={`/articles/${art.slug}`}
                className="p-6 rounded-2xl border border-sand-300 bg-white hover:border-accent/40 transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="editorial-pill">{art.category}</span>
                    <span className="text-xs text-charcoal-muted">{art.readTime}</span>
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-charcoal group-hover:text-accent transition-colors mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-sand-300 flex items-center justify-between text-xs font-bold text-accent">
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Relevant Research & Datasets */}
        {researchStudies.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="editorial-pill">Empirical Datasets</span>
              <h2 className="font-editorial text-2xl font-bold text-charcoal mt-1">
                Related Research Studies
              </h2>
            </div>

            <div className="space-y-4">
              {researchStudies.map((study) => (
                <div
                  key={study.slug}
                  className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-accent">{study.sampleSize}</span>
                    <span className="text-xs text-charcoal-muted">{study.date}</span>
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-charcoal mb-2">
                    <Link href={`/research/${study.slug}`} className="hover:text-accent transition-colors">
                      {study.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-charcoal-muted mb-4">
                    {study.subtitle}
                  </p>
                  <Link
                    href={`/research/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    <span>Inspect Study Methodology &amp; Findings</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Evaluated Software & Reviews */}
        {products.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="editorial-pill">Lab Evaluations</span>
              <h2 className="font-editorial text-2xl font-bold text-charcoal mt-1">
                Tested Tools &amp; Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.slug}
                  className="rounded-2xl border border-sand-300 bg-white p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-2xl">{prod.iconEmoji}</span>
                      <span className="text-[10px] font-mono font-bold text-accent bg-[#F7F4EE] px-2 py-0.5 rounded border border-sand-300">
                        {prod.pricingModel}
                      </span>
                    </div>

                    <h3 className="font-editorial text-lg font-bold text-charcoal mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted mb-3 line-clamp-2">
                      {prod.verdict}
                    </p>

                    <div className="p-2.5 rounded-lg bg-[#F7F4EE] border border-sand-300 text-[11px] text-charcoal mb-4">
                      <span className="font-bold block text-[10px] uppercase text-charcoal-muted">Observed Metric:</span>
                      {prod.observedMetric}
                    </div>
                  </div>

                  <Link
                    href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline pt-3 border-t border-sand-300"
                  >
                    <span>Read Full Evaluation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="rounded-2xl border border-sand-300 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-5 w-5 text-accent" />
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                Frequently Asked Technical Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F7F4EE] border border-sand-300">
                  <h3 className="text-sm font-bold text-charcoal mb-2">{faq.question}</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      <Footer />
    </main>
  );
}
