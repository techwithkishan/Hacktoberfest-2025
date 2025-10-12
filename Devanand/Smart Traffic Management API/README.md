# 🚦 Smart Traffic Management API  
> A real-time **Spring Boot REST API** that simulates intelligent traffic control using priority-based vehicle handling, scheduled signal processing, and live signal status endpoints.

---

## 🚀 Overview  
The **Smart Traffic Management API** models an automated traffic control system using **Spring Boot**, **RESTful APIs**, and **scheduling tasks**.  
Vehicles — including emergency ones — are prioritized dynamically, while traffic signals process vehicles every second.  

It’s a backend simulation of smart city infrastructure designed for hackathon or IoT prototype integration.

---

## ✨ Features  

✅ **🚗 Vehicle Entry API** — Add vehicles to random traffic signals via a simple POST request.  
✅ **🚨 Emergency Vehicle Handling** — Automatically prioritizes ambulances, fire trucks, and police vehicles.  
✅ **🕓 Real-Time Processing** — Uses Spring’s `@Scheduled` to process vehicles every second.  
✅ **📊 Signal Status API** — Get live data of all signals, including queue sizes and total vehicles passed.  
✅ **⚙️ Priority Queue System** — Manages vehicles based on urgency using `PriorityBlockingQueue`.  
✅ **🧾 Logging** — Real-time event logs for each vehicle and signal transition.

---

## 🛠️ Tech Stack  

| Category | Technology Used |
|-----------|----------------|
| **Framework** | Spring Boot |
| **Language** | Java |
| **Concurrency** | `PriorityBlockingQueue`, `AtomicInteger` |
| **Scheduling** | Spring `@Scheduled` Task |
| **Architecture** | RESTful API |
| **Data Structures** | Queue-based signal management |

---

## ⚙️ Setup & Run  

### 🧩 Step 1: Clone the Repository  
```bash
git clone https://github.com/hari7261/Hacktoberfest-2025.git
cd Hactoberfest-2025/Devanand/Smart Traffic Management API
```

### ▶️ Step 2: Build and Run the Application  
```bash
# Compile and start the Spring Boot server
mvn spring-boot:run
```

> 💡 The API runs by default on **http://localhost:8080**

---

## 💡 API Endpoints  

### ➕ Add a Vehicle  
```bash
POST /vehicle?type=Car&priority=2
```
Adds a normal vehicle with custom priority to a random signal.  
Returns confirmation message and assigned signal.

---

### 🚨 Add an Emergency Vehicle  
```bash
POST /emergency?type=Ambulance
```
Adds an emergency vehicle with **highest priority (5)** for instant passage.

---

### 📊 Get All Signal Data  
```bash
GET /signals
```
Returns a JSON list of all active traffic signals, their queues, total passed vehicles, and emergency count.

**Example Response:**
```json
[
  {
    "signal": "Signal A",
    "queueSize": 2,
    "totalPassed": 5,
    "emergencyCount": 1
  },
  {
    "signal": "Signal B",
    "queueSize": 3,
    "totalPassed": 4,
    "emergencyCount": 0
  }
]
```

---

## 🧠 How It Works  

1. Vehicles are added via `/vehicle` or `/emergency` endpoints.  
2. Each `TrafficSignal` holds its queue in a **PriorityBlockingQueue**, sorted by priority.  
3. A **scheduled task** runs every second, processing the first vehicle in each queue.  
4. Emergency vehicles automatically increment the emergency count.  
5. Signal data can be viewed anytime through the `/signals` endpoint.

---

## 🪪 License  
This project is licensed under the **MIT License** — free to use and modify.  
