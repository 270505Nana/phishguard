// Function buat cek URL valid atau enggak, return boolean
export function isValidUrl(url) {
  const trimmed = url.trim()
  if (!trimmed) return false

  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'

  } catch {
    return false
  }
}

// Function normalize url dengan menambahkan 'https://' di depan URL kalau belum ada
export function normalizeUrl(url) {
  const trimmed = url.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return 'https://' + trimmed
}