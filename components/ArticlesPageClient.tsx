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
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-16 flex-1 w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Publication Archive
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F0F0F] mb-4">
            Technical Articles &amp; Benchmarks
          </h1>
          <p className="text-base text-[#4B5563] leading-relaxed">
            Evidence-driven guides on Core Web Vitals, technical SEO, AI citability, and website speed optimization.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
          {/* Topic Pills */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <button
              onClick={() => setSelectedTopic('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedTopic === 'All'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#0F0F0F]'
              }`}
            >
              All Topics ({posts.length})
            </button>
            {beats.map((beat) => (
              <button
                key={beat.name}
                onClick={() => setSelectedTopic(beat.name)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedTopic === beat.name
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#0F0F0F]'
                }`}
              >
                {beat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles &amp; benchmarks..."
              className="w-full rounded-lg border border-[#E5E7EB] bg-white pl-9 pr-4 py-2 text-xs sm:text-sm text-[#0F0F0F] outline-none placeholder-[#6B7280] focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* Articles List */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-[#E5E7EB] bg-white p-6 flex flex-col justify-between shadow-none transition-colors hover:border-[#D1D5DB] group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-block rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#4B5563]">
                      {post.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B7280]">
                      {post.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-[#0F0F0F] group-hover:text-[#2563EB] transition-colors leading-snug mb-3">
                    <Link href={`/articles/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                  <span className="truncate max-w-[170px] font-medium">{post.author.split(',')[0]}</span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E5E7EB] p-8">
            <p className="text-sm text-[#4B5563] mb-4">No articles match your current topic or search query.</p>
            <button
              onClick={() => {
                setSelectedTopic('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1D4ED8]"
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
