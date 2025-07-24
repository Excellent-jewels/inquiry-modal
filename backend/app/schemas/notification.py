"""
Pydantic schemas for notification input/output validation.
"""

from datetime import datetime
from typing import List

from pydantic import BaseModel


class NotificationCreate(BaseModel):
    """
    Schema for creating a new notification.

    Attributes:
        message (str): Notification content.
        visible_to (List[str]): User keys that should see this notification.
    """
    message: str
    visible_to: List[str]


class NotificationOut(BaseModel):
    """
    Schema for reading (returning) a notification.

    Attributes:
        id (int): Unique identifier.
        message (str): Notification content.
        timestamp (datetime): When it was created.
        visible_to (List[str]): User keys allowed to see this.
        dismissed_by (List[str]): Users who dismissed this.
    """
    id: int
    message: str
    timestamp: datetime
    visible_to: List[str]
    dismissed_by: List[str]
    user_name: str | None
    inquiry_id: str | None

    class Config:
        """this is config function."""
        orm_mode = True
