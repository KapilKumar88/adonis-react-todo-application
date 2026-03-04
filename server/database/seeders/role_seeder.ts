import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const SystemDefaultRoles = [
  {
    name: 'super_admin',
    display_name: 'Super Admin',
    description: 'User with this role has access to all the system features and settings.'
  },
  {
    name: 'admin',
    display_name: 'Admin',
    description: 'User with this role has access to most of the system features and settings.'
  },
  {
    name: 'user',
    display_name: 'User',
    description: 'User with this role has access to basic features and settings.'
  }
]

export default class extends BaseSeeder {
  async run() {
    for (const role of SystemDefaultRoles) {
      await Role.updateOrCreate({ name: role.name }, role)
    }
  }
}