import vine from '@vinejs/vine'


export const upsertRoleValidator = vine.withMetaData<{ roleId?: string }>().create({
    name: vine.string().trim().maxLength(50).alpha({ allowUnderscores: true })
        .unique({
            table: 'roles',
            column: 'name',
            filter: (db, value, field) => {
                if (field.meta.roleId) {
                    db.where('name', value).whereNot('id', field.meta.roleId).first()
                }
            }
        }),
    displayName: vine.string().trim().maxLength(100).alphaNumeric({ allowUnderscores: true, allowDashes: true, allowSpaces: true }),
    description: vine.string().trim().maxLength(500).alphaNumeric({ allowUnderscores: true, allowDashes: true, allowSpaces: true }).nullable(),
    permissions: vine.array(vine.string().uuid().validateIds({ table: 'permissions', column: 'id' })).optional(),
})