'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export default function RoiCalculator({ onOpenCheckout }: { onOpenCheckout: (tier: 'solo' | 'agency') => void }) {
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
    <section className="py-20 border-t border-white/[0.08] bg-[#0c0e16]/50">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <TrendingUp className="h-3.5 w-3.5" />
            Agency Revenue Potential
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Agency ROI Calculator
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            See how converting just 1 or 2 high-ticket clients per month using proof-of-flaw teardowns completely transforms your agency revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-white/10 bg-[#12141d] p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          
          {/* Sliders (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Slider 1 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  Pitches Sent Per Week
                </label>
                <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
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
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>5 / wk (1-hour effort)</span>
                <span>100 / wk (Full SDR team)</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  Estimated Response Rate
                </label>
                <span className="font-mono text-sm font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md">
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
                className="w-full accent-blue-500 cursor-pointer h-2 bg-gray-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>4% (Generic pitch)</span>
                <span>30% (Proof-of-flaw teardown)</span>
              </div>
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-400" />
                  Average Remediation Retainer
                </label>
                <span className="font-mono text-sm font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md">
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
                className="w-full accent-purple-500 cursor-pointer h-2 bg-gray-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>$1,000 (Basic speed sprint)</span>
                <span>$7,500+ (Full rebuild/retainer)</span>
              </div>
            </div>

          </div>

          {/* Projected Revenue Output (Right 5 Cols) */}
          <div className="lg:col-span-5 rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-[#141724] to-[#12141d] p-6 sm:p-8 flex flex-col justify-between text-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Projected New Monthly Pipeline
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight my-3">
                ${estimatedMonthlyRevenue.toLocaleString()}
                <span className="text-base text-gray-400 font-normal"> / mo</span>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                Based on closing ~{monthlyClosedClients} client deals per month from {monthlyReplies} interested replies.
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Annualized Pipeline:</span>
                <span className="font-bold text-white">${annualRevenue.toLocaleString()} / yr</span>
              </div>
              <div className="flex justify-between text-xs text-gray-300">
                <span>VitalsSniper Investment:</span>
                <span className="font-bold text-emerald-400">$39 One-Time</span>
              </div>
            </div>

            <button
              onClick={() => onOpenCheckout('solo')}
              className="w-full rounded-xl bg-white py-3.5 px-4 text-sm font-bold text-black transition-all hover:bg-gray-100 hover:scale-[1.02] shadow-[0_6px_20px_rgba(255,255,255,0.2)]"
            >
              Unlock VitalsSniper PRO ($39)
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
