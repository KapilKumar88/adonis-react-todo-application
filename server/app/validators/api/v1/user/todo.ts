import Todo, { TODO_PRIORITIES, TODO_STATUSES } from '#models/todo'
import vine from '@vinejs/vine'


export const getTodosValidator = vine.create({
  page: vine.number().nonNegative().min(1),
  limit: vine.number().nonNegative().min(1).max(100),
  status: vine.enum(Object.values(TODO_STATUSES)).optional(),
  priority: vine.enum(Object.values(TODO_PRIORITIES)).optional(),
  search: vine.string().trim().maxLength(255).optional(),
  sortBy: vine.enum(Todo.$columns).optional(),
  sortDirection: vine.enum(['asc', 'desc'] as const).optional(),
})


export const createTodoValidator = vine.withMetaData<{ userId: string }>().create({
  title: vine.string().trim().minLength(1).maxLength(255),
  description: vine.string().trim().maxLength(5000).nullable().optional(),
  priority: vine.enum(Object.values(TODO_PRIORITIES)).optional(),
  status: vine.enum(Object.values(TODO_STATUSES)).optional(),
  dueDate: vine.date().nullable().optional(),
  tagIds: vine.array(vine.string().uuid().validateIds({ table: 'tags', column: 'id', userIdColumn: 'user_id' })).optional(),
})

export const updateTodoValidator = vine.withMetaData<{ userId: string }>().create({
  title: vine.string().trim().minLength(1).maxLength(255).optional(),
  description: vine.string().trim().maxLength(5000).nullable().optional(),
  priority: vine.enum(Object.values(TODO_PRIORITIES)).optional(),
  status: vine.enum(Object.values(TODO_STATUSES)).optional(),
  dueDate: vine.date().nullable().optional(),
  tagIds: vine.array(vine.string().uuid().validateIds({ table: 'tags', column: 'id', userIdColumn: 'user_id' })).optional(),
})


export const deleteTodoValidator = vine.create({
  ids: vine.unionOfTypes([
    vine.array(vine.string().uuid()).minLength(1),
    vine.string().uuid(),
  ]),
})