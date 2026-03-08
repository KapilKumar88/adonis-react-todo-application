export default Object.freeze({
  ADMIN: {
    AUTH: {
      LOGIN: '/api/v1/admin/login',
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
    AUTH: {
      LOGIN: '/api/v1/auth/login',
      SIGNUP: '/api/v1/auth/signup',
      LOGOUT: '/api/v1/auth/logout',
      FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
      RESET_PASSWORD: '/api/v1/auth/reset-password',
    },
    TODOS: {
      BASE: '/todos',
    },
  }
});