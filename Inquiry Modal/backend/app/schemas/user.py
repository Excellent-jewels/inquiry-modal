"""Pydantic schemas for user creation, login, and output."""

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    """Schema for creating a new user."""
    name: str
    email: EmailStr
    password: str
    role: str  # 'admin', 'sales', 'backend', 'accountant'

class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str

class UserOut(BaseModel):
    """Schema for user output."""
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        """Pydantic config for ORM mode."""
        orm_mode = True

class TokenResponse(BaseModel):
    """Schema for JWT token response."""
    access_token: str
    token_type: str

class EmailRequest(BaseModel):
    """Request model for sending OTP via email."""
    email: str

class OTPVerifyRequest(BaseModel):
    """Request model for verify OTP via email."""
    email: str
    otp: str

class ResetPasswordRequest(BaseModel):
    """Reset password model."""
    token: str
    new_password: str
