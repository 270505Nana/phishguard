# import FastAPI, class utama untuk membuat aplikasi API
from fastapi import FastAPI

# import CORSMiddleware agar frontend React bisa akses API ini
from fastapi.middleware.cors import CORSMiddleware
from app.router.analyze import router as analyze_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# routes
app.include_router(analyze_router)

@app.get("/")
def health_check():
    return {"status": "PhishGuard API aktif ✅"}