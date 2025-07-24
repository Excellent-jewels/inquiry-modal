"""
Notification SQLAlchemy model definition.
Defines the structure of the notifications table in the database.
"""

from datetime import datetime

from app.database import Base
from sqlalchemy import ARRAY, Column, DateTime, Integer, String
from sqlalchemy.ext.mutable import MutableList


class Notification(Base):
    """
    SQLAlchemy model for the notifications table.

    Attributes:
        id (int): Primary key.
        message (str): Notification content.
        timestamp (datetime): Time the notification was created.
        visible_to (List[str]): List of user keys (e.g., admin, sales_m1) who can view it.
        dismissed_by (List[str]): List of user keys who dismissed this notification.
    """
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    visible_to = Column(MutableList.as_mutable(ARRAY(String)), nullable=False)
    dismissed_by = Column(MutableList.as_mutable(ARRAY(String)), default=list)
    user_name = Column(String)
    inquiry_id = Column(String)
    type = Column(String, default="info")
