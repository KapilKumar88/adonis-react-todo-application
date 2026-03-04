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
  }
}
