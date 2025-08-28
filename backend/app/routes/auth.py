"""Authentication routes for the FastAPI application."""

import random
import smtplib
from datetime import datetime, timedelta, timezone
from email.mime.text import MIMEText
from typing import List

from app.core.security import create_token   # ✅ keep create_token
from app.database import SessionLocal
from app.dependencies.auth import get_current_user, role_required
from app.models.password_reset import PasswordReset
from app.models.user import User
from app.schemas.user import (
    EmailRequest, OTPVerifyRequest,
    ResetPasswordRequest, UserCreate, UserLogin,
    UserOut
)
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

router = APIRouter(prefix="/auth", tags=["Auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_db():
    """Get a new DB session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/register",
    response_model=UserOut,
    dependencies=[Depends(role_required(["admin"]))]
)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user (admin only)."""
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # ✅ Store password directly (NO hashing, plain text)
    new_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login a user and return a JWT token with user details."""
    db_user = db.query(User).filter(User.email == user.email).first()

    # ✅ Direct password check (plain text)
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"user_id": db_user.id, "role": db_user.role})

    return {
        "access_token": token,
        "token_type": "bearer",
        "userId": db_user.id,
        "role": db_user.role,
        "userName": db_user.name
    }


def send_otp_email(recipient_email: str, otp: str):
    """Send OTP to user's email using Gmail SMTP."""
    sender_email = "yourgmail@gmail.com"            # ✅ Replace
    sender_password = "your_app_password_here"      # ✅ Replace

    msg = MIMEText(f"Your OTP is: {otp}")
    msg["Subject"] = "OTP Verification"
    msg["From"] = sender_email
    msg["To"] = recipient_email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Email send failed: {str(e)}") from e


@router.post("/send-otp")
def send_otp(payload: EmailRequest, db: Session = Depends(get_db)):
    """Send OTP to user email."""
    email = payload.email
    otp = str(random.randint(100000, 999999))
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=5)

    db.query(PasswordReset).filter(PasswordReset.email == email).delete()
    db.add(PasswordReset(email=email, otp=otp, expires_at=expires_at))
    db.commit()

    if email.endswith("@example.com"):
        print(f"🔐 [DEV MODE] OTP for {email} is: {otp}")
    else:
        send_otp_email(email, otp)
    return {"message": "OTP sent to your email"}


@router.post("/verify-otp")
def verify_otp(request: OTPVerifyRequest, db: Session = Depends(get_db)):
    """Verify the OTP sent to the user."""
    record = db.query(PasswordReset).filter_by(email=request.email, otp=request.otp).first()
    if not record or record.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    record.is_verified = True
    db.commit()

    token = jwt.encode({"email": request.email}, SECRET_KEY, algorithm=ALGORITHM)
    return {"reset_token": token}


@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset the user's password using the reset token."""
    try:
        decoded = jwt.decode(payload.token, SECRET_KEY, algorithms=[ALGORITHM])
        email = decoded.get("email")
    except JWTError as exc:
        raise HTTPException(status_code=400, detail="Invalid or expired token") from exc

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # ✅ Plain text password (no hashing)
    user.password = payload.new_password
    db.commit()
    return {"message": "Password reset successful"}


@router.get(
    "/users",
    response_model=List[UserOut],
    dependencies=[Depends(role_required(["admin"]))]
)
def get_users(db: Session = Depends(get_db)):
    """Get all users (admin only)."""
    return db.query(User).all()


@router.delete(
    "/delete-user/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(role_required(["admin"]))])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a user by ID (admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()


@router.get("/me", response_model=UserOut)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get the currently authenticated user's profile."""
    return current_user
