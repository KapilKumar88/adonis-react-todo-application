import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import TodoTransformer from '#transformers/todo_transformer'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  /**
   * GET /api/v1/dashboard
   * Returns todo stats and recent todos for the authenticated user.
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const [statsResult, recentTodos] = await Promise.all([
      db
        .from('todos')
        .where('user_id', user.id)
        .select(
          db.raw('count(*)::int as total'),
          db.raw("count(*) filter (where status = 'completed')::int as completed"),
          db.raw("count(*) filter (where status = 'in_progress')::int as in_progress"),
          db.raw("count(*) filter (where status = 'pending')::int as pending"),
        )
        .first(),

      Todo.query()
        .where('userId', user.id)
        .preload('tags')
        .orderBy('updated_at', 'desc')
        .limit(5),
    ])

    return response.ok({
      stats: {
        total: statsResult?.total ?? 0,
        completed: statsResult?.completed ?? 0,
        inProgress: statsResult?.in_progress ?? 0,
        pending: statsResult?.pending ?? 0,
      },
      recentTodos: recentTodos,
    })
  }
}