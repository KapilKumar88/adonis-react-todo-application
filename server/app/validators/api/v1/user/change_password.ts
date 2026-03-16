import vine from '@vinejs/vine'
import { passwordRules } from './auth.ts'

export const changePasswordValidator = vine.create({
  currentPassword: vine.string().trim(),
  newPassword: passwordRules(),
  confirmPassword: passwordRules().sameAs('newPassword'),
})
