"""Security utilities for password hashing and JWT token handling."""

import os
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "defaultsecretkey")
ALGORITHM = "HS256"

def hash_password(password: str):
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    """Verify a plain password against a hashed password."""
    return pwd_context.verify(plain, hashed)

def create_token(data: dict, expires_minutes: int = 60):
    """Create a JWT token with an expiration time."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    """Decode a JWT token and return the payload."""
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
