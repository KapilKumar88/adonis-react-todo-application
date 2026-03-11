import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { changePasswordValidator } from '#validators/api/v1/user/change_password'
import { logFromContext } from '#helpers/common.helper'

export default class ChangePasswordsController {
  async update(ctx: HttpContext) {
    const { auth, request, response } = ctx
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

    await logFromContext(ctx, {
      action: 'Changed password',
      description: `${user.fullName} changed password`,
      status: 'success',
      resource: 'Auth',
    })

    return response.ok({ message: 'Password changed successfully.' })
  }
}