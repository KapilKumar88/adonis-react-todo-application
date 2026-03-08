import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'
import RoleTransformer from './role_transformer.ts'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'fullName',
        'email',
        'initials',
        'createdAt',
      ]),
      role: RoleTransformer.transform(this.whenLoaded(this.resource?.roles?.[0])),
    }
  }
}
