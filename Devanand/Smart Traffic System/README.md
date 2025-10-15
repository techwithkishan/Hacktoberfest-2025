# 🚦 Smart Traffic System (Advanced Multithreaded Simulation)  
> A console-based **Java multithreaded simulation** of intelligent traffic management, featuring concurrent signals, priority-based vehicle handling, and real-time logging to file.

---

## 🚀 Overview  
The **Smart Traffic System Advanced** is a Java application that simulates smart traffic flow using **multithreading** and **priority queues**.  
Each signal runs on a separate thread and processes vehicles independently based on priority — ensuring that emergency vehicles get instant passage while normal traffic flows efficiently.

This system models real-world intelligent traffic control behavior using core Java concurrency and file handling mechanisms.

---

## ✨ Features  

✅ **🚗 Real-Time Vehicle Simulation** — Cars, Buses, Fire Trucks, and Ambulances are dynamically generated.  
✅ **🚦 Independent Traffic Signals** — Each signal runs on its own thread for concurrent processing.  
✅ **⚙️ Priority Queue System** — Vehicles are processed according to urgency (Ambulances > Buses > Cars).  
✅ **🕓 Dynamic Wait Times** — High-priority vehicles pass faster; others wait longer.  
✅ **📜 Logging System** — All signal events and transitions are saved to `traffic_log.txt`.  
✅ **📊 Statistics Report** — Displays total vehicles and emergency count per signal after execution.  
✅ **🧠 Multithreading & Concurrency** — Demonstrates the use of `PriorityBlockingQueue`, `Runnable`, and thread interruption control.

---

## 🛠️ Tech Stack  

| Category | Technology Used |
|-----------|----------------|
| **Language** | Java (JDK 17 or above recommended) |
| **Concurrency** | Threads, Runnable, PriorityBlockingQueue |
| **File Handling** | `FileWriter` for persistent event logging |
| **Randomization** | Dynamic vehicle generation using `Random` |
| **Time Simulation** | Real-time delays via `Thread.sleep()` |

---

## ⚙️ Setup & Run  

### 🧩 Step 1: Clone the Repository  
```bash
git clone https://github.com/hari7261/Hacktoberfest-2025.git
cd Hactoberfest-2025/Devanand/Smart Traffic System
```

### ▶️ Step 2: Compile and Run the Program  
```bash
javac SmartTrafficSystemAdvanced.java
java SmartTrafficSystemAdvanced
```

> 💡 The program runs for 20 seconds by default, then prints statistics and terminates gracefully.

---

## 🧠 How It Works  

1. Two **traffic signals** (`Signal A`, `Signal B`) operate in parallel using individual threads.  
2. A **Vehicle Generator thread** continuously creates random vehicles (Car, Bus, Ambulance, FireTruck).  
3. Each vehicle enters a signal’s **priority queue** — emergency vehicles have higher priority.  
4. Signals process one vehicle at a time based on priority, logging the event with timestamps.  
5. After 20 seconds, all threads are interrupted and summary statistics are displayed.

---

## 💡 Example Console Output  

```
[12:01:02] Vehicle[ID=1, Type=Car, Priority=1] entered at Signal A
[12:01:03] Vehicle[ID=2, Type=Ambulance, Priority=5] entered at Signal A
[12:01:04] Vehicle[ID=3, Type=Bus, Priority=2] entered at Signal B
[12:01:05] Signal A -> Vehicle[ID=2, Type=Ambulance, Priority=5] passed the signal after 2s wait
[12:01:06] Signal A -> Vehicle[ID=1, Type=Car, Priority=1] passed the signal after 4s wait
[12:01:07] Signal B -> Vehicle[ID=3, Type=Bus, Priority=2] passed the signal after 3s wait
...
Signal A Stats: Total Passed=8, Emergency Vehicles=2
Signal B Stats: Total Passed=6, Emergency Vehicles=1
```

---

## 🪪 License  
This project is licensed under the **MIT License** — free to use and modify.  
