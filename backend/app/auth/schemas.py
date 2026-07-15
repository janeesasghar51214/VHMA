from pydantic import BaseModel, EmailStr, Field, model_validator


class SignupRequest(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100, description="User's full name")
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters long")
    confirm_password: str = Field(..., description="Confirmation of the password")

    @model_validator(mode="after")
    def verify_passwords_match(self) -> "SignupRequest":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self


class SignupResponse(BaseModel):
    message: str
    email: str