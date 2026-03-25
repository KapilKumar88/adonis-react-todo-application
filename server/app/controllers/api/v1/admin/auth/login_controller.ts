import User from '#models/user'
import UserForAdminTransformer from '#transformers/admin/user_for_admin_transformer'
import { loginAdminValidator } from '#validators/api/v1/admin/login'
import type { HttpContext } from '@adonisjs/core/http'
import { logActivity } from '#helpers/common.helper'

export default class LoginController {
    async login({ request, serialize }: HttpContext) {
        const { email, password } = await request.validateUsing(loginAdminValidator)

        const user = await User.verifyCredentials(email, password)
        await user.load('roles', (q) => q.preload('permissions'));
        const token = await User.accessTokens.create(user, user.roles.flatMap((r) => r.permissions.map((p) => p.name)))

        logActivity({
            action: 'Logged in',
            description: `${user.fullName} logged in — item admin panel`,
            status: 'success',
            resource: 'Auth',
            userId: user.id,
            ip: request.ip(),
            userAgent: request.header('user-agent'),
        })

        return serialize({
            user: UserForAdminTransformer.transform(user),
            token: token.value!.release(),
            message: 'Login successful',
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