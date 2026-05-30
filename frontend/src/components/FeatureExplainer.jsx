export default function FeatureExplainer({ indicators }) {
  if (!indicators || indicators.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">

      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
        📋 Rincian Indikator Kecurigaan
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {indicators.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl border p-3 flex gap-3 items-start
              ${item.safe
                ? 'bg-green-50 border-green-100'   
                : 'bg-red-50   border-red-100'    
              }`}
          >
            <span className="text-base mt-0.5">
              {item.safe ? '✅' : '❌'}
            </span>

            <div>
              <p className={`text-sm font-medium
                ${item.safe ? 'text-green-700' : 'text-red-700'}`}>
                {item.label}
              </p>

              <p className={`text-xs mt-0.5
                ${item.safe ? 'text-green-600' : 'text-red-500'}`}>
                {item.safe ? '✓ ' : '✗ '}{item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}