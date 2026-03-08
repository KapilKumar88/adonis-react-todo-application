import { TodoSchema } from '#database/schema'
import { beforeCreate, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Tag from '#models/tag'

export default class Todo extends TodoSchema {
  @column({ isPrimary: true })
  declare id: string

  // ------------------------------- model relations -------------------------------
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Tag, {
    pivotTable: 'todo_tags',
  })
  declare tags: ManyToMany<typeof Tag>
  // ------------------------------- model relations -------------------------------

  // ------------------------------- model hooks -------------------------------
  @beforeCreate()
  static assignUuid(todo: Todo) {
    todo.id = randomUUID()
  }
  // ------------------------------- model hooks -------------------------------
}