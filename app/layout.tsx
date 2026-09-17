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
  metadataBase: new URL('https://webaudits.pro'),
  title: 'Web Audits Helper | VitalsSniper PRO - Practical Web Intelligence for Better Websites',
  description: 'Digital publication and tools platform for web performance, technical SEO, AI and GEO readiness, and conversion optimization. Includes VitalsSniper PRO.',
  icons: {
    icon: '/assets/appsumo_icon_512x512.png',
  },
  openGraph: {
    title: 'Web Audits Helper - Practical Web Intelligence for Better Websites',
    description: 'Analyze websites, discover problems, learn how to fix them, and find the tools that can help. Educational guides, independent tool reviews, and proprietary audit tools.',
    images: ['/assets/appsumo_hero_1920x1080.png'],
  },
  verification: {
    google: 'MFBAeQ1oIPTijXK0ARXfJSf52mZCWjbCk1XMYnu9lyE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}>
      <body className="bg-[#faf8f5] text-[#18181b] antialiased selection:bg-terracotta/20 selection:text-terracotta-dark min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
