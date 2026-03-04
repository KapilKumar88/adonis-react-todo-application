import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
    'admin.login.login': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'docs.ui': { paramsTuple?: []; params?: {} }
    'docs.spec': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'admin.login.login': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}