import Role from '#models/role'
import User from '#models/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const SystemDefaultUsers = [
  {
    fullName: 'Super Admin',
    email: 'superAdmin@example.com',
    role: 'super_admin',
    password: stringHelpers.random(32),
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const user of SystemDefaultUsers) {
      const { role, ...userPayload } = user
      const createdUser = await User.updateOrCreate({ email: user.email }, userPayload)
      if (user?.role) {
        const role = await Role.findByOrFail('name', user.role)
        await createdUser.related('roles').sync([role.id])
      }
    }
  }
}