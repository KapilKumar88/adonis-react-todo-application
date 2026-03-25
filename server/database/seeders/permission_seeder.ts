import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DefaultSystemPermissions } from '../../constants/permission.contants.ts'

export default class extends BaseSeeder {
  async run() {
    for (const groupKey in DefaultSystemPermissions) {
      const group = DefaultSystemPermissions[groupKey as keyof typeof DefaultSystemPermissions]
      const source = group.SOURCE
      const permissions = group.PERMISSIONS
      for (const actionKey in permissions) {
        const name = permissions[actionKey as keyof typeof permissions]
        const displayName = `${groupKey.replaceAll('_', ' ')} - ${actionKey.replaceAll('_', ' ')}`
        await Permission.updateOrCreate(
          { name },
          {
            name,
            source,
            displayName,
            description: `Allows the user to ${actionKey.replaceAll('_', ' ').toLowerCase()} in ${groupKey.replaceAll('_', ' ').toLowerCase()}.`,
          }
        )
      }
    }
  }
}