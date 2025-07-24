"""Inquiry routes for the FastAPI application."""

import os
import uuid
from datetime import datetime
from typing import List

from app.database import SessionLocal
from app.dependencies.auth import get_current_user
from app.models.inquiry import Inquiry
from app.models.notification import Notification as NotificationModel
from app.models.user import User
from app.schemas.inquiry import InquiryCreate, InquiryOut
from fastapi import (APIRouter, Body, Depends, File, Form, HTTPException,
                     UploadFile)
from sqlalchemy.orm import Session

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])


def get_db():
    """Get a new DB session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def generate_inquiry_id(db: Session) -> str:
    """Generate a unique inquiry_id like INQ-20250709-001"""
    today = datetime.now().strftime("%Y%m%d")
    prefix = f"INQ-{today}"
    count = (
        db.query(Inquiry)
        .filter(Inquiry.inquiry_id.startswith(prefix))
        .count()
    )
    new_number = str(count + 1).zfill(3)  # 001, 002...
    return f"{prefix}-{new_number}"

@router.post("/", response_model=InquiryOut)
def create_inquiry(
    inquiry: InquiryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new inquiry."""
    inquiry_data = inquiry.dict(exclude={"created_by"})

    # Generate inquiry_id if not provided
    if not inquiry_data.get("inquiry_id"):
        inquiry_data["inquiry_id"] = generate_inquiry_id(db)

    new_inquiry = Inquiry(**inquiry_data, created_by=current_user.id)
    db.add(new_inquiry)
    db.commit()
    db.refresh(new_inquiry)
    # ✅ Add Notification
    # ✅ Notification on inquiry creation (applies to sales or admin)
    inquiry_number = new_inquiry.id
    visible_to = []

    if current_user.role in ["sales", "admin"]:
        backend_users = db.query(User).filter(User.role == "backend").all()
        visible_to = [f"backend_{u.name}" for u in backend_users]

    # Always notify creator and admin
    visible_to += [f"{current_user.role}_{current_user.name}", "admin"]

    notif_msg = f"{current_user.name} has added inquiry number {inquiry_number}."

    db.add(NotificationModel(
        message=notif_msg,
        visible_to=visible_to,
        user_name=current_user.name,
        inquiry_id=inquiry_number,
        type="add"
    ))
    db.commit()

    return new_inquiry

@router.get("/", response_model=List[InquiryOut])
def get_all_inquiries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all inquiries based on role."""
    if current_user.role == "sales":
        return db.query(Inquiry).filter(Inquiry.created_by == current_user.id).all()
    return db.query(Inquiry).all()


@router.get("/{inquiry_id}", response_model=InquiryOut)
def get_inquiry_by_id(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a single inquiry by ID."""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    if current_user.role == "sales" and inquiry.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied: not your inquiry")

    return inquiry


@router.put("/{inquiry_id}", response_model=InquiryOut)
def update_inquiry(
    inquiry_id: int,
    updated: InquiryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):    # sourcery skip: low-code-quality
    """Update inquiry with field-level access based on user role."""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    update_data = updated.dict(exclude_unset=True)

    if current_user.role == "admin":
        for key, value in update_data.items():
            setattr(inquiry, key, value)

    elif current_user.role == "sales":
        if inquiry.created_by != current_user.id:
            raise HTTPException(status_code=403, detail="Access denied: not your inquiry")
        allowed_fields = [
            "inquiry_id", "inquiry_date", "today_date", "period", "sales",
            "buyer", "stock_id", "shape", "ct", "color", "clarity", "cut",
            "po", "sym", "lab", "report", "dis_ppc", "ppc", "amt", "type",
            "sale_team_status", "payment", "remark_request"
        ]
        for field in allowed_fields:
            if field in update_data:
                setattr(inquiry, field, update_data[field])

    elif current_user.role == "backend":
        allowed_fields = [
            "location", "backend_status", "time", "status_of_stone",
            "qc_remark", "stone_confirmation_remark", "entry_status", "location_remark"
        ]
        for field in allowed_fields:
            if field in update_data:
                setattr(inquiry, field, update_data[field])

    elif current_user.role == "account":
        raise HTTPException(status_code=403, detail="Account users cannot update inquiries")

    # Optional: Audit
    # inquiry.last_updated_by = current_user.id

    db.commit()
    db.refresh(inquiry)

    # ✅ Add Notification
    # ✅ Add Notification Logic Based on Role
    visible_to = []
    notif_msg = ""
    inquiry_number = inquiry.id

    if current_user.role == "sales":
        # Notify all backend users
        backend_users = db.query(User).filter(User.role == "backend").all()
        visible_to = [f"backend_{u.name}" for u in backend_users]
        notif_msg = f"{current_user.name} has updated inquiry {inquiry_number}"

    elif current_user.role == "backend":
        if (
            sales_user := db.query(User)
            .filter(User.id == inquiry.created_by)
            .first()
        ):
            visible_to = [f"sales_{sales_user.name}"]
            notif_msg = f"{current_user.name} has updated inquiry number {inquiry_number}."

    elif current_user.role == "admin":
        # 👉 Notify both backend and sales (if exists)
        backend_users = db.query(User).filter(User.role == "backend").all()
        sales_user = db.query(User).filter(User.id == inquiry.created_by).first()
        visible_to = [f"backend_{u.name}" for u in backend_users]
        if sales_user:
            visible_to.append(f"sales_{sales_user.name}")
        notif_msg = f"{current_user.name} has updated inquiry number {inquiry_number}."
    # Add common recipients (optional: admin can always see it)
    visible_to += ["admin", f"{current_user.role}_{current_user.name}", "admin"]

    # Save notification
    db.add(NotificationModel(
        message=notif_msg,
        visible_to=visible_to,
        user_name=current_user.name,
        inquiry_id=inquiry.inquiry_id,
        type="update"
    ))
    db.commit()
    return inquiry

