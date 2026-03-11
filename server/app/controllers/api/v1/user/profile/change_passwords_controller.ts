import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { changePasswordValidator } from '#validators/api/v1/user/change_password'

export default class ChangePasswordsController {
  async update({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { currentPassword, newPassword } = await request.validateUsing(changePasswordValidator)

    const isValid = await hash.verify(user.password, currentPassword)
    if (!isValid) {
      return response.unprocessableEntity({
        errors: [{ message: 'Current password is incorrect.' }],
      })
    }

    user.password = newPassword
    await user.save()

    return response.ok({ message: 'Password changed successfully.' })
  }
}