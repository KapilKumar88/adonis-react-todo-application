import { RoleSchema } from '#database/schema'
import Permission from '#models/permission'
import User from '#models/user'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'


export default class Role extends RoleSchema {
  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions',
  })
  declare permissions: ManyToMany<typeof Permission>


  @manyToMany(() => User, {
    pivotTable: 'role_users',
  })
  declare users: ManyToMany<typeof User>
}