@router.delete("/{inquiry_id}")
def delete_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db)
):
    """Delete an inquiry by ID (any authenticated user)."""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    # ✅ Delete without role check
    db.delete(inquiry)
    db.commit()
    return {"message": "Inquiry deleted successfully"}


@router.get("/new-id")
def get_new_inquiry_id():
    """Get Id Fron database."""
    new_id = f"INQ-{uuid.uuid4().hex[:8].upper()}"
    return {"inquiry_id": new_id}

@router.patch("/{inquiry_id}", response_model=InquiryOut)
def patch_inquiry(
    inquiry_id: int,
    updates: dict = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Partially update an inquiry based on user role and allowed fields."""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    role_allowed_fields = {
        "admin": list(updates.keys()),
        "sales": [
            "inquiry_id", "inquiry_date", "today_date", "period", "sales",
            "buyer", "stock_id", "shape", "ct", "color", "clarity", "cut",
            "po", "sym", "lab", "report", "dis_ppc", "ppc", "amt", "type",
            "sale_team_status", "payment", "remark_request"
        ],
        "backend": [
            "location", "backend_status", "time", "status_of_stone",
            "qc_remark", "stone_confirmation_remark", "entry_status", "location_remark"
        ],
        "account": []
    }

    if current_user.role == "sales" and inquiry.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    allowed_fields = role_allowed_fields.get(current_user.role, [])
    if not allowed_fields:
        raise HTTPException(status_code=403, detail="Access denied")

    for key, value in updates.items():
        if key in allowed_fields:
            setattr(inquiry, key, value)

    db.commit()
    db.refresh(inquiry)

    # ✅ Add notification logic here
    visible_to = []
    notif_msg = ""
    inquiry_number = inquiry.id

    if current_user.role == "sales":
        # Notify all backend users
        backend_users = db.query(User).filter(User.role == "backend").all()
        visible_to = [f"backend_{u.name}" for u in backend_users]
        notif_msg = f"{current_user.name} has updated inquiry {inquiry_number}"

    elif current_user.role == "backend":
        if (
            sales_user := db.query(User)
            .filter(User.id == inquiry.created_by)
            .first()
        ):
            visible_to = [f"sales_{sales_user.name}"]
            notif_msg = f"{current_user.name} has updated inquiry number {inquiry_number}."

    elif current_user.role == "admin":
        # 👉 Notify both backend and sales (if exists)
        backend_users = db.query(User).filter(User.role == "backend").all()
        sales_user = db.query(User).filter(User.id == inquiry.created_by).first()
        visible_to = [f"backend_{u.name}" for u in backend_users]
        if sales_user:
            visible_to.append(f"sales_{sales_user.name}")
        notif_msg = f"{current_user.name} has updated inquiry number {inquiry_number}."
    # Add common recipients (optional: admin can always see it)
    visible_to += ["admin", f"{current_user.role}_{current_user.name}", "admin"]

    # Save notification
    db.add(NotificationModel(
        message=notif_msg,
        visible_to=visible_to,
        user_name=current_user.name,
        inquiry_id=inquiry.inquiry_id
    ))
    db.commit()
    return inquiry

@router.post("/upload-invoice")
async def upload_invoice_file(
    inquiry_id: str = Form(...),
    invoice: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload an invoice file for a specific inquiry."""
    upload_folder = "uploaded_invoices"
    os.makedirs(upload_folder, exist_ok=True)

    # Use only forward slashes for compatibility in URL
    filename = f"invoice-{inquiry_id}-{invoice.filename}".replace("\\", "/")
    file_path = f"{upload_folder}/{filename}"  # ✅ always use forward slash

    # Save the actual file
    with open(file_path, "wb") as buffer:
        buffer.write(await invoice.read())

    # Save path in DB (used in frontend href)
    inquiry = db.query(Inquiry).filter(Inquiry.inquiry_id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    # ✅ Save only the filename portion (no folder)
    inquiry.invoice_file = filename
    db.commit()

    return {
        "message": "Invoice uploaded successfully",
        "path": f"uploaded_invoices/{filename}"  # frontend can use this directly
    }
