import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.specificType('id', 'uuid default gen_random_uuid()').notNullable().primary()
      table.string('title').notNullable()
      table.text('description', 'longtext').nullable()
      table.enum('priority', ['low', 'medium', 'high']).nullable().defaultTo('medium')
      table.enum('status', ['pending', 'in_progress', 'completed', 'backlog', 'icebox']).notNullable().defaultTo('pending')
      table.timestamp('due_date').nullable()

      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}