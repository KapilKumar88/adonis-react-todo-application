import { z } from 'zod';

export const upsertRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be at most 50 characters.')
    .regex(/^[a-z0-9_-]+$/, 'Name must be lowercase letters, numbers, hyphens or underscores only.'),
  displayName: z
    .string()
    .trim()
    .min(2, 'Display name must be at least 2 characters.')
    .max(100, 'Display name must be at most 100 characters.'),
  description: z
    .string()
    .trim()
    .max(255, 'Description must be at most 255 characters.')
    .nullable()
    .optional(),
});

export type UpsertRoleFormValues = z.infer<typeof upsertRoleSchema>;
