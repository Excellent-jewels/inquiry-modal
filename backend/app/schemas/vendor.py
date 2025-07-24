"""This code defines Pydantic schemas for vendor inquiries in a backend application."""
from datetime import date
from typing import Optional

from pydantic import BaseModel


class VendorInquiryBase(BaseModel):
    """Base schema for vendor inquiries with optional fields."""
    today_date: Optional[date]
    vendor_name: Optional[str]
    invoice_date: Optional[date]
    terms_days: Optional[int]
    bill_no: Optional[str]
    backend_ppc: Optional[float]
    total_amount: Optional[float]
    bank_rate: Optional[float]
    total_amount_inr: Optional[float]
    diff_ppc: Optional[float]
    sales_person_name: Optional[str]
    stock_id: Optional[str]
    shape: Optional[str]
    ct: Optional[float]
    color: Optional[str]
    clarity: Optional[str]
    cut: Optional[str]
    po: Optional[str]
    sym: Optional[str]
    lab: Optional[str]
    report: Optional[str]
    dis_ppc: Optional[float]
    ppc: Optional[float]
    amt: Optional[float]
    type: Optional[str]
    remark: Optional[str]
    payment_date: Optional[date]

class VendorInquiryCreate(VendorInquiryBase):
    """Create schema for vendor inquiry"""

class VendorInquiryOut(VendorInquiryBase):
    """Output schema for vendor inquiry"""
    id: int
    class Config:
        """Pydantic configuration to enable ORM mode"""
        orm_mode = True
