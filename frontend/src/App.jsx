import { useState }      from 'react'
import UrlChecker        from './components/Urlchecker'
import ResultCard        from './components/Resultcard'
import FeatureExplainer  from './components/FeatureExplainer'
import HistoryPanel      from './components/HistoryPanel'
// import TipsPanel         from './components/TipsPanel'
import BatchChecker      from './components/BatchChecker'
import { useHistory }    from './hooks/useHistory'

const TABS = [
  { id: 'checker', label: 'Cek URL' },
  { id: 'history', label: 'Riwayat' },
  { id: 'batch',   label: 'Batch Check' },
  { id: 'tips',    label: 'Tips Keamanan' },
]

export default function App() {
  const [result,     setResult]     = useState(null)
  const [activeTab,  setActiveTab]  = useState('checker')
  const [recheckUrl, setRecheckUrl] = useState('')

  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory()

  function handleResult(data) {
    setResult(data)
    addToHistory(data.url, data)
  }

  function handleRecheck(url) {
    setRecheckUrl(url)
    setActiveTab('checker')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-100 px-6 py-4
                         flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center
                          justify-center text-white text-sm">
            🛡️
          </div>
          <div>
            <h1 className="font-bold text-gray-800">PhishGuard</h1>
            <p className="text-xs text-gray-400">Sahabat Cek Link Aman-mu</p>
          </div>
        </div>

        <nav className="flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-green-500 text-white'         
                  : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>


      <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">

        {/* Tab: Cek URL */}
        {activeTab === 'checker' && (
          <>
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

            {result && <ResultCard       result={result} />}
            {result && <FeatureExplainer indicators={result.indicators} />}
          </>
        )}

        {/* Tab: Riwayat */}
        {activeTab === 'history' && (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Riwayat Pengecekan 🕐
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                10 URL terakhir yang kamu periksa.
              </p>
            </div>

            {history.length === 0
              ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                  <p className="text-gray-300 text-sm">Belum ada riwayat pengecekan.</p>
                </div>
              )
              : (
                <HistoryPanel
                  history={history}
                  onRecheck={handleRecheck}
                  onRemove={removeFromHistory}
                  onClear={clearHistory}
                />
              )
            }
          </>
        )}

        {/* Tab: Batch Check */}
        {activeTab === 'batch' && (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Batch Check 📋
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Cek banyak URL sekaligus, satu per baris.
              </p>
            </div>

            <BatchChecker />
          </>
        )}

        {/* Tab: Tips Keamanan */}
        {/* {activeTab === 'tips' && (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Tips Keamanan 💡
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Kenali ciri phishing sebelum jadi korban.
              </p>
            </div>

            <TipsPanel />
          </>
        )} */}

      </main>
    </div>
  )
}