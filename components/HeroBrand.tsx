'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Globe, Shield, Zap, BarChart3 } from 'lucide-react'

export default function HeroBrand() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Independent Reviews - Hands-On Benchmarks - Trusted by 2,400+ Agencies
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Find the Right Web Tools.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">
              Skip the Ones That Waste Your Budget.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Independent reviews, speed benchmarks, and hands-on testing of hosting, page builders, SEO tools, and web performance software. Plus our flagship VitalsSniper PRO inspector.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/tools" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/vitalssniper" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 text-white font-semibold transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Try VitalsSniper PRO
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { icon: BarChart3, label: '8+ Tools Reviewed' },
              { icon: Shield, label: '2,400+ Agencies Trust Us' },
              { icon: Zap, label: 'Speed Tested' },
              { icon: Globe, label: 'Updated Weekly' }
            ].map((metric, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-[#11131c]/80 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-white/5">
                  <metric.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  )
}
