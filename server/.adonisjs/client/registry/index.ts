/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'docs.ui': {
    methods: ["GET","HEAD"],
    pattern: '/docs',
    tokens: [{"old":"/docs","type":0,"val":"docs","end":""}],
    types: placeholder as Registry['docs.ui']['types'],
  },
  'docs.spec': {
    methods: ["GET","HEAD"],
    pattern: '/docs/openapi.yaml',
    tokens: [{"old":"/docs/openapi.yaml","type":0,"val":"docs","end":""},{"old":"/docs/openapi.yaml","type":0,"val":"openapi.yaml","end":""}],
    types: placeholder as Registry['docs.spec']['types'],
  },
  'admin.login.login': {
    methods: ["POST"],
    pattern: '/api/v1/admin/login',
    tokens: [{"old":"/api/v1/admin/login","type":0,"val":"api","end":""},{"old":"/api/v1/admin/login","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/login","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['admin.login.login']['types'],
  },
  'admin.login.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/admin/logout',
    tokens: [{"old":"/api/v1/admin/logout","type":0,"val":"api","end":""},{"old":"/api/v1/admin/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/logout","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['admin.login.destroy']['types'],
  },
  'admin.admin_dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/dashboard',
    tokens: [{"old":"/api/v1/admin/dashboard","type":0,"val":"api","end":""},{"old":"/api/v1/admin/dashboard","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/dashboard","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['admin.admin_dashboard.index']['types'],
  },
  'admin.roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/roles',
    tokens: [{"old":"/api/v1/admin/roles","type":0,"val":"api","end":""},{"old":"/api/v1/admin/roles","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/roles","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['admin.roles.index']['types'],
  },
  'admin.roles.store': {
    methods: ["POST"],
    pattern: '/api/v1/admin/roles',
    tokens: [{"old":"/api/v1/admin/roles","type":0,"val":"api","end":""},{"old":"/api/v1/admin/roles","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/roles","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['admin.roles.store']['types'],
  },
  'admin.roles.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/roles/:id',
    tokens: [{"old":"/api/v1/admin/roles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/v1/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.roles.show']['types'],
  },
  'admin.roles.update': {
    methods: ["PUT"],
    pattern: '/api/v1/admin/roles/:id',
    tokens: [{"old":"/api/v1/admin/roles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/v1/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.roles.update']['types'],
  },
  'admin.roles.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/admin/roles/:id',
    tokens: [{"old":"/api/v1/admin/roles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/v1/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.roles.destroy']['types'],
  },
  'admin.permission.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/permissions',
    tokens: [{"old":"/api/v1/admin/permissions","type":0,"val":"api","end":""},{"old":"/api/v1/admin/permissions","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/permissions","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/permissions","type":0,"val":"permissions","end":""}],
    types: placeholder as Registry['admin.permission.index']['types'],
  },
  'admin.permission.store': {
    methods: ["POST"],
    pattern: '/api/v1/admin/permissions',
    tokens: [{"old":"/api/v1/admin/permissions","type":0,"val":"api","end":""},{"old":"/api/v1/admin/permissions","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/permissions","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/permissions","type":0,"val":"permissions","end":""}],
    types: placeholder as Registry['admin.permission.store']['types'],
  },
  'admin.permission.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/permissions/:id',
    tokens: [{"old":"/api/v1/admin/permissions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"permissions","end":""},{"old":"/api/v1/admin/permissions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.permission.show']['types'],
  },
  'admin.permission.update': {
    methods: ["PUT"],
    pattern: '/api/v1/admin/permissions/:id',
    tokens: [{"old":"/api/v1/admin/permissions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"permissions","end":""},{"old":"/api/v1/admin/permissions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.permission.update']['types'],
  },
  'admin.permission.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/admin/permissions/:id',
    tokens: [{"old":"/api/v1/admin/permissions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/permissions/:id","type":0,"val":"permissions","end":""},{"old":"/api/v1/admin/permissions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.permission.destroy']['types'],
  },
  'admin.user.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/users',
    tokens: [{"old":"/api/v1/admin/users","type":0,"val":"api","end":""},{"old":"/api/v1/admin/users","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/users","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.user.index']['types'],
  },
  'admin.user.store': {
    methods: ["POST"],
    pattern: '/api/v1/admin/users',
    tokens: [{"old":"/api/v1/admin/users","type":0,"val":"api","end":""},{"old":"/api/v1/admin/users","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/users","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.user.store']['types'],
  },
  'admin.user.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/users/:id',
    tokens: [{"old":"/api/v1/admin/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/admin/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.user.show']['types'],
  },
  'admin.user.update': {
    methods: ["PUT"],
    pattern: '/api/v1/admin/users/:id',
    tokens: [{"old":"/api/v1/admin/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/admin/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.user.update']['types'],
  },
  'admin.user.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/admin/users/:id',
    tokens: [{"old":"/api/v1/admin/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/admin/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.user.destroy']['types'],
  },
  'admin.activity_logs.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/activity-logs',
    tokens: [{"old":"/api/v1/admin/activity-logs","type":0,"val":"api","end":""},{"old":"/api/v1/admin/activity-logs","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/activity-logs","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/activity-logs","type":0,"val":"activity-logs","end":""}],
    types: placeholder as Registry['admin.activity_logs.index']['types'],
  },
  'admin.activity_logs.export': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/activity-logs/export',
    tokens: [{"old":"/api/v1/admin/activity-logs/export","type":0,"val":"api","end":""},{"old":"/api/v1/admin/activity-logs/export","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/activity-logs/export","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/activity-logs/export","type":0,"val":"activity-logs","end":""},{"old":"/api/v1/admin/activity-logs/export","type":0,"val":"export","end":""}],
    types: placeholder as Registry['admin.activity_logs.export']['types'],
  },
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'auth.forgot_passwords.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/forgot-creds',
    tokens: [{"old":"/api/v1/auth/forgot-creds","type":0,"val":"api","end":""},{"old":"/api/v1/auth/forgot-creds","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/forgot-creds","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/forgot-creds","type":0,"val":"forgot-creds","end":""}],
    types: placeholder as Registry['auth.forgot_passwords.store']['types'],
  },
  'auth.forgot_passwords.update': {
    methods: ["POST"],
    pattern: '/api/v1/auth/reset-creds',
    tokens: [{"old":"/api/v1/auth/reset-creds","type":0,"val":"api","end":""},{"old":"/api/v1/auth/reset-creds","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/reset-creds","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/reset-creds","type":0,"val":"reset-creds","end":""}],
    types: placeholder as Registry['auth.forgot_passwords.update']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile',
    tokens: [{"old":"/api/v1/profile","type":0,"val":"api","end":""},{"old":"/api/v1/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.profile.update': {
    methods: ["PUT"],
    pattern: '/api/v1/profile',
    tokens: [{"old":"/api/v1/profile","type":0,"val":"api","end":""},{"old":"/api/v1/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.update']['types'],
  },
  'profile.change_passwords.update': {
    methods: ["PUT"],
    pattern: '/api/v1/profile/change-creds',
    tokens: [{"old":"/api/v1/profile/change-creds","type":0,"val":"api","end":""},{"old":"/api/v1/profile/change-creds","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/change-creds","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/change-creds","type":0,"val":"change-creds","end":""}],
    types: placeholder as Registry['profile.change_passwords.update']['types'],
  },
  'dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard',
    tokens: [{"old":"/api/v1/dashboard","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.index']['types'],
  },
  'tags.tags.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tags',
    tokens: [{"old":"/api/v1/tags","type":0,"val":"api","end":""},{"old":"/api/v1/tags","type":0,"val":"v1","end":""},{"old":"/api/v1/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.tags.index']['types'],
  },
  'tags.tags.store': {
    methods: ["POST"],
    pattern: '/api/v1/tags/create',
    tokens: [{"old":"/api/v1/tags/create","type":0,"val":"api","end":""},{"old":"/api/v1/tags/create","type":0,"val":"v1","end":""},{"old":"/api/v1/tags/create","type":0,"val":"tags","end":""},{"old":"/api/v1/tags/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['tags.tags.store']['types'],
  },
  'tags.tags.update': {
    methods: ["PUT"],
    pattern: '/api/v1/tags/update',
    tokens: [{"old":"/api/v1/tags/update","type":0,"val":"api","end":""},{"old":"/api/v1/tags/update","type":0,"val":"v1","end":""},{"old":"/api/v1/tags/update","type":0,"val":"tags","end":""},{"old":"/api/v1/tags/update","type":0,"val":"update","end":""}],
    types: placeholder as Registry['tags.tags.update']['types'],
  },
  'tags.tags.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/tags/:id',
    tokens: [{"old":"/api/v1/tags/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tags/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tags/:id","type":0,"val":"tags","end":""},{"old":"/api/v1/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.tags.destroy']['types'],
  },
  'todos.todos.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/todos',
    tokens: [{"old":"/api/v1/todos","type":0,"val":"api","end":""},{"old":"/api/v1/todos","type":0,"val":"v1","end":""},{"old":"/api/v1/todos","type":0,"val":"todos","end":""}],
    types: placeholder as Registry['todos.todos.index']['types'],
  },
  'todos.todos.store': {
    methods: ["POST"],
    pattern: '/api/v1/todos',
    tokens: [{"old":"/api/v1/todos","type":0,"val":"api","end":""},{"old":"/api/v1/todos","type":0,"val":"v1","end":""},{"old":"/api/v1/todos","type":0,"val":"todos","end":""}],
    types: placeholder as Registry['todos.todos.store']['types'],
  },
  'todos.todos.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/todos/:id',
    tokens: [{"old":"/api/v1/todos/:id","type":0,"val":"api","end":""},{"old":"/api/v1/todos/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/todos/:id","type":0,"val":"todos","end":""},{"old":"/api/v1/todos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['todos.todos.show']['types'],
  },
  'todos.todos.update': {
    methods: ["PUT"],
    pattern: '/api/v1/todos/:id',
    tokens: [{"old":"/api/v1/todos/:id","type":0,"val":"api","end":""},{"old":"/api/v1/todos/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/todos/:id","type":0,"val":"todos","end":""},{"old":"/api/v1/todos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['todos.todos.update']['types'],
  },
  'todos.todos.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/todos/delete',
    tokens: [{"old":"/api/v1/todos/delete","type":0,"val":"api","end":""},{"old":"/api/v1/todos/delete","type":0,"val":"v1","end":""},{"old":"/api/v1/todos/delete","type":0,"val":"todos","end":""},{"old":"/api/v1/todos/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['todos.todos.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
