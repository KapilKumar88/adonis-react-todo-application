import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { loginAdminValidator } from '#validators/api/v1/admin/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
    async login({ request, serialize }: HttpContext) {
        const { email, password } = await request.validateUsing(loginAdminValidator)

        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)

        return serialize({
            user: UserTransformer.transform(user),
            token: token.value!.release(),
        })
    }
}