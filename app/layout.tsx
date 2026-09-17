import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://webaudits.pro'),
  title: 'Web Audits Helper | VitalsSniper PRO - Web Tools Reviewed, Ranked, and Trusted',
  description: 'Your trusted guide to web performance tools, hosting, and site speed. Independent reviews, speed benchmarks, and our flagship VitalsSniper PRO inspector.',
  icons: {
    icon: '/assets/appsumo_icon_512x512.png',
  },
  openGraph: {
    title: 'Web Audits Helper - Web Tools Reviewed, Ranked, and Trusted',
    description: 'Independent reviews of hosting, page builders, SEO tools, and web performance software. Plus VitalsSniper PRO - the 50ms website forensics inspector.',
    images: ['/assets/appsumo_hero_1920x1080.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-[#090a10] text-[#f9fafb] antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        <div className="ambient-glow" />
        {children}
      </body>
    </html>
  );
}
