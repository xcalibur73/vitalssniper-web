import React from 'react';
import {
  Layers,
  FileCode,
  Gauge,
  Sparkles,
  Download,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Swords,
  Target,
  Database,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

export default function Deliverables() {
  const items = [
    {
      icon: Target,
      title: 'Live LCP Element Visual Highlighter',
      desc: 'Animates a glowing emerald indicator directly on the live target page to show prospects the exact Largest Contentful Paint node sabotaging their score.',
      pill: 'Visual Proof',
      preview: (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 font-mono text-[11px] text-emerald-300 relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              LCP Target Detected
            </span>
            <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">3.9s Delay</span>
          </div>
          <p className="mt-2 text-gray-400 font-sans text-xs">
            Hero image uncompressed (1.8MB). Outlined with pulsing glow during screen shares.
          </p>
        </div>
      ),
    },
    {
      icon: Swords,
      title: 'Head-to-Head Competitor Mode',
      desc: 'Benchmark your prospect directly against their #1 competitor in real-time. Instantly generates comparison killer-hooks showing why clients bounce to rivals.',
      pill: 'Competitor Intel',
      preview: (
        <div className="mt-4 rounded-xl border border-white/10 bg-[#090a10] p-3 text-[11px] space-y-1.5">
          <div className="flex justify-between items-center text-rose-400">
            <span>Prospect (Elementor):</span>
            <span className="font-bold font-mono">2,840 Nodes (Fail)</span>
          </div>
          <div className="flex justify-between items-center text-emerald-400">
            <span>Competitor (Custom):</span>
            <span className="font-bold font-mono">620 Nodes (Pass)</span>
          </div>
        </div>
      ),
    },
    {
      icon: Download,
      title: 'White-Label Agency PDF & Booking CTA',
      desc: 'Generate executive 1-page teardowns branded with your custom agency logo, auditor name, and direct Calendly booking link for frictionless closes.',
      pill: 'White-Label PDF',
      preview: (
        <div className="mt-4 rounded-xl border border-white/10 bg-[#090a10] p-3 text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span className="text-gray-300 font-medium">Calendly Integration:</span>
          </div>
          <span className="text-emerald-400 font-mono font-bold">Book 15m Sprint &rarr;</span>
        </div>
      ),
    },
    {
      icon: Database,
      title: '1-Click Lead Pipeline & CSV Export',
      desc: 'Save audited prospects into a built-in browser CRM and export clean CSV datasets formatted for immediate import into Instantly, Lemlist, or HubSpot.',
      pill: 'Lead CRM',
      preview: (
        <div className="mt-4 rounded-xl border border-white/10 bg-[#090a10] p-3 text-[11px] flex items-center justify-between">
          <span className="text-gray-400 font-mono">vitalssniper_leads.csv</span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white font-bold">RFC-4180</span>
        </div>
      ),
    },
    {
      icon: Layers,
      title: '1-Click Page Builder Detection',
      desc: 'Instantly identifies Elementor, Divi, WPBakery, Avada, Salient, Squarespace, Webflow, Shopify, or Next.js directly from live DOM fingerprints.',
      pill: 'CMS Telemetry',
    },
    {
      icon: Gauge,
      title: 'DOM Bloat & Cellular Payload',
      desc: 'Flags excessive container nesting (>1,400 elements) and uncompressed HTML transfer size exceeding Google’s 50KB mobile cellular ceiling.',
      pill: 'Speed Invariants',
    },
    {
      icon: Sparkles,
      title: 'AI Citation Schema Readiness',
      desc: 'Verifies whether prospective client sites have valid Knowledge Graph JSON-LD schemas required to be cited in ChatGPT, Perplexity, and Copilot answers.',
      pill: 'GEO & AI Search',
    },
    {
      icon: FileCode,
      title: '3-Sentence Multi-Channel Pitch Generator',
      desc: 'Auto-generates non-salesy, high-response Cold Emails, LinkedIn DMs, and 30-second Loom pitch scripts citing their specific performance flaws.',
      pill: 'Client Acquisition',
    },
    {
      icon: Zap,
      title: '100% Client-Side / Zero Server Lag',
      desc: 'Runs in 50 milliseconds directly in your browser. No external API queues, no third-party rate limits, and zero tracking scripts.',
      pill: '50ms Execution',
    },
  ];

  return (
    <section id="deliverables" className="py-24 border-t border-white/[0.08] bg-[#090b12]/60 relative">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Commercial Agency Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            What You Get with Web Audits
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Everything your agency needs to turn technical client website flaws into closed retainers in 50 milliseconds.
          </p>
        </div>

        {/* Deliverables Grid (Preserving 9 items in .grid > div for test suite) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#11131c] hover:bg-[#141724] p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-emerald-500/30 transition-all duration-200 group relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-gray-300">
                      {item.pill}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>

                {/* Interactive Visual Preview Pill */}
                {item.preview && item.preview}
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#12141d] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 shadow-lg">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Commercial License Package: <code>vitalssniper_pro.zip</code> &bull; Activation Key &bull; Lifetime Updates</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">100% Commercial Client Rights</span>
            <span>&bull;</span>
            <span>Chrome, Brave, Edge & Firefox</span>
          </div>
        </div>

      </div>
    </section>
  );
}
