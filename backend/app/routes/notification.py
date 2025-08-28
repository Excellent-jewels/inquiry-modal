"""Notification routes for the FastAPI application."""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.notification import Notification
from app.models.user import User
from app.schemas.notification import NotificationCreate, NotificationOut


router = APIRouter(prefix="/notifications", tags=["Notifications"])

def get_db():
    """Get a new DB session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=NotificationOut)
def create_notification(data: NotificationCreate, db: Session = Depends(get_db)):
    """
    Create a new notification.

    Args:
        data: NotificationCreate schema
        db: Database session

    Returns:
        Newly created notification
    """
    notif = Notification(
        message=data.message,
        visible_to=data.visible_to,
        dismissed_by=[]
    )
    db.add(notif)
    db.commit()
    db.refresh(notif)
    return notif


@router.get("/visible-to/{user_key}", response_model=List[NotificationOut])
def get_notifications_for_user(user_key: str, db: Session = Depends(get_db)):
    """
    - Sales: see only their own notifications
    - Backend: see all notifications for all sales and admin users
    """

    # 🔁 Rebuild user_key (role + "_" + name) from DB
    all_users = db.query(User).all()
    current_user = next((u for u in all_users if f"{u.role}_{u.name}" == user_key), None)

    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🟢 Backend: see notifications of sales & admin users
    if current_user.role == "backend":
        sales_users = db.query(User).filter(User.role == "sales").all()
        admin_users = db.query(User).filter(User.role == "admin").all()

        # 🔐 Build list of all user_keys
        visible_keys = [f"{u.role}_{u.name}" for u in sales_users + admin_users]

        # 🧾 Fetch all notifications visible to these users, not dismissed by current user
        query = db.query(Notification).filter(
            or_(*[Notification.visible_to.any(k) for k in visible_keys]),
            ~Notification.dismissed_by.any(user_key)
        )
    else:
        # 🔵 Sales/admin: only own notifications
        query = db.query(Notification).filter(
            Notification.visible_to.any(user_key),
            ~Notification.dismissed_by.any(user_key)
        )

    return query.order_by(Notification.timestamp.desc()).all()

@router.post("/{notification_id}/dismiss")
def dismiss_notification(notification_id: int,
                         user_key: str = Query(...),
                         db: Session = Depends(get_db)
                         ):
    """
    Dismiss a notification for a specific user.

    Args:
        notification_id: ID of the notification
        user_key: User identifier (e.g., 'admin', 'sales_m1')

    Returns:
        Success message
    """
    notif = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")

    if user_key not in notif.dismissed_by:
        notif.dismissed_by.append(user_key)
        db.commit()

    return {"message": f"Notification {notification_id} dismissed by {user_key}"}
