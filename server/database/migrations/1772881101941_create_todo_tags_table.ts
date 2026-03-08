import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todo_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .uuid('todo_id')
        .notNullable()
        .references('id')
        .inTable('todos')
        .onDelete('CASCADE')

      table
        .uuid('tag_id')
        .notNullable()
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')

      table.unique(['todo_id', 'tag_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}