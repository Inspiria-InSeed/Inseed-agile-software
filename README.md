# INSEED - Internal Project Management System

A comprehensive project management platform with project-scoped role-based permissions, Agile workflow support, and modern animated UI.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **Supabase JS Client** - Authentication and database
- **Axios** - HTTP client

### Backend
- **Python 3.11+**
- **FastAPI** - Modern web framework
- **SQLAlchemy** - ORM for database
- **Pydantic** - Data validation
- **PostgreSQL** (Supabase) - Database
- **JWT** - Authentication tokens
- **Uvicorn** - ASGI server

## 📋 Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.11+
- **Supabase** account with project created
- **Git**

## 🛠️ Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd sprint
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Add tailwindcss-animate plugin
npm install tailwindcss-animate

# Copy environment file
cp .env.example .env

# Edit .env and add your Supabase credentials
# VITE_SUPABASE_URL=https://xxxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=your_anon_key
# VITE_API_URL=http://localhost:8000
```

### 3. Backend Setup

```bash
cd ../backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env and add your configuration
# DATABASE_URL=postgresql://user:password@db.xxxxx.supabase.co:5432/postgres
# SUPABASE_URL=https://xxxxx.supabase.co
# SUPABASE_KEY=your_anon_key
# SUPABASE_JWT_SECRET=your_jwt_secret
# SECRET_KEY=generate_with_openssl_rand_hex_32
```

### 4. Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the following:
   - **Project URL** → `SUPABASE_URL`
   - **Anon public key** → `SUPABASE_KEY`
   - **JWT Secret** → `SUPABASE_JWT_SECRET`
4. Navigate to Settings → Database
5. Copy the connection string → `DATABASE_URL`

## 🚀 Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
# Activate virtual environment if not already active
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Run server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will run at: http://localhost:8000
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will run at: http://localhost:3000

## 📁 Project Structure

```
sprint/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities and helpers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript type definitions
│   │   ├── contexts/        # React context providers
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/             # API route handlers
│   │   ├── services/        # Business logic layer
│   │   ├── schemas/         # Pydantic models
│   │   ├── middleware/      # Custom middleware
│   │   ├── permissions/     # Authorization logic
│   │   ├── models/          # Database models
│   │   ├── config/          # Configuration
│   │   │   ├── settings.py  # App settings
│   │   │   └── database.py  # DB connection
│   │   ├── utils/           # Utility functions
│   │   └── main.py          # FastAPI app entry
│   ├── requirements.txt
│   └── .env
│
├── INCITE_MAIN.md           # Project specification
└── README.md                # This file
```

## 🔧 Development Workflow

### Backend Development

1. API endpoints go in `backend/app/api/`
2. Business logic in `backend/app/services/`
3. Database models in `backend/app/models/`
4. Request/response schemas in `backend/app/schemas/`

### Frontend Development

1. Create reusable components in `src/components/`
2. Page components in `src/pages/`
3. Custom hooks in `src/hooks/`
4. Global state/context in `src/contexts/`

## 📚 Key Features

- **Project-Scoped Permissions**: Users have different roles in different projects
- **Four Role Types**: Admin, Agile Coordinator, Team Lead, Member
- **Agile Workflow**: Backlogs → Epics → User Stories → Tasks
- **Sprint Management**: Create sprints, assign tasks, track progress
- **Role-Based Dashboards**: Customized views for each role
- **Modern Animated UI**: Smooth transitions and micro-interactions
- **Email OTP Authentication**: Secure 2FA with Supabase Auth

## 🎨 UI Components

The project uses Shadcn/ui components built with:
- Radix UI primitives
- Tailwind CSS styling
- Framer Motion animations

To add new Shadcn/ui components:
```bash
cd frontend
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
# etc.
```

## 🧪 Testing

### Backend Tests (Coming Soon)
```bash
cd backend
pytest
```

### Frontend Tests (Coming Soon)
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Backend
```bash
cd backend
# Ensure all environment variables are set for production
# Use production WSGI server like Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🔐 Environment Variables

### Frontend (.env)
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_API_URL` - Backend API URL

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase API key
- `SUPABASE_JWT_SECRET` - JWT secret for token verification
- `SECRET_KEY` - Application secret key
- `ALLOWED_ORIGINS` - CORS allowed origins

## 🐛 Common Issues

### Frontend won't start
- Ensure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is already in use

### Backend won't start
- Ensure Python 3.11+ is installed
- Activate virtual environment
- Install all requirements: `pip install -r requirements.txt`
- Check if port 8000 is already in use
- Verify database connection string

### Database connection issues
- Verify Supabase credentials in `.env`
- Check if Supabase project is active
- Ensure IP is whitelisted in Supabase (or allow all IPs for development)

## 📖 Documentation

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 👥 Team

Initial Administrators:
- Pritham Kalhi
- Neha Thapa
- Mitunjoy Kumar

## 📄 License

Internal use only - Proprietary

## 🚧 Development Status

**Current Phase**: Task 1 - Project Scaffolding ✓

**Next Steps**:
- Task 2: Backend Authentication with Supabase JWT
- Task 3: Frontend Auth Flow (Login + OTP)
- Task 4: Authorization System
- ...see INCITE_MAIN.md for full roadmap

---

**Happy Coding! 🎉**
#   I n s e e d - a g i l e - s o f t w a r e  
 