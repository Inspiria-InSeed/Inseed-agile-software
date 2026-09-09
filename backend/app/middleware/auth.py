"""Authentication middleware and dependencies"""

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from uuid import UUID

from app.config.database import get_db
from app.config.supabase import verify_supabase_token, extract_user_id, extract_user_email
from app.models.user import User
from app.services.user_service import UserService

# HTTP Bearer token security scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency to get the current authenticated user.
    
    This function:
    1. Extracts the JWT token from Authorization header
    2. Verifies the token with Supabase JWT secret
    3. Extracts user_id from token
    4. Retrieves user from database (or creates if first login)
    5. Returns User object
    
    Args:
        credentials: HTTP Bearer credentials from request header
        db: Database session
        
    Returns:
        User: Current authenticated user
        
    Raises:
        HTTPException: If authentication fails
    """
    # Extract token from credentials
    token = credentials.credentials
    
    # Verify token and get payload
    token_payload = verify_supabase_token(token)
    
    # Extract user information from token
    user_id_str = extract_user_id(token_payload)
    user_email = extract_user_email(token_payload)
    
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not extract user ID from token"
        )
    
    # Convert string to UUID
    try:
        user_id = UUID(user_id_str)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID format in token"
        )
    
    # Get or create user in database
    # This handles the case where a user logs in for the first time
    user_name = token_payload.get("user_metadata", {}).get("name")
    user = UserService.get_or_create_user(
        db=db,
        user_id=user_id,
        email=user_email,
        name=user_name
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependency to get current user and verify account is active.
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User: Current active user
        
    Raises:
        HTTPException: If user account is not active
    """
    if not UserService.is_user_active(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User account is {current_user.account_status}. Please contact an administrator."
        )
    
    return current_user


def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False)),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Optional authentication dependency.
    Returns user if authenticated, None otherwise.
    Useful for endpoints that work differently for authenticated vs anonymous users.
    
    Args:
        credentials: Optional HTTP Bearer credentials
        db: Database session
        
    Returns:
        Optional[User]: User if authenticated, None otherwise
    """
    if not credentials:
        return None
    
    try:
        token = credentials.credentials
        token_payload = verify_supabase_token(token)
        user_id_str = extract_user_id(token_payload)
        
        if not user_id_str:
            return None
        
        user_id = UUID(user_id_str)
        user = UserService.get_user_by_id(db, user_id)
        return user
    
    except Exception:
        return None
