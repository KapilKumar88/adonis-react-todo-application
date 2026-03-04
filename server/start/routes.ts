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
import { controllers } from '#generated/controllers'
import DocsController from '#controllers/docs_controller'
import { group } from 'console'
import LoginController from '#controllers/api/v1/admin/auth/login_controller'

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
