"""Authentication API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.middleware.auth import get_current_user, get_current_active_user
from app.models.user import User
from app.schemas.user import CurrentUserResponse

router = APIRouter()


@router.get("/me", response_model=CurrentUserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current authenticated user information.
    
    This endpoint requires a valid Supabase JWT token in the Authorization header:
    Authorization: Bearer <your-supabase-jwt-token>
    
    Returns:
        CurrentUserResponse: Current user details including:
        - user_id: UUID
        - email: Email address
        - name: Display name
        - account_status: pending/active/suspended
        - created_at: Account creation timestamp
        - approved_by: UUID of admin who approved (if applicable)
        - approved_at: Approval timestamp (if applicable)
    """
    return current_user


@router.get("/me/active", response_model=CurrentUserResponse)
async def get_current_active_user_info(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get current authenticated user information (active accounts only).
    
    This endpoint requires:
    1. Valid Supabase JWT token
    2. User account status must be "active"
    
    Returns:
        CurrentUserResponse: Current active user details
        
    Raises:
        403 Forbidden: If user account is not active
    """
    return current_user


@router.get("/status")
async def check_auth_status(
    current_user: User = Depends(get_current_user)
):
    """
    Quick endpoint to check if token is valid.
    
    Returns:
        dict: Simple status response
    """
    return {
        "authenticated": True,
        "user_id": str(current_user.user_id),
        "email": current_user.email,
        "account_status": current_user.account_status
    }
