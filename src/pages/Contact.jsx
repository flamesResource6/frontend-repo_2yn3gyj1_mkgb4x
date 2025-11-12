import Navbar from '../components/Navbar'
import { useState } from 'react'
import { api } from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', whatsapp:'', message:'' })
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.contact(form)
      setSent(true)
      setForm({ name:'', email:'', whatsapp:'', message:'' })
    } catch(e) { alert(e.message) }
  }

  return (
    <div className="bg-[#070B14] min-h-screen text-white">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-6 pb-24">
        <h1 className="text-3xl font-bold mb-6">Kontak & Bantuan</h1>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required placeholder="Nama" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} className="bg-black/40 border border-white/10 rounded px-3 py-2" />
            <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm(v=>({...v, email:e.target.value}))} className="bg-black/40 border border-white/10 rounded px-3 py-2" />
            <input placeholder="WhatsApp" value={form.whatsapp} onChange={e=>setForm(v=>({...v, whatsapp:e.target.value}))} className="bg-black/40 border border-white/10 rounded px-3 py-2 sm:col-span-2" />
            <textarea required placeholder="Pesan" value={form.message} onChange={e=>setForm(v=>({...v, message:e.target.value}))} className="bg-black/40 border border-white/10 rounded px-3 py-2 sm:col-span-2 min-h-[120px]" />
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black rounded px-4 py-2 sm:col-span-2">Kirim</button>
          </form>
          {sent && <div className="text-emerald-400 mt-3">Pesan terkirim! Admin akan menghubungi via WhatsApp/Email.</div>}

          <div className="mt-6 text-gray-300">
            <div>WhatsApp: <a className="text-cyan-400" href="https://wa.me/6281234567890" target="_blank">+62 812-3456-7890</a></div>
            <div>Telegram: <a className="text-cyan-400" href="https://t.me/nasir_store" target="_blank">@nasir_store</a></div>
            <div className="mt-2 text-sm">FAQ: Cara beli, garansi, refund, dan lainnya akan kami kirim setelah pesanan.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
