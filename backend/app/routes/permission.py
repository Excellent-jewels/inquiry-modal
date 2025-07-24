"""
Routes: Permissions
Handles admin-controlled role-based access to pages and actions.
"""

from typing import List

from app.database import SessionLocal
from app.dependencies.auth import get_current_user
from app.models.page_permission import PagePermission
from app.models.user import User
from app.schemas.page_permission import PagePermissionCreate, PagePermissionOut
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(prefix="/permissions", tags=["Permissions"])

def get_db():
    """
    Dependency to get a new database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PagePermissionOut)
def create_permission(
    permission: PagePermissionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new role-based page permission.
    Only accessible to admin users.

    Args:
        permission (PagePermissionCreate): Permission data.
        db (Session): SQLAlchemy DB session.
        current_user (User): Current authenticated user.

    Returns:
        PagePermissionOut: Created permission record.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin can add permissions")

    perm = PagePermission(**permission.dict())
    db.add(perm)
    db.commit()
    db.refresh(perm)
    return perm

@router.get("/my-permissions", response_model=List[PagePermissionOut])
def get_permissions_for_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all page and action permissions assigned to the current user's role.

    Args:
        db (Session): SQLAlchemy DB session.
        current_user (User): Current authenticated user.

    Returns:
        List[PagePermissionOut]: List of allowed permissions for this user.
    """
    return db.query(PagePermission).filter(PagePermission.role == current_user.role).all()
