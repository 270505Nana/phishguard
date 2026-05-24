# import FastAPI, class utama untuk membuat aplikasi API
from fastapi import FastAPI

# import CORSMiddleware agar frontend React bisa akses API ini
from fastapi.middleware.cors import CORSMiddleware

#buat instance aplikasi FastAPI
app = FastAPI()

# konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    # allow all HTTP method & header
    allow_origins=["http://localhost:5173"],  
    allow_methods=["*"],   
    allow_headers=["*"],   
)

@app.get("/")
def health_check():
    return {"status": "PhishGuard API aktif ✅"}