import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Testimonials() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', rating:5, comment:'' })

  useEffect(() => { api.getTestimonials().then(setItems) }, [])

  const submit = async (e) => {
    e.preventDefault()
    await api.createTestimonial(form)
    setForm({ name:'', rating:5, comment:'' })
    setItems(await api.getTestimonials())
  }

  return (
    <div className="bg-[#070B14] min-h-screen text-white">
      <Navbar />
      <div className="pt-24 max-w-5xl mx-auto px-6 pb-24">
        <h1 className="text-3xl font-bold mb-6">Testimoni Pelanggan</h1>
        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-4 grid sm:grid-cols-4 gap-3 mb-6">
          <input required placeholder="Nama" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} className="bg-black/40 border border-white/10 rounded px-3 py-2 sm:col-span-1" />
          <select value={form.rating} onChange={e=>setForm(v=>({...v, rating:Number(e.target.value)}))} className="bg-black/40 border border-white/10 rounded px-3 py-2">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
          </select>
          <input required placeholder="Komentar" value={form.comment} onChange={e=>setForm(v=>({...v, comment:e.target.value}))} className="bg-black/40 border border-white/10 rounded px-3 py-2 sm:col-span-2" />
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black rounded px-4 py-2">Kirim</button>
        </form>
        <div className="grid gap-3">
          {items.map(t => (
            <div key={t._id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="font-semibold">{t.name} <span className="text-yellow-400">{'⭐'.repeat(t.rating)}</span></div>
              <div className="text-gray-300">{t.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
