import vine from '@vinejs/vine'

export const userPaginationValidator = vine.create({
    page: vine.number().min(1),
    limit: vine.number().min(1).max(100),
    sortBy: vine.enum(['createdAt', 'updatedAt'] as const).optional(),
    sortOrder: vine.enum(['asc', 'desc'] as const).optional(),
    search: vine.string().trim().optional(),
    role: vine.string().uuid().validateIds({ table: 'roles', column: 'id' }).trim().optional(),
});


export const rolePaginationValidator = vine.create({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
});

export const permissionPaginationValidator = vine.create({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
});


export const activityLogPaginationValidator = vine.create({
    page: vine.number().min(1),
    limit: vine.number().min(1).max(100),
    sortBy: vine.enum(['createdAt', 'updatedAt'] as const).optional(),
    sortOrder: vine.enum(['asc', 'desc'] as const).optional(),
    search: vine.string().trim().optional(),
    status: vine.enum(['success', 'failure', 'warning', 'info', 'all'] as const).optional(),
    resource: vine.enum(['Auth', 'Todos', 'Users', 'Roles', 'Permissions', 'Settings', 'Logs', 'Tags', 'Profile', 'all'] as const).optional(),
});