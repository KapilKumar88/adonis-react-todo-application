import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'
import { appName } from '#config/app'

interface ResetPasswordMailData {
  email: string
  token: string
  userName?: string
}

export default class ResetPasswordNotification extends BaseMail {
  subject = `Reset Your Password — ${appName}`

  private readonly data: ResetPasswordMailData

  constructor(data: ResetPasswordMailData) {
    super()
    this.data = data
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const frontendUrl = env.get('FRONTEND_URL')
    const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(this.data.token)}`
    const displayName = this.data.userName ?? 'there'

    this.message
      .to(this.data.email)
      .htmlView('email_templates/reset_password', { appName, displayName, resetUrl, date: new Date().getFullYear() })
  }
}