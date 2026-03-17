import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'

type Options = {
  table: string
  column: string
  userIdColumn?: string
}

async function validateIds(
  value: unknown,
  options: Options,
  field: FieldContext
) {
  // Accept only string or array of strings
  if (typeof value !== 'string' && !Array.isArray(value)) return

  const ids = Array.isArray(value) ? value : [value]

  if (ids.length === 0) return

  // Only check string values (skip non-strings in the array)
  const stringIds = ids.filter((id): id is string => typeof id === 'string')

  const rows = await db
    .from(options.table)
    .whereIn(options.column, stringIds)
    .if(Boolean(options.userIdColumn), (q) => q.where(options.userIdColumn!, (field.meta as any)?.userId))
    .select(options.column)

  const foundIds = new Set(rows.map((row) => row[options.column]))
  const missingIds = stringIds.filter((id) => !foundIds.has(id))

  if (missingIds.length > 0) {
    field.report(
      `The following {{ field }} do not exist: ${missingIds.join(', ')}`,
      'validateIds',
      field
    )
  }
}

export const validateIdsRule = vine.createRule(validateIds)