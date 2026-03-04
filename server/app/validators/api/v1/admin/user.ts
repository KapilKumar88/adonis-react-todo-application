import vine from '@vinejs/vine'

export const createUserValidator = vine.create({
  fullName: vine.string().trim().maxLength(100).nullable().optional(),
  email: vine.string().trim().email().maxLength(254).unique({ table: 'users', column: 'email' }),
  password: vine.string().minLength(8).maxLength(32),
  roleId: vine.number().positive().nullable().optional(),
})

export const updateUserValidator = vine.create({
  fullName: vine.string().trim().maxLength(100).nullable().optional(),
  email: vine.string().trim().email().maxLength(254).optional(),
  roleId: vine.number().positive().nullable().optional(),
})
