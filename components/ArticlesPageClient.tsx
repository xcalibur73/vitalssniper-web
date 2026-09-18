'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock, Search, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
  slug: string;
  category: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
}

interface EditorialBeat {
  name: string;
}

interface ArticlesPageClientProps {
  posts: readonly BlogPost[] | BlogPost[];
  beats: readonly EditorialBeat[] | EditorialBeat[];
}

export default function ArticlesPageClient({ posts, beats }: ArticlesPageClientProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesTopic = selectedTopic === 'All' || post.category === selectedTopic;
    const matchesQuery =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#20201E] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-xs font-semibold text-charcoal-muted mb-4 shadow-2xs">
            <span>The Publication Archive</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Technical Articles &amp; Benchmarks
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Evidence-driven guides on Core Web Vitals, technical SEO, AI citability, and website speed optimization.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-sand-300">
          {/* Topic Pills */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <button
              onClick={() => setSelectedTopic('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTopic === 'All'
                  ? 'bg-charcoal text-white'
                  : 'bg-white border border-sand-300 text-charcoal-muted hover:text-charcoal'
              }`}
            >
              All Beats ({posts.length})
            </button>
            {beats.map((beat) => (
              <button
                key={beat.name}
                onClick={() => setSelectedTopic(beat.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedTopic === beat.name
                    ? 'bg-terracotta text-white'
                    : 'bg-white border border-sand-300 text-charcoal-muted hover:text-charcoal'
                }`}
              >
                {beat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-subtle" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications..."
              className="w-full rounded-xl border border-sand-300 bg-white pl-9 pr-4 py-2 text-xs text-charcoal outline-none placeholder:text-charcoal-subtle focus:border-terracotta"
            />
          </div>
        </div>

        {/* Articles List */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="paper-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="editorial-pill">
                      {post.category}
                    </span>
                    <span className="text-[11px] font-semibold text-charcoal-subtle">
                      {post.tag}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors leading-snug mb-3">
                    <Link href={`/articles/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-sand-300 flex items-center justify-between text-[11px] text-charcoal-subtle">
                  <span className="truncate max-w-[170px] font-medium">{post.author.split(',')[0]}</span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="h-3 w-3 text-terracotta" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-sand-300 p-8">
            <p className="text-sm text-charcoal-muted mb-4">No articles match your current topic or search query.</p>
            <button
              onClick={() => {
                setSelectedTopic('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-terracotta text-xs font-bold text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
