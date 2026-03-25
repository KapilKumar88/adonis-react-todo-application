export const DefaultSystemPermissions = Object.freeze({
    USER_MANAGEMENT: {
        SOURCE: 'user_management',
        PERMISSIONS: {
            VIEW: 'user_management.view',
            CREATE: 'user_management.create',
            UPDATE: 'user_management.update',
            DELETE: 'user_management.delete',
        },
    },
    ROLES_MANAGEMENT: {
        SOURCE: 'roles_management',
        PERMISSIONS: {
            VIEW: 'roles_management.view',
            CREATE: 'roles_management.create',
            UPDATE: 'roles_management.update',
            DELETE: 'roles_management.delete',
        },
    },
    PERMISSION_MANAGEMENT: {
        SOURCE: 'permission_management',
        PERMISSIONS: {
            VIEW: 'permission_management.view',
            CREATE: 'permission_management.create',
            UPDATE: 'permission_management.update',
            DELETE: 'permission_management.delete',
        },
    },
    ACTIVITY_LOGS: {
        SOURCE: 'activity_logs',
        PERMISSIONS: {
            VIEW: 'activity_logs.view',
            EXPORT: 'activity_logs.export',
        },
    },
    ADMIN_DASHBOARD: {
        SOURCE: 'admin_dashboard',
        PERMISSIONS: {
            VIEW: 'dashboard.super_admin.view',
        },
    },
    USER_DASHBOARD: {
        SOURCE: 'user_dashboard',
        PERMISSIONS: {
            VIEW: 'dashboard.user.view',
        },
    },
    TODO_MANAGEMENT: {
        SOURCE: 'todo_management',
        PERMISSIONS: {
            VIEW: 'todo_management.view',
            CREATE: 'todo_management.create',
            UPDATE: 'todo_management.update',
            DELETE: 'todo_management.delete',
        },
    }
})