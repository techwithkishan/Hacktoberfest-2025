# Local Deployment (Development)

This guide shows how to run the repository locally for development and testing. Commands are shown for Windows PowerShell (as your environment).

## Prerequisites

- Git
- Node.js and npm (if working with `frontend/` or `backend/` TypeScript service)
- Python 3.8+ (for Python scripts)
- Java JDK (if running Java projects)
- Docker (optional, for later steps)

## 1) Clone repo

Open PowerShell and run:

```powershell
git clone https://github.com/harshit-sharma2005/Hacktoberfest-2025.git ;
cd "Hacktoberfest-2025"
```

## 2) Inspect top-level services

This repository contains multiple subprojects. Common directories:
- `backend/` — TypeScript API
- `frontend/` — frontend app
- `java/`, `C++/`, `python/`, `Aman/`, etc. — user contributions and utilities

Run the service-specific steps below.

### Backend (Node/TypeScript)

1. Install dependencies:

```powershell
cd backend ;
npm install
```

2. Setup env variables

Copy existing `.env` sample or create `.env` in `backend/` with relevant keys. Example `.env` variables:

```
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/db
JWT_SECRET=your_jwt_secret
```

3. Run in dev mode:

```powershell
npm run dev
```

If the repo already contains built artifacts (`backend/dist`), you can run the compiled build:

```powershell
npm run start
```

### Frontend (if present)

```powershell
cd frontend ;
npm install ;
npm run dev
```

Open the URL printed by the dev server (usually `http://localhost:5173` or `http://localhost:3000`).

### Python scripts

Use a virtual environment:

```powershell
python -m venv .venv ;
.\.venv\Scripts\Activate.ps1 ;
pip install -r requirements.txt  # if available per-subproject
```

Run specific scripts, for example:

```powershell
python python/web_scraper.py
```

### Java projects

Compile and run using `javac`/`java` or open in an IDE (IntelliJ/VS Code):

```powershell
cd java ;
javac AdvancedDataStructure_AVLTree.java ;
java AdvancedDataStructure_AVLTree
```

## Troubleshooting

- Missing Node version: install Node LTS from nodejs.org or use nvm-windows.
- Permission issues on PowerShell execution policy: run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` as Administrator if activation fails for venv.
- Port conflicts: change `PORT` or free the port with `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess` then `Stop-Process -Id <pid>`.

---

If you'd like, I can generate per-service `requirements.txt`, `package.json` scripts, or a top-level README section for running the most used services.