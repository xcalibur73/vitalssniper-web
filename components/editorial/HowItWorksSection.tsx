'use client';

import React from 'react';
import { Search, Cpu, ArrowUpRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Enter your URL',
      description: 'Provide any public URL or subdomain. No registration, tracking scripts, or DNS configuration required.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Run the analysis',
      description: 'Our engine runs synthetic lab probes measuring Core Web Vitals, DOM architecture, server TTFB, and SEO schemas.',
      icon: Cpu,
    },
    {
      number: '03',
      title: 'Understand and improve',
      description: 'Receive an honest diagnostic report with prioritized findings, code-level recommendations, and performance fixes.',
      icon: ArrowUpRight,
    },
  ];

  return (
    <section className="py-16 md:py-20 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F0F0F]">
            How it works
          </h2>
          <p className="text-base text-[#4B5563] mt-2">
            A transparent 3-step audit methodology designed for engineers, founders, and technical SEOs.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] p-6 transition-colors hover:border-[#D1D5DB]"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-bold font-mono text-[#0F0F0F]">
                    {step.number}
                  </span>
                  <div className="h-9 w-9 rounded-lg border border-[#E5E7EB] bg-white flex items-center justify-center text-[#2563EB]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}