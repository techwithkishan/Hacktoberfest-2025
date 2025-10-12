# 💪 Smart Habit & Productivity Tracker  
> A desktop-based **JavaFX application** to build better habits, visualize streaks, and track daily or weekly progress — with real-time charts and local JSON storage.

---

## 🚀 Overview  
The **Smart Habit & Productivity Tracker** is a powerful yet lightweight JavaFX app designed to help you monitor your routines and stay consistent.  
It combines **habit tracking**, **visual analytics**, and **persistent storage** to create a complete productivity companion for your desktop.

Each habit maintains a streak, last completion date, and frequency — all visualized with a live-updating pie chart.

---

## ✨ Features  

✅ **🧠 Habit Management** — Add, complete, or delete habits easily through the dashboard.  
✅ **📆 Frequency Options** — Choose between *Daily* or *Weekly* habits.  
✅ **🔥 Streak Counter** — Automatically updates streaks every time a habit is marked “Done.”  
✅ **📊 Live Pie Chart** — Visualizes habit completion progress dynamically.  
✅ **💾 Persistent JSON Storage** — Saves all habit data to `habits.json` locally using Gson.  
✅ **💡 Intuitive UI** — Built with JavaFX layouts, tables, and controls for a clean user experience.  
✅ **🖥 Responsive Design** — Adjustable table and chart layout within a resizable window.

---

## 🛠️ Tech Stack  

| Category | Technology Used |
|-----------|----------------|
| **Language** | Java (JDK 17 or above recommended) |
| **GUI Framework** | JavaFX |
| **Data Format** | JSON |
| **Libraries** | Gson (for serialization/deserialization) |
| **Components Used** | TableView, PieChart, ComboBox, Buttons, ObservableList |

---

## ⚙️ Setup & Run  

### 🧩 Step 1: Clone the Repository  
```bash
git clone https://github.com/hari7261/Hacktoberfest-2025.git
cd Hactoberfest-2025/Devanand/Smart Habit & Productivity Tracker
```

### ▶️ Step 2: Compile and Run the App  
```bash
javac --module-path "path/to/javafx-sdk/lib" --add-modules javafx.controls,javafx.fxml HabitTrackerApp.java
java --module-path "path/to/javafx-sdk/lib" --add-modules javafx.controls,javafx.fxml HabitTrackerApp
```

> 💡 Replace `"path/to/javafx-sdk/lib"` with your local JavaFX SDK path.

---

## 🧠 How It Works  

1. On launch, the app loads existing habits from `habits.json` (if available).  
2. You can **add new habits** with a name and frequency (Daily/Weekly).  
3. Marking a habit as **“Done”** increments its streak and updates the last completion date.  
4. A **Pie Chart** dynamically visualizes completion data for quick progress insights.  
5. All changes are saved automatically for persistence between sessions.

---

## 💡 Example Flow  

```
> Add Habit: "Morning Run" (Daily)
> Add Habit: "Read 20 pages" (Daily)

✔ Mark "Morning Run" as Done
✔ Mark "Read 20 pages" as Done

→ Streaks increment and chart updates in real time.
→ Data stored in habits.json for next session.
```

---
## 🪪 License  
This project is licensed under the **MIT License** — free to use and modify.  
