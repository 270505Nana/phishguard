from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router.analyze import router as analyze_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_credentials=False,  
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)

@app.get("/")
def health_check():
    return {"status": "PhishGuard API aktif ✅"}