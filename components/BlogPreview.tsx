'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/data/posts';

interface BlogPreviewProps {
  posts: BlogPost[];
  limit?: number;
}

export default function BlogPreview({ posts, limit = 3 }: BlogPreviewProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <div
            key={post.slug}
            className="group rounded-2xl border border-white/10 bg-[#11131c] hover:bg-[#151824] p-6 transition-all flex flex-col h-full"
          >
            <div className="mb-4">
              <span className="inline-block px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                {post.category}
              </span>
            </div>

            <Link href={`/blog/${post.slug}`} className="block mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {post.title}
              </h3>
            </Link>

            <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <time dateTime={post.date}>{post.date}</time>
                <span>&bull;</span>
                <span>{post.readTime}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-400 group-hover:text-white transition-colors"
                aria-label={`Read ${post.title}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
        >
          Read All Reviews
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
