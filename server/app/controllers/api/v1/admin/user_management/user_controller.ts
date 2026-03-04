import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/api/v1/admin/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  /**
   * GET /api/v1/admin/users
   * Return paginated list of users with their role
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const users = await User.query()
      .preload('role')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return response.ok(users)
  }

  /**
   * POST /api/v1/admin/users
   * Create a new user
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    const user = await User.create(payload)
    await user.load('role')

    return response.created(user)
  }

  /**
   * GET /api/v1/admin/users/:id
   * Return a single user with role
   */
  async show({ params, response }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('role').firstOrFail()

    return response.ok(user)
  }

  /**
   * PUT /api/v1/admin/users/:id
   * Update an existing user
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(updateUserValidator)

    // Check email uniqueness manually (exclude current user)
    if (payload.email && payload.email !== user.email) {
      const exists = await User.query()
        .where('email', payload.email)
        .whereNot('id', user.id)
        .first()
      if (exists) {
        return response.unprocessableEntity({
          message: 'Validation failed',
          errors: [{ field: 'email', message: 'Email already in use', rule: 'unique' }],
        })
      }
    }

    user.merge(payload)
    await user.save()
    await user.load('role')

    return response.ok(user)
  }

  /**
   * DELETE /api/v1/admin/users/:id
   * Delete a user
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.ok({ message: 'User deleted successfully' })
  }
}