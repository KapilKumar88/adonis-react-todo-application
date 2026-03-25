import vine from '@vinejs/vine'

export const createPermissionValidator = vine.create({
  name: vine
    .string()
    .trim()
    .maxLength(100)
    .regex(/^[a-z0-9_:]+$/)
    .unique({ table: 'permissions', column: 'name' }),
  displayName: vine
    .string()
    .trim()
    .maxLength(150)
    .alphaNumeric({ allowUnderscores: true, allowDashes: true, allowSpaces: true }),
  description: vine
    .string()
    .trim()
    .maxLength(500)
    .alphaNumeric({ allowUnderscores: true, allowDashes: true, allowSpaces: true })
    .nullable()
    .optional(),
})
