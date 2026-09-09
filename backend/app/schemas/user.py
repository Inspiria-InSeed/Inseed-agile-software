"""User Pydantic schemas for request/response validation"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    name: Optional[str] = None


class UserCreate(UserBase):
    """Schema for creating a new user"""
    pass


class UserUpdate(BaseModel):
    """Schema for updating user information"""
    name: Optional[str] = None
    account_status: Optional[str] = None


class UserInDB(UserBase):
    """Schema for user as stored in database"""
    user_id: UUID
    account_status: str = "pending"
    approved_by: Optional[UUID] = None
    approved_at: Optional[datetime] = None
    created_at: datetime
    rls: Optional[str] = None
    
    class Config:
        from_attributes = True  # Allows creating from SQLAlchemy model


class UserResponse(BaseModel):
    """Schema for user response to client"""
    user_id: UUID
    email: str
    name: Optional[str] = None
    account_status: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class CurrentUserResponse(UserResponse):
    """Extended schema for current authenticated user"""
    approved_by: Optional[UUID] = None
    approved_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
