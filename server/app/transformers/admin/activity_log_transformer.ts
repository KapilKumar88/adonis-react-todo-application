import { BaseTransformer } from '@adonisjs/core/transformers'
import type ActivityLog from '#models/activity_log'

export default class ActivityLogTransformer extends BaseTransformer<ActivityLog> {
  toObject() {
    const user = this.whenLoaded((this.resource as any).user) as any
    return {
      ...this.pick(this.resource, [
        'id',
        'action',
        'description',
        'ip',
        'userAgent',
        'status',
        'resource',
        'createdAt',
      ]),
      userName: user?.fullName ?? null,
      userInitials: user?.initials ?? null,
    }
  }
}
