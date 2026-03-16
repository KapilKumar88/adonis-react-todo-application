import type { HttpContext } from '@adonisjs/core/http'
import Tag from '#models/tag'
import { createTagValidator, updateTagValidator } from '#validators/api/v1/user/tag'

export default class TagsController {
  /**
   * GET /api/v1/tags
   * List all tags for the authenticated user
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const tags = await Tag.query()
      .where('userId', user.id)
      .orderBy('name', 'asc')

    return response.ok({
      data: tags,
      message: 'Tags retrieved successfully'
    })
  }

  /**
   * POST /api/v1/tags/create
   * Create a new tag
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createTagValidator, {
      meta: {
        userId: user.id,
      }
    })

    const tag = await Tag.create({
      ...payload,
      type: 'custom',
      userId: user.id,
    })

    return response.created({
      data: tag,
      message: 'Tag created successfully'
    })
  }

  /**
   * PUT /api/v1/tags/update
   * Update a tag
   */
  async update({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updateTagValidator, {
      meta: {
        userId: user.id,
      }
    });



    const tag = await Tag.query()
      .where('id', payload.id)
      .where('userId', user.id)
      .firstOrFail()

    if (tag?.type === 'system') {
      return response.badRequest({
        message: 'System tags cannot be updated'
      })
    }

    tag.merge(payload)
    await tag.save()

    return response.ok({
      data: {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        type: tag.type,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      },
      message: 'Tag updated successfully'
    })
  }

  /**
   * DELETE /api/v1/tags/:id
   * Delete a tag
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const tag = await Tag.query()
      .where('id', params.id)
      .where('userId', user.id)
      .where('type', 'custom') // Only allow deletion of custom tags
      .firstOrFail()

    await tag.delete()

    return response.ok({ message: 'Tag deleted successfully' })
  }
}