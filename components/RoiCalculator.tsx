'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export default function RoiCalculator({ onOpenCheckout }: { onOpenCheckout?: (tier: 'solo' | 'agency') => void }) {
  const [pitchesPerWeek, setPitchesPerWeek] = useState(25);
  const [responseRate, setResponseRate] = useState(12); // percent
  const [retainerPrice, setRetainerPrice] = useState(2500); // dollars

  // Calculations
  const monthlyPitches = pitchesPerWeek * 4;
  const monthlyReplies = Math.round((monthlyPitches * responseRate) / 100);
  const monthlyClosedClients = Math.max(1, Math.round(monthlyReplies * 0.35));
  const estimatedMonthlyRevenue = monthlyClosedClients * retainerPrice;
  const annualRevenue = estimatedMonthlyRevenue * 12;

  return (
    <section className="py-20 border-b border-[#E5E7EB] bg-[#F8F8F8]">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-4">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Agency Revenue Potential</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] mb-3">
            Agency ROI Calculator
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base">
            See how converting just 1 or 2 high-ticket clients per month using proof-of-flaw teardowns completely transforms your agency revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-10 shadow-xs">
          
          {/* Sliders (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Slider 1 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#0F0F0F] flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#2563EB]" />
                  <span>Pitches Sent Per Week</span>
                </label>
                <span className="font-mono text-sm font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {pitchesPerWeek} pitches
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={pitchesPerWeek}
                onChange={(e) => setPitchesPerWeek(Number(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer h-2 bg-[#E5E7EB] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#6B7280] mt-1">
                <span>5 / wk (1-hour effort)</span>
                <span>100 / wk (Full SDR team)</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#0F0F0F] flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#2563EB]" />
                  <span>Estimated Response Rate</span>
                </label>
                <span className="font-mono text-sm font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {responseRate}%
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={responseRate}
                onChange={(e) => setResponseRate(Number(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer h-2 bg-[#E5E7EB] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#6B7280] mt-1">
                <span>4% (Generic pitch)</span>
                <span>30% (Proof-of-flaw teardown)</span>
              </div>
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#0F0F0F] flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-[#2563EB]" />
                  <span>Average Remediation Retainer</span>
                </label>
                <span className="font-mono text-sm font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-md">
                  ${retainerPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="7500"
                step="250"
                value={retainerPrice}
                onChange={(e) => setRetainerPrice(Number(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer h-2 bg-[#E5E7EB] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#6B7280] mt-1">
                <span>$1,000 (Basic speed sprint)</span>
                <span>$7,500+ (Full rebuild/retainer)</span>
              </div>
            </div>

          </div>

          {/* Projected Revenue Output (Right 5 Cols) */}
          <div className="lg:col-span-5 rounded-xl border border-blue-200 bg-blue-50/50 p-6 sm:p-8 flex flex-col justify-between text-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#2563EB] font-bold">
                Projected New Monthly Pipeline
              </span>
              <div className="text-4xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight my-3">
                ${estimatedMonthlyRevenue.toLocaleString()}
                <span className="text-base text-[#6B7280] font-normal"> / mo</span>
              </div>
              <p className="text-xs text-[#4B5563] mb-6">
                Based on closing ~{monthlyClosedClients} client deals per month from {monthlyReplies} interested replies.
              </p>
            </div>

            <div className="border-t border-blue-200/60 pt-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-xs text-[#4B5563]">
                <span>Annualized Pipeline:</span>
                <span className="font-bold text-[#0F0F0F]">${annualRevenue.toLocaleString()} / yr</span>
              </div>
              <div className="flex justify-between text-xs text-[#4B5563]">
                <span>VitalsSniper Investment:</span>
                <span className="font-bold text-emerald-700">$0 Free in Beta</span>
              </div>
            </div>

            <a
              href="/vitalssniper#auditor"
              className="w-full rounded-xl bg-[#2563EB] py-3.5 px-4 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] hover:scale-[1.01] shadow-xs block text-center"
            >
              Test Free In-Browser Beta
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
