import vine from '@vinejs/vine'

const password = () =>
  vine
    .string()
    .trim()
    .minLength(8)
    .maxLength(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)

export const changePasswordValidator = vine.create({
  currentPassword: vine.string().trim(),
  newPassword: password(),
  confirmPassword: password().sameAs('newPassword'),
})
