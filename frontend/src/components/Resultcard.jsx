// Menerima prop 'result' berisi data dari API
export default function ResultCard({ result }) {

  if (!result) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
        <p className="text-gray-300 text-sm">
          Hasil analisis akan muncul di sini 🔍
        </p>
      </div>
    )
  }
  function getStyle(label) {
    if (label === 'Aman')       return { bg: 'bg-green-50',  border: 'border-green-200', color: 'text-green-700',  emoji: '✅' }
    if (label === 'Waspada')    return { bg: 'bg-yellow-50', border: 'border-yellow-200',color: 'text-yellow-700', emoji: '⚠️' }
    if (label === 'Berbahaya')  return { bg: 'bg-red-50',    border: 'border-red-200',   color: 'text-red-700',    emoji: '🚨' }
    return { bg: 'bg-gray-50', border: 'border-gray-200', color: 'text-gray-700', emoji: '❓' }
  }

  const style = getStyle(result.label)

  return (
    <div className={`rounded-2xl border p-6 ${style.bg} ${style.border}`}>

      <div className="flex justify-between items-start">
        <div>
          <span className={`text-xs font-bold tracking-widest uppercase ${style.color}`}>
            {style.emoji} {result.label}
          </span>

          <h2 className={`text-xl font-bold mt-1 ${style.color}`}>
            {result.message}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {result.description}
          </p>
        </div>

        <div className={`text-center border rounded-xl px-4 py-3 ${style.border} bg-white`}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Skor Risiko
          </p>
          <p className={`text-3xl font-bold ${style.color}`}>
            {result.score}
          </p>
          <p className="text-xs text-gray-400">/100</p>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-lg border border-gray-100 px-4 py-2">
        <p className="text-xs text-gray-400 mb-1">Link yang diperiksa:</p>
        <p className="text-xs font-mono text-gray-600 break-all">{result.url}</p>
      </div>
    </div>
  )
}