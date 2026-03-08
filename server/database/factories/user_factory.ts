import factory from '@adonisjs/lucid/factories'
import Role from '#models/role'
import User from '#models/user'
import stringHelpers from '@adonisjs/core/helpers/string'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: stringHelpers.random(32),
    }
  })
  .state('asAdmin', (user) => {
    ;(user as any)._factoryRole = 'admin'
  })
  .state('asSuperAdmin', (user) => {
    ;(user as any)._factoryRole = 'super_admin'
  })
  .after('create', async (_factory, user) => {
    const roleName: string = (user as any)._factoryRole ?? 'user'
    const role = await Role.findBy('name', roleName)
    if (role) await user.related('roles').sync([role.id])
    
  })
  .build()