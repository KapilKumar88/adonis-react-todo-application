/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
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
