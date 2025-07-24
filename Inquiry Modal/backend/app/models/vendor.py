"""This code defines a SQLAlchemy model for vendor inquiries in a backend application."""
from datetime import datetime
from app.database import Base
from sqlalchemy import Column, Date, DateTime, Integer, Numeric, String, Text


class VendorInquiry(Base):
    """SQLAlchemy model for vendor inquiries."""
    __tablename__ = "vendor_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    inquiry_id = Column(Integer, index=True)
    today_date = Column(Date)
    vendor_name = Column(String)
    invoice_date = Column(Date)
    terms_days = Column(Integer)
    bill_no = Column(String)
    backend_ppc = Column(Numeric)
    total_amount = Column(Numeric)
    bank_rate = Column(Numeric)
    total_amount_inr = Column(Numeric)
    diff_ppc = Column(Numeric)
    sales_person_name = Column(String)
    stock_id = Column(String)
    shape = Column(String)
    ct = Column(Numeric)
    color = Column(String)
    clarity = Column(String)
    cut = Column(String)
    po = Column(String)
    sym = Column(String)
    lab = Column(String)
    report = Column(String)
    dis_ppc = Column(Numeric)
    ppc = Column(Numeric)
    amt = Column(Numeric)
    type = Column(String)
    remark = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    payment_date = Column(Date)
