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
      <div className="min-h-screen bg-[#08090e] text-[#f9fafb] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Link href="/tools" className="text-emerald-500 hover:text-emerald-400 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
        </Link>
      </div>
    );
  }

  const relatedTools = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#08090e] bg-tech-grid text-[#f9fafb] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <Link href="/tools" className="inline-flex items-center text-gray-400 hover:text-emerald-500 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#12141d] rounded-2xl p-8 border border-white/5">
              <div className="flex items-start gap-6 mb-6">
                <div className="text-5xl">{product.iconEmoji}</div>
                <div>
                  <h1 className="text-3xl font-extrabold mb-2">{product.name}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300">
                      {product.category}
                    </span>
                    {product.isOwnProduct && (
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full text-xs font-bold">
                        Our Product
                      </span>
                    )}
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-600'}`} />
                      ))}
                      <span className="ml-2 text-sm text-gray-400">{product.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">{product.description}</p>
              
              <div className="mb-8">
                <AffiliateDisclosure compact={true} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center text-emerald-400">
                    <Check className="w-5 h-5 mr-2" /> Pros
                  </h3>
                  <ul className="space-y-3">
                    {product.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-4 h-4 mr-2 mt-1 text-emerald-500 shrink-0" />
                        <span className="text-gray-300 text-sm leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center text-red-400">
                    <XIcon className="w-5 h-5 mr-2" /> Cons
                  </h3>
                  <ul className="space-y-3">
                    {product.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start">
                        <XIcon className="w-4 h-4 mr-2 mt-1 text-red-500 shrink-0" />
                        <span className="text-gray-300 text-sm leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-3 bg-white/5 rounded-xl p-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-emerald-500 shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                {product.isOwnProduct ? (
                  <Link href="/vitalssniper" className="w-full flex items-center justify-center py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors">
                    See Full Product Details <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                ) : (
                  <a href={product.affiliateUrl} rel="nofollow sponsored noopener" target="_blank" className="w-full flex items-center justify-center py-4 bg-white hover:bg-gray-100 text-[#090a10] rounded-xl font-bold transition-colors">
                    Visit {product.name} <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#12141d] rounded-2xl p-6 border border-white/5">
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-1">Starting from</p>
                  <p className="text-3xl font-extrabold text-emerald-400">{product.pricing}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Our Verdict</p>
                  <p className="text-sm text-gray-200 italic">"{product.verdict}"</p>
                </div>

                {product.isOwnProduct ? (
                  <Link href="/vitalssniper" className="w-full flex items-center justify-center py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold transition-colors">
                    View Details
                  </Link>
                ) : (
                  <a href={product.affiliateUrl} rel="nofollow sponsored noopener" target="_blank" className="w-full flex items-center justify-center py-3 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30 rounded-xl font-bold transition-colors">
                    Get {product.name} <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>

              {relatedTools.length > 0 && (
                <div className="bg-[#12141d] rounded-2xl p-6 border border-white/5">
                  <h3 className="font-bold mb-4">Related Tools</h3>
                  <div className="space-y-4">
                    {relatedTools.map(tool => (
                      <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center group">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg mr-3 group-hover:bg-white/10 transition-colors">
                          {tool.iconEmoji}
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-emerald-400 transition-colors">{tool.name}</p>
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
