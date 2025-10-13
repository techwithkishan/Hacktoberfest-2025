import secrets
from typing import Callable, Dict, Any, Optional
from http import cookies
import re
from csrf_token import CSRFTokenGenerator
class CSRFMiddleware:
    def __init__(self, app, secret_key: str, exempt_routes: list = None):
        """
        CSRF Protection Middleware
        
        Args:
            app: WSGI application
            secret_key: Secret key for token generation
            exempt_routes: List of routes to exempt from CSRF protection
        """
        self.app = app
        self.csrf_generator = CSRFTokenGenerator(secret_key)
        self.exempt_routes = exempt_routes or []
        
        # Headers that can contain CSRF token
        self.token_headers = ['X-CSRF-Token', 'X-XSRF-Token']
        self.token_param = 'csrf_token'
        self.token_cookie = 'csrftoken'
    
    def __call__(self, environ: Dict, start_response: Callable) -> Any:
        """
        WSGI middleware entry point
        """
        # Get request method and path
        method = environ.get('REQUEST_METHOD', 'GET').upper()
        path = environ.get('PATH_INFO', '')
        
        # Skip CSRF check for safe methods and exempt routes
        if method in ['GET', 'HEAD', 'OPTIONS'] or self._is_exempt_route(path):
            return self.app(environ, start_response)
        
        # Get session ID from cookies
        session_id = self._get_session_id(environ)
        if not session_id:
            return self._csrf_error_response(start_response, "Session required")
        
        # Validate CSRF token
        if not self._validate_csrf_token(environ, session_id):
            return self._csrf_error_response(start_response, "Invalid CSRF token")
        
        # Process the request
        return self.app(environ, start_response)
    
    def _is_exempt_route(self, path: str) -> bool:
        """Check if route is exempt from CSRF protection"""
        for route in self.exempt_routes:
            if re.match(route, path):
                return True
        return False
    
    def _get_session_id(self, environ: Dict) -> Optional[str]:
        """Extract session ID from cookies"""
        cookie_header = environ.get('HTTP_COOKIE', '')
        if not cookie_header:
            return None
        
        simple_cookie = cookies.SimpleCookie()
        try:
            simple_cookie.load(cookie_header)
            session_cookie = simple_cookie.get('sessionid')
            if session_cookie:
                return session_cookie.value
        except (KeyError, AttributeError):
            pass
        
        return None
    
    def _validate_csrf_token(self, environ: Dict, session_id: str) -> bool:
        """Validate CSRF token from request"""
        # Get token from headers
        for header_name in self.token_headers:
            token = environ.get(f'HTTP_{header_name.upper().replace("-", "_")}')
            if token:
                return self.csrf_generator.validate_token(token, session_id)
        
        # Get token from form data for POST requests
        if environ.get('CONTENT_TYPE', '').startswith('application/x-www-form-urlencoded'):
            try:
                # Read POST data
                content_length = int(environ.get('CONTENT_LENGTH', 0))
                if content_length > 0:
                    post_data = environ['wsgi.input'].read(content_length)
                    environ['wsgi.input'] = type('', (), {'read': lambda x: post_data})()
                    
                    # Parse form data
                    from urllib.parse import parse_qs
                    form_data = parse_qs(post_data.decode('utf-8'))
                    
                    token = form_data.get(self.token_param, [None])[0]
                    if token and self.csrf_generator.validate_token(token, session_id):
                        return True
            except (ValueError, KeyError, IndexError):
                pass
        
        # Get token from JSON body for API requests
        if environ.get('CONTENT_TYPE', '').startswith('application/json'):
            try:
                content_length = int(environ.get('CONTENT_LENGTH', 0))
                if content_length > 0:
                    import json
                    post_data = environ['wsgi.input'].read(content_length)
                    environ['wsgi.input'] = type('', (), {'read': lambda x: post_data})()
                    
                    json_data = json.loads(post_data.decode('utf-8'))
                    token = json_data.get(self.token_param)
                    
                    if token and self.csrf_generator.validate_token(token, session_id):
                        return True
            except (json.JSONDecodeError, ValueError, KeyError):
                pass
        
        return False
    
    def _csrf_error_response(self, start_response: Callable, message: str):
        """Return CSRF error response"""
        status = '403 Forbidden'
        headers = [('Content-Type', 'application/json')]
        start_response(status, headers)
        
        response_data = {
            'error': 'CSRF Validation Failed',
            'message': message,
            'code': 'csrf_validation_failed'
        }
        
        import json
        return [json.dumps(response_data).encode('utf-8')]
    
    def generate_csrf_token(self, session_id: str) -> str:
        """Generate a new CSRF token (for use in templates)"""
        return self.csrf_generator.generate_token(session_id)