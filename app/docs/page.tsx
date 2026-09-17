'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import { ArrowLeft, Check, Download, BookOpen, Terminal, Sparkles } from 'lucide-react';

export default function DocsPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar onOpenCheckout={() => setCheckoutOpen(true)} />

      <div className="mx-auto max-w-4xl px-6 py-20 flex-1 w-full">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Store</span>
        </Link>

        <div className="space-y-12">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <BookOpen className="h-4 w-4" />
              Documentation & Agency Playbook
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Getting Started with VitalsSniper PRO
            </h1>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              Step-by-step instructions to install the extension, activate your lifetime license, and run client acquisition campaigns.
            </p>
          </div>

          {/* 30-Second Quickstart */}
          <div className="rounded-2xl border border-white/10 bg-[#12141d] p-8 sm:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <Terminal className="h-5 w-5 text-emerald-400" />
              <span>30-Second Installation Guide</span>
            </h2>

            <div className="space-y-6 text-sm text-gray-300">
              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  01
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Download and Extract the ZIP</h4>
                  <p className="text-gray-400 mb-2">
                    Download your extension package from the <Link href="/license" className="text-emerald-400 font-bold hover:underline">License Portal</Link> using your activation key and extract the folder on your computer.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  02
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Open Browser Extensions Manager</h4>
                  <p className="text-gray-400 mb-1">
                    Open your Chromium browser and navigate to:
                  </p>
                  <code className="inline-block rounded-md bg-black/60 px-2.5 py-1 font-mono text-xs text-gray-300 border border-white/10">
                    chrome://extensions/
                  </code>
                  <p className="text-gray-400 mt-2">
                    In the top-right corner, toggle <strong>Developer mode</strong> to <strong>ON</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  03
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Load Unpacked and Pin to Toolbar</h4>
                  <p className="text-gray-400">
                    Click <strong>Load unpacked</strong> in the top-left toolbar, select your extracted folder, and pin VitalsSniper to your browser toolbar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  04
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Activate Your Lifetime License</h4>
                  <p className="text-gray-400">
                    Click the VitalsSniper icon on any website, click the <strong>UPGRADE</strong> badge in the top bar, and paste your license key (<code className="text-xs bg-black/40 px-1 py-0.5 rounded text-emerald-300">VS-PRO-XXXX-XXXX</code>). PRO features unlock instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* High-Ticket Client Acquisition Playbook */}
          <div className="rounded-2xl border border-white/10 bg-[#12141d] p-8 sm:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span>High-Ticket Agency Pitch Playbook</span>
            </h2>

            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Traditional cold outreach fails because it sounds like generic spam. VitalsSniper works because it provides <strong>undeniable proof-of-flaw diagnostics</strong> specific to their exact tech stack.
              </p>

              <div className="rounded-xl border border-white/10 bg-[#090a10] p-5 font-mono text-xs text-gray-300 space-y-2">
                <div className="text-emerald-400 font-bold">Standard 3-Sentence High-Converting Email Hook:</div>
                <div className="text-gray-400 whitespace-pre-wrap">
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
          <div className="rounded-2xl border border-white/10 bg-[#12141d] p-8 sm:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span>The 5 Powerhouse Agency Features Explained</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="rounded-xl border border-white/5 bg-[#0d0e15] p-5 space-y-2">
                <h3 className="font-bold text-emerald-400 text-sm">1. White-Label Agency Branding & Booking CTA</h3>
                <p className="text-gray-400 leading-relaxed">
                  Click the ⚙️ gear icon in the extension header. Input your Agency Name, Logo URL, Auditor Title, and Calendly / Cal.com link. The confidential 1-Page PDF Teardown automatically stamps your custom agency branding and a high-converting call booking card.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#0d0e15] p-5 space-y-2">
                <h3 className="font-bold text-emerald-400 text-sm">2. Head-to-Head Competitor Comparison Mode</h3>
                <p className="text-gray-400 leading-relaxed">
                  Click the ⚔️ Vs button in the extension header. Enter the target prospect and their main rival. VitalsSniper displays side-by-side metric tables (DOM bloat, payload size, mobile responsiveness) and generates a killer-hook comparison pitch.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#0d0e15] p-5 space-y-2">
                <h3 className="font-bold text-emerald-400 text-sm">3. Live LCP Visual Element Highlighter</h3>
                <p className="text-gray-400 leading-relaxed">
                  Click 🎯 Highlight LCP in the extension utility grid. VitalsSniper identifies the Largest Contentful Paint node in the active DOM, outlines it with an emerald pulsing glow, and attaches a diagnostic badge. Ideal for 30-second Loom recordings.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#0d0e15] p-5 space-y-2">
                <h3 className="font-bold text-emerald-400 text-sm">4. 1-Click Lead Pipeline CRM & CSV Export</h3>
                <p className="text-gray-400 leading-relaxed">
                  Click 📌 Save while auditing any website to store the prospect, CMS stack, score, and personalized pitch directly in the extension. Click the Pipeline icon and export an RFC-4180 CSV for immediate import into Instantly, Lemlist, Apollo, or HubSpot.
                </p>
              </div>

              <div className="md:col-span-2 rounded-xl border border-white/5 bg-[#0d0e15] p-5 space-y-2">
                <h3 className="font-bold text-emerald-400 text-sm">5. AI Search & Knowledge Graph Schema Validator</h3>
                <p className="text-gray-400 leading-relaxed">
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
