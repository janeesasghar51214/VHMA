from fastapi import APIRouter
from app.auth.schemas import SignupRequest
from app.auth.services import signup_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(data: SignupRequest):
    return signup_user(data)