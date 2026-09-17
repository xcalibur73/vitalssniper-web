import React from 'react';
import { BookOpen, Terminal, CheckCircle2, Copy, Send, FileText, ArrowRight } from 'lucide-react';

export default function DocsSection() {
  return (
    <section id="docs" className="py-20 border-t border-white/[0.08]">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Documentation & Playbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            How to Install & Use VitalsSniper PRO
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            From zero to running your first live client audit in under 60 seconds.
          </p>
        </div>

        <div className="space-y-12">
          
          {/* 30-Second Installation Card */}
          <div className="rounded-2xl border border-white/10 bg-[#12141d] p-8 sm:p-10 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <Terminal className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">30-Second Installation Walkthrough</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              
              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  01
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Download and Extract ZIP</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Verify your code in the activation box above, download <code>vitalssniper_pro.zip</code>, and extract the folder to a permanent location on your drive.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  02
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Open Extensions & Enable Dev Mode</h4>
                  <p className="text-gray-400 leading-relaxed mb-1">
                    In Chrome, Brave, or Edge, navigate to:
                  </p>
                  <code className="inline-block rounded bg-black/60 px-2 py-0.5 font-mono text-[11px] text-emerald-300 border border-white/10">
                    chrome://extensions/
                  </code>
                  <p className="text-gray-400 mt-1">
                    Toggle <strong>Developer mode</strong> (top-right corner) to <strong>ON</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  03
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Load Unpacked Extension</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Click the <strong>Load unpacked</strong> button in the top-left toolbar, select the extracted <code>vitalssniper_pro</code> directory, and pin VitalsSniper to your browser toolbar.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                  04
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Paste License Key to Activate</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Click the VitalsSniper icon, click the <strong>UPGRADE</strong> tag, and paste your license key (<code>VS-PRO-XXXX-XXXX</code>). All PRO features unlock instantly.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Client Acquisition Workflow */}
          <div className="rounded-2xl border border-white/10 bg-[#12141d] p-8 sm:p-10 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <Send className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">How to Use VitalsSniper to Close Clients</h3>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-gray-300">
              
              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white font-bold text-xs">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Prospect Local or Niche Websites</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Search Google or Clutch for dental practices, law firms, e-commerce stores, or SaaS companies spending money on Google/Facebook Ads.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white font-bold text-xs">
                  B
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Click the VitalsSniper Icon (Runs in 50ms)</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Open their website and click VitalsSniper. The extension instantly inspects DOM element nesting, uncompressed payload size vs 50KB mobile limits, page builder bloat, and AI Knowledge Graph schemas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white font-bold text-xs">
                  C
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Copy the 3-Sentence Proof-of-Flaw Pitch</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Choose <strong>Cold Email</strong>, <strong>LinkedIn DM</strong>, or <strong>Loom Script</strong> in the extension. Click copy. Send the message directly to the founder or marketing director.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white font-bold text-xs">
                  D
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Attach 1-Page PDF Teardown & Close Sprint</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Click <strong>Export PDF Teardown</strong>. Attach the clean, print-ready card to your conversation. Pitch a 48-Hour Core Web Vitals remediation sprint for $1,500 – $5,000.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
