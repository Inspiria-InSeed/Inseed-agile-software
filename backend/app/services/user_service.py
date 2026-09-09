"""User service layer for business logic"""

from typing import Optional
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User
from app.schemas.user import UserCreate


class UserService:
    """Service class for user-related operations"""
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: UUID) -> Optional[User]:
        """
        Retrieve user by user_id.
        
        Args:
            db: Database session
            user_id: UUID of the user
            
        Returns:
            User object or None if not found
        """
        return db.query(User).filter(User.user_id == user_id).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """
        Retrieve user by email address.
        
        Args:
            db: Database session
            email: Email address
            
        Returns:
            User object or None if not found
        """
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def create_user(db: Session, user_data: UserCreate, user_id: UUID) -> User:
        """
        Create a new user in the database.
        
        Args:
            db: Database session
            user_data: User creation data
            user_id: UUID from Supabase auth
            
        Returns:
            Created User object
        """
        db_user = User(
            user_id=user_id,
            email=user_data.email,
            name=user_data.name,
            account_status="pending"  # New users start as pending
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def get_or_create_user(
        db: Session,
        user_id: UUID,
        email: str,
        name: Optional[str] = None
    ) -> User:
        """
        Get existing user or create if doesn't exist.
        Useful for first-time login via Supabase.
        
        Args:
            db: Database session
            user_id: UUID from Supabase
            email: User email
            name: Optional user name
            
        Returns:
            User object (existing or newly created)
        """
        # Try to get existing user
        user = UserService.get_user_by_id(db, user_id)
        
        if user:
            return user
        
        # Create new user if doesn't exist
        user_data = UserCreate(email=email, name=name)
        return UserService.create_user(db, user_data, user_id)
    
    @staticmethod
    def is_user_active(user: User) -> bool:
        """
        Check if user account is active.
        
        Args:
            user: User object
            
        Returns:
            bool: True if account is active
        """
        return user.account_status == "active"
    
    @staticmethod
    def update_user_name(db: Session, user: User, name: str) -> User:
        """
        Update user's name.
        
        Args:
            db: Database session
            user: User object
            name: New name
            
        Returns:
            Updated User object
        """
        user.name = name
        db.commit()
        db.refresh(user)
        return user
