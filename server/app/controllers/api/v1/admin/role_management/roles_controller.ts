import Role from '#models/role'
import { createRoleValidator } from '#validators/api/v1/admin/role'
import type { HttpContext } from '@adonisjs/core/http'
import { logFromContext } from '#helpers/common.helper'

export default class RolesController {
  /**
   * GET /api/v1/admin/roles
   * Return paginated list of roles
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const roles = await Role.query()
      .select(['id', 'name', 'display_name', 'description'])
      .preload('permissions', (permQuery) => {
        permQuery.select(['id', 'name', 'displayName', 'description'])
      })
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return response.ok({
      data: roles.all(),
      metaData: roles.getMeta(),
      message: 'Roles retrieved successfully'
    });
  }

  /**
   * POST /api/v1/admin/roles
   * Create a new role
   */
  async store(ctx: HttpContext) {
    const { request, response } = ctx
    const { permissions, ...payload } = await request.validateUsing(createRoleValidator)

    const role = await Role.create(payload)
    if (permissions && permissions.length > 0) {
      await role.related('permissions').sync(permissions)
    }

    logFromContext(ctx, {
      action: 'Created role',
      description: `${ctx.auth.user!.fullName} created role — ${role.displayName ?? role.name}`,
      status: 'success',
      resource: 'Roles',
    })

    return response.created({
      data: { role, permissions: permissions || [] },
      message: 'Role created successfully'
    })
  }

  /**
   * GET /api/v1/admin/roles/:id
   * Return a single role
   */
  async show({ params, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)

    return response.ok({ data: role, message: 'Role retrieved successfully' })
  }

  /**
   * PUT /api/v1/admin/roles/:id
   * Update an existing role
   */
  async update(ctx: HttpContext) {
    const { params, request, response } = ctx
    const role = await Role.findOrFail(params.id)
    const payload = await request.validateUsing(createRoleValidator)

    role.merge(payload)
    await role.save()

    logFromContext(ctx, {
      action: 'Updated role',
      description: `${ctx.auth.user!.fullName} updated role — ${role.displayName ?? role.name}`,
      status: 'success',
      resource: 'Roles',
    })

    return response.ok({ data: role, message: 'Role updated successfully' })
  }

  /**
   * DELETE /api/v1/admin/roles/:id
   * Delete a role
   */
  async destroy(ctx: HttpContext) {
    const { params, response } = ctx
    const role = await Role.findOrFail(params.id)
    const roleName = role.displayName ?? role.name
    await role.delete()

    logFromContext(ctx, {
      action: 'Deleted role',
      description: `${ctx.auth.user!.fullName} deleted role — ${roleName}`,
      status: 'success',
      resource: 'Roles',
    })

    return response.ok({ message: 'Role deleted successfully' })
  }
}