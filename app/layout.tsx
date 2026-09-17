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
  metadataBase: new URL('https://vitalssniper.com'),
  title: 'VitalsSniper PRO: Proof-of-Flaw Web Inspector & Outreach Engine',
  description: '1-Click CMS & builder detector, DOM bloat scanner, cellular payload budget inspector, and high-converting agency outreach engine.',
  icons: {
    icon: '/assets/appsumo_icon_512x512.png',
  },
  openGraph: {
    title: 'VitalsSniper PRO: Turn Website Bottlenecks Into High-Ticket Retainers',
    description: '1-Click Page Builder & DOM Bloat Telemetry for Agencies and Digital Consultants.',
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
