# INCITE — Internal Project Management System

## 1. Project Overview

**Incite** is an internal project management platform designed to manage multiple projects, teams, tasks, sprints, Agile workflows, project progress, and collaboration from one centralized system.

### Core Principle

Incite uses **project-scoped permissions**.

A user's role is determined by the project they belong to. The same user can have different roles in different projects.

Example:

```text
User
├── Project A → TEAM_LEAD
├── Project B → MEMBER
└── Project C → MEMBER
```

Being a Team Lead in one project must not automatically give the user Team Lead permissions in another project.

---

# 2. Existing Database

The database has **already been created** and is the source of the application's existing data structure.

> **Important:** Do not recreate, redesign, rename, or replace the existing database schema unless explicitly required.

The backend must integrate with the existing database.

## Existing Tables

```text
users
roles
project_member
projects
backlogs
epics
user_stories
tasks
task_assignment
sprints
sprint_task
```

---

## 2.1 Existing Database Schema

### users

```text
user_id          uuid
name             text
email            text
account_status   text
approved_by      uuid
approved_at      timestamptz
created_at       timestamptz
rls              text
```

### roles

```text
role_id          int8
role_name        text
```

### project_member

```text
member_id        int8
user_id          uuid
project_id       int8
role_id          int8
joined_at        timestamptz
status           text
```

### projects

```text
project_id       int8
project_name     text
description      text
status           text
created_at       timestamptz
```

### backlogs

```text
backlog_id       int8
project_id       int8
backlog_item     text
start_date       date
completion_date  date
status           text
```

### epics

```text
epic_id          int8
backlog_id       int8
epic_name        text
priority         text
status           text
created_at       timestamptz
```

### user_stories

```text
story_id         int8
epic_id          int8
story_title      text
description      text
priority         text
status           text
created_at       timestamptz
```

### tasks

```text
task_id          int8
story_id         int8
task_name        text
priority         text
status           text
due_date         date
review           text
blocked          bool
start_date       date
completion_date  date
created_at       timestamptz
```

### task_assignment

```text
task_assignment_id  int8
task_id             int8
member_id           int8
assigned_at         timestamptz
removed_at          timestamptz
assigned_by         uuid
```

### sprints

```text
sprint_id        int8
project_id       int8
sprint_name      text
sprint_goal      text
start_date       date
end_date         date
status           text
created_at       timestamptz
```

### sprint_task

```text
sprint_task_id   int8
sprint_id        int8
task_id          int8
assigned_at      timestamptz
```

---

# 3. Database Relationships

The existing database follows this general hierarchy:

```text
PROJECT
   │
   ├── BACKLOG
   │      │
   │      └── EPIC
   │             │
   │             └── USER STORY
   │                    │
   │                    └── TASK
   │
   ├── SPRINT
   │      │
   │      └── SPRINT TASK
   │
   └── PROJECT MEMBER
          │
          ├── USER
          └── ROLE
```

Task assignment connects tasks with project members:

```text
PROJECT
   │
   └── PROJECT MEMBER
          │
          └── TASK ASSIGNMENT
                 │
                 └── TASK
```

The backend should use these existing relationships rather than introducing duplicate project/member/task structures.

---

# 4. Organization Roles

## ADMIN

Admins have organization-wide access.

Capabilities include:

- Create projects
- Edit projects
- Delete projects
- Manage users
- Manage project memberships
- Manage roles
- Assign tasks
- Manage sprints
- Manage Agile data
- Approve/reject join requests where applicable
- View reports
- View activity
- Manage system settings

Initial administrators:

```text
Pritham Kalhi
Neha Thapa
Mitunjoy Kumar
```

---

## AGILE_COORDINATOR

There are two Agile Coordinators with cross-project coordination access.

Typical capabilities:

- View project progress
- Monitor active sprints
- Monitor blocked tasks
- Monitor delayed tasks
- View project health
- Track milestones where supported
- Coordinate Agile activities
- View cross-project reports

They do not automatically receive full administrative user-management permissions.

---

## USER

Normal users can belong to multiple projects.

Their permissions depend on their role in each project.

---

# 5. Project Roles

Project roles are stored through the existing:

```text
project_member
```

relationship with:

```text
roles
```

## TEAM_LEAD

A Team Lead manages only the project where they are assigned as Team Lead.

Capabilities may include:

- Manage project members
- Approve/reject project join requests
- Assign tasks
- Create/update tasks
- Manage sprints
- Manage backlog
- Manage epics
- Manage user stories
- Manage processes if implemented
- Monitor project progress
- Update project status where permitted

---

## MEMBER

