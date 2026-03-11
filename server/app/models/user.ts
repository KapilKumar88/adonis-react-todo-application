import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Role from '#models/role'
import env from '#start/env'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static readonly accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: string


  // ------------------------------- model relations -------------------------------
  @manyToMany(() => Role, {
    pivotTable: 'role_users',
  })
  declare roles: ManyToMany<typeof Role>

  // ------------------------------- model relations -------------------------------



  // ------------------------------- model hooks -------------------------------
  @beforeCreate()
  static assignUuid(user: User) {
    user.id = randomUUID()
  }
  // ------------------------------- model hooks -------------------------------


  // ------------------------------- model getters & setters -------------------------------
  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  @column({
    serialize: (value: string | null) => {
      return value ? `${env.get('APP_URL')}${value}` : null
    },
  })
  declare profileImage: string | null
  // ------------------------------- model getters & setters -------------------------------
}
