import json
import urllib.request
import uuid
import random
from datetime import datetime, timezone, timedelta
from bson import ObjectId

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field, model_validator

from app.database.connection import db
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token
)
from app.utils.mail import send_otp_email


# ============================================================
# ROUTER
# ============================================================

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ============================================================
# DATABASE
# ============================================================

users_collection = db["users"]


# ============================================================
# SCHEMAS
# ============================================================

class SignupRequest(BaseModel):
    full_name: str = Field(
        ...,
        min_length=3,
        max_length=100,
        description="User's full name"
    )

    email: EmailStr = Field(
        ...,
        description="Valid email address"
    )

    password: str = Field(
        ...,
        min_length=8,
        description="Password must be at least 8 characters long"
    )

    confirm_password: str = Field(
        ...,
        description="Confirmation of the password"
    )

    @model_validator(mode="after")
    def verify_passwords_match(self) -> "SignupRequest":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")

        return self


class SignupResponse(BaseModel):
    message: str
    email: str


class LoginRequest(BaseModel):
    email: EmailStr = Field(
        ...,
        description="Registered email address"
    )

    password: str = Field(
        ...,
        min_length=8,
        description="User password"
    )


class LoginResponse(BaseModel):
    message: str
    email: str
    access_token: str
    token_type: str
    user_id: str


class GoogleLoginRequest(BaseModel):
    id_token: str = Field(
        ...,
        description="Google OAuth2 ID Token received from Google's client SDK"
    )


class GoogleLoginResponse(BaseModel):
    message: str
    email: str
    access_token: str
    token_type: str
    user_id: str


class AnonymousLoginResponse(BaseModel):
    message: str
    access_token: str
    token_type: str
    user_id: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr = Field(
        ...,
        description="Registered email address"
    )


class ForgotPasswordResponse(BaseModel):
    message: str


class VerifyOtpRequest(BaseModel):
    email: EmailStr = Field(
        ...,
        description="Registered email address"
    )
    otp: str = Field(
        ...,
        min_length=6,
        max_length=6,
        description="6-digit verification code"
    )


class VerifyOtpResponse(BaseModel):
    message: str
    reset_token: str


class ResetPasswordRequest(BaseModel):
    reset_token: str = Field(
        ...,
        description="JWT reset token returned from OTP verification"
    )
    new_password: str = Field(
        ...,
        min_length=8,
        description="New password (must be at least 8 characters long)"
    )
    confirm_new_password: str = Field(
        ...,
        description="Confirmation of the new password"
    )

    @model_validator(mode="after")
    def verify_passwords_match(self) -> "ResetPasswordRequest":
        if self.new_password != self.confirm_new_password:
            raise ValueError("Passwords do not match")
        return self


class ResetPasswordResponse(BaseModel):
    message: str


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def create_user(
    full_name: str,
    email: str | None = None,
    password: str | None = None,
    auth_provider: str = "local",
    is_anonymous: bool = False,
    google_id: str | None = None
) -> dict:
    """
    Create a dictionary representing the user document
    to be inserted into MongoDB.
    """
    return {
        "full_name": full_name,
        "email": email,
        "password": password,
        "auth_provider": auth_provider,
        "is_anonymous": is_anonymous,
        "google_id": google_id,
        "reset_otp": None,
        "reset_otp_expiry": None,
        "created_at": datetime.now(timezone.utc),
    }


def verify_google_token(id_token: str) -> dict | None:
    """
    Verifies a Google OAuth2 ID Token.
    Supports a mock token for local testing/development.
    """
    # Allow mock tokens for testing
    if id_token.startswith("mock_token_"):
        mock_email = id_token.replace("mock_token_", "")
        if "@" not in mock_email:
            mock_email += "@example.com"
        return {
            "email": mock_email,
            "name": f"Mock Google User ({mock_email.split('@')[0]})",
            "sub": f"mock_google_id_{abs(hash(mock_email))}"
        }

    try:
        url = f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            if "error_description" in data or "error" in data:
                return None
            return data
    except Exception as e:
        print(f"[ERROR] Google token verification failed: {e}")
        return None


# ============================================================
# SIGNUP API
# ============================================================

@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description=(
        "Registers a new user in the system and stores "
        "their hashed credentials in MongoDB Atlas."
    )
)
def signup(data: SignupRequest):

    # 1. Check if email already exists in MongoDB
    existing_user = users_collection.find_one(
        {"email": data.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )

    # 2. Hash the user's password
    hashed_password = hash_password(data.password)

    # 3. Create user document
    user = create_user(
        full_name=data.full_name,
        email=data.email,
        password=hashed_password,
        auth_provider="local"
    )

    # 4. Save user to MongoDB
    users_collection.insert_one(user)

    # 5. Return successful response
    return {
        "message": "Account created successfully",
        "email": data.email
    }


# ============================================================
# LOGIN API
# ============================================================

@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Login user",
    description="Authenticates a registered user and returns a JWT access token."
)
def login(data: LoginRequest):

    # 1. Find user by email
    user = users_collection.find_one(
        {"email": data.email}
    )

    # Ensure user exists, is a local user, and has a password
    if not user or not user.get("password") or user.get("auth_provider") != "local":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # 2. Verify password
    if not verify_password(
        data.password,
        user["password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # 3. Create access token
    access_token = create_access_token(
        data={
            "sub": str(user["_id"]),
            "email": user["email"]
        }
    )

    # 4. Return successful login response
    return {
        "message": "Login successful",
        "email": user["email"],
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(user["_id"])
    }


# ============================================================
# GOOGLE LOGIN API
# ============================================================

@router.post(
    "/google",
    response_model=GoogleLoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Google Sign-In",
    description="Authenticates a user via Google OAuth2 ID Token and returns a JWT access token."
)
def google_login(data: GoogleLoginRequest):
    # 1. Verify the Google ID token
    google_info = verify_google_token(data.id_token)
    if not google_info:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Google ID token"
        )

    email = google_info.get("email")
    full_name = google_info.get("name", "Google User")
    google_id = google_info.get("sub")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address not provided by Google account"
        )

    # 2. Check if user already exists
    user = users_collection.find_one({"email": email})

    if not user:
        # Create a new user with Google auth provider
        user_doc = create_user(
            full_name=full_name,
            email=email,
            password=None,
            auth_provider="google",
            is_anonymous=False,
            google_id=google_id
        )
        users_collection.insert_one(user_doc)
        user = users_collection.find_one({"email": email})
    else:
        # Link/Update Google ID and provider if needed
        update_fields = {"auth_provider": "google"}
        if not user.get("google_id"):
            update_fields["google_id"] = google_id
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": update_fields}
        )

    # 3. Create access token
    access_token = create_access_token(
        data={
            "sub": str(user["_id"]),
            "email": user["email"]
        }
    )

    return {
        "message": "Google authentication successful",
        "email": user["email"],
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(user["_id"])
    }


