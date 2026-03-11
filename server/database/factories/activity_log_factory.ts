import factory from '@adonisjs/lucid/factories'
import ActivityLog from '#models/activity_log'

export const ActivityLogFactory = factory
  .define(ActivityLog, async ({ faker }) => {
    return {}
  })
  .build()