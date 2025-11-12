import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Store, MessageCircle, HelpCircle, Star, Home } from 'lucide-react'

const navItemClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold tracking-wide">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>
          <span>Nasir Store</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={navItemClass} end><Home className="inline mr-2" size={16}/>Home</NavLink>
          <NavLink to="/products" className={navItemClass}><ShoppingCart className="inline mr-2" size={16}/>Produk</NavLink>
          <NavLink to="/testimonials" className={navItemClass}><Star className="inline mr-2" size={16}/>Testimoni</NavLink>
          <NavLink to="/contact" className={navItemClass}><MessageCircle className="inline mr-2" size={16}/>Bantuan</NavLink>
          <NavLink to="/about" className={navItemClass}><HelpCircle className="inline mr-2" size={16}/>Tentang</NavLink>
        </nav>
      </div>
    </header>
  )
}
