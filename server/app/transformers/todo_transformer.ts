import { BaseTransformer } from '@adonisjs/core/transformers'
import type Todo from '#models/todo'
import TagTransformer from '#transformers/tag_transformer'

export default class TodoTransformer extends BaseTransformer<Todo> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'description',
        'priority',
        'status',
        'dueDate',
        'createdAt',
        'updatedAt',
      ]),
      tags: this.resource?.tags
        ? this.resource.tags.map((tag) => TagTransformer.transform(tag))
        : [],
    }
  }
}
