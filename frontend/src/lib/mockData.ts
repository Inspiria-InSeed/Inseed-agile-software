import type { User, Project, Task, Sprint, ProjectMember, Activity } from '@/types'

// ─── REAL USERS / MEMBERS ────────────────────────────────────────────────────
export const mockUsers: User[] = [
  // Admins / Mentors
  { id: 'admin1', name: 'Pritham Kalhi',      email: 'pritham@inseed.com',      role: 'ADMIN',             accountStatus: 'active' },
  { id: 'admin2', name: 'Neha Thapa',         email: 'neha@inseed.com',         role: 'ADMIN',             accountStatus: 'active' },
  { id: 'admin3', name: 'Mitunjoy Kumar',     email: 'mitunjoy@inseed.com',     role: 'ADMIN',             accountStatus: 'active' },

  // Members - P001 WELLNESS WEB/APP
  { id: 'M0036', name: 'Deb Prasad Gabur',   email: 'deb.g.0225@inspiria.edu.in',        role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M0037', name: 'Tapalabdha Baksi',   email: 'tapalabdha.b.0225@inspiria.edu.in', role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0038', name: 'Kishore Barman',     email: 'kishore.b.0225@inspiria.edu.in',    role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0039', name: 'Sanjib Sarkar',      email: 'sanjib.s.1425@inspiria.edu.in',     role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0040', name: 'Anik Sarkar',        email: 'anik.s@inspiria.edu.in',            role: 'MEMBER',    accountStatus: 'active' },

  // Members - P002 HOSPITAL MANAGEMENT
  { id: 'M0010', name: 'Ashish Gurung',      email: 'ashish.g@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0011', name: 'Rohit Pandit',       email: 'rohit.p@inspiria.edu.in',   role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M0012', name: 'Ridam Rabi Das',     email: 'ridam.r@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0013', name: 'Anindita Das',       email: 'anindita@inspiria.edu.in',  role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M0014', name: 'Leher',              email: 'leher@inspiria.edu.in',     role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0015', name: 'Natasha',            email: 'natasha@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0016', name: 'Rahul Chettri',      email: 'rahul.c@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },

  // Members - P003 HR PHASE 2
  { id: 'M0017', name: 'Krish Das',          email: 'krish@inspiria.edu.in',     role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M0018', name: 'Vivek Sharma',       email: 'vivek.s@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0019', name: 'Ayush Prasad',       email: 'ayush.p@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0020', name: 'Sayanti Paul',       email: 'sayanti@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M004',  name: 'Nidhi Menaria',      email: 'nidhi@inspiria.edu.in',     role: 'MEMBER',    accountStatus: 'active' },

  // Members - P004 BBA-SM FITNESS TRACKER
  { id: 'M0023', name: 'Anurag Dutta',       email: 'anurag.d@inspiria.edu.in',  role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M0024', name: 'Bharati Roy',        email: 'bharati.r@inspiria.edu.in', role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0025', name: 'Nibedita Banerjee',  email: 'nibedita@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0026', name: 'Aditi Gurung',       email: 'aditi.g@inspiria.edu.in',   role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M0027', name: 'Prakul Gupta',       email: 'prakul.g@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0028', name: 'Gareema Gupta',      email: 'gareema.g@inspiria.edu.in', role: 'TEAM_LEAD', accountStatus: 'active' },

  // Members - P005 QUIZ WEBSITE
  { id: 'M0029', name: 'Akash Bhagat',       email: 'akash.b@inspiria.edu.in',   role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M0030', name: 'Kusum Singh',        email: 'kusum.s@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0031', name: 'Aniket Sanyal',      email: 'aniket.s@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0032', name: 'Subhojeet Ghosh',    email: 'subhojeet@inspiria.edu.in', role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0033', name: 'Nishant Jaiswal',    email: 'nishant.j@inspiria.edu.in', role: 'MEMBER',    accountStatus: 'active' },

  // Members - P006 PORTFOLIO
  { id: 'M0021', name: 'Mohini Sah',         email: 'mohini.s@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0022', name: 'Prashant Chhetri',   email: 'prashant.c@inspiria.edu.in',role: 'MEMBER',    accountStatus: 'active' },

  // Members - P008 AI COUNSELLOR
  { id: 'M006',  name: 'Bhumi Ghosh',        email: 'bhumi.g@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M007',  name: 'Himanshu Katwal',    email: 'himanshu.k@inspiria.edu.in',role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M008',  name: 'Chadup Tamang',      email: 'chadup.t@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M009',  name: 'Biplob Sinha',       email: 'biplob.s@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },

  // Members - P009 APPSE AI
  { id: 'M001',  name: 'R Santoshwaran',     email: 'santosh.r@inspiria.edu.in', role: 'TEAM_LEAD', accountStatus: 'active' },
  { id: 'M002',  name: 'Aman Gupta',         email: 'aman.g@inspiria.edu.in',    role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M005',  name: 'Basabjeet Deb',      email: 'basab.d@inspiria.edu.in',   role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0034', name: 'Nischal Gurung',     email: 'nischal.g@inspiria.edu.in', role: 'MEMBER',    accountStatus: 'active' },
  { id: 'M0035', name: 'Prabin Thakur',      email: 'prabin.t@inspiria.edu.in',  role: 'MEMBER',    accountStatus: 'active' },
]

// ─── Helper lookup ────────────────────────────────────────────────────────────
const u = (id: string) => mockUsers.find(m => m.id === id)!

// ─── REAL SPRINTS ─────────────────────────────────────────────────────────────
export const mockSprints: Sprint[] = [
  // P001
  { id: 'SP001-1', name: 'Sprint 1', goal: 'Make animated landing page, login/signup, backend structure & DB',
    projectId: 'P001', projectName: 'Wellness Web/App',
    status: 'completed', startDate: '2026-08-20', endDate: '2026-08-26',
    progress: 100, totalTasks: 5, completedTasks: 5, daysRemaining: 0 },
  { id: 'SP001-2', name: 'Sprint 2', goal: 'Approve module designs and feature confirmation',
    projectId: 'P001', projectName: 'Wellness Web/App',
    status: 'active', startDate: '2026-08-27', endDate: '2026-09-03',
    progress: 40, totalTasks: 3, completedTasks: 1, daysRemaining: 3 },

  // P002
  { id: 'SP002-1', name: 'Sprint 1', goal: 'Login portal, database schema, frontend screens, recommendation system',
    projectId: 'P002', projectName: 'Hospital Management',
    status: 'completed', startDate: '2026-08-18', endDate: '2026-08-25',
    progress: 100, totalTasks: 6, completedTasks: 6, daysRemaining: 0 },
  { id: 'SP002-2', name: 'Sprint 2', goal: 'Integrate Login/Registration with Supabase, UML Diagram, Recommendation System',
    projectId: 'P002', projectName: 'Hospital Management',
    status: 'active', startDate: '2026-09-01', endDate: '2026-09-10',
    progress: 55, totalTasks: 6, completedTasks: 2, daysRemaining: 1 },

  // P003
  { id: 'SP003-1', name: 'Sprint 1', goal: 'Integration of job portal, AI recommendation, recruiter dashboard, UI enhancement',
    projectId: 'P003', projectName: 'HR Phase 2',
    status: 'active', startDate: '2026-08-17', endDate: '2026-08-22',
    progress: 50, totalTasks: 4, completedTasks: 0, daysRemaining: 0 },

  // P004
  { id: 'SP004-1', name: 'Sprint 1', goal: 'Fix student login, notifications, admin, deploy & smoke test',
    projectId: 'P004', projectName: 'BBA-SM Fitness Tracker',
    status: 'active', startDate: '2026-08-31', endDate: '2026-09-05',
    progress: 46, totalTasks: 15, completedTasks: 7, daysRemaining: 0 },

  // P005
  { id: 'SP005-1', name: 'Sprint 1', goal: 'Project foundation, core UI pages, backend structure, authentication',
    projectId: 'P005', projectName: 'Quiz Website',
    status: 'completed', startDate: '2026-08-10', endDate: '2026-08-14',
    progress: 100, totalTasks: 5, completedTasks: 5, daysRemaining: 0 },
  { id: 'SP005-2', name: 'Sprint 2', goal: 'Admin dashboard, results management, test & question management',
    projectId: 'P005', projectName: 'Quiz Website',
    status: 'completed', startDate: '2026-08-22', endDate: '2026-08-28',
    progress: 100, totalTasks: 5, completedTasks: 5, daysRemaining: 0 },

  // P006
  { id: 'SP006-1', name: 'Sprint 1', goal: 'Production deployment and budget planning',
    projectId: 'P006', projectName: 'Portfolio Art & Design',
    status: 'active', startDate: '2026-08-17', endDate: '2026-08-22',
    progress: 50, totalTasks: 2, completedTasks: 1, daysRemaining: 0 },

  // P008
  { id: 'SP008-1', name: 'Sprint 1', goal: 'Initial development phase',
    projectId: 'P008', projectName: 'AI Counsellor',
    status: 'active', startDate: '2026-08-07', endDate: '2026-08-21',
    progress: 30, totalTasks: 5, completedTasks: 1, daysRemaining: 0 },

  // P009
  { id: 'SP009-1', name: 'Sprint 1', goal: 'Core foundation and initial development',
    projectId: 'P009', projectName: 'Appse AI',
    status: 'completed', startDate: '2026-08-10', endDate: '2026-08-24',
    progress: 100, totalTasks: 4, completedTasks: 4, daysRemaining: 0 },
  { id: 'SP009-2', name: 'Sprint 2', goal: 'Extended features and integration',
    projectId: 'P009', projectName: 'Appse AI',
    status: 'active', startDate: '2026-08-25', endDate: '2026-09-08',
    progress: 40, totalTasks: 4, completedTasks: 0, daysRemaining: 0 },
]

// ─── REAL PROJECTS ────────────────────────────────────────────────────────────
export const mockProjects: Project[] = [
  {
    id: 'P001', name: 'Wellness Web/App',
    description: 'A wellness platform combining web and mobile app for health and lifestyle management.',
    status: 'active', progress: 40,
    teamLead: u('M0036'), memberCount: 5, taskCount: 6,
    completedTasks: 2, blockedTasks: 0,
    currentSprint: mockSprints.find(s => s.id === 'SP001-2')!,
    createdAt: '2026-08-20',
  },
  {
    id: 'P002', name: 'Hospital Management',
    description: 'Phase 2 of hospital management system with recommendation engine and Supabase auth.',
    status: 'active', progress: 55,
    teamLead: u('M0013'), memberCount: 7, taskCount: 12,
    completedTasks: 4, blockedTasks: 2,
    currentSprint: mockSprints.find(s => s.id === 'SP002-2')!,
    createdAt: '2026-08-18',
  },
  {
    id: 'P003', name: 'HR Phase 2',
    description: 'HR platform with AI job recommendation, recruiter dashboard, and social media integration.',
    status: 'active', progress: 50,
    teamLead: u('M0017'), memberCount: 5, taskCount: 4,
    completedTasks: 0, blockedTasks: 0,
    currentSprint: mockSprints.find(s => s.id === 'SP003-1')!,
    createdAt: '2026-08-17',
  },
  {
    id: 'P004', name: 'BBA-SM Fitness Tracker',
    description: 'Mobile fitness tracker app for BBA students with coach and admin portals.',
    status: 'active', progress: 46,
    teamLead: u('M0028'), memberCount: 6, taskCount: 15,
    completedTasks: 7, blockedTasks: 3,
    currentSprint: mockSprints.find(s => s.id === 'SP004-1')!,
    createdAt: '2026-08-31',
  },
  {
    id: 'P005', name: 'Quiz Website (Nepal)',
    description: 'Online quiz platform from Nepal with admin dashboard, test management, and results tracking.',
    status: 'active', progress: 80,
    teamLead: u('M0029'), memberCount: 5, taskCount: 11,
    completedTasks: 9, blockedTasks: 0,
    currentSprint: mockSprints.find(s => s.id === 'SP005-2')!,
    createdAt: '2026-08-10',
  },
  {
    id: 'P006', name: 'Portfolio Art & Design',
    description: 'Phase 2 of art and design portfolio website with deployment and budget planning.',
    status: 'active', progress: 50,
    teamLead: u('M0019'), memberCount: 2, taskCount: 6,
    completedTasks: 2, blockedTasks: 1,
    currentSprint: mockSprints.find(s => s.id === 'SP006-1')!,
    createdAt: '2026-08-17',
  },
  {
    id: 'P007', name: 'Chasma Store Website',
    description: 'Phase 2 of e-commerce website for optical store with full stack development.',
    status: 'active', progress: 30,
    teamLead: u('M0022'), memberCount: 2, taskCount: 6,
    completedTasks: 2, blockedTasks: 1,
    createdAt: '2026-08-17',
  },
  {
    id: 'P008', name: 'AI Counsellor',
    description: 'Phase 1 AI-powered counselling application with developer team.',
    status: 'active', progress: 30,
    teamLead: u('M009'), memberCount: 4, taskCount: 5,
    completedTasks: 1, blockedTasks: 1,
    currentSprint: mockSprints.find(s => s.id === 'SP008-1')!,
    createdAt: '2026-08-07',
  },
  {
    id: 'P009', name: 'Appse AI',
    description: 'Phase 1 AI application development with multi-sprint roadmap.',
    status: 'active', progress: 40,
    teamLead: u('M001'), memberCount: 8, taskCount: 8,
    completedTasks: 4, blockedTasks: 1,
    currentSprint: mockSprints.find(s => s.id === 'SP009-2')!,
    createdAt: '2026-08-10',
  },
]

// ─── REAL TASKS ───────────────────────────────────────────────────────────────
export const mockTasks: Task[] = [
  // P001 - Wellness
  { id: 'T001-P001', title: 'Home page Design and Approvation', status: 'IN_PROGRESS', priority: 'HIGH',   projectId: 'P001', projectName: 'Wellness Web/App',       assignee: u('M0036'), dueDate: '2026-08-26', blocked: false, createdAt: '2026-08-20' },
  { id: 'T002-P001', title: 'Analysis of data for Features',    status: 'DONE',        priority: 'HIGH',   projectId: 'P001', projectName: 'Wellness Web/App',       assignee: u('M0036'), dueDate: '2026-08-26', blocked: false, createdAt: '2026-08-20' },
  { id: 'T003-P001', title: 'Full Authentication UI Designing',  status: 'DONE',        priority: 'HIGH',   projectId: 'P001', projectName: 'Wellness Web/App',       assignee: u('M0037'), dueDate: '2026-08-26', blocked: false, createdAt: '2026-08-20' },
  { id: 'T004-P001', title: 'Working Authentication Backend',   status: 'DONE',        priority: 'HIGH',   projectId: 'P001', projectName: 'Wellness Web/App',       assignee: u('M0038'), dueDate: '2026-08-26', blocked: false, createdAt: '2026-08-20' },
  { id: 'T005-P001', title: 'Cloud DB Connection & Auth Storage',status: 'DONE',        priority: 'HIGH',   projectId: 'P001', projectName: 'Wellness Web/App',       assignee: u('M0039'), dueDate: '2026-08-26', blocked: false, createdAt: '2026-08-20' },
  { id: 'T006-P001', title: 'Approval of Features & Module Design', status: 'REVIEW', priority: 'HIGH', projectId: 'P001', projectName: 'Wellness Web/App',     assignee: u('M0037'), dueDate: '2026-09-03', blocked: false, createdAt: '2026-08-27' },

  // P002 - Hospital
  { id: 'T001-P002', title: 'Design UML Diagram',               status: 'IN_PROGRESS', priority: 'HIGH',   projectId: 'P002', projectName: 'Hospital Management',    assignee: u('M0012'), dueDate: '2026-09-10', blocked: false, createdAt: '2026-09-01' },
  { id: 'T002-P002', title: 'Frontend Screen Development',      status: 'DONE',        priority: 'HIGH',   projectId: 'P002', projectName: 'Hospital Management',    assignee: u('M0011'), dueDate: '2026-09-10', blocked: true,  createdAt: '2026-09-01' },
  { id: 'T003-P002', title: 'Frontend Structure Development',   status: 'REVIEW',      priority: 'HIGH',   projectId: 'P002', projectName: 'Hospital Management',    assignee: u('M0013'), dueDate: '2026-09-10', blocked: false, createdAt: '2026-09-01' },
  { id: 'T004-P002', title: 'Implement Recommendation Logic',   status: 'IN_PROGRESS', priority: 'HIGH',   projectId: 'P002', projectName: 'Hospital Management',    assignee: u('M0015'), dueDate: '2026-09-10', blocked: true,  createdAt: '2026-09-01' },

  // P003 - HR
  { id: 'T001-P003', title: 'Integration of Job Portal & Social Media', status: 'IN_PROGRESS', priority: 'HIGH',   projectId: 'P003', projectName: 'HR Phase 2', assignee: u('M0017'), dueDate: '2026-08-22', blocked: false, createdAt: '2026-08-17' },
  { id: 'T002-P003', title: 'AI Job Recommendation',            status: 'IN_PROGRESS', priority: 'MEDIUM', projectId: 'P003', projectName: 'HR Phase 2',             assignee: u('M0018'), dueDate: '2026-08-22', blocked: false, createdAt: '2026-08-17' },
  { id: 'T003-P003', title: 'UI & Functionality Enhancement',   status: 'IN_PROGRESS', priority: 'MEDIUM', projectId: 'P003', projectName: 'HR Phase 2',             assignee: u('M0020'), dueDate: '2026-08-22', blocked: false, createdAt: '2026-08-17' },
  { id: 'T004-P003', title: 'Recruiter Dashboard',              status: 'IN_PROGRESS', priority: 'MEDIUM', projectId: 'P003', projectName: 'HR Phase 2',             assignee: u('M0019'), dueDate: '2026-08-22', blocked: false, createdAt: '2026-08-17' },

  // P004 - Fitness Tracker
  { id: 'T001-P004', title: 'Development of Student Complete Login', status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0024'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T002-P004', title: 'Development of Admin Complete Login',  status: 'IN_PROGRESS', priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0023'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T003-P004', title: 'Development of Coach Complete Login',  status: 'IN_PROGRESS', priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0024'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T004-P004', title: 'Setup OTP Generation',              status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0027'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T005-P004', title: 'Setup Confirmation Mail',           status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0027'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T006-P004', title: 'Update the Database',               status: 'TODO',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0028'), dueDate: '2026-08-21', blocked: true,  createdAt: '2026-08-17' },
  { id: 'T007-P004', title: 'Password Encryption',               status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0028'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T008-P004', title: 'Creating API',                      status: 'TODO',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0027'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T009-P004', title: 'Storing Data into Database',        status: 'TODO',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0028'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T010-P004', title: 'Data Requirements Analysis',        status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0025'), dueDate: '2026-08-21', blocked: false, createdAt: '2026-08-17' },
  { id: 'T011-P004', title: 'Attribute Identification',          status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0026'), dueDate: '2026-09-04', blocked: false, createdAt: '2026-08-17' },
  { id: 'T012-P004', title: 'Sample Dataset Creation',           status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0026'), dueDate: '2026-08-07', blocked: false, createdAt: '2026-08-17' },
  { id: 'T013-P004', title: 'Role-Based Data Mapping',           status: 'DONE',        priority: 'HIGH',   projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0026'), dueDate: '2026-08-10', blocked: false, createdAt: '2026-08-17' },
  { id: 'T014-P004', title: 'Defining Plots & Characteristics',  status: 'IN_PROGRESS', priority: 'MEDIUM', projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0025'), dueDate: '2026-08-13', blocked: true,  createdAt: '2026-08-17' },
  { id: 'T015-P004', title: 'Data & Attribute Relationship Mapping', status: 'IN_PROGRESS', priority: 'HIGH', projectId: 'P004', projectName: 'BBA-SM Fitness Tracker', assignee: u('M0026'), dueDate: '2026-08-13', blocked: true, createdAt: '2026-08-17' },

  // P005 - Quiz
  { id: 'T007-P005', title: 'Admin Dashboard & Results UI',      status: 'DONE',        priority: 'HIGH',   projectId: 'P005', projectName: 'Quiz Website (Nepal)',   assignee: u('M0029'), dueDate: '2026-08-28', blocked: false, createdAt: '2026-08-22' },
  { id: 'T008-P005', title: 'Admin Dashboard & Results API',     status: 'DONE',        priority: 'HIGH',   projectId: 'P005', projectName: 'Quiz Website (Nepal)',   assignee: u('M0030'), dueDate: '2026-08-28', blocked: false, createdAt: '2026-08-22' },
  { id: 'T009-P005', title: 'Test & Question Management API',    status: 'REVIEW',      priority: 'HIGH',   projectId: 'P005', projectName: 'Quiz Website (Nepal)',   assignee: u('M0031'), dueDate: '2026-08-28', blocked: false, createdAt: '2026-08-22' },
  { id: 'T010-P005', title: 'Admin Login & Authorization Setup', status: 'DONE',        priority: 'HIGH',   projectId: 'P005', projectName: 'Quiz Website (Nepal)',   assignee: u('M0032'), dueDate: '2026-08-28', blocked: false, createdAt: '2026-08-22' },
  { id: 'T011-P005', title: 'Test & Question Management UI',     status: 'DONE',        priority: 'HIGH',   projectId: 'P005', projectName: 'Quiz Website (Nepal)',   assignee: u('M0033'), dueDate: '2026-08-28', blocked: false, createdAt: '2026-08-22' },

  // P006 - Portfolio
  { id: 'T001-P006', title: 'Deployment',                        status: 'IN_PROGRESS', priority: 'HIGH',   projectId: 'P006', projectName: 'Portfolio Art & Design', assignee: u('M0019'), dueDate: '2026-08-22', blocked: false, createdAt: '2026-08-17' },
  { id: 'T002-P006', title: 'Budget Planning',                   status: 'DONE',        priority: 'MEDIUM', projectId: 'P006', projectName: 'Portfolio Art & Design', assignee: u('M0018'), dueDate: '2026-08-22', blocked: false, createdAt: '2026-08-17' },
]

// ─── PROJECT MEMBERS ──────────────────────────────────────────────────────────
export const mockProjectMembers: ProjectMember[] = [
  { userId: 'M0036', projectId: 'P001', role: 'TEAM_LEAD', user: u('M0036'), joinedAt: '2026-08-20' },
  { userId: 'M0037', projectId: 'P001', role: 'MEMBER',    user: u('M0037'), joinedAt: '2026-08-20' },
  { userId: 'M0038', projectId: 'P001', role: 'MEMBER',    user: u('M0038'), joinedAt: '2026-08-20' },
  { userId: 'M0039', projectId: 'P001', role: 'MEMBER',    user: u('M0039'), joinedAt: '2026-08-20' },
  { userId: 'M0040', projectId: 'P001', role: 'MEMBER',    user: u('M0040'), joinedAt: '2026-08-20' },

  { userId: 'M0010', projectId: 'P002', role: 'MEMBER',    user: u('M0010'), joinedAt: '2026-09-01' },
  { userId: 'M0011', projectId: 'P002', role: 'TEAM_LEAD', user: u('M0011'), joinedAt: '2026-09-01' },
  { userId: 'M0012', projectId: 'P002', role: 'MEMBER',    user: u('M0012'), joinedAt: '2026-09-01' },
  { userId: 'M0013', projectId: 'P002', role: 'TEAM_LEAD', user: u('M0013'), joinedAt: '2026-09-01' },
  { userId: 'M0014', projectId: 'P002', role: 'MEMBER',    user: u('M0014'), joinedAt: '2026-09-01' },
  { userId: 'M0015', projectId: 'P002', role: 'MEMBER',    user: u('M0015'), joinedAt: '2026-09-01' },
  { userId: 'M0016', projectId: 'P002', role: 'MEMBER',    user: u('M0016'), joinedAt: '2026-09-01' },

  { userId: 'M0017', projectId: 'P003', role: 'TEAM_LEAD', user: u('M0017'), joinedAt: '2026-08-17' },
  { userId: 'M0018', projectId: 'P003', role: 'MEMBER',    user: u('M0018'), joinedAt: '2026-08-17' },
  { userId: 'M0019', projectId: 'P003', role: 'MEMBER',    user: u('M0019'), joinedAt: '2026-08-17' },
  { userId: 'M0020', projectId: 'P003', role: 'MEMBER',    user: u('M0020'), joinedAt: '2026-08-17' },
  { userId: 'M004',  projectId: 'P003', role: 'MEMBER',    user: u('M004'),  joinedAt: '2026-08-17' },

  { userId: 'M0023', projectId: 'P004', role: 'TEAM_LEAD', user: u('M0023'), joinedAt: '2026-08-31' },
  { userId: 'M0024', projectId: 'P004', role: 'MEMBER',    user: u('M0024'), joinedAt: '2026-08-31' },
  { userId: 'M0025', projectId: 'P004', role: 'MEMBER',    user: u('M0025'), joinedAt: '2026-08-31' },
  { userId: 'M0026', projectId: 'P004', role: 'TEAM_LEAD', user: u('M0026'), joinedAt: '2026-08-31' },
  { userId: 'M0027', projectId: 'P004', role: 'MEMBER',    user: u('M0027'), joinedAt: '2026-08-31' },
  { userId: 'M0028', projectId: 'P004', role: 'TEAM_LEAD', user: u('M0028'), joinedAt: '2026-08-31' },

  { userId: 'M0029', projectId: 'P005', role: 'TEAM_LEAD', user: u('M0029'), joinedAt: '2026-08-10' },
  { userId: 'M0030', projectId: 'P005', role: 'MEMBER',    user: u('M0030'), joinedAt: '2026-08-10' },
  { userId: 'M0031', projectId: 'P005', role: 'MEMBER',    user: u('M0031'), joinedAt: '2026-08-10' },
  { userId: 'M0032', projectId: 'P005', role: 'MEMBER',    user: u('M0032'), joinedAt: '2026-08-10' },
  { userId: 'M0033', projectId: 'P005', role: 'MEMBER',    user: u('M0033'), joinedAt: '2026-08-10' },

  { userId: 'M0018', projectId: 'P006', role: 'TEAM_LEAD', user: u('M0018'), joinedAt: '2026-08-17' },
  { userId: 'M0019', projectId: 'P006', role: 'MEMBER',    user: u('M0019'), joinedAt: '2026-08-17' },

  { userId: 'M0021', projectId: 'P007', role: 'MEMBER',    user: u('M0021'), joinedAt: '2026-08-17' },
  { userId: 'M0022', projectId: 'P007', role: 'TEAM_LEAD', user: u('M0022'), joinedAt: '2026-08-17' },

  { userId: 'M006',  projectId: 'P008', role: 'MEMBER',    user: u('M006'),  joinedAt: '2026-08-07' },
  { userId: 'M007',  projectId: 'P008', role: 'MEMBER',    user: u('M007'),  joinedAt: '2026-08-07' },
  { userId: 'M008',  projectId: 'P008', role: 'MEMBER',    user: u('M008'),  joinedAt: '2026-08-07' },
  { userId: 'M009',  projectId: 'P008', role: 'TEAM_LEAD', user: u('M009'),  joinedAt: '2026-08-07' },

  { userId: 'M001',  projectId: 'P009', role: 'TEAM_LEAD', user: u('M001'),  joinedAt: '2026-08-10' },
  { userId: 'M002',  projectId: 'P009', role: 'MEMBER',    user: u('M002'),  joinedAt: '2026-08-10' },
  { userId: 'M005',  projectId: 'P009', role: 'MEMBER',    user: u('M005'),  joinedAt: '2026-08-10' },
  { userId: 'M008',  projectId: 'P009', role: 'MEMBER',    user: u('M008'),  joinedAt: '2026-08-10' },
  { userId: 'M009',  projectId: 'P009', role: 'MEMBER',    user: u('M009'),  joinedAt: '2026-08-10' },
  { userId: 'M0016', projectId: 'P009', role: 'MEMBER',    user: u('M0016'), joinedAt: '2026-08-25' },
  { userId: 'M0034', projectId: 'P009', role: 'MEMBER',    user: u('M0034'), joinedAt: '2026-08-25' },
  { userId: 'M0035', projectId: 'P009', role: 'MEMBER',    user: u('M0035'), joinedAt: '2026-08-10' },
]

// ─── ACTIVITY FEED ────────────────────────────────────────────────────────────
export const mockActivities: Activity[] = [
  { id: 'a1', type: 'task_completed',  description: 'Completed "Full Authentication UI Designing"',     user: u('M0037'), projectId: 'P001', timestamp: '2026-08-26T09:00:00Z' },
  { id: 'a2', type: 'sprint_started',  description: 'Sprint 2 started in Wellness Web/App',             user: u('M0036'), projectId: 'P001', timestamp: '2026-08-27T08:00:00Z' },
  { id: 'a3', type: 'task_completed',  description: 'Completed "Admin Dashboard & Results UI"',         user: u('M0029'), projectId: 'P005', timestamp: '2026-08-28T10:00:00Z' },
  { id: 'a4', type: 'sprint_started',  description: 'Sprint 2 started in Hospital Management',          user: u('M0013'), projectId: 'P002', timestamp: '2026-09-01T08:00:00Z' },
  { id: 'a5', type: 'task_completed',  description: 'Completed "Development of Student Complete Login"',user: u('M0024'), projectId: 'P004', timestamp: '2026-08-21T14:00:00Z' },
  { id: 'a6', type: 'task_created',    description: 'Created "Implement Recommendation Logic"',         user: u('M0013'), projectId: 'P002', timestamp: '2026-09-01T09:30:00Z' },
  { id: 'a7', type: 'member_added',    description: 'Rahul Chettri joined Hospital Management',         user: u('admin1'), projectId: 'P002', timestamp: '2026-08-18T10:00:00Z' },
  { id: 'a8', type: 'project_created', description: 'Project "Appse AI" created',                       user: u('admin1'), timestamp: '2026-08-10T09:00:00Z' },
  { id: 'a9', type: 'task_completed',  description: 'Completed "Budget Planning"',                      user: u('M0018'), projectId: 'P006', timestamp: '2026-08-22T11:00:00Z' },
]

// ─── CURRENT USER (simulated login - Pritham as Admin) ────────────────────────
export const currentUser = mockUsers[0] // Admin: Pritham Kalhi

// ─── COMPUTED STATS ───────────────────────────────────────────────────────────
export const orgStats = {
  totalProjects:     mockProjects.length,
  activeProjects:    mockProjects.filter(p => p.status === 'active').length,
  completedProjects: mockProjects.filter(p => p.status === 'completed').length,
  totalMembers:      mockUsers.filter(u => u.role !== 'ADMIN').length,
  openTasks:         mockTasks.filter(t => t.status !== 'DONE').length,
  completedTasks:    mockTasks.filter(t => t.status === 'DONE').length,
  blockedTasks:      mockTasks.filter(t => t.blocked).length,
  activeSprints:     mockSprints.filter(s => s.status === 'active').length,
}

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
export const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'URGENT': return 'bg-red-500 text-white'
    case 'HIGH':   return 'bg-orange-500 text-white'
    case 'MEDIUM': return 'bg-yellow-500 text-white'
    case 'LOW':    return 'bg-green-500 text-white'
    default:       return 'bg-gray-500 text-white'
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'TODO':        return 'bg-slate-100 text-slate-700 border-slate-200'
    case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'REVIEW':      return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'DONE':        return 'bg-green-100 text-green-700 border-green-200'
    case 'active':      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'completed':   return 'bg-green-100 text-green-700 border-green-200'
    case 'on_hold':     return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'planning':    return 'bg-purple-100 text-purple-700 border-purple-200'
    default:            return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export const getProjectHealth = (project: Project) => {
  if (project.blockedTasks > 3 || project.progress < 25)
    return { label: 'Critical', color: 'text-red-600',    bg: 'bg-red-100',    dot: 'bg-red-500'    }
  if (project.blockedTasks > 1 || project.progress < 55)
    return { label: 'At Risk',  color: 'text-yellow-600', bg: 'bg-yellow-100', dot: 'bg-yellow-500' }
  return   { label: 'Healthy',  color: 'text-green-600',  bg: 'bg-green-100',  dot: 'bg-green-500'  }
}

export const getRelativeTime = (timestamp: string) => {
  const diff = Date.now() - new Date(timestamp).getTime()
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(hours / 24)
  if (hours < 1)  return 'Just now'
  if (hours < 24) return `${hours}h ago`
  if (days  < 7)  return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}

export const getTasksForProject = (projectId: string) =>
  mockTasks.filter(t => t.projectId === projectId)

export const getMembersForProject = (projectId: string) =>
  mockProjectMembers.filter(m => m.projectId === projectId)

export const getSprintsForProject = (projectId: string) =>
  mockSprints.filter(s => s.projectId === projectId)

export const getProjectById = (id: string) =>
  mockProjects.find(p => p.id === id)
