import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Blog & Speed Benchmark Archive | Web Audits',
  description: 'Forensic web performance case studies, Core Web Vitals research, and technical SEO guides.',
  alternates: {
    canonical: 'https://www.webaudits.pro/articles',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
