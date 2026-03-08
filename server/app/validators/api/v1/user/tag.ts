import vine from '@vinejs/vine'

export const createTagValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(50),
  color: vine.string().trim().regex(/^#[0-9a-fA-F]{6}$/).optional(),
})

export const updateTagValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(50).optional(),
  color: vine.string().trim().regex(/^#[0-9a-fA-F]{6}$/).nullable().optional(),
})
