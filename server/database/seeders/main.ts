import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RoleSeeder from './role_seeder.js'
import PermissionSeeder from './permission_seeder.js'
import UserSeeder from './user_seeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    await new PermissionSeeder(this.client).run()
    await new RoleSeeder(this.client).run()
    await new UserSeeder(this.client).run()
  }
}