Members have limited access.

They can:

- View their projects
- View project information
- View assigned tasks
- Update permitted task fields
- Update their own work
- View sprint information
- View relevant Agile information

They cannot:

- Manage project members
- Change project roles
- Assign work to other users
- Manage the project unless they are explicitly Team Lead

---

# 6. Authorization Model

Authorization must always happen in the **Python backend**.

Frontend permission checks are only for UI visibility.

Every protected operation should verify:

```text
1. Authentication
2. Organization role
3. Project membership
4. Project role
5. Required permission
```

### Authorization Flow

```text
User
  │
  ▼
Authentication
  │
  ▼
Organization Role
  │
  ├── ADMIN
  │      └── Organization-wide access
  │
  ├── AGILE_COORDINATOR
  │      └── Cross-project coordination
  │
  └── USER
         │
         ▼
    Project Membership
         │
         ├── TEAM_LEAD
         │      └── Project management
         │
         └── MEMBER
                └── Limited project access
```

---

# 7. Important Permission Rule

The backend must never trust the project role sent by the frontend.

For example:

```text
User A

P001 → TEAM_LEAD
P002 → MEMBER
```

If User A sends:

```text
role = TEAM_LEAD
project_id = P002
```

the backend must reject the operation because the existing database says User A is only a MEMBER of P002.

The backend must resolve the user's actual membership and role from the existing database.

---

# 8. Technology Stack

## Frontend

```text
React
TypeScript
Vite
Tailwind CSS
React Router
Axios / Fetch
```

## Backend

```text
Python
FastAPI
Pydantic
SQLAlchemy / SQL queries as appropriate
JWT or secure session authentication
REST API
```

## Database

```text
Existing Database
```

The database is already implemented and should be consumed by the backend.

## Optional Future Technologies

```text
Redis
WebSockets
Background Workers
Email Notifications
AI / Automation Services
```

---

# 9. High-Level Architecture

```text
                 ┌─────────────────────────┐
                 │       INCITE UI         │
                 │   React + TypeScript    │
                 └────────────┬────────────┘
                              │
                              │ HTTPS / REST
                              ▼
                 ┌─────────────────────────┐
                 │      PYTHON BACKEND     │
                 │        FastAPI          │
                 └────────────┬────────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       Authentication    Authorization     Services
             │                │                │
             └────────────────┼────────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │    EXISTING DATABASE    │
                 │     Source of Truth     │
                 └─────────────────────────┘
```

---

# 10. Backend Request Flow

Every protected request should follow:

```text
HTTP Request
     │
     ▼
Authentication
     │
     ▼
Organization Authorization
     │
     ▼
Project Membership Check
     │
     ▼
Project Role Check
     │
     ▼
Permission Check
     │
     ▼
FastAPI Route
     │
     ▼
Service Layer
     │
     ▼
Existing Database
     │
     ▼
Response
```

---

# 11. Python Backend Structure

Recommended structure:

```text
server/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── projects.py
│   │   ├── members.py
│   │   ├── tasks.py
│   │   ├── sprints.py
│   │   ├── backlogs.py
│   │   ├── epics.py
│   │   ├── user_stories.py
│   │   └── reports.py
│   │
│   ├── controllers/
│   │
│   ├── services/
│   │
│   ├── schemas/
│   │
│   ├── middleware/
│   │
│   ├── permissions/
│   │
│   ├── models/
│   │
│   ├── utils/
│   │
│   └── config/
│
├── tests/
│
├── requirements.txt
└── .env
```

> `models/` here refers to backend representations/ORM mappings of the existing tables. It must not be used as a reason to create a new database schema.

---

# 12. API Structure

Base URL:

```text
/api
```

## Authentication

