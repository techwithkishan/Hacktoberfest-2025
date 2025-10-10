# save this as main.py
from fastapi import FastAPI
from pydantic import BaseModel

# create an app instance
app = FastAPI()

# create a data model for requests
class Item(BaseModel):
    name: str
    price: float
    quantity: int

# root route
@app.get("/")
def home():
    return {"message": "Welcome to My API!"}

# get item by id
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "description": "Sample item"}

# post route to create item
@app.post("/items/")
def create_item(item: Item):
    total_value = item.price * item.quantity
    return {"name": item.name, "total_value": total_value}
