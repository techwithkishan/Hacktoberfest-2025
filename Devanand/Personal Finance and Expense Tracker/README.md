# 💸 Gamified Personal Finance & Expense Tracker  
> A modern, browser-based **gamified finance dashboard** that turns budgeting into a rewarding challenge — complete with progress tracking, rewards, confetti, and smart visual analytics.

---

## 🚀 Overview  
The **Gamified Expense Tracker** helps users **track spending, manage budgets, and visualize expenses** through a sleek, interactive interface.  
It motivates better financial habits using a **gamification system** — rewarding users for staying under budget with badges, emojis, and confetti animations 🎉  

This project is part of the **Devanand** collection of smart personal dashboards.

---

## ✨ Features  

✅ **💰 Add, Edit & Delete Expenses** — Log daily transactions with title, amount, category, and notes.  
✅ **📅 Monthly Summary** — Automatically groups and analyzes data month-wise.  
✅ **📊 Interactive Charts** — Real-time pie chart of category-wise expenses.  
✅ **🎯 Progress Tracker** — Shows how much of your monthly budget you’ve spent.  
✅ **🏆 Reward System** — Earn fun badges and confetti for staying under budget.  
✅ **🌗 Dark/Light Mode Toggle** — Instantly switch themes.  
✅ **📤 Export / 📥 Import Data** — Save or restore your progress in JSON format.  
✅ **📈 Smart Analytics** — Displays top spending categories and trends.  
✅ **💾 Persistent Storage** — All data stored locally using `localStorage`.  

---

## 🛠️ Tech Stack  

| Category | Technology Used |
|-----------|----------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Storage** | Browser `localStorage` |
| **Data Visualization** | Canvas-based Pie Chart |
| **Gamification** | Confetti animations, badges, and reward text |
| **Design** | Responsive layout, neumorphic and glass UI styling |

---

## ⚙️ Setup & Usage  

### 🧩 Step 1: Clone the Repository  
```bash
git clone https://github.com/hari7261/Hacktoberfest-2025.git
cd Hactoberfest-2025/Devanand/Personal Finance & Expense Tracker (Gamified Dashboard)
```

### ▶️ Step 2: Run the App  
```bash
# Simply open the HTML file in your browser
start gamified-expense-tracker.html
```

> 💡 **Tip:** No server required — just open the HTML file in Chrome, Edge, or any modern browser and `Go Live`.

---


## 🧠 How It Works  

1. Each expense you add is stored in **localStorage** with date, category, and note.  
2. A **monthly budget** (default: $1000) is used to calculate spending percentage.  
3. The dashboard shows a **pie chart** of expenses by category and total spent this month.  
4. A **gamified reward system** triggers emojis and confetti when you stay below 50% of your budget.  
5. Export or import data as `.json` to back up or restore your finances.

---

## 💎 Reward System Logic  

| Condition | Badge | Message |
|------------|--------|----------|
| < 50% Budget Used | 🏆 | Excellent! You are well under budget. |
| 50%–85% | 🎯 | Good — you are on track. |
| 85%–99% | ⚠️ | Caution — approaching budget limit. |
| ≥ 100% | 💥 | Over budget — review your spending. |

> 🎉 When rewards are earned, confetti animations celebrate your progress!

---

## 🔍 Key Shortcuts & Tips  

| Action | Description |
|--------|-------------|
| Add Expense | Fill form → Click “Add Expense” |
| Filter Expenses | Use search bar above list |
| Reset All | Clears all data (with confirmation) |
| Export / Import | Save or load your JSON file |
| Add Test Expense | Quickly add a sample record |
| Toggle Theme | Switch between light & dark mode |

---

## 🪪 License  
This project is licensed under the **MIT License** — free to use and modify.  
