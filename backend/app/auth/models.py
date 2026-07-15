from datetime import datetime, timezone


def create_user(full_name, email, password):
    """Create a dictionary representing the user document to be inserted into MongoDB."""
    return {
        "full_name": full_name,
        "email": email,
        "password": password,
        "created_at": datetime.now(timezone.utc),
    }