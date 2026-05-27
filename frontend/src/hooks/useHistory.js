import { useState } from 'react'
const STORAGE_KEY = 'phishguard_history'
const MAX_HISTORY = 10

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  function addToHistory(url, result) {

    const newItem = {
      id:        Date.now(),          
      url:       url,
      score:     result.score,
      label:     result.label,
      checkedAt: new Date().toLocaleTimeString('id-ID'),
    }

    const updated = [newItem, ...history].slice(0, MAX_HISTORY)
    setHistory(updated)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  // Fungsi untuk menghapus satu item dari riwayat berdasarkan id
  function removeFromHistory(id) {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  // Fungsi untuk menghapus semua riwayat
  function clearHistory() {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return { history, addToHistory, removeFromHistory, clearHistory }
}