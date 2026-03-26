import vine from '@vinejs/vine'

export const updatePermissionValidator = vine.create({
  roleId: vine.string().uuid().validateIds({ table: 'roles', column: 'id' }).trim(),
  attach: vine.boolean()
})
