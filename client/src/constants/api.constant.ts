export default Object.freeze({
  ADMIN: {
    AUTH: {
      LOGIN: '/api/v1/admin/login',
    },
    DASHBOARD: '/api/v1/admin/dashboard',
    ACTIVITY_LOGS: {
      GET_LIST: '/api/v1/admin/activity-logs',
      EXPORT: '/api/v1/admin/activity-logs/export',
    },
    USERS: {
      GET_USERS_LIST: '/api/v1/admin/users',
      CREATE_USER: '/api/v1/admin/users',
      UPDATE_USER: '/api/v1/admin/users/{id}',
      DELETE_USER: '/api/v1/admin/users/{id}',
      GET_USER_BY_ID: '/api/v1/admin/users/{id}',
    },
    ROLE: {
      GET_LIST: '/api/v1/admin/roles',
      CREATE_ROLE: '/api/v1/admin/roles',
      UPDATE_ROLE: '/api/v1/admin/roles/{id}',
      DELETE_ROLE: '/api/v1/admin/roles/{id}',
      GET_ROLE_BY_ID: '/api/v1/admin/roles/{id}',
    },
    PERMISSION: {
      GET_LIST: '/api/v1/admin/permissions',
      CREATE_PERMISSION: '/api/v1/admin/permissions',
      UPDATE_PERMISSION: '/api/v1/admin/permissions/{id}',
      DELETE_PERMISSION: '/api/v1/admin/permissions/{id}',
      GET_PERMISSION_BY_ID: '/api/v1/admin/permissions/{id}',
    },
  },
  USER: {
    DASHBOARD: '/api/v1/dashboard',
    PROFILE: '/api/v1/profile',
    UPDATE_PROFILE: '/api/v1/profile',

    AUTH: {
      LOGIN: '/api/v1/auth/login',
      SIGNUP: '/api/v1/auth/signup',
      LOGOUT: '/api/v1/auth/logout',
      FORGOT_CREDS: '/api/v1/auth/forgot-creds',
      RESET_CREDS: '/api/v1/auth/reset-creds',
      CHANGE_CREDS: '/api/v1/auth/change-creds',
    },
    TAGS: {
      LIST: '/api/v1/tags',
      CREATE: '/api/v1/tags/create',
      UPDATE: '/api/v1/tags/update',
      DELETE: '/api/v1/tags/{id}',
    },
    TODOS: {
      BASE: '/api/v1/todos',
      DELETE: '/api/v1/todos',
    },
  }
});