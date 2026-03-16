export interface AdminDashboardUserStats {
  totalUsers: number;
  activeUsers: number;
}

export interface AdminDashboardTodoStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

export interface AdminDashboardPriorityBreakdown {
  high: number;
  medium: number;
  low: number;
}

export interface AdminDashboardActivityLog {
  id: string;
  action: string;
  description: string | null;
  status: string;
  resource: string;
  userName: string;
  createdAt: string;
}

export interface AdminDashboardTopUser {
  id: string;
  fullName: string;
  todoCount: number;
}

export interface AdminDashboardResponse {
  userStats: AdminDashboardUserStats;
  todoStats: AdminDashboardTodoStats;
  priorityBreakdown: AdminDashboardPriorityBreakdown;
  recentActivity: AdminDashboardActivityLog[];
  topActiveUsers: AdminDashboardTopUser[];
}



// ------------------------------------------ user dashboard ------------------------------------------

export interface DashboardStats {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
}