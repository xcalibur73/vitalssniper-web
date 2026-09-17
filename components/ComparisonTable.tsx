'use client';

import React from 'react';
import { Check, X, Sparkles, Swords, Zap, ShieldCheck } from 'lucide-react';

interface Row {
  feature: string;
  category: string;
  vitalssniper: string | boolean;
  pagespeed: string | boolean;
  manual: string | boolean;
}

const ROWS: Row[] = [
  {
    feature: 'Audit Execution Speed',
    category: 'Speed',
    vitalssniper: '< 50ms (Client-Side in Tab)',
    pagespeed: '15 - 30 seconds (Queue)',
    manual: '30 - 45 min per prospect',
  },
  {
    feature: 'Page Builder / CMS Fingerprinting',
    category: 'Diagnostics',
    vitalssniper: 'Instant (Elementor, Divi, Shopify, etc.)',
    pagespeed: false,
    manual: 'Manual DevTools inspection',
  },
  {
    feature: 'Cellular Payload Budget vs 50KB Ceiling',
    category: 'Diagnostics',
    vitalssniper: 'Live calculation & warning',
    pagespeed: 'Buried in advanced reports',
    manual: 'Manual network tab math',
  },
  {
    feature: 'Multi-Channel Cold Pitch Generator',
    category: 'Client Acquisition',
    vitalssniper: 'Email, LinkedIn DM & 30s Loom script',
    pagespeed: false,
    manual: 'Manual copywriting from scratch',
  },
  {
    feature: 'Live LCP Visual Element Highlighter',
    category: 'Client Acquisition',
    vitalssniper: 'Pulsing emerald node overlay',
    pagespeed: false,
    manual: 'Manual screenshots / markup',
  },
  {
    feature: 'Head-to-Head Competitor Comparison',
    category: 'Client Acquisition',
    vitalssniper: 'Instant side-by-side battle scorecard',
    pagespeed: false,
    manual: 'Manual multi-tab comparison',
  },
  {
    feature: '1-Click Lead CRM & RFC-4180 CSV Export',
    category: 'Agency Workflow',
    vitalssniper: 'Built-in (Lemlist & Instantly ready)',
    pagespeed: false,
    manual: 'Manual spreadsheet entry',
  },
  {
    feature: 'White-Label PDF with Calendly Booking CTA',
    category: 'Agency Workflow',
    vitalssniper: 'Automated executive teardown',
    pagespeed: false,
    manual: 'Custom Figma / Canva design',
  },
  {
    feature: 'Client Privacy (Zero URLs Logged on Servers)',
    category: 'Security',
    vitalssniper: true,
    pagespeed: false,
    manual: true,
  },
  {
    feature: 'Commercial Pricing Model',
    category: 'ROI',
    vitalssniper: 'Lifetime Deal: $39 on AppSumo',
    pagespeed: 'Free (not built for sales)',
    manual: '$2,000+/mo in labor cost',
  },
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 border-t border-white/[0.08] bg-[#0c0d14]/60">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <Swords className="h-3.5 w-3.5" />
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Why Traditional Audits Fail to Close Retainers
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Clients ignore raw technical dumps. VitalsSniper converts forensic bottlenecks into undeniable business evidence they can see and understand.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12141d] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Capability / Criterion
                  </th>
                  <th className="py-4 px-6 text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border-x border-emerald-500/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>VitalsSniper PRO</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Google PageSpeed
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Manual Agency Outreach
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.015] transition-colors"
                  >
                    <td className="py-3.5 px-6 font-medium text-white">
                      {row.feature}
                    </td>

                    {/* VitalsSniper Highlighted Column */}
                    <td className="py-3.5 px-6 bg-emerald-500/[0.04] border-x border-emerald-500/20 font-semibold text-emerald-300">
                      {typeof row.vitalssniper === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <Check className="h-4 w-4" />
                          <span>100% Client-Side</span>
                        </div>
                      ) : (
                        row.vitalssniper
                      )}
                    </td>

                    {/* PageSpeed Column */}
                    <td className="py-3.5 px-6 text-gray-400">
                      {typeof row.pagespeed === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-rose-400/80">
                          <X className="h-4 w-4" />
                          <span>No</span>
                        </div>
                      ) : (
                        row.pagespeed
                      )}
                    </td>

                    {/* Manual Column */}
                    <td className="py-3.5 px-6 text-gray-400">
                      {typeof row.manual === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Check className="h-4 w-4" />
                          <span>Yes</span>
                        </div>
                      ) : (
                        row.manual
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 sm:p-5 bg-[#141724] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Tested on over 10,000+ real client websites across Elementor, Divi, Shopify, and Next.js.</span>
            </div>
            <a
              href="#activate"
              className="text-emerald-400 hover:text-emerald-300 font-bold underline transition-colors"
            >
              Get started with lifetime access &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
