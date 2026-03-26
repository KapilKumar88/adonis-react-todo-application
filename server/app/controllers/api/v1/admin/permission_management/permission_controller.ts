import Permission from '#models/permission'
import { updatePermissionValidator } from '#validators/api/v1/admin/permission'
import { permissionPaginationValidator } from '#validators/api/v1/admin/pagination'
import type { HttpContext } from '@adonisjs/core/http'
import { logFromContext } from '#helpers/common.helper'

export default class PermissionController {
  /**
   * GET /api/v1/admin/permissions
   * Return paginated list of permissions
   */
  async index({ request, response }: HttpContext) {
    const { page = 1, limit = 100 } = await request.validateUsing(permissionPaginationValidator)

    const permissions = await Permission.query()
      .preload('roles', (roleQuery) => {
        roleQuery.select(['id', 'name', 'displayName'])
      })
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return response.ok({
      data: permissions.all(),
      metaData: permissions.getMeta(),
      message: 'Permissions retrieved successfully'
    });
  }

  /**
   * GET /api/v1/admin/permissions/:id
   * Return a single permission
   */
  async show({ params, response }: HttpContext) {
    const permission = await Permission.findOrFail(params.id)
    await permission.load('roles', (roleQuery) => {
      roleQuery.select(['id', 'name', 'displayName'])
    });

    return response.ok({ data: permission, message: 'Permission retrieved successfully' })
  }

  /**
   * PUT /api/v1/admin/permissions/:id
   * Update an existing permission
   */
  async update(ctx: HttpContext) {
    const { params, request, response } = ctx
    const permission = await Permission.findOrFail(params.id)
    const { roleId, attach } = await request.validateUsing(updatePermissionValidator)

    if (attach) {
      await permission.related('roles').attach([roleId]);
    } else {
      await permission.related('roles').detach([roleId]);
    }

    logFromContext(ctx, {
      action: 'Updated permission',
      description: `${ctx.auth.user!.fullName} updated permission — ${permission.displayName ?? permission.name}`,
      status: 'success',
      resource: 'Permissions',
    })

    return response.ok({ data: permission, message: 'Permission updated successfully' })
  }
}