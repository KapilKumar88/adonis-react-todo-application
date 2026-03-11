import { ActivityLogSchema } from '#database/schema'
import { belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'

export default class ActivityLog extends ActivityLogSchema {
  static readonly table = 'activity_logs'

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  static assignUuid(log: ActivityLog) {
    log.id = randomUUID()
  }
}