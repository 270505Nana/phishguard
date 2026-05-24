import { useState } from 'react'
import axios from 'axios'
// import function from validator.js
import { isValidUrl, normalizeUrl } from '../utils/validator'

export default function UrlChecker({ onResult }) {

  // 'url' contain user input form teks 
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function handleAnalyze() {
    setError('')
    // normalized url
    const normalized = normalizeUrl(url)
    if (!isValidUrl(normalized)) {
      setError('Format URL tidak valid. Contoh: https://google.com')
      return 
    }
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        url: normalized
      })
      onResult(response.data)

    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan backend berjalan.')

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
        Ketik atau paste link web di sini:
      </p>

      <div className="flex gap-3">

        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="https://contoh-link-mencurigakan.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-300"
          />
          {url && (
            <button
              onClick={() => setUrl('')}
              className="text-gray-300 hover:text-gray-500 text-lg leading-none"
            >×</button>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          {loading ? 'Menganalisis...' : 'Analisis Sekarang →'}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}

      <div className="flex gap-2 mt-3 flex-wrap">
        <span className="text-xs text-gray-400">Coba:</span>
        {['google.com', 'bca-verifikasi.xyz', 'tokopedia.com'].map(sample => (
          <button
            key={sample}
            onClick={() => setUrl('https://' + sample)}
            className="text-xs text-green-600 hover:underline"
          >
            {sample}
          </button>
        ))}
      </div>
    </div>
  )
}