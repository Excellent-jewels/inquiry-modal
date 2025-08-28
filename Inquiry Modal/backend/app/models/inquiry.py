"""SQLAlchemy model for the inquiries table."""

from sqlalchemy import Column, Integer, String, Date, Time, Text, Numeric, ForeignKey, TIMESTAMP
from app.database import Base

class Inquiry(Base):
    """Represents an inquiry record made by a user regarding a diamond or product."""

    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    inquiry_id = Column(String, unique=True, index=True)
    inquiry_date = Column(Date)
    today_date = Column(Date)
    period = Column(String(50))
    sales = Column(String(100))
    buyer = Column(String(100))
    stock_id = Column(String(50))
    shape = Column(String(50))
    ct = Column(Numeric)
    color = Column(String(50))
    clarity = Column(String(50))
    cut = Column(String(50))
    po = Column(String(50))
    sym = Column(String(50))
    lab = Column(String(50))
    report = Column(String(100))
    dis_ppc = Column(String(50))
    ppc = Column(Numeric)
    amt = Column(Numeric)
    type = Column(String(50))
    sale_team_status = Column(String(50))
    payment = Column(String(50))
    remark_request = Column(Text)
    location = Column(String(100), nullable=True)
    backend_status = Column(String(100), nullable=True)
    time = Column(Time, nullable=True)
    status_of_stone = Column(String(100), nullable=True)
    qc_remark = Column(Text, nullable=True)
    stone_confirmation_remark = Column(Text, nullable=True)
    entry_status = Column(String(100), nullable=True)
    location_remark = Column(String(100), nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(TIMESTAMP, nullable=True)
    invoice_file = Column(String, nullable=True)
