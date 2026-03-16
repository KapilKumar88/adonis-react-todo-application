import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'
import { appName } from '#config/app'

interface WelcomeMailData {
  email: string
  userName?: string
}

export default class WelcomeNotification extends BaseMail {
  subject = `Welcome to ${appName}! 🎉`

  private readonly data: WelcomeMailData

  constructor(data: WelcomeMailData) {
    super()
    this.data = data
  }

  prepare() {
    const frontendUrl = env.get('FRONTEND_URL')
    const dashboardUrl = `${frontendUrl}/dashboard`
    const displayName = this.data.userName ?? 'there'

    this.message
      .to(this.data.email)
      .htmlView('email_templates/welcome', {
        appName,
        displayName,
        dashboardUrl,
        date: new Date().getFullYear(),
      })
  }
}
