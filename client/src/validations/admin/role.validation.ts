import * as yup from 'yup';

export const upsertRoleSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be at most 50 characters.')
    .matches(/^[a-z0-9_-]+$/, 'Name must be lowercase letters, numbers, hyphens or underscores only.'),
  displayName: yup
    .string()
    .trim()
    .min(2, 'Display name must be at least 2 characters.')
    .max(100, 'Display name must be at most 100 characters.'),
  description: yup
    .string()
    .trim()
    .max(255, 'Description must be at most 255 characters.')
    .nullable()
    .optional(),
  permissions: yup
    .array()
    .of(yup.string().uuid('Invalid permission ID format.'))
    .min(1, 'At least one permission must be selected.')
});

export type UpsertRoleFormValues = yup.InferType<typeof upsertRoleSchema>;