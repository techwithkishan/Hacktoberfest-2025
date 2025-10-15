import secrets
import time
import hmac
import hashlib
from typing import Optional, Tuple
import base64

class CSRFTokenGenerator:
    def __init__(self, secret_key: str, token_expiry: int = 3600):
        """
        Initialize CSRF token generator
        
        Args:
            secret_key: Secret key for token signing
            token_expiry: Token expiry time in seconds (default: 1 hour)
        """
        self.secret_key = secret_key.encode('utf-8')
        self.token_expiry = token_expiry
    
    def generate_token(self, session_id: str) -> str:
        """
        Generate a new CSRF token
        
        Args:
            session_id: Unique session identifier
            
        Returns:
            Base64 encoded CSRF token
        """
        # Create timestamp
        timestamp = str(int(time.time()))
        
        # Generate random component
        random_component = secrets.token_urlsafe(32)
        
        # Create token data
        token_data = f"{session_id}:{timestamp}:{random_component}"
        
        # Create signature
        signature = hmac.new(
            self.secret_key,
            token_data.encode('utf-8'),
            hashlib.sha256
        ).digest()
        
        # Combine token data and signature
        token = f"{token_data}:{base64.urlsafe_b64encode(signature).decode('utf-8')}"
        
        return base64.urlsafe_b64encode(token.encode('utf-8')).decode('utf-8')
    
    def validate_token(self, token: str, session_id: str) -> bool:
        """
        Validate CSRF token
        
        Args:
            token: CSRF token to validate
            session_id: Session identifier to match
            
        Returns:
            Boolean indicating if token is valid
        """
        try:
            # Decode token
            decoded_token = base64.urlsafe_b64decode(token.encode('utf-8')).decode('utf-8')
            
            # Split token components
            token_parts = decoded_token.split(':')
            
            if len(token_parts) != 4:
                return False
            
            token_session_id, timestamp, random_component, signature = token_parts
            
            # Verify session ID matches
            if token_session_id != session_id:
                return False
            
            # Verify token hasn't expired
            token_time = int(timestamp)
            current_time = int(time.time())
            
            if current_time - token_time > self.token_expiry:
                return False
            
            # Recreate token data for signature verification
            token_data = f"{token_session_id}:{timestamp}:{random_component}"
            
            # Verify signature
            expected_signature = hmac.new(
                self.secret_key,
                token_data.encode('utf-8'),
                hashlib.sha256
            ).digest()
            
            provided_signature = base64.urlsafe_b64decode(signature)
            
            return hmac.compare_digest(provided_signature, expected_signature)
            
        except (ValueError, TypeError, IndexError):
            return False