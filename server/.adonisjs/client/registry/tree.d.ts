/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  docs: {
    ui: typeof routes['docs.ui']
    spec: typeof routes['docs.spec']
  }
  admin: {
    login: {
      login: typeof routes['admin.login.login']
    }
    roles: {
      index: typeof routes['admin.roles.index']
      store: typeof routes['admin.roles.store']
      show: typeof routes['admin.roles.show']
      update: typeof routes['admin.roles.update']
      destroy: typeof routes['admin.roles.destroy']
    }
  }
}
