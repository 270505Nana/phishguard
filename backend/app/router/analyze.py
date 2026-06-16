from fastapi import APIRouter
from pydantic import BaseModel
from app.ml.predict import predict_url, extract_fitur

router = APIRouter()

class AnalyzeRequest(BaseModel):
    url: str


def build_indicators(url: str) -> list:
    f          = extract_fitur(url)
    indicators = []

    if f['has_https']:
        indicators.append({'label': 'Menggunakan HTTPS', 'safe': True,
                           'detail': 'Koneksi terenkripsi'})
    else:
        indicators.append({'label': 'Tidak pakai HTTPS', 'safe': False,
                           'detail': 'Koneksi tidak terenkripsi'})

    if f['url_length'] > 75:
        indicators.append({'label': f"URL panjang ({f['url_length']} karakter)",
                           'safe': False,
                           'detail': 'URL phishing sering dibuat sangat panjang'})

    if f['suspicious_tld']:
        indicators.append({'label': 'TLD mencurigakan', 'safe': False,
                           'detail': 'Domain gratis seperti .xyz .tk sering dipakai phisher'})

    if f['has_at']:
        indicators.append({'label': 'Ada karakter "@" di URL', 'safe': False,
                           'detail': 'Bisa menipu browser untuk mengabaikan bagian sebelumnya'})

    if f['has_dash']:
        indicators.append({'label': 'Domain mengandung tanda hubung (-)', 'safe': False,
                           'detail': 'Phisher pakai tanda hubung untuk meniru domain asli'})

    if f['subdomain_count'] > 1:
        indicators.append({'label': f"Ada {f['subdomain_count']} subdomain berlapis",
                           'safe': False,
                           'detail': 'Subdomain berlapis untuk menyamarkan domain utama'})

    if f['is_shortened']:
        indicators.append({'label': 'URL shortener terdeteksi', 'safe': False,
                           'detail': 'URL diperpendek untuk menyembunyikan tujuan asli'})

    if f['suspicious_words'] > 0:
        indicators.append({'label': f"Ada {f['suspicious_words']} kata sensitif di URL",
                           'safe': False,
                           'detail': 'Kata seperti login/verify/bank sering dipakai phisher'})

    return indicators


@router.post('/analyze')
def analyze_url(body: AnalyzeRequest):
    url   = body.url
    score = predict_url(url)
    indicators = build_indicators(url)

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
        'indicators':  indicators,
    }