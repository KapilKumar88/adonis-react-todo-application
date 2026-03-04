import Permission from '#models/permission'
import { createPermissionValidator } from '#validators/api/v1/admin/permission'
import type { HttpContext } from '@adonisjs/core/http'

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
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createPermissionValidator)

    const permission = await Permission.create(payload)

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
  async update({ params, request, response }: HttpContext) {
    const permission = await Permission.findOrFail(params.id)
    const payload = await request.validateUsing(createPermissionValidator)

    permission.merge(payload)
    await permission.save()

    return response.ok(permission)
  }

  /**
   * DELETE /api/v1/admin/permissions/:id
   * Delete a permission
   */
  async destroy({ params, response }: HttpContext) {
    const permission = await Permission.findOrFail(params.id)
    await permission.delete()

    return response.ok({ message: 'Permission deleted successfully' })
  }
}