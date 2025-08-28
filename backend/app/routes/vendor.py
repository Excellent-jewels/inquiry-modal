"""Vendor inquiry routes for the FastAPI application."""
from datetime import datetime, timedelta
from typing import List, Optional

from app.database import SessionLocal
from app.models.inquiry import Inquiry
from app.models.vendor import VendorInquiry
from app.schemas.vendor import VendorInquiryCreate, VendorInquiryOut, VendorInquiryBase
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(prefix="/vendor", tags=["Vendor"])

def get_db():
    """Dependency to get the database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def safe_decimal(value: Optional[float]) -> Optional[float]:
    """
    Convert input to float or None, stripping quotes if necessary.
    Prevents invalid input for numeric columns in PostgreSQL.
    """
    if value is None:
        return None
    if isinstance(value, str):
        value = value.replace('"', '').strip()
    try:
        return float(value)
    except (ValueError, TypeError):
        return None

# 1. Get all vendor inquiries
@router.get("/", response_model=List[VendorInquiryOut])
def get_vendor_inquiries(db: Session = Depends(get_db)):
    """Fetch all vendor inquiries."""
    return db.query(VendorInquiry).order_by(VendorInquiry.id.desc()).all()

# 2. Create a single vendor inquiry manually
@router.post("/", response_model=VendorInquiryOut)
def create_vendor_inquiry(inquiry: VendorInquiryCreate, db: Session = Depends(get_db)):
    """Create a new vendor inquiry."""
    inquiry_data = inquiry.dict()
    # Sanitize numeric fields
    numeric_fields = ["ct", "dis_ppc", "ppc", "amt", "backend_ppc", "total_amount",
                      "bank_rate", "total_amount_inr", "diff_ppc", "terms_days"]
    for field in numeric_fields:
        if field in inquiry_data:
            inquiry_data[field] = safe_decimal(inquiry_data[field])

    new_inquiry = VendorInquiry(**inquiry_data)
    new_inquiry.today_date = datetime.now().date()
    db.add(new_inquiry)
    db.commit()
    db.refresh(new_inquiry)
    return new_inquiry

# 3. Sync dispatched inquiries to vendor table
@router.post("/sync")
def sync_vendor_inquiries(db: Session = Depends(get_db)):
    """
    Sync vendor_inquiries table with inquiries that have sale_team_status = 'Dispatched'.
    - Adds new dispatched inquiries not in vendor table.
    - Removes vendor rows whose inquiry is no longer dispatched.
    """
    dispatched_inquiries = db.query(Inquiry).filter(
        Inquiry.sale_team_status == "Dispatched"
    ).all()
    dispatched_ids = {inq.id for inq in dispatched_inquiries}

    vendor_entries = db.query(VendorInquiry).all()
    vendor_ids = {entry.id for entry in vendor_entries}

    for inquiry in dispatched_inquiries:
        if inquiry.id not in vendor_ids:
            vendor_row = VendorInquiry(
                id=inquiry.id,
                today_date=inquiry.today_date,
                sales_person_name=inquiry.sales,
                stock_id=inquiry.stock_id,
                shape=inquiry.shape,
                ct=safe_decimal(inquiry.ct),
                color=inquiry.color,
                clarity=inquiry.clarity,
                cut=inquiry.cut,
                po=inquiry.po,
                sym=inquiry.sym,
                lab=inquiry.lab,
                report=inquiry.report,
                dis_ppc=safe_decimal(inquiry.dis_ppc),
                ppc=safe_decimal(inquiry.ppc),
                amt=safe_decimal(inquiry.amt),
                type=inquiry.type,
                backend_ppc=None,
                total_amount=None,
                bank_rate=None,
                total_amount_inr=None,
                diff_ppc=None,
                remark=None,
                vendor_name=None,
                invoice_date=None,
                terms_days=None,
                bill_no=None,
            )
            db.add(vendor_row)

    to_delete_ids = vendor_ids - dispatched_ids
    if to_delete_ids:
        db.query(VendorInquiry).filter(VendorInquiry.id.in_(to_delete_ids)).delete(
            synchronize_session=False
        )

    db.commit()
    return {"message": "Vendor table synced with dispatched inquiries."}

# 4. Update a vendor inquiry
@router.put("/{inquiry_id}", response_model=VendorInquiryOut)
def update_vendor_inquiry(inquiry_id: int,
                          inquiry: VendorInquiryBase,
                          db: Session = Depends(get_db)):
    """Update a vendor inquiry by ID."""
    vendor = db.query(VendorInquiry).filter(VendorInquiry.id == inquiry_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor inquiry not found")

    for key, value in inquiry.dict(exclude_unset=True).items():
        if key in ["ct", "dis_ppc", "ppc", "amt", "backend_ppc", "total_amount",
                   "bank_rate", "total_amount_inr", "diff_ppc", "terms_days"]:
            value = safe_decimal(value)
        setattr(vendor, key, value)

    # === Apply calculation logic ===
    try:
        if vendor.backend_ppc is not None and vendor.ct is not None:
            vendor.total_amount = vendor.backend_ppc * vendor.ct

        if vendor.total_amount is not None and vendor.bank_rate is not None:
            vendor.total_amount_inr = vendor.total_amount * vendor.bank_rate

        if vendor.ppc is not None and vendor.backend_ppc is not None:
            vendor.diff_ppc = vendor.ppc - vendor.backend_ppc

        if vendor.invoice_date and vendor.terms_days is not None:
            vendor.payment_date = vendor.invoice_date + timedelta(days=int(vendor.terms_days))
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error calculating totals: {str(e)}"
        ) from e

    db.commit()
    db.refresh(vendor)
    return vendor
