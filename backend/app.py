from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import os

app = Flask(__name__)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-super-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=7)

jwt = JWTManager(app)

# Mock user database (replace with real database)
users = {}

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "OK",
        "message": "Hacktoberfest 2025 Python Flask API is running! 🎃",
        "timestamp": "2025-10-15T00:00:00Z",
        "version": "1.0.0"
    })

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({
                "success": False,
                "message": "Email and password are required"
            }), 400
        
        email = data['email']
        password = data['password']
        name = data.get('name', email)
        
        # Check if user already exists
        if email in users:
            return jsonify({
                "success": False,
                "message": "User already exists"
            }), 400
        
        # Create new user
        user_id = f"user_{len(users) + 1}"
        hashed_password = generate_password_hash(password)
        
        users[email] = {
            'id': user_id,
            'email': email,
            'name': name,
            'password': hashed_password
        }
        
        return jsonify({
            "success": True,
            "message": "User registered successfully",
            "user": {
                "id": user_id,
                "email": email,
                "name": name
            }
        }), 201
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Registration failed"
        }), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({
                "success": False,
                "message": "Email and password are required"
            }), 400
        
        email = data['email']
        password = data['password']
        
        # Check if user exists and password is correct
        user = users.get(email)
        if not user or not check_password_hash(user['password'], password):
            return jsonify({
                "success": False,
                "message": "Invalid credentials"
            }), 401
        
        # Create tokens
        access_token = create_access_token(identity=user['id'])
        refresh_token = create_refresh_token(identity=user['id'])
        
        return jsonify({
            "success": True,
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user['id'],
                "email": user['email'],
                "name": user['name']
            }
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Login failed"
        }), 500

@app.route('/api/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        
        return jsonify({
            "success": True,
            "access_token": new_access_token
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Token refresh failed"
        }), 500

@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        current_user_id = get_jwt_identity()
        
        # Find user by ID
        user = None
        for email, user_data in users.items():
            if user_data['id'] == current_user_id:
                user = user_data
                break
        
        if not user:
            return jsonify({
                "success": False,
                "message": "User not found"
            }), 404
        
        return jsonify({
            "success": True,
            "message": "Profile accessed successfully",
            "user": {
                "id": user['id'],
                "email": user['email'],
                "name": user['name']
            }
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Profile access failed"
        }), 500

@app.route('/api/auth', methods=['GET'])
def auth_info():
    return jsonify({
        "message": "Hacktoberfest 2025 Python Flask Auth API",
        "endpoints": {
            "POST /register": "Register a new user",
            "POST /login": "Login user and get tokens",
            "POST /refresh": "Refresh access token",
            "GET /profile": "Get user profile (protected)"
        },
        "status": "active"
    })

if __name__ == '__main__':
    # Security warning
    if app.config['JWT_SECRET_KEY'] == 'your-super-secret-key-change-in-production':
        print("🚨 SECURITY WARNING: Using default JWT secret key!")
    
    app.run(debug=True, port=3002)