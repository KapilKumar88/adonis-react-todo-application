import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activity_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.specificType('id', 'uuid default gen_random_uuid()').notNullable().primary()
      table.string('action').notNullable()
      table.string('description').nullable()
      table.string('ip').nullable()
      table.string('user_agent').nullable()
      table.enum('status', ['success', 'failure', 'warning', 'info']).notNullable()
      table.string('resource').notNullable()
      table.specificType('user_id', 'uuid').notNullable().references('id').inTable('users').onDelete('CASCADE')


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}