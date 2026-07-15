from datetime import datetime


def create_user(full_name, email, password):
    return {
        "full_name": full_name,
        "email": email,
        "password": password,
        "created_at": datetime.utcnow(),
    }