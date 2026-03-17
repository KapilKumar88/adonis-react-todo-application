import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { loginValidator } from '#validators/api/v1/user/auth'
import { logActivity } from '#helpers/common.helper'

export default class LoginController {
  async store({ request, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    await user.load('roles', (rolesQuery) => {
      rolesQuery.preload('permissions')
    })

    const permissionNames = user.roles.flatMap((role) => role.permissions.map((perm) => perm.name))
    const token = await User.accessTokens.create(user, permissionNames)

    logActivity({
      action: 'Logged in',
      description: `${user.fullName} logged in`,
      status: 'success',
      resource: 'Auth',
      userId: user.id,
      ip: request.ip(),
      userAgent: request.header('user-agent'),
    })

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async destroy({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()

    logActivity({
      action: 'Logged out',
      description: `${user.fullName} logged out`,
      status: 'success',
      resource: 'Auth',
      userId: user.id,
      ip: request.ip(),
      userAgent: request.header('user-agent'),
    })

    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }
}
