# PhishGuard
Aplikasi web untuk mendeteksi link phishing secara real-time.

## Demo
🔗 [phishguard-xxx.vercel.app](https://phishguard-virid.vercel.app/)

## Fitur
- URL Risk Checker : skor 0–100 dengan label traffic light
- Feature Explainer : penjelasan kenapa URL dicurigai
- History : riwayat 10 URL terakhir di localStorage  
- Tips Keamanan : edukasi phishing bahasa Indonesia
- Batch Check : cek banyak URL sekaligus

## Tech Stack
| Layer | Teknologi |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Python + FastAPI |
| ML Model | scikit-learn Random Forest |
| Deploy | Vercel + Railway |

## Cara Run Lokal
# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
