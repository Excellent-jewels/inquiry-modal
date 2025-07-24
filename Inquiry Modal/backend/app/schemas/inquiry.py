"""Pydantic schemas for Inquiry operations."""
from datetime import time, date

from decimal import Decimal
from typing import Optional

from pydantic import BaseModel


class InquiryBase(BaseModel):
    """Schema for updating an inquiry (all fields optional)."""

    inquiry_id: Optional[str]
    inquiry_date: Optional[date]
    today_date: Optional[date]
    period: Optional[str]
    sales: Optional[str]
    buyer: Optional[str]
    stock_id: Optional[str]
    shape: Optional[str]
    ct: Optional[Decimal]
    color: Optional[str]
    clarity: Optional[str]
    cut: Optional[str]
    po: Optional[str]
    sym: Optional[str]
    lab: Optional[str]
    report: Optional[str]
    dis_ppc: Optional[str]
    ppc: Optional[Decimal]
    amt: Optional[Decimal]
    type: Optional[str]
    sale_team_status: Optional[str]
    payment: Optional[str]
    remark_request: Optional[str]
    location: Optional[str]
    backend_status: Optional[str]
    time: Optional[time]
    status_of_stone: Optional[str]
    qc_remark: Optional[str]
    stone_confirmation_remark: Optional[str]
    entry_status: Optional[str]
    location_remark: Optional[str]
    invoice_file: Optional[str]


class InquiryCreate(InquiryBase):
    """Schema for creating a new inquiry."""

class InquiryOut(InquiryBase):
    """Schema for displaying inquiry data."""
    id: int
    created_at: Optional[str]

    class Config:
        """Enable ORM mode for Pydantic to work with SQLAlchemy models."""
        orm_mode = True
