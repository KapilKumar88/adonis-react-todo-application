import vine from '@vinejs/vine'

export const createTagValidator = vine.withMetaData<{ userId: string }>()
  .create({
    name: vine.string().trim().minLength(1).maxLength(50).unique({
      table: 'tags',
      filter: (db, value, field) => {
        db.where('user_id', field.meta.userId).where('name', value);
      }
    }),
    color: vine.string().trim().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  })

export const updateTagValidator = vine.withMetaData<{ userId: string }>()
  .create({
    id: vine.string().trim().uuid(),
    name: vine.string().trim().minLength(1).maxLength(50).unique({
      table: 'tags',
      filter: (db, value, field) => {
        db.where('user_id', field.meta.userId)
          .where('name', value)
          .whereNot('id', field.parent.id);
      }
    }).optional(),
    color: vine.string().trim().regex(/^#[0-9a-fA-F]{6}$/).nullable().optional(),
  });
