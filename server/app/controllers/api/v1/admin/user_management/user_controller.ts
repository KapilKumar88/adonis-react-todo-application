import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { createUserValidator, updateUserValidator } from '#validators/api/v1/admin/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UserController {
  /**
   * GET /api/v1/admin/users
   * Return paginated list of users with their role
   */
  async index({ serialize, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const users = await User.query()
      .whereDoesntHave('roles', (qb) => qb.where('name', 'super_admin'))
      .preload('roles', (qb) => qb.select('id', 'name', 'displayName'))
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return serialize(UserTransformer.paginate(users.all(), users.getMeta()))
  }

  /**
   * POST /api/v1/admin/users
   * Create a new user
   */
  async store({ request, response }: HttpContext) {
    const trx = await db.transaction()
    try {
      const payload = await request.validateUsing(createUserValidator)
      const user = await User.create({
        fullName: payload.fullName,
        email: payload.email,
        password: stringHelpers.random(32)
      }, {
        client: trx,
      });

      await user.related('roles').attach([payload.roleId])
      await trx.commit()
      return response.created(UserTransformer.transform(user))
    } catch (error) {
      await trx.rollback()
      return response.internalServerError({
        message: 'Internal server error',
        errors: error.messages || [{ message: 'An error occurred while creating the user' }],
      })
    }
  }

  /**
   * GET /api/v1/admin/users/:id
   * Return a single user with role
   */
  async show({ params, response }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('roles').firstOrFail()

    return response.ok(UserTransformer.transform(user))
  }

  /**
   * PUT /api/v1/admin/users/:id
   * Update an existing user
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const { roleId, ...payload } = await request.validateUsing(updateUserValidator)

    // Check email uniqueness manually (exclude current user)
    if (payload.email && payload.email !== user.email) {
      const exists = await User.query()
        .where('email', payload.email)
        .whereNot('id', user.id)
        .first();
      if (exists) {
        return response.unprocessableEntity({
          message: 'Validation failed',
          errors: [{ field: 'email', message: 'Email already in use', rule: 'unique' }],
        })
      }
    }

    user.merge(payload)
    await user.save()
    await user.related('roles').sync([roleId])

    return response.ok(UserTransformer.transform(user))
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