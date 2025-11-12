import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-black to-[#0a0f1a] text-white">
      <div className="absolute inset-0 opacity-40">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          Akun Premium Murah & Legal — Nikmati Fitur Pro Tanpa Batas!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 text-lg text-gray-200 max-w-2xl"
        >
          Netflix, Spotify, Canva Pro, ChatGPT Plus, YouTube Premium, Microsoft 365, Adobe CC, dan banyak lagi. Pengiriman instan, garansi, support 24 jam.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link to="/products" className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors">
            Lihat Produk
          </Link>
          <a href="#featured" className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
            Produk Unggulan
          </a>
        </motion.div>
      </div>
    </section>
  )
}
