from fastapi import Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from typing import Optional, Dict
from datetime import datetime, timedelta
from models.user import User
from services.mongo_service import db
import os
import logging
from bson import ObjectId

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration from environment variables
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-here")
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY", "your-clerk-secret-here")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))  # 24 hours

# Security schemes
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")
security = HTTPBearer()

class AuthMiddleware:
    def __init__(self):
        self.security = HTTPBearer()
        self.oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

    def create_access_token(self, data: Dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create a new JWT access token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})
        
        try:
            encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
            return encoded_jwt
        except Exception as e:
            logger.error(f"Error creating access token: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Could not create access token"
            )

    async def verify_token(
        self,
        credentials: HTTPAuthorizationCredentials = Security(security)
    ) -> Dict:
        """Verify the JWT token and return the payload"""
        try:
            token = credentials.credentials
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            
            # Check if token has expired
            exp = payload.get("exp")
            if exp is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token is missing expiration"
                )
                
            if datetime.fromtimestamp(exp) < datetime.utcnow():
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token has expired"
                )
                
            return payload
            
        except JWTError as e:
            logger.error(f"JWT verification failed: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
        except Exception as e:
            logger.error(f"Token verification error: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token verification failed"
            )

    async def get_current_user(
        self,
        credentials: HTTPAuthorizationCredentials = Security(security)
    ) -> Dict:
        """Get the current authenticated user"""
        try:
            payload = await self.verify_token(credentials)
            user_id = payload.get("sub")
            
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Could not validate user credentials"
                )

            user = await db.users.find_one({"_id": ObjectId(user_id)})
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )

            # Remove sensitive information
            user.pop("password", None)
            return user

        except Exception as e:
            logger.error(f"Error getting current user: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication failed"
            )

    async def verify_admin(
        self,
        current_user: Dict = Depends(get_current_user)
    ) -> Dict:
        """Verify if the current user is an admin"""
        if not current_user.get("is_admin", False):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin privileges required"
            )
        return current_user

    async def optional_auth(
        self,
        credentials: Optional[HTTPAuthorizationCredentials] = Security(security, auto_error=False)
    ) -> Optional[Dict]:
        """Optionally authenticate a user"""
        if not credentials:
            return None
            
        try:
            return await self.get_current_user(credentials)
        except HTTPException:
            return None

# Create singleton instance
auth_handler = AuthMiddleware()

# Export commonly used dependencies
verify_token = auth_handler.verify_token
get_current_user = auth_handler.get_current_user
verify_admin = auth_handler.verify_admin
optional_auth = auth_handler.optional_auth

# Utility functions for token management
def create_access_token(user_id: str, additional_data: Dict = None) -> str:
    """Create an access token for a user"""
    data = {"sub": str(user_id)}
    if additional_data:
        data.update(additional_data)
    return auth_handler.create_access_token(data=data)

async def refresh_token(refresh_token: str) -> Dict:
    """Refresh an access token"""
    try:
        payload = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
            
        # Create new access token
        access_token = create_access_token(user_id)
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
        
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
