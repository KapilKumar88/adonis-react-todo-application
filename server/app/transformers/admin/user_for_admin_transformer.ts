import { BaseTransformer } from '@adonisjs/core/transformers'
import User from '#models/user'

export default class UserForAdminTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'fullName',
        'email',
        'initials',
        'bio',
        'profileImage',
        'createdAt',
        'updatedAt'
      ]),
      role: this.resource?.roles?.[0] &&{
        ...this.pick(this.resource?.roles?.[0], ['name', 'displayName', 'id']),
      },
    }
  }
}