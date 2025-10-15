from fastapi import FastAPI

app = FastAPI()

# Mock database
USERS = {
    1: {"id": 1, "name": "Alice", "email": "alice@example.com"},
    2: {"id": 2, "name": "Bob", "email": "bob@example.com"},
}

@app.get("/")
def home():
    return {"service": "User Service"}

@app.get("/users/{user_id}")
def get_user(user_id: int):
    user = USERS.get(user_id)
    if user:
        return user
    return {"error": "User not found"}
