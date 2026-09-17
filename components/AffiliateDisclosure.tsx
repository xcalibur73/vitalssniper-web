import { Info } from 'lucide-react'

interface AffiliateDisclosureProps {
  compact?: boolean;
}

export default function AffiliateDisclosure({ compact = false }: AffiliateDisclosureProps) {
  if (compact) {
    return (
      <p className="text-xs text-gray-500">
        Disclosure: Some links on this page are affiliate links. We may earn a commission at no extra cost to you.
      </p>
    )
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-sm text-gray-300">
      <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
      <p>
        <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links. We may earn a commission if you make a purchase through these links, at no extra cost to you. We only recommend tools we have personally tested and trust.
      </p>
    </div>
  )
}
