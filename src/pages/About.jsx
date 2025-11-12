import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div className="bg-[#070B14] min-h-screen text-white">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-6 pb-24">
        <h1 className="text-3xl font-bold mb-6">Tentang Kami</h1>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3 text-gray-200">
          <p>Nasir Store adalah toko digital yang fokus menyediakan akun premium legal untuk berbagai aplikasi populer. Misi kami adalah menghadirkan akses fitur profesional dengan harga terjangkau, pengiriman cepat, dan dukungan penuh kepada pelanggan.</p>
          <p>Kami menjamin keamanan dan kepuasan pelanggan dengan sistem garansi dan panduan penggunaan yang jelas. Setiap pembelian dilayani secara otomatis dan human support siap membantu 24/7.</p>
          <p>Kepercayaan Anda adalah prioritas kami.</p>
        </div>
      </div>
    </div>
  )
}
