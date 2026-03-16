import User from '#models/user'
import { signupValidator } from '#validators/api/v1/user/auth'
import { type HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { DefaultSystemRoles } from '#constants/role.contants'
import Role from '#models/role'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import WelcomeNotification from '#mails/welcome_notification'

export default class NewAccountController {
  async store({ request, serialize, response }: HttpContext) {
    const trx = await db.transaction();
    const { fullName, email, password } = await request.validateUsing(signupValidator)
    try {

      const user = await User.create({ fullName, email, password }, {
        client: trx,
      })
      const role = await Role.query({ client: trx }).where('name', DefaultSystemRoles.USER).preload('permissions', (qb) => qb.select('name')).firstOrFail()
      await user.related('roles').attach([role.id]) // Assign default 'user' role to the new account

      await trx.commit()

      // Access token must be created after commit — DbAccessTokensProvider
      // doesn't support transactions, so the user row must be visible first.
      const token = await User.accessTokens.create(user, role.permissions.map((p) => p.name))

      // Send welcome email (fire-and-forget)
      mail.send(new WelcomeNotification({ email, userName: fullName }))

      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    } catch (error) {
      await trx.rollback()
      return response.internalServerError({
        message: 'An error occurred while creating the account',
        errors: error.message || [{ message: 'Internal server error' }],
      })
    }
  }
}
