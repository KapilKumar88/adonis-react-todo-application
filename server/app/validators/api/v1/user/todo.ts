import vine from '@vinejs/vine'

export const createTodoValidator = vine.create({
  title: vine.string().trim().minLength(1).maxLength(255),
  description: vine.string().trim().maxLength(5000).nullable().optional(),
  priority: vine.enum(['low', 'medium', 'high']).optional(),
  status: vine.enum(['pending', 'in_progress', 'completed', 'backlog', 'icebox']).optional(),
  dueDate: vine.date().nullable().optional(),
  tagIds: vine.array(vine.string().uuid()).optional(),
})

export const updateTodoValidator = vine.create({
  title: vine.string().trim().minLength(1).maxLength(255).optional(),
  description: vine.string().trim().maxLength(5000).nullable().optional(),
  priority: vine.enum(['low', 'medium', 'high']).optional(),
  status: vine.enum(['pending', 'in_progress', 'completed', 'backlog', 'icebox']).optional(),
  dueDate: vine.date().nullable().optional(),
  tagIds: vine.array(vine.string().uuid()).optional(),
})


export const deleteTodoValidator = vine.create({
  ids: vine.unionOfTypes([
    vine.array(vine.string().uuid()).minLength(1),
    vine.string().uuid().transform((id) => [id]),
  ]),
})