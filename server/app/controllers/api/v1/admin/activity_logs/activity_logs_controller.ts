import type { HttpContext } from '@adonisjs/core/http'
import ActivityLog from '#models/activity_log'
import ActivityLogTransformer from '#transformers/admin/activity_log_transformer'

export default class ActivityLogsController {
  /**
   * GET /api/v1/admin/activity-logs
   * Return paginated, filterable list of activity logs
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 15)
    const search = request.input('search')
    const status = request.input('status')
    const resource = request.input('resource')

    const query = ActivityLog.query().preload('user')

    if (search) {
      query.where((q) => {
        q.whereILike('action', `%${search}%`)
          .orWhereILike('description', `%${search}%`)
          .orWhereHas('user', (uq) => {
            uq.whereILike('full_name', `%${search}%`)
          })
      })
    }

    if (status && status !== 'all') {
      query.where('status', status)
    }

    if (resource && resource !== 'all') {
      query.where('resource', resource)
    }

    const logs = await query.orderBy('created_at', 'desc').paginate(page, limit)

    return response.ok({
      meta: logs.getMeta(),
      data: logs.all(),
    })
  }

  /**
   * GET /api/v1/admin/activity-logs/export
   * Export all matching activity logs as JSON (client converts to CSV)
   */
  async export({ request, response }: HttpContext) {
    const search = request.input('search')
    const status = request.input('status')
    const resource = request.input('resource')

    const query = ActivityLog.query().preload('user')

    if (search) {
      query.where((q) => {
        q.whereILike('action', `%${search}%`)
          .orWhereILike('description', `%${search}%`)
          .orWhereHas('user', (uq) => {
            uq.whereILike('full_name', `%${search}%`)
          })
      })
    }

    if (status && status !== 'all') {
      query.where('status', status)
    }

    if (resource && resource !== 'all') {
      query.where('resource', resource)
    }

    const logs = await query.orderBy('created_at', 'desc')

    return response.ok({
      data: logs.map((log) => ActivityLogTransformer.transform(log)),
    })
  }
}