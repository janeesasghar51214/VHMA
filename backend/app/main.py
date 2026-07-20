from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.auth import router as auth_router
from app.database.connection import client, db


@asynccontextmanager
async def lifespan(app: FastAPI):

    # Startup: Verify database connection and set up indexes
    try:

        # Ping the admin database to verify connection
        client.admin.command("ping")

        print("[SUCCESS] MongoDB Connection Verified on Startup")

        # Create a unique index on email
        db["users"].create_index(
            "email",
            unique=True
        )

        print("[SUCCESS] Unique index on 'email' verified/created")

    except Exception as e:

        print(f"[ERROR] MongoDB Startup tasks failed: {e}")

    yield

    # Shutdown: Clean up client connections
    client.close()

    print("[SUCCESS] MongoDB Connection Closed")


app = FastAPI(
    title="Virtual Mental Health Assistant API",
    version="1.0",
    lifespan=lifespan
)


# Enable CORS for React Native and frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Authentication APIs
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to VMHA Backend"
    }