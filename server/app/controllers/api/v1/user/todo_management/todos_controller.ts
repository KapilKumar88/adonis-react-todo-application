import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import { createTodoValidator, updateTodoValidator } from '#validators/api/v1/user/todo'
import TodoTransformer from '#transformers/todo_transformer'

export default class TodosController {
  /**
   * GET /api/v1/todos
   * List all todos for the authenticated user (with pagination & filters)
   */
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const status = request.input('status')
    const priority = request.input('priority')
    const search = request.input('search')

    const query = Todo.query()
      .where('userId', user.id)
      .preload('tags')

    if (status) {
      query.where('status', status)
    }
    if (priority) {
      query.where('priority', priority)
    }
    if (search) {
      query.where((q) => {
        q.whereILike('title', `%${search}%`)
          .orWhereILike('description', `%${search}%`)
      })
    }

    const todos = await query.orderBy('created_at', 'desc').paginate(page, limit)

    return response.ok({
      meta: todos.getMeta(),
      data: todos.all().map((todo) => TodoTransformer.transform(todo)),
    })
  }

  /**
   * POST /api/v1/todos
   * Create a new todo
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { tagIds, ...payload } = await request.validateUsing(createTodoValidator)

    const todo = await Todo.create({
      ...payload,
      userId: user.id,
    })

    if (tagIds?.length) {
      await todo.related('tags').attach(tagIds)
    }

    await todo.load('tags')

    return response.created(TodoTransformer.transform(todo))
  }

  /**
   * GET /api/v1/todos/:id
   * Show a single todo
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query()
      .where('id', params.id)
      .where('userId', user.id)
      .preload('tags')
      .firstOrFail()

    return response.ok(TodoTransformer.transform(todo))
  }

  /**
   * PUT /api/v1/todos/:id
   * Update a todo
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    const { tagIds, ...payload } = await request.validateUsing(updateTodoValidator)

    todo.merge(payload)
    await todo.save()

    if (tagIds !== undefined) {
      await todo.related('tags').sync(tagIds)
    }

    await todo.load('tags')

    return response.ok(TodoTransformer.transform(todo))
  }

  /**
   * DELETE /api/v1/todos/:id
   * Delete a todo
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    await todo.delete()

    return response.ok({ message: 'Todo deleted successfully' })
  }
}