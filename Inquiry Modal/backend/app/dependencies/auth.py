"""Role-based Access Control Utility Functions."""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.core.security import SECRET_KEY, ALGORITHM

# FastAPI token scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_db():
    """Provide a database session to the endpoint."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    # sourcery skip: remove-str-from-print
    """
    Decode the JWT token and return the current authenticated user.

    Raises:
        HTTPException: If token is invalid or user not found.
    """
    try:
        print("🔐 Incoming Token:", token)  # DEBUG

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("📦 Decoded Payload:", payload)  # DEBUG

        user_id: int = payload.get("user_id")
        if user_id is None:
            print("❌ No user_id in token payload")  # DEBUG
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
    except JWTError as exc:
        print("🚫 JWT Error:", str(exc))  # DEBUG
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        ) from exc

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        print("❌ No user found with ID:", user_id)  # DEBUG
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    print("✅ Authenticated User:", user.email, "| Role:", user.role)  # DEBUG
    return user


def role_required(roles: list[str]):
    """Ensure that the current user has one of the allowed roles."""
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this resource"
            )
        return current_user
    return role_checker
