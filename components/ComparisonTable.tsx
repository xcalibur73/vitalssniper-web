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

export default function ComparisonTable({ comparison }: ComparisonTableProps = {}) {
  // If specific head-to-head comparison is passed (for /comparisons/[slug])
  if (comparison) {
    return (
      <div className="w-full my-8 overflow-hidden rounded-2xl border border-sand-300 bg-white shadow-sm">
        <div className="border-b border-sand-300 bg-[#F7F4EE] px-6 py-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            <h3 className="font-editorial text-lg font-bold text-charcoal">
              Feature &amp; Benchmark Scorecard
            </h3>
          </div>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Empirical head-to-head evaluation across 6 core technical benchmarks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sand-300 bg-sand-50 text-charcoal font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 md:px-6">Benchmark Parameter</th>
                <th className="py-3 px-4 md:px-6">{comparison.toolA}</th>
                <th className="py-3 px-4 md:px-6">{comparison.toolB}</th>
                <th className="py-3 px-4 md:px-6 text-right">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300">
              {comparison.metrics.map((row, idx) => (
                <tr key={idx} className="hover:bg-sand-50/50 transition-colors">
                  <td className="py-3.5 px-4 md:px-6 font-semibold text-charcoal">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-4 md:px-6 text-charcoal-muted">
                    <span className={row.winner === 'A' ? 'font-bold text-charcoal' : ''}>
                      {row.toolAValue}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 md:px-6 text-charcoal-muted">
                    <span className={row.winner === 'B' ? 'font-bold text-charcoal' : ''}>
                      {row.toolBValue}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 md:px-6 text-right">
                    {row.winner === 'A' && (
                      <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                        {comparison.toolA}
                      </span>
                    )}
                    {row.winner === 'B' && (
                      <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                        {comparison.toolB}
                      </span>
                    )}
                    {row.winner === 'Tie' && (
                      <span className="inline-flex items-center gap-1 rounded bg-sand-200 px-2 py-0.5 text-[10px] font-semibold text-charcoal-muted">
                        Draw
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-sand-300 bg-[#F7F4EE] p-4 text-xs text-charcoal-muted">
          <strong className="text-charcoal">Our Testing Verdict:</strong> {comparison.verdict}
        </div>
      </div>
    );
  }

  // Default: VitalsSniper PRO vs PageSpeed vs Manual Outreach Matrix
  return (
    <section id="comparison" className="py-20 border-t border-sand-300 bg-[#F7F4EE]">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent mb-4">
            <Swords className="h-3.5 w-3.5" />
            <span>Competitive Matrix</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-charcoal mb-3">
            Why Traditional Audits Fail to Close Retainers
          </h2>
          <p className="text-charcoal-muted max-w-2xl mx-auto text-sm sm:text-base">
            Clients ignore raw technical dumps. VitalsSniper converts forensic bottlenecks into undeniable business evidence they can see and understand.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-hidden rounded-2xl border border-sand-300 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-sand-300 bg-[#F7F4EE]">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                    Capability / Criterion
                  </th>
                  <th className="py-4 px-6 text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/5 border-x border-accent/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>VitalsSniper PRO</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                    Google PageSpeed
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                    Manual Agency Outreach
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300 text-xs sm:text-sm">
                {VS_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-sand-50 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-medium text-charcoal">
                      {row.feature}
                    </td>

                    {/* VitalsSniper Highlighted Column */}
                    <td className="py-3.5 px-6 bg-accent/[0.03] border-x border-accent/20 font-semibold text-charcoal">
                      {typeof row.vitalssniper === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <Check className="h-4 w-4 text-emerald-600" />
                          <span>100% Client-Side</span>
                        </div>
                      ) : (
                        row.vitalssniper
                      )}
                    </td>

                    {/* PageSpeed Column */}
                    <td className="py-3.5 px-6 text-charcoal-muted">
                      {typeof row.pagespeed === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-rose-600">
                          <X className="h-4 w-4" />
                          <span>No</span>
                        </div>
                      ) : (
                        row.pagespeed
                      )}
                    </td>

                    {/* Manual Column */}
                    <td className="py-3.5 px-6 text-charcoal-muted">
                      {typeof row.manual === 'boolean' ? (
                        <div className="flex items-center gap-1.5 text-emerald-700">
                          <Check className="h-4 w-4 text-emerald-600" />
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

          <div className="p-4 sm:p-5 bg-[#F7F4EE] border-t border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>Tested on over 10,000+ real client websites across Elementor, Divi, Shopify, and Next.js.</span>
            </div>
            <a
              href="https://appsumo.com/products/vitalssniper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-bold transition-colors"
            >
              Get started with lifetime access &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
