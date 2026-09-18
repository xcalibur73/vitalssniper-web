'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import { ArrowLeft, BookOpen, Terminal, Sparkles } from 'lucide-react';

export default function DocsPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col justify-between">
      <Navbar onOpenCheckout={() => setCheckoutOpen(true)} />

      <div className="mx-auto max-w-4xl px-6 py-16 flex-1 w-full">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#4B5563] hover:text-[#0F0F0F] mb-8 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-10">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">
              <BookOpen className="h-4 w-4" />
              <span>Documentation &amp; Agency Playbook</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0F] tracking-tight">
              Getting Started with VitalsSniper PRO
            </h1>
            <p className="text-base text-[#4B5563] mt-3 leading-relaxed">
              Step-by-step instructions to install the extension, activate your lifetime license, and run client acquisition campaigns.
            </p>
          </div>

          {/* 30-Second Quickstart */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] flex items-center gap-2.5">
              <Terminal className="h-5 w-5 text-[#2563EB]" />
              <span>30-Second Installation Guide</span>
            </h2>

            <div className="space-y-6 text-sm text-[#4B5563]">
              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] font-mono font-bold text-xs border border-[#2563EB]/20">
                  01
                </span>
                <div>
                  <h3 className="font-bold text-[#0F0F0F] mb-1">Download and Extract the ZIP</h3>
                  <p className="text-[#4B5563] mb-2 leading-relaxed">
                    Download your extension package from the <Link href="/license" className="text-[#2563EB] font-semibold hover:text-[#1D4ED8] hover:underline">License Portal</Link> using your activation key and extract the folder on your computer.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] font-mono font-bold text-xs border border-[#2563EB]/20">
                  02
                </span>
                <div>
                  <h3 className="font-bold text-[#0F0F0F] mb-1">Open Browser Extensions Manager</h3>
                  <p className="text-[#4B5563] mb-1 leading-relaxed">
                    Open your Chromium browser and navigate to:
                  </p>
                  <code className="inline-block rounded-md bg-[#F3F4F6] px-2.5 py-1 font-mono text-xs text-[#0F0F0F] border border-[#E5E7EB]">
                    chrome://extensions/
                  </code>
                  <p className="text-[#4B5563] mt-2 leading-relaxed">
                    In the top-right corner, toggle <strong>Developer mode</strong> to <strong>ON</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] font-mono font-bold text-xs border border-[#2563EB]/20">
                  03
                </span>
                <div>
                  <h3 className="font-bold text-[#0F0F0F] mb-1">Load Unpacked and Pin to Toolbar</h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Click <strong>Load unpacked</strong> in the top-left toolbar, select your extracted folder, and pin VitalsSniper to your browser toolbar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] font-mono font-bold text-xs border border-[#2563EB]/20">
                  04
                </span>
                <div>
                  <h3 className="font-bold text-[#0F0F0F] mb-1">Activate Your Lifetime License</h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Click the VitalsSniper icon on any website, click the <strong>UPGRADE</strong> badge in the top bar, and paste your license key (<code className="text-xs bg-[#F3F4F6] border border-[#E5E7EB] px-1 py-0.5 rounded text-[#2563EB]">VS-PRO-XXXX-XXXX</code>). PRO features unlock instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* High-Ticket Client Acquisition Playbook */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-[#2563EB]" />
              <span>High-Ticket Agency Pitch Playbook</span>
            </h2>

            <div className="space-y-4 text-sm text-[#4B5563] leading-relaxed">
              <p>
                Traditional cold outreach fails because it sounds like generic spam. VitalsSniper works because it provides <strong>undeniable proof-of-flaw diagnostics</strong> specific to their exact tech stack.
              </p>

              <div className="rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-5 font-mono text-xs text-[#0F0F0F] space-y-2">
                <div className="text-[#2563EB] font-bold">Standard 3-Sentence High-Converting Email Hook:</div>
                <div className="text-[#4B5563] whitespace-pre-wrap">
{`Subject: quick observation on the mobile experience for [Domain]

Hi [First Name],

While reviewing [Domain] on mobile, I noticed the homepage payload carries over 180KB of uncompressed container code across 3,200 DOM elements (Elementor), causing a multi-second freeze on cellular connections before imagery renders.

We specialize in optimizing high-ticket digital architecture so visual fidelity stays pristine while dropping mobile load times to under 1 second.

I put together a quick 30-second screen recording showing the exact bottleneck and the zero-design-change fix.

Would you like me to send the clip over to your team?

Best regards,
[Your Name]`}
                </div>
              </div>

              <p>
                Attach the <strong>1-Page Executive PDF Teardown</strong> generated by VitalsSniper to seal instant authority.
              </p>
            </div>
          </div>

          {/* 5 Powerhouse Agency Features Guide */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F0F] flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-[#2563EB]" />
              <span>The 5 Powerhouse Agency Features Explained</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 space-y-2">
                <h3 className="font-bold text-[#2563EB] text-sm">1. White-Label Agency Branding &amp; Booking CTA</h3>
                <p className="text-[#4B5563] leading-relaxed">
                  Click the gear icon in the extension header. Input your Agency Name, Logo URL, Auditor Title, and Calendly / Cal.com link. The confidential 1-Page PDF Teardown automatically stamps your custom agency branding and a high-converting call booking card.
                </p>
              </div>

              <div className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 space-y-2">
                <h3 className="font-bold text-[#2563EB] text-sm">2. Head-to-Head Competitor Comparison Mode</h3>
                <p className="text-[#4B5563] leading-relaxed">
                  Click the Vs button in the extension header. Enter the target prospect and their main rival. VitalsSniper displays side-by-side metric tables (DOM bloat, payload size, mobile responsiveness) and generates a killer-hook comparison pitch.
                </p>
              </div>

              <div className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 space-y-2">
                <h3 className="font-bold text-[#2563EB] text-sm">3. Live LCP Visual Element Highlighter</h3>
                <p className="text-[#4B5563] leading-relaxed">
                  Click Highlight LCP in the extension utility grid. VitalsSniper identifies the Largest Contentful Paint node in the active DOM, outlines it with an emerald pulsing glow, and attaches a diagnostic badge. Ideal for 30-second Loom recordings.
                </p>
              </div>

              <div className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 space-y-2">
                <h3 className="font-bold text-[#2563EB] text-sm">4. 1-Click Lead Pipeline CRM &amp; CSV Export</h3>
                <p className="text-[#4B5563] leading-relaxed">
                  Click Save while auditing any website to store the prospect, CMS stack, score, and personalized pitch directly in the extension. Click the Pipeline icon and export an RFC-4180 CSV for immediate import into Instantly, Lemlist, Apollo, or HubSpot.
                </p>
              </div>

              <div className="md:col-span-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 space-y-2">
                <h3 className="font-bold text-[#2563EB] text-sm">5. AI Search &amp; Knowledge Graph Schema Validator</h3>
                <p className="text-[#4B5563] leading-relaxed">
                  Validates whether prospective client sites have valid Knowledge Graph JSON-LD schemas required by AI search engines (ChatGPT, Perplexity, Copilot) to cite them as authoritative sources. Opens up high-margin GEO and AI SEO retainers.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Footer />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        defaultTier="solo"
      />
    </main>
  );
}
