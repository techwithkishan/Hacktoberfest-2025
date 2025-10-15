# 🛒 Smart Shopping Cart System  
> A lightweight, Java-based e-commerce simulation featuring **product management**, **cart operations**, **coupon discounts**, and **AI-like product recommendations** — all in one console app.

---

## 🚀 Overview  
The **Smart Shopping Cart System** is a console-based Java application that models the core logic behind an online store.  
It demonstrates the use of **OOP concepts**, **collections**, and **priority queues** to simulate adding/removing products, applying coupons, viewing recommendations, and sorting items by price.

This project is part of the **Devanand** collection of Java-based backend simulations.

---

## ✨ Features  

✅ **🛍 Add & Remove Products** — Add products from the catalog or remove them from the cart.  
✅ **📦 Product Catalog** — Predefined products with attributes: ID, Name, Price, and Popularity.  
✅ **💸 Coupon Discounts** — Apply promotional codes for instant savings.  
✅ **💰 Total Calculation** — Displays cart total before and after discount.  
✅ **📊 Sorting by Price** — Sort cart items in ascending order by price.  
✅ **💡 Product Recommendations** — Shows top 3 recommended items based on popularity.  
✅ **🧠 Collections Used** — Combines `ArrayList`, `HashMap`, `Queue`, and `PriorityQueue`.  

---

## 🛠️ Tech Stack  

| Category | Technology Used |
|-----------|----------------|
| **Language** | Java (JDK 17 or above recommended) |
| **Core Concepts** | OOP, Collections Framework |
| **Data Structures** | ArrayList, HashMap, Queue, PriorityQueue |
| **Sorting Logic** | Comparator (Price-based sorting) |
| **Discount Logic** | Coupon-based percentage reduction |

---

## ⚙️ Setup & Run  

### 🧩 Step 1: Clone the Repository  
```bash
git clone https://github.com/hari7261/Hacktoberfest-2025.git
cd Hactoberfest-2025/Devanand/Product
```

### ▶️ Step 2: Compile the Java File  
```bash
javac ShoppingCart.java
```

### 🚀 Step 3: Run the Application  
```bash
java ShoppingCart
```

> 💡 **Tip:** The app runs entirely in the console — no external libraries or setup needed.

---

## 🧠 How It Works  

1. The system initializes a **catalog** of products (Laptop, Phone, etc.).  
2. Users can **add** products to the cart or **remove** them using their product ID.  
3. Coupons like `"NEW10"` or `"SALE20"` can be applied for instant discounts.  
4. The cart can be **sorted by price** to easily compare items.  
5. The **recommendation engine** uses a `PriorityQueue` to display top popular products.

---

## 💡 Example Console Output  

```
Laptop added to cart!
Headphones added to cart!
ID: 1 | Laptop | $800.0 | Popularity: 95
ID: 3 | Headphones | $100.0 | Popularity: 85
Sorting by price:
Cart sorted by price!
ID: 3 | Headphones | $100.0 | Popularity: 85
ID: 1 | Laptop | $800.0 | Popularity: 95
Total before coupon: $900.0
Coupon applied! Final Price: $810.0

Recommended Products:
ID: 1 | Laptop | $800.0 | Popularity: 95
ID: 2 | Phone | $500.0 | Popularity: 90
ID: 3 | Headphones | $100.0 | Popularity: 85
```

---

## 🪪 License  
This project is licensed under the **MIT License** — free to use and modify.  
