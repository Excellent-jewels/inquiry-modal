"""SQLAlchemy User model definition."""

from datetime import datetime
from sqlalchemy import Column, Integer, String, TIMESTAMP
from app.database import Base

class User(Base):
    """User model for the application."""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String(20))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
