export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'moderator';
  permissions: Permission[];
  status: 'active' | 'inactive' | 'banned';
  avatar?: string;
  bio?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface TodoTag {
  id: string;
  name: string;
  color: string | null;
  type: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'backlog' | 'icebox';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  tags: TodoTag[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

export type TodoStatus = Todo['status'];
export type TodoPriority = Todo['priority'];
export type UserRole = User['role'];
export type UserStatus = User['status'];
export type LogStatus = ActivityLog['status'];

// ---------------------------------------- Pagination ----------------------------------------

export type PAGINATION_META_DATA = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}