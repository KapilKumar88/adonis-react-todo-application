import { TagSchema } from '#database/schema'
import { beforeCreate, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Todo from '#models/todo'

export default class Tag extends TagSchema {
  @column({ isPrimary: true })
  declare id: string

  // ------------------------------- model relations -------------------------------
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Todo, {
    pivotTable: 'todo_tags',
  })
  declare todos: ManyToMany<typeof Todo>
  // ------------------------------- model relations -------------------------------

  // ------------------------------- model hooks -------------------------------
  @beforeCreate()
  static assignUuid(tag: Tag) {
    tag.id = randomUUID()
  }
  // ------------------------------- model hooks -------------------------------
}