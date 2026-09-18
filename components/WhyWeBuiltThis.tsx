import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Building2,
  User,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  Wrench,
} from 'lucide-react';

export default function WhyWeBuiltThis() {
  const personas = [
    {
      title: 'Solo Website Owners',
      subtitle: 'Self-Diagnosis & Quick Fixes',
      badge: 'Zero Jargon',
      badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      icon: User,
      painPoint: 'Panicked by red scores of 38 on Google PageSpeed with no idea what element on the page is actually broken.',
      solution: 'Click one button on your live site. VitalsSniper outlines the exact slowest image or heavy widget directly on your screen.',
      outcomes: [
        'No $200/hour consultant fees required',
        'Isolate the exact uncompressed photo delaying mobile visitors',
        'Fix that specific file in 10 minutes and verify speed instantly',
      ],
    },
    {
      title: 'Solo Freelancers',
      subtitle: 'Client Acquisition & Authority',
      badge: 'Zero Sales Overhead',
      badgeColor: 'border-blue-200 bg-blue-50 text-[#2563EB]',
      icon: Wrench,
      painPoint: 'No time for 10 hours of manual report building, and unable to justify $300/month enterprise SEO suites.',
      solution: 'Spot an objective flaw in 5 seconds, send a 3-sentence note citing the exact asset, and attach a branded 1-page proof sheet.',
      outcomes: [
        'Shift from commodity vendor to trusted technical doctor',
        '26.4% response rate compared to 3.2% for generic PDF dumps',
        'Win lucrative redesigns and performance cleanup retainers',
      ],
    },
    {
      title: 'Digital Agencies',
      subtitle: 'High-Velocity Prospecting',
      badge: 'Agency Core',
      badgeColor: 'border-purple-200 bg-purple-50 text-purple-700',
      icon: Building2,
      painPoint: 'Account executives spending 2+ hours per prospect making 50-page PDF audits that business owners delete in 5 seconds.',
      solution: 'Audit active browser tabs in 50 milliseconds with zero server queues. Export white-label executive tear sheets in 1 click.',
      outcomes: [
        'Triage 50 qualified prospect domains in an afternoon',
        'White-label 1-page tear sheets with custom agency branding',
        'Sell concrete structural repairs instead of abstract scorecards',
      ],
    },
  ];

  return (
    <section className="py-20 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Header Pill */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-[#2563EB] mb-4 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Founder Manifesto : Why We Built VitalsSniper</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] mb-6 leading-tight">
            Why We Built VitalsSniper: <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">The Problem With Modern Website Audits</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            If you have ever tried to audit a website, you know how frustrating the process has become.
          </p>
        </div>

        {/* Narrative & Shared Pain Point */}
        <div className="max-w-3xl mx-auto mb-12 text-sm sm:text-base text-[#4B5563] space-y-4 leading-relaxed">
          <p>
            You plug a URL into an audit tool, wait 30 seconds for a server queue, and get back a wall of red numbers and developer jargon: <span className="font-semibold text-[#0F0F0F]">&ldquo;minimize main-thread work,&rdquo; &ldquo;reduce unused JavaScript,&rdquo; &ldquo;avoid chaining critical requests.&rdquo;</span>
          </p>
          <p className="font-semibold text-[#0F0F0F]">
            That output helps almost nobody:
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0F0F0F] block mb-0.5">If you run an agency:</strong>
                <span className="text-xs sm:text-sm text-[#4B5563]">Your team spends two hours turning those numbers into a 50-page PDF report. You email it to a business owner, and they delete it in five seconds because it looks like a confusing homework assignment.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0F0F0F] block mb-0.5">If you are a solo freelancer:</strong>
                <span className="text-xs sm:text-sm text-[#4B5563]">You do not have 10 hours a week to waste on manual report building, and you cannot justify $300 a month on enterprise SEO suites just to pitch a few local clients.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0F0F0F] block mb-0.5">If you are a solo website owner:</strong>
                <span className="text-xs sm:text-sm text-[#4B5563]">You stare at a red score of 38 in panic. You have no idea which image on your homepage is actually causing the problem, and you feel stuck between ignoring it or paying someone thousands of dollars to fix it.</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Clean Break Punchline */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0F0F] text-white my-12 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                <span>The Clean Break</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                We built VitalsSniper because we were exhausted by this entire charade.
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                People do not act on abstract scorecards. They act on visible, undeniable evidence. When you can see the exact slowest element highlighted right on your screen, the problem stops being theoretical: it becomes obvious and actionable.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-2xl font-black text-white font-mono block">50ms</span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider block">In-Tab Execution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Personas Benefit Grid */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F0F0F] mb-3">
              One Engine. Three Specific Transformations.
            </h3>
            <p className="text-sm text-[#4B5563]">
              Whether you are fixing your own website or pitching performance retainers, VitalsSniper turns technical data into practical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB] flex items-center justify-center text-[#0F0F0F]">
                        <IconComp className="h-5 w-5 text-[#2563EB]" />
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#0F0F0F] mb-1">
                      {p.title}
                    </h4>
                    <span className="text-xs font-medium text-[#6B7280] block mb-4">
                      {p.subtitle}
                    </span>

                    <div className="space-y-3 mb-6 text-xs text-[#4B5563] leading-relaxed">
                      <div className="p-3 rounded-xl bg-[#F8F8F8] border border-[#E5E7EB]">
                        <span className="font-bold text-[#0F0F0F] block mb-1">The Pain Point:</span>
                        {p.painPoint}
                      </div>
                      <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                        <span className="font-bold text-[#2563EB] block mb-1">The VitalsSniper Fix:</span>
                        {p.solution}
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
                        Concrete Benefits:
                      </span>
                      {p.outcomes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#4B5563]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#auditor"
                    className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] hover:bg-[#F3F4F6] text-xs font-bold text-[#0F0F0F] transition-all"
                  >
                    <span>Test on Your Site</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#2563EB]" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free Public Beta Assurance */}
        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F8F8F8] text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/60 border border-emerald-200 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% Free Public Beta : Zero API Keys or Credit Limits</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            VitalsSniper executes locally in your browser using native Chrome DevTools Protocol APIs. Because it costs us zero server fees to run your diagnostics, the core in-tab scanner is completely free for solo owners, freelancers, and agencies.
          </p>
        </div>

      </div>
    </section>
  );
}
