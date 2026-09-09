"""User model mapping to existing 'users' table"""

from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from app.config.database import Base


class User(Base):
    """
    User model representing the existing 'users' table.
    
    Schema:
        user_id          uuid
        name             text
        email            text
        account_status   text
        approved_by      uuid
        approved_at      timestamptz
        created_at       timestamptz
        rls              text
    """
    __tablename__ = "users"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=True)
    email = Column(Text, unique=True, nullable=False, index=True)
    account_status = Column(Text, default="pending")  # pending, active, suspended
    approved_by = Column(UUID(as_uuid=True), nullable=True)
    approved_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    rls = Column(Text, nullable=True)  # Row Level Security field
    
    def __repr__(self):
        return f"<User(user_id={self.user_id}, email={self.email}, status={self.account_status})>"