```text
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Users

```text
GET   /api/users
GET   /api/users/:user_id
PATCH /api/users/:user_id
```

## Projects

```text
GET   /api/projects
GET   /api/projects/:project_id
POST  /api/projects
PATCH /api/projects/:project_id
DELETE /api/projects/:project_id
```

## Project Members

```text
GET    /api/projects/:project_id/members
POST   /api/projects/:project_id/members
PATCH  /api/projects/:project_id/members/:member_id
DELETE /api/projects/:project_id/members/:member_id
```

## Backlogs

```text
GET   /api/projects/:project_id/backlogs
POST  /api/projects/:project_id/backlogs
PATCH /api/backlogs/:backlog_id
```

## Epics

```text
GET   /api/backlogs/:backlog_id/epics
POST  /api/backlogs/:backlog_id/epics
PATCH /api/epics/:epic_id
```

## User Stories

```text
GET   /api/epics/:epic_id/stories
POST  /api/epics/:epic_id/stories
PATCH /api/stories/:story_id
```

## Tasks

```text
GET   /api/projects/:project_id/tasks
POST  /api/projects/:project_id/tasks
GET   /api/tasks/:task_id
PATCH /api/tasks/:task_id
```

## Task Assignment

```text
POST   /api/tasks/:task_id/assign
DELETE /api/tasks/:task_id/assign/:member_id
```

## Sprints

```text
GET   /api/projects/:project_id/sprints
POST  /api/projects/:project_id/sprints
PATCH /api/sprints/:sprint_id
```

## Reports

```text
GET /api/reports/projects
GET /api/reports/projects/:project_id
GET /api/reports/tasks
GET /api/reports/sprints
```

---

# 13. FastAPI Middleware / Dependencies

Recommended authorization components:

```text
authenticate_user()
require_admin()
require_agile_coordinator()
require_project_membership()
require_project_role()
require_permission()
```

Example conceptual flow:

```python
current_user
    ↓
authenticate_user()
    ↓
require_project_membership(project_id)
    ↓
require_project_role(project_id, TEAM_LEAD)
    ↓
endpoint()
```

The actual implementation should query the existing:

```text
users
project_member
roles
projects
```

tables.

---

# 14. Permission Matrix

| Action | Admin | Agile Coordinator | Team Lead | Member |
|---|---:|---:|---:|---:|
| View all projects | YES | YES | NO | NO |
| View assigned projects | YES | YES | YES | YES |
| Create project | YES | Optional | NO | NO |
| Edit project | YES | Optional | YES* | NO |
| Delete project | YES | NO | NO | NO |
| Manage members | YES | Optional | YES* | NO |
| Assign tasks | YES | Optional | YES* | NO |
| Edit tasks | YES | Optional | YES* | LIMITED |
| Manage sprints | YES | Optional | YES* | NO |
| Manage backlog | YES | Optional | YES* | NO |
| Manage epics | YES | Optional | YES* | NO |
| Manage stories | YES | Optional | YES* | NO |
| View reports | YES | YES | YES* | LIMITED |
| Manage users | YES | NO | NO | NO |

`*` = only for projects where the user is Team Lead.

---

# 15. Dashboard Design

## Admin Dashboard

Organization-wide view:

```text
Total Projects
Active Projects
Completed Projects
Blocked Projects
Total Members
Open Tasks
Completed Tasks
Project Health
```

Navigation:

```text
Dashboard
Projects
Members
Tasks
Backlogs
Epics
User Stories
Sprints
Reports
Activity
Settings
```

---

## Agile Coordinator Dashboard

Focus:

```text
Overall Project Progress
Active Sprints
Blocked Tasks
Delayed Tasks
Upcoming Sprint Deadlines
Project Health
Sprint Performance
Cross-Project Reports
```

---

## Team Lead Dashboard

Only projects where the user is Team Lead should appear as management projects.

Example:

```text
Project: P001

Progress          72%
Current Sprint    Sprint 4
Open Tasks        18
Completed Tasks   42
Blocked Tasks     3
Pending Reviews   5
Project Health    GOOD
```

Management actions:

```text
Add / Remove Members
Create / Assign Tasks
Create Sprints
Manage Backlog
Manage Epics
Manage User Stories
Review Project Activity
```

---

## Member Dashboard

Shows:

```text
My Projects
My Role
Assigned Tasks
Current Sprint
Upcoming Deadlines
Task Progress
Relevant Updates
```

Management controls should only appear when the member is a Team Lead for the selected project.

---

# 16. Frontend Permission System

The frontend can use a permission hook:

```typescript
const { can } = usePermissions();

if (can("TASK_ASSIGN", projectId)) {
    // Show Assign Task button
}
```

However:

> Frontend permissions are not security.

The backend must independently enforce every permission.

---

# 17. Core Business Rules

1. Every project must have appropriate project leadership.
2. Project roles are project-scoped.
3. A user can belong to multiple projects.
4. A user can have different roles across projects.
5. Admins have organization-wide access.
6. Agile Coordinators have cross-project coordination access.
7. Members cannot manage projects unless they are Team Lead for that project.
8. A user's project role must be read from the existing membership/role relationship.
9. Backend authorization is mandatory.
10. Frontend permission checks are only for UI/UX.
11. Important administrative changes should be auditable.
12. The existing database remains the source of truth.
13. Do not create duplicate user, project, member, task, or role systems in the backend.

---

# 18. Security Requirements

The backend must:

- Hash passwords securely where passwords are managed by Incite
- Never store plaintext passwords
- Validate incoming requests
- Enforce authorization on the backend
- Prevent unauthorized project access
- Use parameterized queries / safe ORM operations
- Protect authentication tokens
- Validate project membership before project operations
- Prevent cross-project data modification
- Apply least-privilege access
- Log important administrative actions
- Validate IDs against the authenticated user's permissions

### Critical Rule

```text
Never trust:

