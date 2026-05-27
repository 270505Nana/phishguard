import { useState } from 'react'
import UrlChecker       from './components/UrlChecker'
import ResultCard       from './components/ResultCard'
import FeatureExplainer from './components/FeatureExplainer'
import HistoryPanel     from './components/HistoryPanel'
import { useHistory }   from './hooks/useHistory'

export default function App() {
  const [result, setResult] = useState(null)
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory()

  function handleResult(data) {
    setResult(data)
    // Simpan ke riwayat setiap kali ada hasil baru
    addToHistory(data.url, data)
  }

  const [recheckUrl, setRecheckUrl] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">
          🛡️
        </div>
        <div>
          <h1 className="font-bold text-gray-800">PhishGuard</h1>
          <p className="text-xs text-gray-400">Sahabat Cek Link Aman-mu</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Apakah link ini aman? 🤔
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Paste URL yang mencurigakan, kami analisis dalam sekejap.
          </p>
        </div>

        <UrlChecker
          onResult={handleResult}
          initialUrl={recheckUrl}
        />

        {result && <ResultCard result={result} />}
        {result && <FeatureExplainer indicators={result.indicators} />}

        <HistoryPanel
          history={history}
          onRecheck={(url) => { setRecheckUrl(url) }}
          onRemove={removeFromHistory}
          onClear={clearHistory}
        />

      </main>
    </div>
  )
}