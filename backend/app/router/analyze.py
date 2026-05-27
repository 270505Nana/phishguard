from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AnalyzeRequest(BaseModel):
    url: str

def extract_features(url: str) -> dict:

    try:
        import tldextract
        extracted = tldextract.extract(url)
        domain    = extracted.domain
        suffix    = extracted.suffix
        subdomain = extracted.subdomain
    except:
        domain    = url
        suffix    = ''
        subdomain = ''

    return {
        'url_length':        len(url),
        'has_at_symbol':     '@' in url,
        'has_double_slash':  '//' in url[8:],   # cek // setelah https://
        'has_dash_in_domain': '-' in domain,
        'subdomain_count':   len(subdomain.split('.')) if subdomain else 0,
        'suspicious_tld':    suffix in ['xyz', 'tk', 'ml', 'ga', 'cf', 'gq'],
        'has_ip_address':    any(part.isdigit() for part in url.split('.')),
        'suspicious_words':  [w for w in ['verifikasi','login','secure','bank','akun','update','confirm','password'] if w in url.lower()],
        'domain':            domain,
        'suffix':            suffix,
        'uses_https':        url.startswith('https://'),
    }

def build_indicators(features: dict) -> list:
    indicators = []

    if features['uses_https']:
        indicators.append({
            'label':   'Menggunakan HTTPS (Enkripsi Aman)',
            'safe':    True,
            'detail':  'Koneksi terenkripsi, data tidak mudah disadap'
        })
    else:
        indicators.append({
            'label':   'Tidak menggunakan HTTPS',
            'safe':    False,
            'detail':  'Koneksi tidak terenkripsi, data rentan disadap'
        })

    if features['url_length'] > 75:
        indicators.append({
            'label':   f"URL sangat panjang ({features['url_length']} karakter)",
            'safe':    False,
            'detail':  'URL phishing sering panjang untuk menyembunyikan domain asli'
        })

    if features['suspicious_tld']:
        indicators.append({
            'label':   f"TLD '.{features['suffix']}' jarang dipakai bisnis resmi",
            'safe':    False,
            'detail':  'Domain gratis seperti .xyz .tk sering dipakai phisher'
        })

    if features['has_at_symbol']:
        indicators.append({
            'label':   'Mengandung karakter "@" di URL',
            'safe':    False,
            'detail':  'Karakter @ bisa menipu browser untuk mengabaikan bagian sebelumnya'
        })

    if features['has_dash_in_domain']:
        indicators.append({
            'label':   f"Domain '{features['domain']}' mengandung tanda hubung (-)",
            'safe':    False,
            'detail':  'Phisher sering memakai tanda hubung untuk meniru domain asli'
        })

    for word in features['suspicious_words']:
        indicators.append({
            'label':   f"Mengandung kata '{word}' yang sering dipakai phisher",
            'safe':    False,
            'detail':  f"Kata '{word}' sering dipakai untuk mengelabui korban agar memasukkan data"
        })

    if features['subdomain_count'] > 1:
        indicators.append({
            'label':   f"Memiliki {features['subdomain_count']} subdomain berlapis",
            'safe':    False,
            'detail':  'Subdomain berlapis dipakai untuk menyamarkan domain utama'
        })

    return indicators


# Fungsi untuk menghitung skor risiko berdasarkan fitur
def calculate_score(features: dict) -> int:
    score = 0

    if not features['uses_https']:       score += 20
    if features['url_length'] > 75:      score += 15
    if features['suspicious_tld']:       score += 30
    if features['has_at_symbol']:        score += 25
    if features['has_dash_in_domain']:   score += 10
    if features['subdomain_count'] > 1:  score += 10
    if features['has_ip_address']:       score += 25

    # Setiap kata mencurigakan tambah 15 poin
    score += len(features['suspicious_words']) * 15

    return min(score, 100)  # maksimal 100


@router.post('/analyze')
def analyze_url(body: AnalyzeRequest):
    url      = body.url
    features = extract_features(url)
    score    = calculate_score(features)
    indicators = build_indicators(features)

    # Tentukan label
    if score <= 30:
        label       = 'Aman'
        message     = 'Link Ini Terlihat Aman'
        description = 'Tidak ditemukan indikator phishing yang signifikan.'
    elif score <= 60:
        label       = 'Waspada'
        message     = 'Perlu Kehati-hatian'
        description = 'Ada beberapa indikator mencurigakan. Verifikasi dulu sebelum klik.'
    else:
        label       = 'Berbahaya'
        message     = 'Waspada Tinggi, Jangan Diklik!'
        description = 'Kemungkinan phishing tinggi! Hindari interaksi dengan link ini.'

    return {
        'url':         url,
        'score':       score,
        'label':       label,
        'message':     message,
        'description': description,
        'indicators':  indicators,   # ← data baru untuk FeatureExplainer
    }