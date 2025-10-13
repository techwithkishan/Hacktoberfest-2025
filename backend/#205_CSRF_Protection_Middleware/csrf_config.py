import os
from typing import List

class CSRFConfig:
    """CSRF Protection Configuration"""
    
    # Secret key for token signing (should be from environment variable)
    SECRET_KEY = os.getenv('CSRF_SECRET_KEY', 'your-secret-key-change-in-production')
    
    # Token expiry time in seconds (1 hour)
    TOKEN_EXPIRY = 3600
    
    # Routes exempt from CSRF protection
    EXEMPT_ROUTES = [
        r'^/api/public/',
        r'^/healthcheck$',
        r'^/docs',
    ]
    
    # Safe HTTP methods
    SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
    
    # Token names in requests
    TOKEN_HEADER_NAMES = ['X-CSRF-Token', 'X-XSRF-Token']
    TOKEN_PARAM_NAME = 'csrf_token'
    TOKEN_COOKIE_NAME = 'csrftoken'