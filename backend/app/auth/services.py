from fastapi import HTTPException, status
from app.database.connection import db
from app.utils.security import hash_password
from app.auth.models import create_user

users_collection = db["users"]


def signup_user(data):
    """Register a new user in the database. Raises HTTPException if email already exists."""
    # 1. Check if email already exists in DB
    existing_user = users_collection.find_one({"email": data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )

    # 2. Hash the user's password
    hashed_password = hash_password(data.password)

    # 3. Build user document structure
    user = create_user(
        data.full_name,
        data.email,
        hashed_password
    )

    # 4. Save to MongoDB
    users_collection.insert_one(user)

    # 5. Return success details matching SignupResponse schema
    return {
        "message": "Account created successfully",
        "email": data.email
    }