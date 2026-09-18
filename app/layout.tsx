import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono, Newsreader } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.webaudits.pro'),
  title: 'Web Audits - Core Web Vitals, SEO & Speed Benchmarks',
  description: 'Digital publication and tools platform for web performance, technical SEO, AI and GEO readiness, and conversion optimization. Includes VitalsSniper PRO.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Web Audits - Core Web Vitals, SEO & Speed Benchmarks',
    description: 'Analyze websites, discover problems, learn how to fix them, and find the tools that can help. Educational guides, independent tool reviews, and proprietary audit tools.',
    images: ['/assets/appsumo_hero_1920x1080.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webauditspro',
    creator: '@webauditspro',
  },
  verification: {
    google: 'MFBAeQ1oIPTijXK0ARXfJSf52mZCWjbCk1XMYnu9lyE',
    other: {
      'msvalidate.01': '9B9805DCDD345627FDDA044CD8B8BF2B',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}>
      <body className="bg-[#F7F4EE] text-[#20201E] antialiased selection:bg-terracotta/20 selection:text-terracotta-dark min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
