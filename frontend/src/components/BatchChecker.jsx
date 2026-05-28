import {useState} from 'react';
import axios from 'axios';

export default function BatchChecker(){
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    async function handleBatchAnalyze(){


        const urls = input
        .split('\n')
        .map(u => u.trim())
        .filter(Boolean);

        if(urls.length === 0)return

        setLoading(true);
        setResults([]);
        setProgress(0);

        const batchResult = []

        for (let i = 0;i < urls.length;i++){
            const url = urls[i]

            try{
                const response = await axios.post('http://localhost:8000/analyze', { url })
                batchResult.push({...response.data, status: 'success'})
            }catch{
                batchResut.push({
                    url,
                    score:0,
                    label:'error',
                    message: 'Gagal menganalisa URL ini',
                    status: 'error'
                })
            }
            setProgress (i+1)
        }
        setResults(batchResult)
        setLoading(false)

    }
    
  function getLabelColor(label) {
    if (label === 'Aman')      return 'text-green-600 bg-green-50'
    if (label === 'Waspada')   return 'text-yellow-600 bg-yellow-50'
    if (label === 'Berbahaya') return 'text-red-600 bg-red-50'
    return 'text-gray-500 bg-gray-50'
  }

  const summary = {
    aman:      results.filter(r => r.label === 'Aman').length,
    waspada:   results.filter(r => r.label === 'Waspada').length,
    berbahaya: results.filter(r => r.label === 'Berbahaya').length,
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">

      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
        📋 Cek Banyak URL Sekaligus
      </p>
      <p className="text-xs text-gray-400 mb-4">
        Paste beberapa URL, satu per baris. Cocok untuk admin atau pengguna teknis.
      </p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={`https://google.com\nhttps://bca-verifikasi.xyz\nhttps://tokopedia.com`}
        rows={5}
        className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 font-mono resize-none outline-none focus:border-green-300 transition-colors"
      />

      <button
        onClick={handleBatchAnalyze}
        disabled={loading || !input.trim()}
        className="mt-3 w-full bg-green-500 hover:bg-green-600 disabled:bg-green-200 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {loading
          ? `Menganalisis... (${progress}/${input.split('\n').filter(Boolean).length})`
          : 'Analisis Semua URL'}
      </button>

      {loading && (
        <div className="mt-3 bg-gray-100 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(progress / input.split('\n').filter(Boolean).length) * 100}%`
            }}
          />
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-5">

          <div className="flex gap-3 mb-4">
            <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
              ✅ Aman: {summary.aman}
            </span>
            <span className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium">
              ⚠️ Waspada: {summary.waspada}
            </span>
            <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full font-medium">
              🚨 Berbahaya: {summary.berbahaya}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {results.map((r, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl"
              >
                <span className="text-xs text-gray-300 font-mono w-5 flex-shrink-0">
                  {index + 1}
                </span>

                <p className="flex-1 text-xs font-mono text-gray-600 truncate">
                  {r.url}
                </p>

                <span className="text-xs text-gray-400 flex-shrink-0">
                  {r.score}/100
                </span>

                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${getLabelColor(r.label)}`}>
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}