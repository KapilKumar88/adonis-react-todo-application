/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  docs: {
    ui: typeof routes['docs.ui']
    spec: typeof routes['docs.spec']
  }
  admin: {
    login: {
      login: typeof routes['admin.login.login']
    }
    adminDashboard: {
      index: typeof routes['admin.admin_dashboard.index']
    }
    roles: {
      index: typeof routes['admin.roles.index']
      store: typeof routes['admin.roles.store']
      show: typeof routes['admin.roles.show']
      update: typeof routes['admin.roles.update']
      destroy: typeof routes['admin.roles.destroy']
    }
    permission: {
      index: typeof routes['admin.permission.index']
      store: typeof routes['admin.permission.store']
      show: typeof routes['admin.permission.show']
      update: typeof routes['admin.permission.update']
      destroy: typeof routes['admin.permission.destroy']
    }
    user: {
      index: typeof routes['admin.user.index']
      store: typeof routes['admin.user.store']
      show: typeof routes['admin.user.show']
      update: typeof routes['admin.user.update']
      destroy: typeof routes['admin.user.destroy']
    }
    activityLogs: {
      index: typeof routes['admin.activity_logs.index']
      export: typeof routes['admin.activity_logs.export']
    }
  }
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
    forgotPasswords: {
      store: typeof routes['auth.forgot_passwords.store']
      update: typeof routes['auth.forgot_passwords.update']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
      update: typeof routes['profile.profile.update']
    }
    changePasswords: {
      update: typeof routes['profile.change_passwords.update']
    }
  }
  dashboard: {
    index: typeof routes['dashboard.index']
  }
  tags: {
    tags: {
      index: typeof routes['tags.tags.index']
      store: typeof routes['tags.tags.store']
      update: typeof routes['tags.tags.update']
      destroy: typeof routes['tags.tags.destroy']
    }
  }
  todos: {
    todos: {
      index: typeof routes['todos.todos.index']
      store: typeof routes['todos.todos.store']
      show: typeof routes['todos.todos.show']
      update: typeof routes['todos.todos.update']
      destroy: typeof routes['todos.todos.destroy']
    }
  }
}
