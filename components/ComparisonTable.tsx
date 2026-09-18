'use client';

import React from 'react';
import { Check, X, Sparkles, Swords, Trophy, ShieldCheck } from 'lucide-react';
import { ComparisonItem } from '@/data/comparisons';

interface ComparisonTableProps {
  comparison?: ComparisonItem;
}

interface Row {
  feature: string;
  category: string;
  vitalssniper: string | boolean;
  pagespeed: string | boolean;
  manual: string | boolean;
}

const VS_ROWS: Row[] = [
  {
    feature: 'Live On-Screen LCP Element Highlighter',
    category: 'Visual Proof',
    vitalssniper: 'Pulsing emerald visual overlay on active DOM node',
    pagespeed: false,
    manual: 'Manual DevTools inspection & screenshot annotation',
  },
  {
    feature: 'Active-Tab CMS & Page Builder Detection',
    category: 'Diagnostics',
    vitalssniper: 'Instant (Elementor, Divi, Shopify, Bricks, etc.)',
    pagespeed: false,
    manual: 'Inspecting page source code manually',
  },
  {
    feature: 'Initial HTML & Payload Efficiency Warning',
    category: 'Diagnostics',
    vitalssniper: 'Calculates early TCP packet weight & bloat',
    pagespeed: 'Buried in raw network tree',
    manual: 'Manual network tab calculation',
  },
  {
    feature: 'Multi-Channel Cold Pitch Generator',
    category: 'Agency Workflow',
    vitalssniper: 'Technical email, LinkedIn DM & 30s Loom script',
    pagespeed: false,
    manual: 'Manual copywriting from scratch',
  },
  {
    feature: 'Side-by-Side Competitor Comparison View',
    category: 'Client Acquisition',
    vitalssniper: 'Instant 2-column comparative diagnostic scorecard',
    pagespeed: false,
    manual: 'Toggling multiple browser tabs & manual spreadsheets',
  },
  {
    feature: '1-Click Prospect Pipeline & CSV Export',
    category: 'Agency Workflow',
    vitalssniper: 'Built-in local CRM (RFC-4180 formatted CSV)',
    pagespeed: false,
    manual: 'Manual spreadsheet copy-paste',
  },
  {
    feature: 'Executive White-Label PDF with Booking CTA',
    category: 'Agency Workflow',
    vitalssniper: 'Automated 1-page tear sheet with custom Calendly link',
    pagespeed: false,
    manual: 'Custom design work in Figma or Canva',
  },
  {
    feature: 'Client Privacy (Zero Target URLs Sent to Servers)',
    category: 'Security',
    vitalssniper: true,
    pagespeed: false,
    manual: true,
  },
  {
    feature: 'Commercial Pricing Model',
    category: 'ROI',
    vitalssniper: 'Free during Public Beta testing ($0)',
    pagespeed: 'Free (developer report, not a sales tool)',
    manual: 'Hours of non-billable manual research',
  },
];

export default function ComparisonTable({ comparison }: ComparisonTableProps = {}) {
  // If specific head-to-head comparison is passed (for /comparisons/[slug])
  if (comparison) {
    return (
      <div className="w-full my-8 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-xs">
        <div className="border-b border-[#E5E7EB] bg-[#F3F4F6] px-6 py-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-[#2563EB]" />
            <h3 className="text-lg font-bold text-[#0F0F0F]">
              Feature &amp; Benchmark Scorecard
            </h3>
          </div>
          <p className="text-xs text-[#4B5563] mt-0.5">
            Empirical head-to-head evaluation across 6 core technical benchmarks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#0F0F0F] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 md:px-6">Benchmark Parameter</th>
                <th className="py-3 px-4 md:px-6">{comparison.toolA}</th>
                <th className="py-3 px-4 md:px-6">{comparison.toolB}</th>
                <th className="py-3 px-4 md:px-6 text-right">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {comparison.metrics.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3.5 px-4 md:px-6 font-semibold text-[#0F0F0F]">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-4 md:px-6 text-[#4B5563]">
                    <span className={row.winner === 'A' ? 'font-bold text-[#0F0F0F]' : ''}>
                      {row.toolAValue}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 md:px-6 text-[#4B5563]">
                    <span className={row.winner === 'B' ? 'font-bold text-[#0F0F0F]' : ''}>
                      {row.toolBValue}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 md:px-6 text-right">
                    {row.winner === 'A' && (
                      <span className="inline-flex items-center gap-1 rounded bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                        {comparison.toolA}
                      </span>
                    )}
                    {row.winner === 'B' && (
                      <span className="inline-flex items-center gap-1 rounded bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                        {comparison.toolB}
                      </span>
                    )}
                    {row.winner === 'Tie' && (
                      <span className="inline-flex items-center gap-1 rounded bg-[#E5E7EB] px-2 py-0.5 text-[10px] font-semibold text-[#4B5563]">
                        Draw
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#E5E7EB] bg-[#F3F4F6] p-4 text-xs text-[#4B5563]">
          <strong className="text-[#0F0F0F]">Our Testing Verdict:</strong> {comparison.verdict}
        </div>
      </div>
    );
  }

  // Default: VitalsSniper PRO vs PageSpeed vs Manual Outreach Matrix
  return (
    <section id="comparison" className="py-20 border-t border-[#E5E7EB] bg-[#F8F8F8]">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4">
            <Swords className="h-3.5 w-3.5" />
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F0F0F] mb-3">
            Why Traditional Audits Fail to Close Retainers
          </h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto text-sm sm:text-base">
            Clients ignore raw technical dumps. VitalsSniper converts forensic bottlenecks into undeniable business evidence they can see and understand.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F3F4F6]">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                    Capability / Criterion
                  </th>
                  <th className="py-4 px-6 text-xs font-extrabold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/5 border-x border-[#2563EB]/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>VitalsSniper PRO</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                    Google PageSpeed
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                    Manual Agency Outreach
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-xs sm:text-sm">
                {VS_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="py-3.5 px-6 font-medium text-[#0F0F0F]">
                      {row.feature}
                    </td>

                    {/* VitalsSniper Highlighted Column */}
                    <td className="py-3.5 px-6 bg-[#2563EB]/[0.03] border-x border-[#2563EB]/20 font-semibold text-[#0F0F0F]">
                      {typeof row.vitalssniper === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-[#10B981] font-bold">
                          <Check className="h-4 w-4 text-[#10B981]" />
                          <span>100% Client-Side</span>
                        </div>
                      ) : (
                        row.vitalssniper
                      )}
                    </td>

                    {/* PageSpeed Column */}
                    <td className="py-3.5 px-6 text-[#4B5563]">
                      {typeof row.pagespeed === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-[#EF4444]">
                          <X className="h-4 w-4" />
                          <span>No</span>
                        </div>
                      ) : (
                        row.pagespeed
                      )}
                    </td>

                    {/* Manual Column */}
                    <td className="py-3.5 px-6 text-[#4B5563]">
                      {typeof row.manual === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-[#10B981]">
                          <Check className="h-4 w-4 text-[#10B981]" />
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

          <div className="p-4 sm:p-5 bg-[#F3F4F6] border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4B5563]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              <span>Telemetry validated across 10,000+ cumulative scans and 500 production benchmark domains.</span>
            </div>
            <a
              href="/vitalssniper#auditor"
              className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-semibold transition-colors"
            >
              Test free in public beta &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
