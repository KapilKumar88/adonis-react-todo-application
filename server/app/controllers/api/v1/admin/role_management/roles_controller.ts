import Role from '#models/role'
import { createRoleValidator } from '#validators/api/v1/admin/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  /**
   * GET /api/v1/admin/roles
   * Return paginated list of roles
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const roles = await Role.query().orderBy('created_at', 'desc').paginate(page, limit)

    return response.ok(roles)
  }

  /**
   * POST /api/v1/admin/roles
   * Create a new role
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createRoleValidator)

    const role = await Role.create(payload)

    return response.created(role)
  }

  /**
   * GET /api/v1/admin/roles/:id
   * Return a single role
   */
  async show({ params, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)

    return response.ok(role)
  }

  /**
   * PUT /api/v1/admin/roles/:id
   * Update an existing role
   */
  async update({ params, request, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    const payload = await request.validateUsing(createRoleValidator)

    role.merge(payload)
    await role.save()

    return response.ok(role)
  }

  /**
   * DELETE /api/v1/admin/roles/:id
   * Delete a role
   */
  async destroy({ params, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.delete()

    return response.ok({ message: 'Role deleted successfully' })
  }
}