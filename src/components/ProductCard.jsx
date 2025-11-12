import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
          {product.logo_url ? (
            <img src={product.logo_url} alt={product.name} className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-xl">🅿️</span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-300 line-clamp-2">{product.short_description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-cyan-400 font-semibold">Mulai {new Intl.NumberFormat('id-ID').format(product.price_monthly)} IDR/bulan</div>
        <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300">
          Lihat <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
