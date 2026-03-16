import type { HttpContext } from '@adonisjs/core/http'
import { randomBytes } from 'node:crypto'
import { DateTime } from 'luxon'
import User from '#models/user'
import PasswordResetToken from '#models/password_reset_token'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/api/v1/user/auth'
import ResetPasswordNotification from '#mails/reset_password_notification'

export default class ForgotPasswordsController {
  /**
   * POST /api/v1/auth/forgot-password
   * Generates a password-reset token and (for now) logs it.
   * Always returns a success message to prevent email enumeration.
   */
  async store({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findBy('email', email)

    if (user) {
      // Delete any existing tokens for this email
      await PasswordResetToken.query().where('email', email).delete()

      // Generate a cryptographically secure token
      const plainToken = randomBytes(32).toString('hex')
      const hashedToken = await hash.make(plainToken)

      await PasswordResetToken.create({
        email,
        token: hashedToken,
        expiresAt: DateTime.now().plus({ hours: 1 }),
      })

      // Send password reset email
      mail.send(
        new ResetPasswordNotification({
          email,
          token: plainToken,
          userName: user?.fullName,
        })
      )
    }

    // Always return success to prevent email enumeration
    return response.ok({
      message: 'If an account with that email exists, a password reset link has been sent.',
    })
  }

  /**
   * POST /api/v1/auth/reset-password
   * Verifies the token and updates the user's password.
   */
  async update({ request, response }: HttpContext) {
    const { token, email, password } = await request.validateUsing(resetPasswordValidator)

    const resetToken = await PasswordResetToken.query()
      .where('email', email)
      .orderBy('created_at', 'desc')
      .first()

    if (!resetToken) {
      return response.unprocessableEntity({
        message: 'Invalid or expired reset token.',
      })
    }

    // Check expiry
    if (resetToken.isExpired) {
      await resetToken.delete()
      return response.unprocessableEntity({
        message: 'Invalid or expired reset token.',
      })
    }

    // Verify the token
    const isValid = await hash.verify(resetToken.token, token)
    if (!isValid) {
      return response.unprocessableEntity({
        message: 'Invalid or expired reset token.',
      })
    }

    // Update user password
    const user = await User.findByOrFail('email', email)
    user.password = password
    await user.save()

    // Clean up: delete all tokens for this email
    await PasswordResetToken.query().where('email', email).delete()

    // Revoke all existing access tokens for security
    const tokens = await User.accessTokens.all(user)
    for (const accessToken of tokens) {
      await User.accessTokens.delete(user, accessToken.identifier)
    }

    return response.ok({
      message: 'Password has been reset successfully. Please log in with your new password.',
    })
  }
}