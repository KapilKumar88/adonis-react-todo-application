/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/api/v1/admin/user_management/user_controller');
const PermissionController = () => import('#controllers/api/v1/admin/permission_management/permission_controller');
const RolesController = () => import('#controllers/api/v1/admin/role_management/roles_controller');
const LoginController = () => import('#controllers/api/v1/admin/auth/login_controller')
const DocsController = () => import('#controllers/docs_controller')

const NewAccountController = () => import('#controllers/api/v1/user/auth/new_account_controller')
const AccessTokenController = () => import('#controllers/api/v1/user/auth/login_controller')
const ForgotPasswordsController = () => import('#controllers/api/v1/user/auth/forgot_passwords_controller')
const TagsController = () => import('#controllers/api/v1/user/tag_management/tags_controller')
const TodosController = () => import('#controllers/api/v1/user/todo_management/todos_controller')
const ProfileController = () => import('#controllers/api/v1/user/profile/profile_controller')
const ChangePasswordsController = () => import('#controllers/api/v1/user/profile/change_passwords_controller')

router.get('/', () => {
  return { hello: 'world' }
})

/*
|--------------------------------------------------------------------------
| Swagger / OpenAPI docs
|--------------------------------------------------------------------------
| GET /docs          → Swagger UI
| GET /docs/openapi.yaml → raw OpenAPI spec
*/
router.get('/docs', [DocsController, 'ui'])
router.get('/docs/openapi.yaml', [DocsController, 'spec'])


// api version 1 routes with auth middleware applied to protected routes
router
  .group(() => {
    // -------------------------------------- admin apis start ------------------------------------------------------
    router.group(() => {
      router.post('login', [LoginController, 'login'])

      // Role management — protected
      router
        .group(() => {
          router.get('/', [RolesController, 'index'])
          router.post('/', [RolesController, 'store'])
          router.get('/:id', [RolesController, 'show'])
          router.put('/:id', [RolesController, 'update'])
          router.delete('/:id', [RolesController, 'destroy'])
        })
        .prefix('roles')
        .use(middleware.auth())

      // Permission management — protected
      router
        .group(() => {
          router.get('/', [PermissionController, 'index'])
          router.post('/', [PermissionController, 'store'])
          router.get('/:id', [PermissionController, 'show'])
          router.put('/:id', [PermissionController, 'update'])
          router.delete('/:id', [PermissionController, 'destroy'])
        })
        .prefix('permissions')
        .use(middleware.auth())

      // User management — protected
      router
        .group(() => {
          router.get('/', [UserController, 'index'])
          router.post('/', [UserController, 'store'])
          router.get('/:id', [UserController, 'show'])
          router.put('/:id', [UserController, 'update'])
          router.delete('/:id', [UserController, 'destroy'])
        })
        .prefix('users')
        .use(middleware.auth())
    }).prefix('admin').as('admin')
    // -------------------------------------- admin apis end ------------------------------------------------------


    // ------------------------------------------- User Apis start-----------------------------------------------------------
    router
      .group(() => {
        router.post('signup', [NewAccountController, 'store'])
        router.post('login', [AccessTokenController, 'store'])
        router.post('logout', [AccessTokenController, 'destroy']).use(middleware.auth())
        router.post('forgot-password', [ForgotPasswordsController, 'store'])
        router.post('reset-password', [ForgotPasswordsController, 'update'])
      })
      .prefix('auth')
      .as('auth')

    // Profile — protected
    router
      .group(() => {
        router.get('/', [ProfileController, 'show'])
        router.put('/', [ProfileController, 'update'])
        router.put('/change-password', [ChangePasswordsController, 'update'])
      })
      .prefix('profile')
      .as('profile')
      .use(middleware.auth())

    // Tags management — protected
    router
      .group(() => {
        router.get('/', [TagsController, 'index'])
        router.post('/', [TagsController, 'store'])
        router.get('/:id', [TagsController, 'show'])
        router.put('/:id', [TagsController, 'update'])
        router.delete('/:id', [TagsController, 'destroy'])
      })
      .prefix('tags')
      .as('tags')
      .use(middleware.auth())

    // Todo management — protected
    router
      .group(() => {
        router.get('/', [TodosController, 'index'])
        router.post('/', [TodosController, 'store'])
        router.get('/:id', [TodosController, 'show'])
        router.put('/:id', [TodosController, 'update'])
        router.delete('/:id', [TodosController, 'destroy'])
      })
      .prefix('todos')
      .as('todos')
      .use(middleware.auth())

    // ------------------------------------------- User Apis end-----------------------------------------------------------
  })
  .prefix('/api/v1')
