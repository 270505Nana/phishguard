import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router.analyze import router as analyze_router

app = FastAPI()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        FRONTEND_URL,
        "*",  
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)

@app.get("/")
def health_check():
    return {"status": "PhishGuard API aktif ✅"}