"""
Schema: PagePermission
Pydantic models for request and response validation for permission routes.
"""

from pydantic import BaseModel

class PagePermissionBase(BaseModel):
    """
    Base schema for page permission containing common fields.
    """
    role: str
    page: str
    action: str

class PagePermissionCreate(PagePermissionBase):
    """
    Schema for creating a new page permission.
    """

class PagePermissionOut(PagePermissionBase):
    """
    Schema for returning a page permission in API responses.

    Attributes:
        id (int): Unique identifier for the permission record.
    """
    id: int

    class Config:
        """Schema for config the page."""
        orm_mode = True
