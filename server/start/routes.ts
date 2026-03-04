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
import DocsController from '#controllers/docs_controller'
import LoginController from '#controllers/api/v1/admin/auth/login_controller'
import RolesController from '#controllers/api/v1/admin/role_management/roles_controller'
import PermissionController from '#controllers/api/v1/admin/permission_management/permission_controller'

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
    }).prefix('admin').as('admin')


    // router
    //   .group(() => {
    //     router.post('signup', [controllers.NewAccount, 'store'])
    //     router.post('login', [controllers.AccessToken, 'store'])
    //     router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
    //   })
    //   .prefix('auth')
    //   .as('auth')

    // router
    //   .group(() => {
    //     router.get('/profile', [controllers.Profile, 'show'])
    //   })
    //   .prefix('account')
    //   .as('profile')
    //   .use(middleware.auth())
  })
  .prefix('/api/v1')
