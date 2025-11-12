import Navbar from '../components/Navbar'
import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import ProductCard from '../components/ProductCard'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function Products() {
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => { api.getProducts().then(setProducts) }, [])

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products])

  const filtered = useMemo(() => {
    return products.filter(p =>
      (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.short_description.toLowerCase().includes(q.toLowerCase())) &&
      (!category || category === 'All' || p.category === category)
    )
  }, [products, q, category])

  return (
    <div className="bg-[#070B14] min-h-screen text-white">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Semua Produk</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (<ProductCard key={p._id} product={p} />))}
        </div>
      </div>
    </div>
  )
}
