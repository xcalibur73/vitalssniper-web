'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I access the VitalsSniper Public Beta?',
    answer: 'VitalsSniper is currently open for free public beta testing directly on this website. You can audit any URL in real-time, test DOM bloat, evaluate server TTFB, and generate technical cold email outreach pitches without payment or credit card.',
  },
  {
    question: 'Which web browsers are supported?',
    answer: 'VitalsSniper PRO is built on the modern Manifest V3 extension standard and runs natively on Google Chrome, Brave Browser, Microsoft Edge, Arc, Opera, Vivaldi, and Mozilla Firefox.',
  },
  {
    question: 'Does VitalsSniper send audited client URLs to external servers?',
    answer: 'No. VitalsSniper PRO runs with 100% client-side privacy. All DOM tree evaluations, cellular payload calculations, CMS signatures, and competitor comparisons execute in 50 milliseconds directly in your browser. Zero client URLs or diagnostic telemetry are sent to external databases.',
  },
  {
    question: 'How does the White-Label Agency Branding and booking CTA work?',
    answer: 'Click the Settings gear icon in the extension header. You can add your Agency Name, Custom Logo URL, Lead Auditor Name & Title, and your Calendly or Cal.com booking link. When you click "Export PDF Teardown", VitalsSniper dynamically stamps your branding and a 15-minute call booking card onto the executive report.',
  },
  {
    question: 'Can I export saved leads directly to Instantly or Lemlist?',
    answer: 'Yes! While browsing target prospects, click the "📌 Save" button to store the lead in your extension storage. Open the Pipeline drawer and click "Export CSV" to download an RFC-4180 compliant CSV file formatted with domain, tech stack, health score, and personalized pitch hooks ready for cold outreach sequences.',
  },
  {
    question: 'How do I use the Live LCP Element Visual Highlighter?',
    answer: 'While on any target website, click "🎯 Highlight LCP" in the extension utility grid. VitalsSniper injects an emerald pulse animation around the exact Largest Contentful Paint DOM node sabotaging their score and attaches a floating diagnostic pill. It creates instant visual proof during 30-second Loom recordings or live Zoom pitches.',
  },
  {
    question: 'Is there any cost during the Public Beta?',
    answer: 'No. The public beta is 100% free with zero credit card required. You can test client-side audits and join the research cohort to shape upcoming features.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 border-t border-white/[0.08] bg-[#0c0d14]/40">
      <div className="mx-auto max-w-4xl px-6">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to know about activating your license, using the extension, and running client acquisition campaigns.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-emerald-500/40 bg-[#12141d] shadow-[0_4px_24px_rgba(16,185,129,0.08)]'
                    : 'border-white/10 bg-[#10121a] hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
