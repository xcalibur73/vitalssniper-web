import React from 'react';
import { BookOpen, Terminal, CheckCircle2, Copy, Send, FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function DocsSection() {
  return (
    <section id="docs" className="py-20 border-b border-[#E5E7EB] bg-[#F8F8F8]">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Documentation &amp; Playbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] mb-3">
            How to Install &amp; Use VitalsSniper PRO
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base">
            From zero to running your first live client audit in under 60 seconds.
          </p>
        </div>

        <div className="space-y-12">
          
          {/* 30-Second Installation Card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E5E7EB]">
              <Terminal className="h-5 w-5 text-[#2563EB]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F0F0F]">30-Second Installation Walkthrough</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              
              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] font-mono font-bold text-xs border border-blue-200">
                  01
                </span>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Download and Extract ZIP</h4>
                  <p className="text-[#4B5563] leading-relaxed">
                    Verify your code in the activation box above, download <code>vitalssniper_pro.zip</code>, and extract the folder to a permanent location on your drive.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] font-mono font-bold text-xs border border-blue-200">
                  02
                </span>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Open Extensions &amp; Enable Dev Mode</h4>
                  <p className="text-[#4B5563] leading-relaxed mb-1">
                    In Chrome, Brave, or Edge, navigate to:
                  </p>
                  <code className="inline-block rounded bg-[#F3F4F6] px-2 py-0.5 font-mono text-[11px] text-[#0F0F0F] border border-[#E5E7EB]">
                    chrome://extensions/
                  </code>
                  <p className="text-[#4B5563] mt-1">
                    Toggle <strong>Developer mode</strong> (top-right corner) to <strong>ON</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] font-mono font-bold text-xs border border-blue-200">
                  03
                </span>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Load Unpacked Extension</h4>
                  <p className="text-[#4B5563] leading-relaxed">
                    Click the <strong>Load unpacked</strong> button in the top-left toolbar, select the extracted <code>vitalssniper_pro</code> directory, and pin VitalsSniper to your browser toolbar.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] font-mono font-bold text-xs border border-blue-200">
                  04
                </span>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Paste License Key to Activate</h4>
                  <p className="text-[#4B5563] leading-relaxed">
                    Click the VitalsSniper icon, click the <strong>UPGRADE</strong> tag, and paste your license key (<code>VS-PRO-XXXX-XXXX</code>). All PRO features unlock instantly.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Client Acquisition Workflow */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E5E7EB]">
              <Send className="h-5 w-5 text-[#2563EB]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F0F0F]">How to Use VitalsSniper to Close Clients</h3>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-[#0F0F0F]">
              
              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#0F0F0F] font-bold text-xs">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Open Any Target Website</h4>
                  <p className="text-[#4B5563] leading-relaxed">
                    Navigate to any client, competitor, or prospect website you want to analyze in your browser.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#0F0F0F] font-bold text-xs">
                  B
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Click the VitalsSniper Icon (Runs in 50ms)</h4>
                  <p className="text-[#4B5563] leading-relaxed">
                    Open their website and click VitalsSniper. The extension instantly inspects DOM element nesting, uncompressed payload size vs 50KB mobile limits, page builder bloat, and AI Knowledge Graph schemas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#0F0F0F] font-bold text-xs">
                  C
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Copy the 3-Sentence Proof-of-Flaw Pitch</h4>
                  <p className="text-[#4B5563] leading-relaxed">
                    Choose <strong>Cold Email</strong>, <strong>LinkedIn DM</strong>, or <strong>Loom Script</strong> in the extension. Click copy. Send the message directly to the founder or marketing director.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#0F0F0F] font-bold text-xs">
                  D
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0F0F] mb-1">Attach 1-Page PDF Teardown &amp; Close Sprint</h4>
                  <p className="text-[#4B5563] leading-relaxed">
                    Click <strong>Export PDF Teardown</strong>. Attach the clean, print-ready card to your conversation. Pitch a 48-Hour Core Web Vitals remediation sprint for $1,500 - $5,000.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* 5 Powerhouse Agency Features Guide */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
              <Sparkles className="h-5 w-5 text-[#2563EB]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F0F0F]">Agency Playbook: The 5 Powerhouse Features</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              
              {/* Feature 1 */}
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold">
                  <span>1. White-Label Branding &amp; Booking CTA</span>
                </div>
                <p className="text-[#4B5563] leading-relaxed">
                  Click the gear icon in the header. Add your Agency Name, Logo URL, Auditor Title, and Calendly link. When exporting the 1-Page PDF Teardown, VitalsSniper dynamically stamps your branding and a high-converting call booking card onto the document.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold">
                  <span>2. Head-to-Head Competitor Mode</span>
                </div>
                <p className="text-[#4B5563] leading-relaxed">
                  Click the Vs button in the header. Enter your target prospect and their top rival. VitalsSniper benchmarks DOM counts, payload size, and mobile rendering side-by-side, generating a personalized comparison killer-hook showing why clients bounce to rivals.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold">
                  <span>3. Live LCP Visual Element Highlighter</span>
                </div>
                <p className="text-[#4B5563] leading-relaxed">
                  While on any client site, click Highlight LCP in the utility grid. VitalsSniper outlines the exact Largest Contentful Paint node with a high-contrast pulse animation and attaches a floating diagnostic badge. Perfect for 30-second Loom recordings.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold">
                  <span>4. 1-Click Lead Pipeline CRM &amp; CSV Export</span>
                </div>
                <p className="text-[#4B5563] leading-relaxed">
                  Click Save on any audited prospect to store their domain, CMS stack, score, and personalized pitch in your built-in extension CRM. Open the Pipeline drawer and export an RFC-4180 CSV for 1-click import into Instantly, Lemlist, or HubSpot.
                </p>
              </div>

              {/* Feature 5 (Spanning full width) */}
              <div className="md:col-span-2 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold">
                  <span>5. AI Search &amp; Knowledge Graph Schema Validator</span>
                </div>
                <p className="text-[#4B5563] leading-relaxed">
                  VitalsSniper automatically checks whether target websites have valid Knowledge Graph JSON-LD schemas required by AI search engines (ChatGPT, Perplexity, Copilot) to cite them as authoritative sources. This opens up lucrative GEO and AI SEO retainers.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
