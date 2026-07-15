from fastapi import FastAPI
from app.auth.routes import router as auth_router

app = FastAPI(
    title="Virtual Mental Health Assistant API",
    version="1.0"
)

app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to VMHA Backend"
    }