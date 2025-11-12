import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { api } from '../api'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [pkg, setPkg] = useState('1 Month')

  useEffect(() => { api.getProduct(slug).then(setProduct) }, [slug])

  if (!product) return <div className="min-h-screen bg-[#070B14] text-white"><Navbar /><div className="pt-24 px-6">Memuat...</div></div>

  const monthly = product.price_monthly || 0
  const multiplier = { '1 Month':1, '3 Months':3, '6 Months':6, '12 Months':12, 'Lifetime':20 }[pkg]
  const price = monthly * multiplier

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />
      <div className="pt-24 max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
            {product.logo_url && <img src={product.logo_url} alt={product.name} className="w-12 h-12 object-contain" />}
          </div>
          <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
          <p className="text-gray-300 mt-2">{product.description}</p>
          <div className="mt-4 text-sm text-gray-300">Metode login: <span className="text-white font-medium">{product.login_method}</span></div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Pilih paket</label>
            <select value={pkg} onChange={e=>setPkg(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2">
              {product.durations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="mt-4 text-2xl font-bold text-cyan-400">{new Intl.NumberFormat('id-ID').format(price)} IDR</div>
          <OrderForm product={product} pkg={pkg} price={price} />
        </div>
      </div>
    </div>
  )
}

function OrderForm({ product, pkg, price }) {
  const [form, setForm] = useState({ buyer_name:'', email:'', whatsapp:'', payment_method:'QRIS', delivery_channel:'email' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.createOrder({ product_slug: product.slug, package: pkg, buyer_name: form.buyer_name, email: form.email, whatsapp: form.whatsapp, payment_method: form.payment_method, delivery_channel: form.delivery_channel })
      setResult(res)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  const notifyPaid = async () => {
    if (!result?.order_code) return
    const res = await api.notifyPayment({ order_code: result.order_code, status: 'paid' })
    setResult(prev => ({ ...prev, ...res }))
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input required placeholder="Nama lengkap" value={form.buyer_name} onChange={e=>setForm(v=>({...v, buyer_name:e.target.value}))} className="bg-black/40 border border-white/10 rounded-lg px-3 py-2" />
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm(v=>({...v, email:e.target.value}))} className="bg-black/40 border border-white/10 rounded-lg px-3 py-2" />
      </div>
      <input required placeholder="WhatsApp" value={form.whatsapp} onChange={e=>setForm(v=>({...v, whatsapp:e.target.value}))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Metode Pembayaran</label>
          <select value={form.payment_method} onChange={e=>setForm(v=>({...v, payment_method:e.target.value}))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2">
            <option>QRIS</option>
            <option>Bank Transfer</option>
            <option>E-Wallet</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Pengiriman Akun</label>
          <select value={form.delivery_channel} onChange={e=>setForm(v=>({...v, delivery_channel:e.target.value}))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2">
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="both">Keduanya</option>
          </select>
        </div>
      </div>
      <button disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg py-2">{loading ? 'Memproses...' : `Beli Sekarang (${new Intl.NumberFormat('id-ID').format(price)} IDR)`}</button>

      {result && (
        <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-300">Kode Pesanan:</div>
          <div className="text-white font-mono">{result.order_code}</div>
          {result.payment && result.payment.type === 'qris' && (
            <div className="mt-3">
              <img src={result.payment.qr_image} alt="QRIS" className="w-40 h-40" />
              <div className="text-gray-300 text-sm mt-2">{result.payment.note}</div>
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={notifyPaid} className="px-3 py-2 rounded bg-emerald-500 text-black">Tandai Sudah Bayar (Demo)</button>
          </div>
          {result.delivered_payload && (
            <div className="mt-3 text-sm">
              <div className="text-gray-300">Akun Anda:</div>
              <div className="bg-black/40 rounded p-3 font-mono">{JSON.stringify(result.delivered_payload)}</div>
            </div>
          )}
        </div>
      )}
    </form>
  )
}
