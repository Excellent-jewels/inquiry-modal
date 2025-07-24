"""SQLAlchemy Password reset model definition."""

from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean
from app.database import Base

class PasswordReset(Base):
    """Model for storing password reset requests with OTP verification."""
    __tablename__ = "password_resets"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    otp = Column(String, nullable=False)
    expires_at = Column(TIMESTAMP(timezone=True), nullable=False)
    is_verified = Column(Boolean, default=False)
