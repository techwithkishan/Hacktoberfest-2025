from fastapi import FastAPI, Request, Form, Depends
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from csrf_middleware import CSRFMiddleware
from csrf_config import CSRFConfig
import uuid

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# CSRF middleware would be integrated differently in FastAPI
# This is a simplified example

@app.middleware("http")
async def csrf_middleware(request: Request, call_next):
    """Custom CSRF middleware for FastAPI"""
    # Implementation would be similar to WSGI middleware but async
    response = await call_next(request)
    return response

@app.get("/")
async def get_form(request: Request):
    """Serve form with CSRF token"""
    session_id = request.cookies.get("sessionid", str(uuid.uuid4()))
    # In real implementation, generate and validate tokens properly
    return templates.TemplateResponse("form.html", {"request": request})

@app.post("/submit")
async def submit_form(data: str = Form(...)):
    """Process form submission"""
    return {"message": "Form submitted successfully", "data": data}