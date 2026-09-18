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
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      {/* Hero Header */}
      <div className="py-16 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:underline">Articles</Link>
            <span>/</span>
            <span className="font-semibold text-[#0F0F0F]">{categoryName}</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB] mb-4 shadow-xs">
            <BookOpen className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Pillar Topic Knowledge Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-base text-[#4B5563] max-w-3xl leading-relaxed mb-6">
            {subtitle}
          </p>

          <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#0F0F0F] leading-relaxed max-w-3xl">
            <strong className="text-[#0F0F0F] block mb-1">Pillar Synthesis:</strong>
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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">Interactive Utilities</span>
                <h2 className="text-2xl font-bold text-[#0F0F0F] mt-1">
                  Topic Diagnostic Tools
                </h2>
              </div>
              <Link href="/tools" className="text-xs font-bold text-[#2563EB] hover:underline">
                All Tools &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.slug}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs flex flex-col justify-between hover:border-[#2563EB]/40 transition-all"
                >
                  <div>
                    <span className="text-3xl mb-3 block">{tool.icon}</span>
                    <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                      {tool.shortDescription}
                    </p>
                    {tool.referenceBenchmark && (
                      <div className="p-2 rounded bg-[#F8F8F8] border border-[#E5E7EB] text-[11px] text-[#0F0F0F] mb-4">
                        {tool.referenceBenchmark}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-xs font-bold text-[#2563EB] hover:underline"
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">Knowledge Base</span>
              <h2 className="text-2xl font-bold text-[#0F0F0F] mt-1">
                Articles, Benchmarks &amp; Guides
              </h2>
            </div>
            <Link href="/articles" className="text-xs font-bold text-[#2563EB] hover:underline">
              Full Archive &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <Link
                key={art.slug}
                href={`/articles/${art.slug}`}
                className="p-6 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#2563EB]/40 transition-all shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-[#4B5563]">{art.category}</span>
                    <span className="text-xs text-[#6B7280]">{art.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#2563EB]">
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">Empirical Datasets</span>
              <h2 className="text-2xl font-bold text-[#0F0F0F] mt-1">
                Related Research Studies
              </h2>
            </div>

            <div className="space-y-4">
              {researchStudies.map((study) => (
                <div
                  key={study.slug}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB]">{study.sampleSize}</span>
                    <span className="text-xs text-[#6B7280]">{study.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">
                    <Link href={`/research/${study.slug}`} className="hover:text-[#2563EB] transition-colors">
                      {study.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#4B5563] mb-4">
                    {study.subtitle}
                  </p>
                  <Link
                    href={`/research/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">Lab Evaluations</span>
              <h2 className="text-2xl font-bold text-[#0F0F0F] mt-1">
                Tested Tools &amp; Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.slug}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs flex flex-col justify-between hover:border-[#2563EB]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-2xl">{prod.iconEmoji}</span>
                      <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#F8F8F8] px-2 py-0.5 rounded border border-[#E5E7EB]">
                        {prod.pricingModel}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F0F0F] mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#4B5563] mb-3 line-clamp-2">
                      {prod.verdict}
                    </p>

                    <div className="p-2.5 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-[11px] text-[#0F0F0F] mb-4">
                      <span className="font-bold block text-[10px] uppercase text-[#6B7280]">Observed Metric:</span>
                      {prod.observedMetric}
                    </div>
                  </div>

                  <Link
                    href={prod.isOwnProduct ? '/products/vitalssniper-pro' : `/reviews/${prod.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline pt-3 border-t border-[#E5E7EB]"
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
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-2xl font-bold text-[#0F0F0F]">
                Frequently Asked Technical Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-[#0F0F0F] mb-2">{faq.question}</h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed">{faq.answer}</p>
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
