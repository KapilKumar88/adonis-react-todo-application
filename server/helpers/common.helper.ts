import ActivityLog from '#models/activity_log'
import type { HttpContext } from '@adonisjs/core/http'

export type LogStatus = 'success' | 'failure' | 'warning' | 'info'
export type LogResource = 'Auth' | 'Todos' | 'Users' | 'Roles' | 'Permissions' | 'Settings' | 'Logs' | 'Tags' | 'Profile'

interface LogActivityOptions {
  action: string
  description?: string
  status: LogStatus
  resource: LogResource
  userId: string
  ip?: string | null
  userAgent?: string | null
}

export async function logActivity(options: LogActivityOptions): Promise<ActivityLog> {
  return ActivityLog.create({
    action: options.action,
    description: options.description ?? null,
    status: options.status,
    resource: options.resource,
    userId: options.userId,
    ip: options.ip ?? null,
    userAgent: options.userAgent ?? null,
  })
}

export function logFromContext(ctx: HttpContext, options: Omit<LogActivityOptions, 'userId' | 'ip' | 'userAgent'>): Promise<ActivityLog> {
  const user = ctx.auth.user
  return logActivity({
    ...options,
    userId: user!.id,
    ip: ctx.request.ip(),
    userAgent: ctx.request.header('user-agent') ?? null,
  })
}