project_id
user_id
member_id
role_id
permission
```

when they come directly from the frontend.

Always validate them against the authenticated user's authorized access.

---

# 19. Example Authorization Scenario

Suppose:

```text
Rahul

P001 → TEAM_LEAD
P002 → MEMBER
```

### Request against P001

```text
PATCH /api/projects/P001/tasks/123
```

Allowed if the operation requires Team Lead permission.

### Request against P002

```text
POST /api/projects/P002/tasks/456/assign
```

Rejected because Rahul is only a MEMBER of P002.

The backend must determine this from:

```text
users
    ↓
project_member
    ↓
roles
```

---

# 20. Development Phases

## Phase 1 — Backend Foundation

```text
FastAPI setup
Configuration
Database connection to existing database
Authentication
Current-user endpoint
Role resolution
Project membership resolution
Authorization system
Error handling
Request validation
```

## Phase 2 — Project Management

```text
Projects
Project members
Backlogs
Epics
User stories
Tasks
Task assignment
Sprints
```

## Phase 3 — Frontend Integration

```text
Authentication UI
Dashboard
Projects
Project details
Members
Tasks
Backlogs
Epics
User stories
Sprints
```

## Phase 4 — Collaboration

```text
Notifications
Activity tracking
Join requests
Task updates
Comments
```

## Phase 5 — Analytics

```text
Project health
Sprint performance
Task completion trends
Delayed task analysis
Member workload
Cross-project reporting
```

## Phase 6 — Automation

```text
Deadline reminders
Overdue task detection
Sprint-end reports
Project health calculation
Automated notifications
Weekly Agile summaries
```

---

# 21. Integration Rules

The Python backend must integrate with the existing database without changing its fundamental structure.

### Backend responsibilities

```text
Authentication
Authorization
Business Logic
Validation
API Handling
Permission Enforcement
Data Retrieval
Data Updates
Reporting
Notifications
```

### Existing database responsibilities

```text
Users
Roles
Projects
Project Membership
Backlogs
Epics
User Stories
Tasks
Task Assignments
Sprints
Sprint Tasks
```

---

# 22. Final System Concept

```text
                         INCITE
                           │
          ┌────────────────┼────────────────┐
          │                │                │
        ADMIN       AGILE COORDINATOR      USERS
          │                │                │
          │                │        ┌───────┴───────┐
          │                │        │               │
          │                │    TEAM LEAD        MEMBER
          │                │        │               │
          └────────────────┴────────┴───────────────┘
                           │
                           ▼
                        PROJECTS
                           │
       ┌───────────────────┼────────────────────┐
       │                   │                    │
    BACKLOGS            SPRINTS            MEMBERS
       │                   │                    │
     EPICS             SPRINT TASKS           ROLES
       │
   USER STORIES
       │
     TASKS
       │
 TASK ASSIGNMENT
```

### Application Architecture

```text
┌───────────────────────────────────────────┐
│                 FRONTEND                  │
│       React + TypeScript + Vite           │
└─────────────────────┬─────────────────────┘
                      │
                      │ REST / HTTPS
                      ▼
┌───────────────────────────────────────────┐
│             PYTHON BACKEND                │
│                 FastAPI                   │
│                                           │
│ Authentication                            │
│ Authorization                             │
│ Permission Engine                         │
│ Business Services                         │
│ Validation                                │
│ API Routes                                │
└─────────────────────┬─────────────────────┘
                      │
                      │ SQL / ORM
                      ▼
┌───────────────────────────────────────────┐
│            EXISTING DATABASE              │
│                                           │
│ users                                     │
│ roles                                     │
│ project_member                            │
│ projects                                  │
│ backlogs                                  │
│ epics                                     │
│ user_stories                              │
│ tasks                                     │
│ task_assignment                           │
│ sprints                                   │
│ sprint_task                               │
└───────────────────────────────────────────┘
```

---

# 23. Project Goal

Incite should provide a single secure command center for managing organizational projects while maintaining strict **project-level role isolation**.

The system should be:

```text
Secure
Scalable
Project-scoped
API-driven
Easy to maintain
Integrated with the existing database
```

The **Python FastAPI backend** is the central business and authorization layer, while the **existing database remains the source of truth**.
