import vine from '@vinejs/vine'

export const userProfileValidator = vine.create({
    fullName: vine.string().trim().alphaNumeric({ allowDashes: true, allowSpaces: true }).minLength(3).maxLength(100).optional(),
    bio: vine.string().trim().maxLength(500).nullable().optional(),
})
