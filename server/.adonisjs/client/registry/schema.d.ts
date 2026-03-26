/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'docs.ui': {
    methods: ["GET","HEAD"]
    pattern: '/docs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/docs_controller').default['ui']>>>
    }
  }
  'docs.spec': {
    methods: ["GET","HEAD"]
    pattern: '/docs/openapi.yaml'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/docs_controller').default['spec']>>>
    }
  }
  'admin.login.login': {
    methods: ["POST"]
    pattern: '/api/v1/admin/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/admin/login').loginAdminValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/admin/login').loginAdminValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/auth/login_controller').default['login']>>>
    }
  }
  'admin.login.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/admin/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/auth/login_controller').default['destroy']>>>
    }
  }
  'admin.admin_dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/dashboard/dashboard_controller').default['index']>>>
    }
  }
  'admin.roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/api/v1/admin/pagination').rolePaginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/role_management/roles_controller').default['index']>>>
    }
  }
  'admin.roles.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/roles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/admin/role').upsertRoleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/admin/role').upsertRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/role_management/roles_controller').default['store']>>>
    }
  }
  'admin.roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/role_management/roles_controller').default['show']>>>
    }
  }
  'admin.roles.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/admin/role').upsertRoleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/admin/role').upsertRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/role_management/roles_controller').default['update']>>>
    }
  }
  'admin.roles.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/role_management/roles_controller').default['destroy']>>>
    }
  }
  'admin.permission.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/permissions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/api/v1/admin/pagination').permissionPaginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/permission_management/permission_controller').default['index']>>>
    }
  }
  'admin.permission.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/permissions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/permission_management/permission_controller').default['store']>>>
    }
  }
  'admin.permission.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/permissions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/permission_management/permission_controller').default['show']>>>
    }
  }
  'admin.permission.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/permissions/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/admin/permission').updatePermissionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/admin/permission').updatePermissionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/permission_management/permission_controller').default['update']>>>
    }
  }
  'admin.permission.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/permissions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/permission_management/permission_controller').default['destroy']>>>
    }
  }
  'admin.user.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/api/v1/admin/pagination').userPaginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/user_management/user_controller').default['index']>>>
    }
  }
  'admin.user.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/admin/user').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/admin/user').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/user_management/user_controller').default['store']>>>
    }
  }
  'admin.user.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/user_management/user_controller').default['show']>>>
    }
  }
  'admin.user.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/admin/user').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/admin/user').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/user_management/user_controller').default['update']>>>
    }
  }
  'admin.user.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/user_management/user_controller').default['destroy']>>>
    }
  }
  'admin.activity_logs.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/activity-logs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/api/v1/admin/pagination').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/activity_logs/activity_logs_controller').default['index']>>>
    }
  }
  'admin.activity_logs.export': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/activity-logs/export'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/admin/activity_logs/activity_logs_controller').default['export']>>>
    }
  }
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/auth').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/auth').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/auth/new_account_controller').default['store']>>>
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/auth').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/auth').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/auth/login_controller').default['store']>>>
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/auth/login_controller').default['destroy']>>>
    }
  }
  'auth.forgot_passwords.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/forgot-creds'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/auth').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/auth').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/auth/forgot_passwords_controller').default['store']>>>
    }
  }
  'auth.forgot_passwords.update': {
    methods: ["POST"]
    pattern: '/api/v1/auth/reset-creds'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/auth').resetPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/auth').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/auth/forgot_passwords_controller').default['update']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/profile/profile_controller').default['show']>>>
    }
  }
  'profile.profile.update': {
    methods: ["PUT"]
    pattern: '/api/v1/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/profile').userProfileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/profile').userProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/profile/profile_controller').default['update']>>>
    }
  }
  'profile.change_passwords.update': {
    methods: ["PUT"]
    pattern: '/api/v1/profile/change-creds'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/change_password').changePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/change_password').changePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/profile/change_passwords_controller').default['update']>>>
    }
  }
  'dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/dashboard/dashboard_controller').default['index']>>>
    }
  }
  'tags.tags.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tags'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/tag_management/tags_controller').default['index']>>>
    }
  }
  'tags.tags.store': {
    methods: ["POST"]
    pattern: '/api/v1/tags/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/tag').createTagValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/tag').createTagValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/tag_management/tags_controller').default['store']>>>
    }
  }
  'tags.tags.update': {
    methods: ["PUT"]
    pattern: '/api/v1/tags/update'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/tag').updateTagValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/tag').updateTagValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/tag_management/tags_controller').default['update']>>>
    }
  }
  'tags.tags.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/tags/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/tag_management/tags_controller').default['destroy']>>>
    }
  }
  'todos.todos.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/todos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/api/v1/user/todo').getTodosValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/todo_management/todos_controller').default['index']>>>
    }
  }
  'todos.todos.store': {
    methods: ["POST"]
    pattern: '/api/v1/todos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/todo').createTodoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/todo').createTodoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/todo_management/todos_controller').default['store']>>>
    }
  }
  'todos.todos.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/todos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/todo_management/todos_controller').default['show']>>>
    }
  }
  'todos.todos.update': {
    methods: ["PUT"]
    pattern: '/api/v1/todos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/todo').updateTodoValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/todo').updateTodoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/todo_management/todos_controller').default['update']>>>
    }
  }
  'todos.todos.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/todos/delete'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/api/v1/user/todo').deleteTodoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/api/v1/user/todo').deleteTodoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/api/v1/user/todo_management/todos_controller').default['destroy']>>>
    }
  }
}
