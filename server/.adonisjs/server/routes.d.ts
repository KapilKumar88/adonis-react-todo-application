import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
    'admin.login.login': { paramsTuple?: []; params?: {} }
    'admin.roles.index': { paramsTuple?: []; params?: {} }
    'admin.roles.store': { paramsTuple?: []; params?: {} }
    'admin.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
    'admin.roles.index': { paramsTuple?: []; params?: {} }
    'admin.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
    'admin.roles.index': { paramsTuple?: []; params?: {} }
    'admin.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'admin.login.login': { paramsTuple?: []; params?: {} }
    'admin.roles.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'admin.roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}