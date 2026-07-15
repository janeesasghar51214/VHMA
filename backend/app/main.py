from fastapi import FastAPI

app = FastAPI(
    title="VMHA API",
    description="Virtual Mental Health Assistant Backend",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to VMHA API 🚀"
    }

@app.get("/health")
def health_check():
    return {
        "status": "Server is running successfully!"
    }