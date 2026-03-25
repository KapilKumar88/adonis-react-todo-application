import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'
import { appName } from '#config/app'

interface AdminWelcomeMailData {
  email: string
  password: string
  userName?: string
}

export default class AdminWelcomeNotification extends BaseMail {
  subject = `Welcome to ${appName} — Your Account is Ready! 🎉`

  private readonly data: AdminWelcomeMailData

  constructor(data: AdminWelcomeMailData) {
    super()
    this.data = data
  }

  prepare() {
    const dashboardUrl = env.get('FRONTEND_URL')
    const displayName = this.data.userName ?? 'there'

    this.message
      .to(this.data.email)
      .htmlView('email_templates/admin_welcome', {
        appName,
        displayName,
        dashboardUrl,
        email: this.data.email,
        password: this.data.password,
        date: new Date().getFullYear(),
      })
  }
}
