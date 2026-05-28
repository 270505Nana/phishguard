import {useState} from 'react';

const Tips=[
    {
        id:1,
        category:'SMS & WHATSAPP',
        icon:'💬',
        title:'Bank Resmi Tidak Meminta Kode/Link Verifikasi',
        content:'Pihak bank asli tidak akan pernah meminta kode PIN, OTP, password, atau verifikasi akun lewat percakapan WhatsApp atau pesan singkat (SMS). Jika ada, abaikan saja!',
        footer:'💡 Ingat selalu tips aman ini demi menjaga keamanan saldo & datamu!'
    },
    {
    id:       2,
    category: 'DOMAIN PALSU',
    icon:     '🌐',
    title:    'Teliti Nama Domain Palsu',
    content:  'Phisher sering memakai domain yang mirip tapi beda sedikit. Contoh: "tokopedla.com" bukan "tokopedia.com", atau "bca-secure.xyz" bukan "bca.co.id". Selalu cek ejaan domain dengan teliti sebelum memasukkan data apapun.',
    footer:   '💡 Bookmark situs resmi bank dan e-commerce favoritmu agar tidak salah akses.',
  },
  {
    id:       3,
    category: 'ENKRIPSI & GEMBOK',
    icon:     '🔒',
    title:    'Periksa Penggunaan Protokol HTTPS',
    content:  'HTTPS berarti koneksimu terenkripsi. Tapi ingat: HTTPS bukan jaminan situs aman dari penipuan! Phisher juga bisa pakai HTTPS. Tetap periksa nama domain-nya dengan teliti.',
    footer:   '💡 HTTPS = koneksi aman, bukan konten aman.',
  },
  {
    id:       4,
    category: 'HADIAH PALSU',
    icon:     '🎁',
    title:    'Waspada Iming-Iming Undian / Hadiah Gratis',
    content:  'Pesan seperti "Selamat! Kamu menang iPhone 15, klik link ini untuk klaim" hampir pasti penipuan. Tidak ada undian yang tidak kamu ikuti sebelumnya. Jangan klik, langsung hapus.',
    footer:   '💡 Kalau terlalu bagus untuk jadi kenyataan, kemungkinan besar itu penipuan.',
  },
  {
    id:       5,
    category: 'URGENSI PALSU',
    icon:     '⏰',
    title:    'Waspada Pesan yang Menciptakan Rasa Panik',
    content:  'Frasa seperti "Akunmu akan diblokir dalam 24 jam!", "Segera verifikasi sekarang!" adalah taktik psikologis phisher. Tujuannya agar kamu bertindak cepat tanpa berpikir. Tarik napas, verifikasi lewat saluran resmi.',
    footer:   '💡 Phisher menjual kepanikan. Tetap tenang adalah pertahanan terbaik.',
  },
]

export default function TipsPanel(){

    // save id yg lagi di open/akses
    const [activeId, setActiveId] = useState(null);
    function toggle(id){
        setActiveId(prev => prev === id ? null : id);
    }

    return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">

        <div className="flex items-center gap-2 mb-2">
            <span>💡</span>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Tips Keamanan Bersahabat
            </p>
        </div>
        <p className="text-sm text-gray-500 mb-5">
            Belajar mengenali ciri phishing dengan bahasa santai agar akunmu makin aman!
        </p>

        <div className="flex flex-col gap-2">
            {TIPS.map(tip => {
            const isOpen = activeId === tip.id

            return (
                <div
                key={tip.id}
                className={`border rounded-xl overflow-hidden transition-all
                    ${isOpen ? 'border-green-200' : 'border-gray-100'}`}
                >
                <button
                    onClick={() => toggle(tip.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                    <span className="text-xl">{tip.icon}</span>

                    <div className="flex-1 min-w-0">
                    <p className="text-xs text-green-600 font-semibold tracking-wider">
                        {tip.category}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">
                        {tip.title}
                    </p>
                    </div>

                    <span className={`text-gray-300 transition-transform duration-200
                    ${isOpen ? 'rotate-90' : ''}`}>
                    ›
                    </span>
                </button>

                {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-gray-50">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {tip.content}
                    </p>
                    <p className="text-xs text-green-600 mt-3 font-medium">
                        {tip.footer}
                    </p>
                    </div>
                )}
                </div>
            )
            })}
        </div>
        </div>
    )
}