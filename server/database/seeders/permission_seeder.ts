import Permission from '#models/permission';
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const systemDefaultPermissions = [
  {
    name: 'manage_users',
    display_name: 'Manage Users',
    description: 'Permission to manage users, including creating, updating, and deleting user accounts.'
  },
  {
    name: 'manage_roles',
    display_name: 'Manage Roles',
    description: 'Permission to manage roles, including creating, updating, and deleting roles.'
  },
  {
    name: 'manage_permissions',
    display_name: 'Manage Permissions',
    description: 'Permission to manage permissions, including creating, updating, and deleting permissions.'
  }
];

export default class extends BaseSeeder {
  async run() {
    for (const permission of systemDefaultPermissions) {
      await Permission.updateOrCreate({ name: permission.name }, permission)
    }
  }
}