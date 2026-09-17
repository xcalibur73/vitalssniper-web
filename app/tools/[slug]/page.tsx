import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { PRODUCTS, Product } from '@/data/products';
import { ArrowLeft, Check, X as XIcon, Star, ExternalLink, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductReview({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col items-center justify-center">
        <h1 className="font-editorial text-3xl font-bold mb-4">Product not found</h1>
        <Link href="/tools" className="text-terracotta hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
        </Link>
      </div>
    );
  }

  const relatedTools = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <Link href="/tools" className="inline-flex items-center text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Tools Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Review Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="paper-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="text-4xl sm:text-5xl">{product.iconEmoji}</div>
                <div>
                  <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal mb-2">{product.name}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="editorial-pill">
                      {product.category}
                    </span>
                    {product.isOwnProduct && (
                      <span className="px-3 py-0.5 bg-terracotta text-white rounded-full text-xs font-bold">
                        Our Flagship Tool
                      </span>
                    )}
                    <div className="flex items-center text-amber-600 font-bold text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-500' : 'text-sand-400'}`} />
                      ))}
                      <span className="ml-1.5">{product.rating.toFixed(1)} / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-6">{product.description}</p>
              
              <div className="mb-8">
                <AffiliateDisclosure compact={true} />
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-5 rounded-xl bg-[#faf8f5] border border-sand-300">
                <div>
                  <h3 className="font-editorial text-lg font-bold mb-3 flex items-center text-emerald-800">
                    <Check className="w-4 h-4 mr-1.5 text-emerald-600" /> Key Strengths
                  </h3>
                  <ul className="space-y-2">
                    {product.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start text-xs text-charcoal-muted">
                        <Check className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-emerald-600 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold mb-3 flex items-center text-rose-800">
                    <XIcon className="w-4 h-4 mr-1.5 text-rose-500" /> Limitations
                  </h3>
                  <ul className="space-y-2">
                    {product.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start text-xs text-charcoal-muted">
                        <XIcon className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-rose-500 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h3 className="font-editorial text-xl font-bold text-charcoal mb-4">Core Capabilities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-charcoal-light p-3 rounded-lg bg-[#faf8f5] border border-sand-300">
                      <Check className="w-3.5 h-3.5 mr-2 text-terracotta shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-sand-300">
                {product.isOwnProduct ? (
                  <Link href="/vitalssniper" className="w-full flex items-center justify-center py-3.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
                    <span>See Full VitalsSniper PRO Details</span> <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                ) : (
                  <a href={product.affiliateUrl} rel="nofollow sponsored noopener" target="_blank" className="w-full flex items-center justify-center py-3.5 bg-charcoal hover:bg-black text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
                    <span>Visit {product.name}</span> <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="paper-card rounded-2xl p-6">
                <div className="mb-5">
                  <p className="text-xs font-semibold text-charcoal-subtle uppercase tracking-wider mb-1">Pricing Model</p>
                  <p className="font-editorial text-2xl font-bold text-terracotta">{product.pricing}</p>
                </div>
                
                <div className="mb-6 pb-6 border-b border-sand-300">
                  <p className="text-xs font-semibold text-charcoal-subtle uppercase tracking-wider mb-1">Editorial Verdict</p>
                  <p className="text-xs text-charcoal-muted leading-relaxed italic">{product.verdict}</p>
                </div>

                {product.isOwnProduct ? (
                  <Link href="/vitalssniper" className="w-full flex items-center justify-center py-3 bg-terracotta text-white rounded-xl font-bold text-xs hover:bg-terracotta-dark transition-colors shadow-xs">
                    Get Lifetime License ($39)
                  </Link>
                ) : (
                  <a href={product.affiliateUrl} rel="nofollow sponsored noopener" target="_blank" className="w-full flex items-center justify-center py-3 bg-charcoal text-white rounded-xl font-bold text-xs hover:bg-black transition-colors shadow-xs">
                    Visit Official Site <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                )}
              </div>

              {relatedTools.length > 0 && (
                <div className="paper-card rounded-2xl p-6">
                  <h3 className="font-editorial text-lg font-bold text-charcoal mb-4">Related in {product.category}</h3>
                  <div className="space-y-3">
                    {relatedTools.map((tool) => (
                      <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-sand-200 transition-colors group">
                        <span className="text-xl">{tool.iconEmoji}</span>
                        <div>
                          <p className="text-xs font-bold text-charcoal group-hover:text-terracotta transition-colors">{tool.name}</p>
                          <p className="text-[11px] text-charcoal-subtle">{tool.pricing}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
