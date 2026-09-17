import Image from 'next/image'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'

export default function FeaturedProduct() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative rounded-2xl border border-emerald-500/30 bg-[#11131c]/90 backdrop-blur-sm overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Left side - Window Chrome & Image */}
          <div className="w-full lg:w-[60%] border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20 flex flex-col">
            {/* macOS Window Chrome */}
            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#0d0f17]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-gray-500 font-mono">
                Web Audits - Active Tab Inspector
              </div>
            </div>
            
            {/* Image Container */}
            <div className="relative p-4 md:p-8 flex-1 flex items-center justify-center">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
                <Image
                  src="/assets/appsumo_hero_1920x1080.png"
                  alt="VitalsSniper PRO Interface"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs font-medium text-emerald-400 w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Our Flagship Product
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-6">VitalsSniper PRO</h3>
            
            <ul className="space-y-4 mb-8">
              {[
                '50ms client-side website forensics',
                'White-label PDF teardowns with booking CTA',
                'Built-in lead CRM with CSV export'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-emerald-500/20 p-0.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              <div className="text-sm font-medium text-emerald-400 mb-3">
                Public Beta: Free In-Browser Testing
              </div>
              <Link 
                href="/vitalssniper#auditor"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
              >
                Launch Free Beta Audit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
