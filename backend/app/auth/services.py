from app.database.connection import db
from app.utils.security import hash_password
from app.auth.models import create_user


users_collection = db["users"]


def signup_user(data):
    existing_user = users_collection.find_one({"email": data.email})

    if existing_user:
        return {"success": False, "message": "Email already exists"}

    if data.password != data.confirm_password:
        return {"success": False, "message": "Passwords do not match"}

    hashed_password = hash_password(data.password)

    user = create_user(
        data.full_name,
        data.email,
        hashed_password
    )

    users_collection.insert_one(user)

    return {
        "success": True,
        "message": "Account created successfully"
    }