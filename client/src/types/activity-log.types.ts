import { PAGINATION_META_DATA } from '.';

export type ActivityLogStatus = 'success' | 'failure' | 'warning' | 'info';
export type ActivityLogResource = 'Auth' | 'Todos' | 'Users' | 'Roles' | 'Permissions' | 'Settings' | 'Logs' | 'Tags' | 'Profile';

export interface ActivityLogEntry {
  id: string;
  action: string;
  description: string | null;
  ip: string | null;
  userAgent: string | null;
  status: ActivityLogStatus;
  resource: ActivityLogResource;
  userName: string | null;
  userInitials: string | null;
  createdAt: string;
}

export interface ActivityLogListResponse {
  meta: PAGINATION_META_DATA;
  data: ActivityLogEntry[];
}

export interface ActivityLogExportResponse {
  data: ActivityLogEntry[];
}

export interface ActivityLogListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  resource?: string;
}
