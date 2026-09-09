// User and Authentication Types
export type UserRole = 'ADMIN' | 'AGILE_COORDINATOR' | 'TEAM_LEAD' | 'MEMBER'
export type AccountStatus = 'pending' | 'active' | 'suspended'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  accountStatus: AccountStatus
  avatar?: string
  createdAt?: string
}

// Project Types
export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'archived'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number
  teamLead: User
  memberCount: number
  taskCount: number
  completedTasks: number
  blockedTasks: number
  currentSprint?: Sprint
  createdAt: string
}

// Task Types
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  projectId: string
  projectName: string
  assignee?: User
  dueDate?: string
  blocked: boolean
  storyId?: string
  tags?: string[]
  createdAt: string
}

// Sprint Types
export type SprintStatus = 'planning' | 'active' | 'completed'

export interface Sprint {
  id: string
  name: string
  goal: string
  projectId: string
  projectName: string
  status: SprintStatus
  startDate: string
  endDate: string
  progress: number
  totalTasks: number
  completedTasks: number
  daysRemaining: number
}

// Backlog Types
export interface Epic {
  id: string
  name: string
  description?: string
  priority: TaskPriority
  status: string
  storyCount: number
  backlogId: string
}

export interface UserStory {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: string
  epicId: string
  taskCount: number
  acceptanceCriteria?: string[]
}

// Team Member Types
export interface ProjectMember {
  userId: string
  projectId: string
  role: 'TEAM_LEAD' | 'MEMBER'
  user: User
  joinedAt: string
}

// Dashboard Stats
export interface DashboardStats {
  totalProjects?: number
  activeProjects?: number
  completedProjects?: number
  totalMembers?: number
  openTasks?: number
  completedTasks?: number
  blockedTasks?: number
  projectHealth?: 'good' | 'at_risk' | 'critical'
}

// Activity Types
export interface Activity {
  id: string
  type: 'task_created' | 'task_completed' | 'sprint_started' | 'member_added' | 'project_created'
  description: string
  user: User
  projectId?: string
  timestamp: string
}
