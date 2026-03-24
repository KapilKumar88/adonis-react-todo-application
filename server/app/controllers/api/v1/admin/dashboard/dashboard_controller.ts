import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  /**
   * GET /api/v1/admin/dashboard
   * Returns aggregated stats for the admin dashboard.
   */
  async index({ response }: HttpContext) {
    const [
      userStats,
      todoStats,
      priorityBreakdown,
      recentActivity,
      topActiveUsers,
    ] = await Promise.all([
      this.getUserStats(),
      this.getTodoStats(),
      this.getPriorityBreakdown(),
      this.getRecentActivity(),
      this.getTopActiveUsers(),
    ])

    return response.ok({
      data: {
        userStats,
        todoStats,
        priorityBreakdown,
        recentActivity,
        topActiveUsers,
      },
      message: 'Dashboard stats retrieved successfully',
    })
  }

  private async getUserStats() {
    const totalResult = await db
      .from('users')
      .count('* as total')
      .first()

    // Active users = users who have logged in (have access tokens) in the last 30 days
    const activeResult = await db
      .from('auth_access_tokens')
      .countDistinct('tokenable_id as total')
      .where('created_at', '>=', db.raw("now() - interval '30 days'"))
      .first()

    return {
      totalUsers: Number(totalResult?.total ?? 0),
      activeUsers: Number(activeResult?.total ?? 0),
    }
  }

  private async getTodoStats() {
    const result = await db
      .from('todos')
      .select(
        db.raw('count(*)::int as total'),
        db.raw("count(*) filter (where status = 'completed')::int as completed"),
        db.raw("count(*) filter (where status = 'in_progress')::int as in_progress"),
        db.raw("count(*) filter (where status = 'pending')::int as pending")
      )
      .first()

    return {
      total: result?.total ?? 0,
      completed: result?.completed ?? 0,
      inProgress: result?.in_progress ?? 0,
      pending: result?.pending ?? 0,
    }
  }

  private async getPriorityBreakdown() {
    const result = await db
      .from('todos')
      .select(
        db.raw("count(*) filter (where priority = 'high')::int as high"),
        db.raw("count(*) filter (where priority = 'medium')::int as medium"),
        db.raw("count(*) filter (where priority = 'low')::int as low")
      )
      .first()

    return {
      high: result?.high ?? 0,
      medium: result?.medium ?? 0,
      low: result?.low ?? 0,
    }
  }

  private async getRecentActivity() {
    const rows = await db
      .from('activity_logs')
      .join('users', 'activity_logs.user_id', 'users.id')
      .select(
        'activity_logs.id',
        'activity_logs.action',
        'activity_logs.description',
        'activity_logs.status',
        'activity_logs.resource',
        'activity_logs.created_at as createdAt',
        'users.full_name as userName'
      )
      .orderBy('activity_logs.created_at', 'desc')
      .limit(10)

    return rows.map((row) => ({
      id: row.id,
      action: row.action,
      description: row.description,
      status: row.status,
      resource: row.resource,
      userName: row.userName,
      createdAt: row.createdAt,
    }))
  }

  private async getTopActiveUsers() {
    const rows = await db
      .from('todos')
      .join('users', 'todos.user_id', 'users.id')
      .select('users.id', 'users.full_name as fullName')
      .count('todos.id as todoCount')
      .groupBy('users.id', 'users.full_name')
      .orderBy('todoCount', 'desc')
      .limit(5)

    return rows.map((row) => ({
      id: row.id,
      fullName: row.fullName,
      todoCount: Number(row.todoCount),
    }))
  }
}