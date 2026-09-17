'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User, Sparkles, BookOpen } from 'lucide-react';
import { BlogPost, EDITORIAL_BEATS, EditorialCategory } from '@/data/posts';

interface EditorialGridProps {
  posts: BlogPost[];
}

export default function EditorialGrid({ posts }: EditorialGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const mainPost = filteredPosts[0] || posts[0];
  const sidePosts = filteredPosts.slice(1, 5);

  return (
    <div className="w-full">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="editorial-pill">Latest From Web Audits</span>
            <span className="text-xs text-charcoal-muted font-medium">Independent Investigation</span>
          </div>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
            Engineering &amp; Performance Journalism
          </h2>
        </div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
        >
          <span>View All Articles</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Topic Navigation Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-sand-300 no-scrollbar">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'All'
              ? 'bg-charcoal text-white'
              : 'bg-white border border-sand-300 text-charcoal-muted hover:text-charcoal hover:border-charcoal'
          }`}
        >
          All Beats
        </button>
        {EDITORIAL_BEATS.map((beat) => (
          <button
            key={beat.slug}
            onClick={() => setActiveCategory(beat.name)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === beat.name
                ? 'bg-charcoal text-white'
                : 'bg-white border border-sand-300 text-charcoal-muted hover:text-charcoal hover:border-charcoal'
            }`}
          >
            {beat.name}
          </button>
        ))}
      </div>

      {/* Asymmetric Magazine Layout: 1 Large Left, 4 Smaller Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Large Featured Story (Left 7 cols) */}
        {mainPost && (
          <div className="lg:col-span-7">
            <article className="h-full rounded-2xl border border-sand-300 bg-white p-8 shadow-sm flex flex-col justify-between group hover:border-accent/40 transition-all">
              <div>
                <div className="flex items-center gap-3 text-xs mb-4">
                  <span className="rounded-md bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent uppercase tracking-wider">
                    {mainPost.category}
                  </span>
                  <span className="text-charcoal-muted">{mainPost.date}</span>
                  <span className="text-charcoal-muted">&bull;</span>
                  <span className="flex items-center gap-1 text-charcoal-muted">
                    <Clock className="h-3.5 w-3.5" />
                    {mainPost.readTime}
                  </span>
                </div>

                <Link href={`/articles/${mainPost.slug}`}>
                  <h3 className="font-editorial text-2xl md:text-3xl font-bold text-charcoal group-hover:text-accent transition-colors leading-tight mb-4">
                    {mainPost.title}
                  </h3>
                </Link>

                <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                  {mainPost.excerpt}
                </p>

                {/* Evidence Callout */}
                {mainPost.evidence && (
                  <div className="rounded-xl border border-sand-300 bg-[#F7F4EE] p-4 text-xs mb-6">
                    <div className="font-bold text-charcoal mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      <span>Empirical Observation:</span>
                    </div>
                    <p className="text-charcoal-muted">
                      {mainPost.evidence.observedResult}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-sand-300">
                <div className="flex items-center gap-2 text-xs text-charcoal">
                  <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[11px] font-bold">
                    {mainPost.author.charAt(0)}
                  </div>
                  <span className="font-medium">{mainPost.author}</span>
                </div>

                <Link
                  href={`/articles/${mainPost.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Investigation</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </div>
        )}

        {/* 4 Smaller Stories Stacked (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {sidePosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-sand-300 bg-white p-5 shadow-sm hover:border-accent/40 transition-all group"
            >
              <div className="flex items-center gap-2 text-[11px] mb-2">
                <span className="font-bold text-accent uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-charcoal-muted">&bull;</span>
                <span className="text-charcoal-muted">{post.readTime}</span>
              </div>

              <Link href={`/articles/${post.slug}`}>
                <h4 className="font-editorial text-base font-bold text-charcoal group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-2">
                  {post.title}
                </h4>
              </Link>

              <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
