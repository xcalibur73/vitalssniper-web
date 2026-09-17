import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import { BLOG_POSTS } from '@/data/posts';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#08090e] bg-tech-grid text-[#f9fafb] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Reviews & Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Web Performance Blog</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            In-depth reviews, speed benchmarks, and hands-on guides for agencies and web professionals.
          </p>
        </header>

        <div className="mb-16">
          <BlogPreview posts={BLOG_POSTS} />
        </div>

        <div className="text-center bg-[#12141d] rounded-2xl p-8 border border-white/5 max-w-2xl mx-auto">
          <p className="text-lg font-medium mb-4">More reviews coming soon. Subscribe to get notified.</p>
          <p className="text-gray-400">
            Reach out at <a href="mailto:support@webaudits.pro" className="text-emerald-400 hover:underline">support@webaudits.pro</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
