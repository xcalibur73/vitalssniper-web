import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VitalsSniper PRO | Fast In-Browser Website Audits & Agency Pitches',
  description: 'Audit prospect websites in 15 seconds, locate Core Web Vitals and DOM bloat bottlenecks, and generate evidence-grounded proposals with VitalsSniper PRO.',
  alternates: {
    canonical: 'https://www.webaudits.pro/vitalssniper',
  },
  openGraph: {
    title: 'VitalsSniper PRO | Fast In-Browser Website Audits & Agency Pitches',
    description: 'Audit prospect websites in 15 seconds, locate Core Web Vitals and DOM bloat bottlenecks, and generate evidence-grounded proposals with VitalsSniper PRO.',
    url: 'https://www.webaudits.pro/vitalssniper',
    siteName: 'Web Audits Helper',
    type: 'website',
    images: [
      {
        url: '/assets/appsumo_hero_1920x1080.png',
        width: 1200,
        height: 675,
        alt: 'VitalsSniper PRO Active Tab Inspector',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VitalsSniper PRO | Fast In-Browser Website Audits & Agency Pitches',
    description: 'Audit prospect websites in 15 seconds, locate Core Web Vitals and DOM bloat bottlenecks, and generate evidence-grounded proposals with VitalsSniper PRO.',
    images: ['/assets/appsumo_hero_1920x1080.png'],
  },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VitalsSniper PRO',
  operatingSystem: 'Google Chrome, Microsoft Edge, Brave, Chromium (Manifest V3)',
  applicationCategory: 'DeveloperApplication, BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '39.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.webaudits.pro/vitalssniper',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Web Audits Helper',
    url: 'https://www.webaudits.pro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.webaudits.pro/favicon.svg',
    },
  },
};

export default function VitalsSniperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {children}
    </>
  );
}
