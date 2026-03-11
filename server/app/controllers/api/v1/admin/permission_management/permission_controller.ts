import Permission from '#models/permission'
import { createPermissionValidator } from '#validators/api/v1/admin/permission'
import type { HttpContext } from '@adonisjs/core/http'
import { logFromContext } from '#helpers/common.helper'

export default class PermissionController {
  /**
   * GET /api/v1/admin/permissions
   * Return paginated list of permissions
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const permissions = await Permission.query()
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return response.ok(permissions)
  }

  /**
   * POST /api/v1/admin/permissions
   * Create a new permission
   */
  async store(ctx: HttpContext) {
    const { request, response } = ctx
    const payload = await request.validateUsing(createPermissionValidator)

    const permission = await Permission.create(payload)

    await logFromContext(ctx, {
      action: 'Created permission',
      description: `${ctx.auth.user!.fullName} created permission — ${permission.displayName ?? permission.name}`,
      status: 'success',
      resource: 'Permissions',
    })

    return response.created(permission)
  }

  /**
   * GET /api/v1/admin/permissions/:id
   * Return a single permission
   */
  async show({ params, response }: HttpContext) {
    const permission = await Permission.findOrFail(params.id)

    return response.ok(permission)
  }

  /**
   * PUT /api/v1/admin/permissions/:id
   * Update an existing permission
   */
  async update(ctx: HttpContext) {
    const { params, request, response } = ctx
    const permission = await Permission.findOrFail(params.id)
    const payload = await request.validateUsing(createPermissionValidator)

    permission.merge(payload)
    await permission.save()

    await logFromContext(ctx, {
      action: 'Updated permission',
      description: `${ctx.auth.user!.fullName} updated permission — ${permission.displayName ?? permission.name}`,
      status: 'success',
      resource: 'Permissions',
    })

    return response.ok(permission)
  }

  /**
   * DELETE /api/v1/admin/permissions/:id
   * Delete a permission
   */
  async destroy(ctx: HttpContext) {
    const { params, response } = ctx
    const permission = await Permission.findOrFail(params.id)
    const permName = permission.displayName ?? permission.name
    await permission.delete()

    await logFromContext(ctx, {
      action: 'Deleted permission',
      description: `${ctx.auth.user!.fullName} deleted permission — ${permName}`,
      status: 'success',
      resource: 'Permissions',
    })

    return response.ok({ message: 'Permission deleted successfully' })
  }
}