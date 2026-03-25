import vine from '@vinejs/vine'

export const createUserValidator = vine.create({
  fullName: vine.string().trim().maxLength(100).alphaNumeric({
    allowDashes: true,
    allowSpaces: true
  }),
  email: vine.string().trim().email().maxLength(254).unique({ table: 'users', column: 'email' }),
  roleId: vine.string().trim().uuid().validateIds({ table: 'roles', column: 'id' }),
})

export const updateUserValidator = vine.create({
  fullName: vine.string().trim().maxLength(100).alphaNumeric({
    allowDashes: true,
    allowSpaces: true
  }),
  email: vine.string().trim().email().maxLength(254),
  roleId: vine.string().trim().uuid().validateIds({ table: 'roles', column: 'id' }),
})
