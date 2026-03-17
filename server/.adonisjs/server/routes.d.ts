import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
    'admin.login.login': { paramsTuple?: []; params?: {} }
    'admin.admin_dashboard.index': { paramsTuple?: []; params?: {} }
    'admin.roles.index': { paramsTuple?: []; params?: {} }
    'admin.roles.store': { paramsTuple?: []; params?: {} }
    'admin.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.permission.index': { paramsTuple?: []; params?: {} }
    'admin.permission.store': { paramsTuple?: []; params?: {} }
    'admin.permission.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.permission.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.permission.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user.index': { paramsTuple?: []; params?: {} }
    'admin.user.store': { paramsTuple?: []; params?: {} }
    'admin.user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.activity_logs.index': { paramsTuple?: []; params?: {} }
    'admin.activity_logs.export': { paramsTuple?: []; params?: {} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'auth.forgot_passwords.store': { paramsTuple?: []; params?: {} }
    'auth.forgot_passwords.update': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.update': { paramsTuple?: []; params?: {} }
    'profile.change_passwords.update': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'tags.tags.index': { paramsTuple?: []; params?: {} }
    'tags.tags.store': { paramsTuple?: []; params?: {} }
    'tags.tags.update': { paramsTuple?: []; params?: {} }
    'tags.tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'todos.todos.index': { paramsTuple?: []; params?: {} }
    'todos.todos.store': { paramsTuple?: []; params?: {} }
    'todos.todos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'todos.todos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'todos.todos.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
    'admin.admin_dashboard.index': { paramsTuple?: []; params?: {} }
    'admin.roles.index': { paramsTuple?: []; params?: {} }
    'admin.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.permission.index': { paramsTuple?: []; params?: {} }
    'admin.permission.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user.index': { paramsTuple?: []; params?: {} }
    'admin.user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.activity_logs.index': { paramsTuple?: []; params?: {} }
    'admin.activity_logs.export': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'tags.tags.index': { paramsTuple?: []; params?: {} }
    'todos.todos.index': { paramsTuple?: []; params?: {} }
    'todos.todos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
    'admin.admin_dashboard.index': { paramsTuple?: []; params?: {} }
    'admin.roles.index': { paramsTuple?: []; params?: {} }
    'admin.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.permission.index': { paramsTuple?: []; params?: {} }
    'admin.permission.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user.index': { paramsTuple?: []; params?: {} }
    'admin.user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.activity_logs.index': { paramsTuple?: []; params?: {} }
    'admin.activity_logs.export': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'tags.tags.index': { paramsTuple?: []; params?: {} }
    'todos.todos.index': { paramsTuple?: []; params?: {} }
    'todos.todos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'admin.login.login': { paramsTuple?: []; params?: {} }
    'admin.roles.store': { paramsTuple?: []; params?: {} }
    'admin.permission.store': { paramsTuple?: []; params?: {} }
    'admin.user.store': { paramsTuple?: []; params?: {} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'auth.forgot_passwords.store': { paramsTuple?: []; params?: {} }
    'auth.forgot_passwords.update': { paramsTuple?: []; params?: {} }
    'tags.tags.store': { paramsTuple?: []; params?: {} }
    'todos.todos.store': { paramsTuple?: []; params?: {} }
    'todos.todos.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'admin.roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.permission.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.profile.update': { paramsTuple?: []; params?: {} }
    'profile.change_passwords.update': { paramsTuple?: []; params?: {} }
    'tags.tags.update': { paramsTuple?: []; params?: {} }
    'todos.todos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.permission.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}