import { BaseTransformer } from '@adonisjs/core/transformers'
import User from '#models/user'
import RoleTransformer from '../role_transformer.ts'

export default class UserForAdminTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'fullName',
        'email',
        'initials',
        'createdAt',
      ]),
      role: RoleTransformer.transform(this.whenLoaded(this.resource.roles[0])),
    }
  }
}