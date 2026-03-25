import Permission from '#models/permission'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DefaultSystemPermissions } from '../../constants/permission.contants.ts'
import { DefaultSystemRoles } from '../../constants/role.contants.ts'

export default class extends BaseSeeder {
  async run() {
    for (const roleKey in DefaultSystemRoles) {
      const roleName = DefaultSystemRoles[roleKey as keyof typeof DefaultSystemRoles]
      await Role.updateOrCreate(
        { name: roleName },
        {
          name: roleName,
          displayName: roleKey.replaceAll('_', ' '),
          type: 'system',
          description: `User with this role has access to ${roleName === DefaultSystemRoles.SUPER_ADMIN ? 'all' : 'basic'} features and settings.`,
        }
      )
    }

    const superAdmin = await Role.findByOrFail('name', DefaultSystemRoles.SUPER_ADMIN)
    const todoPermissionNames = Object.values({ ...DefaultSystemPermissions.TODO_MANAGEMENT.PERMISSIONS, ...DefaultSystemPermissions.USER_DASHBOARD.PERMISSIONS })
    const superAdminPermissions = await Permission.query().whereNotIn('name', todoPermissionNames)
    await superAdmin.related('permissions').sync(superAdminPermissions.map((p) => p.id))

    const userRole = await Role.findByOrFail('name', DefaultSystemRoles.USER)
    const userPermissionNames = [
      ...Object.values(DefaultSystemPermissions.TODO_MANAGEMENT.PERMISSIONS),
      ...Object.values(DefaultSystemPermissions.USER_DASHBOARD.PERMISSIONS),
    ]

    const userPermissions = await Permission.query().whereIn('name', userPermissionNames)
    await userRole.related('permissions').sync(userPermissions.map((p) => p.id))
  }
}