"""
Model: PagePermission
Defines the database schema for storing role-based access to pages and actions.
"""

from sqlalchemy import Column, Integer, String
from app.database import Base

class PagePermission(Base):
    """
    SQLAlchemy model for storing role-based page and action permissions.
    Example: role = "sales", page = "inquiries", action = "view"
    """
    __tablename__ = "page_permissions"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String, index=True)
    page = Column(String)
    action = Column(String)
