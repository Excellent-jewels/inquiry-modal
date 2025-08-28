"""Main entry point for the FastAPI application."""

from datetime import datetime, timedelta, timezone

from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.database import SessionLocal, engine, Base
from app.models import inquiry as inquiry_model
from app.routes import auth, inquiry, notification, permission, vendor

app = FastAPI()
Base.metadata.create_all(bind=engine)
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(inquiry.router)
app.include_router(permission.router)
app.include_router(notification.router)
app.include_router(vendor.router)

# Mount for uploaded files
app.mount("/uploaded_invoices",
          StaticFiles(directory="uploaded_invoices"),
          name="uploaded_invoices")

# 🔄 Scheduled Job: Delete stale inquiries
def delete_old_inquiries():
    """Delete inquiries older than 15 days that are not in specific statuses."""
    db: Session = SessionLocal()
    try:
        fifteen_days_ago = datetime.now(timezone.utc) - timedelta(days=15)

        stale_inquiries = db.query(inquiry_model.Inquiry).filter(
            inquiry_model.Inquiry.created_at <= fifteen_days_ago,
            inquiry_model.Inquiry.sale_team_status.in_(["Not Available", "On Memo", "Release"])
        ).all()

        for item in stale_inquiries:
            db.delete(item)

        db.commit()
        print(f"✅ Deleted {len(stale_inquiries)} old inquiries.")
    except SQLAlchemyError as e:
        print("❌ SQLAlchemy error during inquiry cleanup:", e)
    finally:
        db.close()

# Start scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(delete_old_inquiries, trigger='interval', days=1)
scheduler.start()

# ✅ Custom OpenAPI Schema for JWT auth
def custom_openapi():
    """Generate custom OpenAPI schema with JWT security."""
    if app.openapi_schema:
        return app.openapi_schema
    schema = get_openapi(
        title="Order Management API",
        version="1.0.0",
        description="API for managing inquiries and user roles",
        routes=app.routes,
    )
    schema["components"]["securitySchemes"] = {
        "OAuth2PasswordBearer": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in schema["paths"].values():
        for method in path.values():
            method["security"] = [{"OAuth2PasswordBearer": []}]
    app.openapi_schema = schema
    return schema

app.openapi = custom_openapi
