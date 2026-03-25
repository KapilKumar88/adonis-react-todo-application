import User from '#models/user'
import UserForAdminTransformer from '#transformers/admin/user_for_admin_transformer'
import { createUserValidator, updateUserValidator } from '#validators/api/v1/admin/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import AdminWelcomeNotification from '#mails/admin_welcome_notification'
import { logFromContext } from '#helpers/common.helper'
import { DefaultSystemRoles } from '#constants/role.contants'

export default class UserController {
  /**
   * GET /api/v1/admin/users
   * Return paginated list of users with their role
   */
  async index({ request, serialize }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const users = await User.query()
      .whereDoesntHave('roles', (qb) => qb.where('name', DefaultSystemRoles.SUPER_ADMIN))
      .preload('roles', (qb) => qb.select('id', 'name', 'displayName'))
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return serialize(UserForAdminTransformer.paginate(users.all(), users.getMeta()))
  }

  /**
   * POST /api/v1/admin/users
   * Create a new user
   */
  async store(ctx: HttpContext) {
    const { request, response } = ctx
    const trx = await db.transaction()
    const payload = await request.validateUsing(createUserValidator)
    try {
      const password = stringHelpers.random(32)
      const user = await User.create({
        fullName: payload.fullName,
        email: payload.email,
        password: password
      }, {
        client: trx,
      });

      await user.related('roles').attach([payload.roleId])
      await trx.commit()

      // Send welcome email with credentials
      mail.send(new AdminWelcomeNotification({
        email: user.email,
        password: password,
        userName: user.fullName
      }))

      logFromContext(ctx, {
        action: 'Created user',
        description: `${ctx.auth.user!.fullName} created user — ${user.fullName}`,
        status: 'success',
        resource: 'Users',
      })

      return response.created({
        data: (new UserForAdminTransformer(user)).toObject(),
        message: 'User created successfully. Credentials sent to email.'
      })
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

    return response.ok(UserForAdminTransformer.transform(user))
  }

  /**
   * PUT /api/v1/admin/users/:id
   * Update an existing user
   */
  async update(ctx: HttpContext) {
    const { params, request, response } = ctx
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

    await logFromContext(ctx, {
      action: 'Updated user',
      description: `${ctx.auth.user!.fullName} updated user — ${user.fullName}`,
      status: 'success',
      resource: 'Users',
    })

    return response.ok(UserForAdminTransformer.transform(user))
  }

  /**
   * DELETE /api/v1/admin/users/:id
   * Delete a user
   */
  async destroy(ctx: HttpContext) {
    const { params, response } = ctx
    const user = await User.findOrFail(params.id)
    const userName = user.fullName
    await user.delete()

    await logFromContext(ctx, {
      action: 'Deleted user',
      description: `${ctx.auth.user!.fullName} deleted user — ${userName}`,
      status: 'success',
      resource: 'Users',
    })

    return response.ok({ message: 'User deleted successfully' })
  }
}