'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS, BlogPost } from '@/data/posts';
import { ArrowRight, Clock, User, Sparkles } from 'lucide-react';

interface FeaturedArticlesGridProps {
  posts?: BlogPost[];
  limit?: number;
}

export default function FeaturedArticlesGrid({
  posts = BLOG_POSTS,
  limit = 6,
}: FeaturedArticlesGridProps) {
  const displayPosts = posts.slice(0, limit);

  return (
    <section className="py-20 border-b border-sand-300 bg-[#faf8f5]">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Independent Research &amp; Guides
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mt-1">
              Latest Technical Publications
            </h2>
            <p className="text-charcoal-muted max-w-xl text-sm mt-2">
              Actionable guides, speed benchmarks, and optimization playbooks across all six core disciplines.
            </p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-bold text-terracotta hover:underline"
          >
            <span>Browse All Articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 3-Column Editorial Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <article
              key={post.slug}
              className="paper-card rounded-2xl p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Category Pill & Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="editorial-pill">
                    {post.category}
                  </span>
                  <span className="text-[11px] font-semibold text-charcoal-subtle">
                    {post.tag}
                  </span>
                </div>

                {/* Headline in Serif */}
                <h3 className="font-editorial text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors leading-snug mb-3">
                  <Link href={`/articles/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Byline & Read Time Footer */}
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

      </div>
    </section>
  );
}
