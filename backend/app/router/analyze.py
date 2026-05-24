from fastapi import APIRouter

# Import BaseModel dari pydantic untuk validasi data yang masuk
# FastAPI using  pydantic untuk memastikan data sesuai tipe yang diharapkan
from pydantic import BaseModel
router = APIRouter()
# request body mengandung field 'url' bertipe string
class AnalyzeRequest(BaseModel):
    url: str
@router.post('/analyze')
def analyze_url(body: AnalyzeRequest):

    url = body.url

    suspicious_words = ['verifikasi', 'login', 'secure', 'bank', 'akun', 'update']

    suspicious_tlds = ['.xyz', '.tk', '.ml', '.ga', '.cf']

    score = 10  

    for word in suspicious_words:
        if word in url.lower():
            score += 20  

    for tld in suspicious_tlds:
        if tld in url.lower():
            score += 30  

    score = min(score, 100)

    if score <= 30:
        label       = 'Aman'
        message     = 'Link Ini Terlihat Aman'
        description = 'Tidak ditemukan indikator phishing yang signifikan.'
    elif score <= 60:
        label       = 'Waspada'
        message     = 'Perlu Kehati-hatian'
        description = 'Ada beberapa indikator mencurigakan. Verifikasi sebelum klik.'
    else:
        label       = 'Berbahaya'
        message     = 'Waspada Tinggi, Jangan Diklik!'
        description = 'Kemungkinan phishing tinggi! Hindari interaksi dengan link ini.'

    # Return respons JSON ke frontend
    return {
        'url':         url,
        'score':       score,
        'label':       label,
        'message':     message,
        'description': description,
    }