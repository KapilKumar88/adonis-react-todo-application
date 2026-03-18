export const PERMISSIONS = Object.freeze({
  USER_MANAGEMENT: {
    VIEW: 'user_management.view',
    CREATE: 'user_management.create',
    UPDATE: 'user_management.update',
    DELETE: 'user_management.delete',
  },
  ROLES_MANAGEMENT: {
    VIEW: 'roles_management.view',
    CREATE: 'roles_management.create',
    UPDATE: 'roles_management.update',
    DELETE: 'roles_management.delete',
  },
  PERMISSION_MANAGEMENT: {
    VIEW: 'permission_management.view',
    CREATE: 'permission_management.create',
    UPDATE: 'permission_management.update',
    DELETE: 'permission_management.delete',
  },
  ACTIVITY_LOGS: {
    VIEW: 'activity_logs.view',
    EXPORT: 'activity_logs.export',
  },
  ADMIN_DASHBOARD: {
    VIEW: 'dashboard.super_admin.view',
  },
  USER_DASHBOARD: {
    VIEW: 'dashboard.user.view',
  },
  TODO_MANAGEMENT: {
    VIEW: 'todo_management.view',
    CREATE: 'todo_management.create',
    UPDATE: 'todo_management.update',
    DELETE: 'todo_management.delete',
  },
});