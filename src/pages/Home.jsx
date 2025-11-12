import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useEffect, useState } from 'react'
import { api } from '../api'
import ProductCard from '../components/ProductCard'
import { ShieldCheck, Zap, HeadphonesIcon, BadgeCheck } from 'lucide-react'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    api.getProducts({ featured: true }).then(setFeatured).catch(() => setFeatured([]))
  }, [])

  return (
    <div className="bg-[#070B14] min-h-screen">
      <Navbar />
      <Hero />

      <section id="featured" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-white text-2xl font-bold mb-6">Produk Unggulan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(p => (<ProductCard key={p._id} product={p} />))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-white text-2xl font-bold mb-6">Kenapa pilih Nasir Store?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Adv icon={Zap} title="Pengiriman Instan" desc="Akun dikirim otomatis setelah pembayaran." />
          <Adv icon={ShieldCheck} title="Garansi" desc="Garansi sesuai ketentuan produk." />
          <Adv icon={HeadphonesIcon} title="Support 24/7" desc="Tim siap bantu kapan saja." />
          <Adv icon={BadgeCheck} title="Legal & Aman" desc="Metode resmi sesuai kebijakan." />
        </div>
      </section>
    </div>
  )
}

function Adv({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <Icon className="text-cyan-400" />
      <h3 className="text-white font-semibold mt-3">{title}</h3>
      <p className="text-gray-300 text-sm mt-1">{desc}</p>
    </div>
  )
}
