from fastapi import APIRouter, status
from app.auth.schemas import SignupRequest, SignupResponse
from app.auth.services import signup_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Registers a new user in the system and stores their hashed credentials in MongoDB Atlas."
)
def signup(data: SignupRequest):
    return signup_user(data)