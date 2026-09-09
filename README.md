# INSEED — Internal Project Management System

A full-stack Agile project management platform with **project-scoped role-based permissions**, sprint tracking, and a modern React UI. Built for Inspiria InSeed to manage multiple projects, teams, and workflows from one centralized system.

**Repository:** [github.com/Inspiria-InSeed/Inseed-agile-software](https://github.com/Inspiria-InSeed/Inseed-agile-software)

---

## Overview

INSEED (Incite) is an internal project management system where a user's permissions depend on their **role within each project** — not globally. The same user can be a Team Lead in one project and a Member in another.

```
User
├── Project A → TEAM_LEAD
├── Project B → MEMBER
└── Project C → MEMBER
```

All authorization is enforced on the **Python backend**. The existing PostgreSQL database remains the source of truth.

For the full product specification, see [INCITE_MAIN.md](./INCITE_MAIN.md).

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Shadcn/ui, React Router, Supabase JS, Axios |
| **Backend** | Python 3.11+, FastAPI, SQLAlchemy, Pydantic, Uvicorn |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | Supabase Auth (JWT) with backend token verification |

---

## Features

- **Project-scoped permissions** — Admin, Agile Coordinator, Team Lead, and Member roles per project
- **Agile workflow** — Backlogs → Epics → User Stories → Tasks
- **Sprint management** — Create sprints, assign tasks, track progress
- **Role-based dashboards** — Customized views for Admin, Coordinator, Team Lead, and Member
- **Supabase authentication** — Email login with JWT verification on the backend
- **Modern UI** — Animated components, dark mode support, responsive layout

---

## Project Structure

```
Inseed-agile-software/
├── frontend/                 # React + TypeScript SPA
│   ├── src/
│   │   ├── components/       # UI and layout components
│   │   ├── pages/            # Landing, Login, Dashboards, Projects, Tasks, Sprints
│   │   ├── contexts/         # Auth context
│   │   ├── lib/              # API client and utilities
│   │   ├── hooks/            # Custom React hooks
│   │   └── routes/           # React Router configuration
│   └── package.json
│
├── backend/                  # FastAPI REST API
│   ├── app/
│   │   ├── api/              # Route handlers (auth, …)
│   │   ├── services/         # Business logic
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── middleware/       # Auth dependencies
│   │   └── config/           # Settings and database
│   └── requirements.txt
│
├── INCITE_MAIN.md            # Full product specification
├── TASK1_COMPLETE.md         # Scaffolding completion notes
└── TASK2_COMPLETE.md         # Backend auth completion notes
```

---

## Prerequisites

- **Node.js** 18+
- **Python** 3.11+
- **Supabase** project with PostgreSQL database
- **Git**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Inspiria-InSeed/Inseed-agile-software.git
cd Inseed-agile-software
```

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:8000
```

### 3. Backend setup

```bash
cd ../backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@db.xxxxx.supabase.co:5432/postgres
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
SECRET_KEY=your_secret_key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. Supabase configuration

1. Open your Supabase project → **Settings → API**
2. Copy **Project URL**, **Anon public key**, and **JWT Secret**
3. Open **Settings → Database** and copy the **connection string**

---

## Running Locally

**Terminal 1 — Backend**

```bash
cd backend
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- API: [http://localhost:8000](http://localhost:8000)
- Swagger docs: [http://localhost:8000/docs](http://localhost:8000/docs)

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```

- App: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `GET` | `/api/health` | API health check |
| `GET` | `/api/auth/me` | Current authenticated user |
| `GET` | `/api/auth/me/active` | Current user (active accounts only) |
| `GET` | `/api/auth/status` | Quick auth status check |

See [backend/TEST_AUTH.md](./backend/TEST_AUTH.md) for authentication testing instructions.

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VITE_API_URL` | Backend API base URL |

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase API key |
| `SUPABASE_JWT_SECRET` | JWT secret for token verification |
| `SECRET_KEY` | Application secret key |
| `ALLOWED_ORIGINS` | CORS allowed origins |

---

## Development Status

| Phase | Status |
|-------|--------|
| Project scaffolding (frontend + backend) | ✅ Complete |
| Backend Supabase JWT authentication | ✅ Complete |
| Frontend auth flow (login + protected routes) | 🚧 In progress |
| Authorization & project-scoped permissions | 📋 Planned |
| Full CRUD for projects, tasks, sprints | 📋 Planned |

See [INCITE_MAIN.md](./INCITE_MAIN.md) for the full development roadmap.

---

## Building for Production

**Frontend**

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

**Backend**

```bash
cd backend
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

---

## Team

Initial administrators:

- Pritham Kalhi
- Neha Thapa
- Mitunjoy Kumar

---

## License

Internal use only — Proprietary (Inspiria InSeed)
