from functools import wraps
from typing import Callable, Any
import json

class CSRFProtect:
    def __init__(self, csrf_middleware):
        """
        CSRF protection decorator for individual endpoints
        
        Args:
            csrf_middleware: CSRFMiddleware instance
        """
        self.csrf_middleware = csrf_middleware
    
    def __call__(self, f: Callable) -> Callable:
        """Decorator implementation"""
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # This would be framework-specific implementation
            # For Flask/FastAPI/Django, you'd extract request and session info
            return f(*args, **kwargs)
        return decorated_function

def csrf_exempt(f: Callable) -> Callable:
    """Decorator to exempt route from CSRF protection"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        return f(*args, **kwargs)
    decorated_function.csrf_exempt = True
    return decorated_function