export default function HistoryPanel({ history, onRecheck, onRemove, onClear }) {

  if (history.length === 0) return null

  function getBadgeStyle(label) {
    if (label === 'Aman')      return 'bg-green-100 text-green-700'
    if (label === 'Waspada')   return 'bg-yellow-100 text-yellow-700'
    if (label === 'Berbahaya') return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">

      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          🕐 Riwayat Cek Terakhir
        </p>
        <button
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          🗑 Sapu Bersih
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {history.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-300">🌐</span>

            <button
              onClick={() => onRecheck(item.url)}
              className="flex-1 text-left min-w-0"
            >
              <p className="text-sm text-gray-700 truncate">{item.url}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Skor: {item.score}/100 · {item.checkedAt}
              </p>
            </button>

            <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${getBadgeStyle(item.label)}`}>
              {item.label}
            </span>

            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-200 hover:text-gray-400 text-lg leading-none flex-shrink-0"
            >×</button>
          </div>
        ))}
      </div>
    </div>
  )
}