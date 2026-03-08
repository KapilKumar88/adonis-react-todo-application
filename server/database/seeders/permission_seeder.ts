import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DefaultSystemPermissions } from '../../constants/permission.contants.ts'

export default class extends BaseSeeder {
  async run() {
    for (const groupKey in DefaultSystemPermissions) {
      const actions = DefaultSystemPermissions[groupKey as keyof typeof DefaultSystemPermissions]
      for (const actionKey in actions) {
        const name = actions[actionKey as keyof typeof actions]
        const displayName = `${groupKey.replaceAll('_', ' ')} - ${actionKey.replaceAll('_', ' ')}`
        await Permission.updateOrCreate(
          { name },
          {
            name,
            displayName,
            description: `Allows the user to ${actionKey.replaceAll('_', ' ').toLowerCase()} in ${groupKey.replaceAll('_', ' ').toLowerCase()}.`,
          }
        )
      }
    }
  }
}