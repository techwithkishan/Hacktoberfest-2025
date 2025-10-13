# CSRF Protection System

This project provides a **custom CSRF (Cross-Site Request Forgery) protection system** built in Python.  
It includes token generation, validation, and middleware integration for frameworks like **Flask** and **FastAPI**.

---

## 📁 Project Structure

```
backend/#205_CSRF_Protection_Middleware
        ├── csrf_token.py
        ├── csrf_middleware.py
        ├── csrf_decorators.py
        ├── csrf_config.py
        ├── app.py
        ├── fastapi_app.py
        ├── templates/
        │   └── form.html
        ├── test_csrf.py
        └── requirements.txt
```

---

## ⚙️ Components Overview

### 1. CSRF Token Generator (`backend/#205_CSRF_Protection_Middleware/csrf_token.py`)
Generates and validates CSRF tokens using **HMAC-SHA256** and time-based expiry.

### 2. CSRF Middleware (`backend/#205_CSRF_Protection_Middleware/csrf_middleware.py`)
Provides WSGI middleware for validating tokens across routes and request types (headers, forms, JSON).

### 3. CSRF Protection Decorator (`backend/#205_CSRF_Protection_Middleware/csrf_decorators.py`)
Used to enable or exempt specific routes from CSRF protection.

### 4. Configuration (`backend/#205_CSRF_Protection_Middleware/csrf_config.py`)
Stores CSRF-related configuration like secret key, token expiry, and exempt routes.

### 5. Example Applications
- **FastAPI App (`backend/#205_CSRF_Protection_Middleware/fastapi_app.py`)** – Demonstrates CSRF protection in async APIs.

### 6. HTML Template (`backend/#205_CSRF_Protection_Middleware/templates/form.html`)
Example HTML form showing how to embed CSRF tokens in both forms and AJAX requests.

### 7. Testing Script (`backend/#205_CSRF_Protection_Middleware/test_csrf.py`)
Unit tests for token generation, validation, and tampering detection.

---

## 📦 Installation

```bash
pip install -r backend/requirements.txt
```

**Requirements:**
```
Flask==2.3.3
FastAPI==0.104.1
Jinja2==3.1.2
```

---

## 🚀 Usage Example (Flask)

```python
from flask import Flask, session, jsonify, render_template_string
from csrf_middleware import CSRFMiddleware
from csrf_config import CSRFConfig

app = Flask(__name__)
app.secret_key = 'your-flask-secret-key'

csrf_middleware = CSRFMiddleware(app.wsgi_app, CSRFConfig.SECRET_KEY, CSRFConfig.EXEMPT_ROUTES)
app.wsgi_app = csrf_middleware

@app.route('/')
def index():
    csrf_token = csrf_middleware.generate_csrf_token(session.sid)
    form_html = """
    <form method='POST' action='/submit'>
        <input type='hidden' name='csrf_token' value='{{ csrf_token }}'>
        <input type='text' name='data'>
        <button type='submit'>Submit</button>
    </form>
    """
    return render_template_string(form_html, csrf_token=csrf_token)

if __name__ == '__main__':
    app.run(debug=True)
```

---

## 🔒 Key Features

- ✅ **Secure Token Generation** using HMAC-SHA256  
- 🔁 **Multiple Token Sources**: headers, form fields, JSON  
- 🔐 **Session Binding** for user-specific validation  
- ⏱ **Token Expiry** configurable via environment variable  
- 🚫 **Route Exemption** for public endpoints  
- 🌐 **Framework Agnostic** (Flask, FastAPI, or any WSGI)  
- ⚠️ **Comprehensive Error Handling** for CSRF failures  

---

## 🧠 Usage Notes

- Set a strong `CSRF_SECRET_KEY` in environment variables for production.  
- Make sure sessions are configured before applying CSRF protection.  
- For AJAX requests, send token in request headers: `X-CSRF-Token`.  
- For HTML forms, include token as a hidden field.  

---

## 🧪 Running Tests

```bash
python -m unittest backend/"#205_CSRF_Protection_Middleware"/test_csrf.py
```

---

## 🛡️ Summary

This CSRF protection system ensures secure web interactions by combining **token validation**, **session binding**, and **middleware enforcement**.  
It follows industry security standards and can be integrated into **any Python-based web backend**.

