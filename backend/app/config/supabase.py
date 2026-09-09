"""Supabase client configuration and JWT verification utilities"""

from jose import jwt, JWTError
from typing import Optional
from fastapi import HTTPException, status
from .settings import get_settings

settings = get_settings()


def verify_supabase_token(token: str) -> dict:
    """
    Verify a Supabase JWT token and extract user information.
    
    Args:
        token: The JWT token to verify
        
    Returns:
        dict: Decoded token payload containing user info
        
    Raises:
        HTTPException: If token is invalid, expired, or malformed
    """
    try:
        # Decode and verify the JWT token using Supabase JWT secret
        # Note: We disable audience verification as it may not always be present
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=[settings.ALGORITHM],
            options={"verify_aud": False}  # Disable strict audience checking
        )
        return payload
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    except JWTError as e:
        # Provide detailed error for debugging
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication error: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


def extract_user_id(token_payload: dict) -> Optional[str]:
    """
    Extract user ID from decoded token payload.
    
    Args:
        token_payload: Decoded JWT payload
        
    Returns:
        str: User UUID from token, or None if not found
    """
    # Supabase tokens contain user ID in 'sub' claim
    return token_payload.get("sub")


def extract_user_email(token_payload: dict) -> Optional[str]:
    """
    Extract user email from decoded token payload.
    
    Args:
        token_payload: Decoded JWT payload
        
    Returns:
        str: User email from token, or None if not found
    """
    return token_payload.get("email")
