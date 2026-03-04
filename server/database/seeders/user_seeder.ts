import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const SystemDefaultUsers = [
  {
    fullName: 'Super Admin',
    email: 'superAdmin@example.com',
    password: 'superAdminPassword',
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const user of SystemDefaultUsers) {
      await User.updateOrCreate({ email: user.email }, user)
    }
  }
}