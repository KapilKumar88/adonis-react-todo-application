import type { HttpContext } from '@adonisjs/core/http'
import Tag from '#models/tag'
import { createTagValidator, updateTagValidator } from '#validators/api/v1/user/tag'
import TagTransformer from '#transformers/tag_transformer'

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

    return response.ok(tags.map((tag) => TagTransformer.transform(tag)))
  }

  /**
   * POST /api/v1/tags
   * Create a new tag
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createTagValidator)

    const tag = await Tag.create({
      ...payload,
      type: 'custom',
      userId: user.id,
    })

    return response.created(TagTransformer.transform(tag))
  }

  /**
   * GET /api/v1/tags/:id
   * Show a single tag
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const tag = await Tag.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    return response.ok(TagTransformer.transform(tag))
  }

  /**
   * PUT /api/v1/tags/:id
   * Update a tag
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const tag = await Tag.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    const payload = await request.validateUsing(updateTagValidator)
    tag.merge(payload)
    await tag.save()

    return response.ok(TagTransformer.transform(tag))
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
      .firstOrFail()

    await tag.delete()

    return response.ok({ message: 'Tag deleted successfully' })
  }
}