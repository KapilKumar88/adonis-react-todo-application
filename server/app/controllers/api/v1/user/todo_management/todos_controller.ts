import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import { createTodoValidator, deleteTodoValidator, getTodosValidator, updateTodoValidator } from '#validators/api/v1/user/todo'
import TodoTransformer from '#transformers/todo_transformer'
import { logFromContext } from '#helpers/common.helper'
import db from '@adonisjs/lucid/services/db'

export default class TodosController {
  /**
   * GET /api/v1/todos
   * List all todos for the authenticated user (with pagination & filters)
   */
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(getTodosValidator);

    const query = Todo.query()
      .where('userId', user.id)
      .preload('tags')

    const { page, limit, status, priority, search } = payload

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
      data: todos?.all().map((todo) => new TodoTransformer(todo).toObject()),
      message: 'Todos retrieved successfully',
    })
  }

  /**
   * POST /api/v1/todos
   * Create a new todo
   */
  async store(ctx: HttpContext) {
    const { auth, request, response } = ctx
    const user = auth.getUserOrFail()
    const { tagIds, ...payload } = await request.validateUsing(createTodoValidator, {
      meta: {
        userId: user.id,
      }
    })
    const trx = await db.transaction();
    try {
      const todo = await Todo.create({
        ...payload,
        userId: user.id,
      }, {
        client: trx,
      })

      if (tagIds?.length) {
        await todo.related('tags').attach(tagIds)
      }

      await todo.load('tags')

      logFromContext(ctx, {
        action: 'Created todo',
        description: `${user.fullName} created todo — ${todo.title}`,
        status: 'success',
        resource: 'Todos',
      })

      await trx.commit();

      return response.created({
        data: new TodoTransformer(todo).toObject(),
        message: 'Todo created successfully',
      })
    } catch (error) {
      trx.rollback()
      return response.internalServerError({
        message: 'An error occurred while creating the todo',
        errors: error.message || [{ message: 'Internal server error' }],
      })
    }
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

    return response.ok({
      data: new TodoTransformer(todo).toObject(),
      message: 'Todo retrieved successfully',
    })
  }

  /**
   * PUT /api/v1/todos/:id
   * Update a todo
   */
  async update(ctx: HttpContext) {
    const { auth, params, request, response } = ctx
    const user = auth.getUserOrFail()
    const { tagIds, ...payload } = await request.validateUsing(updateTodoValidator, {
      meta: { userId: user.id },
    });


    const todo = await Todo.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail();

    todo.merge(payload)
    await todo.save()

    if (tagIds !== undefined) {
      await todo.related('tags').sync(tagIds)
    }

    await todo.load('tags')

    logFromContext(ctx, {
      action: 'Updated todo',
      description: `${user.fullName} updated todo — ${todo.title}`,
      status: 'success',
      resource: 'Todos',
    })

    return response.ok({
      data: new TodoTransformer(todo).toObject(),
      message: 'Todo updated successfully',
    })
  }

  /**
   * DELETE /api/v1/todos/:id
   * Delete a todo
   */
  async destroy(ctx: HttpContext) {
    const { auth, request, response } = ctx
    const user = auth.getUserOrFail()
    const { ids: rawIds } = await request.validateUsing(deleteTodoValidator)
    const ids = Array.isArray(rawIds) ? rawIds : [rawIds]

    const deletedCount = await Todo.query()
      .where('userId', user.id)
      .whereIn('id', ids)
      .delete()

    if (!deletedCount[0]) {
      return response.notFound({ message: 'No matching todos found' })
    }

    logFromContext(ctx, {
      action: deletedCount[0] === 1 ? 'Deleted todo' : 'Bulk deleted todos',
      description: `${user.fullName} deleted ${deletedCount[0]} todo(s)`,
      status: 'success',
      resource: 'Todos',
    })

    return response.ok({
      message: `${deletedCount[0]} todo(s) deleted successfully`,
    })
  }
}