import User from '#models/user'
import UserForAdminTransformer from '#transformers/admin/user_for_admin_transformer'
import { loginAdminValidator } from '#validators/api/v1/admin/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
    async login({ request, serialize }: HttpContext) {
        const { email, password } = await request.validateUsing(loginAdminValidator)

        const user = await User.verifyCredentials(email, password)
        await user.load('roles', (q) => q.preload('permissions'));
        const token = await User.accessTokens.create(user, user.roles.flatMap((r) => r.permissions.map((p) => p.name)))

        return serialize({
            user: UserForAdminTransformer.transform(user),
            token: token.value!.release(),
        })
    }
}