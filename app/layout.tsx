import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#F8F8F8] text-[#0F0F0F] antialiased selection:bg-[#2563EB]/15 selection:text-[#1D4ED8] min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