# ============================================================
# ANONYMOUS LOGIN API
# ============================================================

@router.post(
    "/anonymous",
    response_model=AnonymousLoginResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Anonymous guest login",
    description="Creates a temporary anonymous guest account and returns a JWT access token."
)
def anonymous_login():
    # 1. Generate unique anonymous ID and nickname
    anon_id = uuid.uuid4().hex
    full_name = f"Guest_{anon_id[:8]}"

    # 2. Create and insert anonymous user doc
    user_doc = create_user(
        full_name=full_name,
        email=None,
        password=None,
        auth_provider="anonymous",
        is_anonymous=True
    )
    result = users_collection.insert_one(user_doc)
    user_id = str(result.inserted_id)

    # 3. Create access token
    access_token = create_access_token(
        data={
            "sub": user_id,
            "email": None
        }
    )

    return {
        "message": "Anonymous login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user_id
    }


# ============================================================
# FORGOT PASSWORD API
# ============================================================

@router.post(
    "/forgot-password",
    response_model=ForgotPasswordResponse,
    status_code=status.HTTP_200_OK,
    summary="Forgot Password Request",
    description="Generates and sends a 6-digit OTP to the user's email if the account exists."
)
def forgot_password(data: ForgotPasswordRequest):
    # 1. Find user by email
    user = users_collection.find_one({"email": data.email})

    # Return success for security (prevents user enumeration)
    if not user:
        return {
            "message": "If your email is registered in our system, a password reset OTP has been sent."
        }

    # 2. Verify account is local and has credentials
    if user.get("auth_provider") != "local" or not user.get("password"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password reset is only supported for accounts with password credentials."
        )

    # 3. Generate a 6-digit numeric OTP
    otp = f"{random.randint(100000, 999999)}"
    otp_expiry = datetime.now(timezone.utc) + timedelta(minutes=10)

    # 4. Save OTP and expiry to the user document
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "reset_otp": otp,
                "reset_otp_expiry": otp_expiry
            }
        }
    )

    # 5. Send OTP email
    send_otp_email(data.email, otp)

    return {
        "message": "If your email is registered in our system, a password reset OTP has been sent."
    }


# ============================================================
# EMAIL OTP API (VERIFY OTP)
# ============================================================

@router.post(
    "/verify-otp",
    response_model=VerifyOtpResponse,
    status_code=status.HTTP_200_OK,
    summary="Verify reset password OTP",
    description="Verifies the 6-digit OTP and returns a short-lived reset token."
)
def verify_otp(data: VerifyOtpRequest):
    # 1. Find user by email
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or expired/invalid OTP"
        )

    db_otp = user.get("reset_otp")
    db_expiry = user.get("reset_otp_expiry")

    # 2. Verify OTP matches
    if not db_otp or db_otp != data.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or expired/invalid OTP"
        )

    # 3. Verify OTP is not expired
    if db_expiry:
        if db_expiry.tzinfo is None:
            db_expiry = db_expiry.replace(tzinfo=timezone.utc)

        if datetime.now(timezone.utc) > db_expiry:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email or expired/invalid OTP"
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or expired/invalid OTP"
        )

    # 4. Generate a short-lived reset token (valid for 10 minutes)
    reset_token = create_access_token(
        data={
            "sub": str(user["_id"]),
            "email": user["email"],
            "purpose": "password_reset"
        },
        expires_delta=timedelta(minutes=10)
    )

    # 5. Clear OTP in db to prevent reuse/replay attacks
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "reset_otp": None,
                "reset_otp_expiry": None
            }
        }
    )

    return {
        "message": "OTP verified successfully",
        "reset_token": reset_token
    }


# ============================================================
# RESET PASSWORD API
# ============================================================

@router.post(
    "/reset-password",
    response_model=ResetPasswordResponse,
    status_code=status.HTTP_200_OK,
    summary="Reset password",
    description="Resets the password of the user identified by a valid password reset token."
)
def reset_password(data: ResetPasswordRequest):
    # 1. Decode and verify the reset token
    decoded = decode_token(data.reset_token)
    if not decoded or decoded.get("purpose") != "password_reset":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )

    user_id = decoded.get("sub")

    # 2. Find user by ID
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid reset token structure"
        )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # 3. Hash and update new password
    hashed_pass = hash_password(data.new_password)
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "password": hashed_pass
            }
        }
    )

    return {
        "message": "Password reset successfully. You can now log in with your new password."
    }