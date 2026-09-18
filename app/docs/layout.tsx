import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VitalsSniper PRO Documentation & Agency Playbook | Web Audits',
  description: 'Installation guide, license activation, high-ticket pitch templates, and diagnostic agency workflows for VitalsSniper PRO.',
  alternates: {
    canonical: 'https://www.webaudits.pro/docs',
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
