import * as yup from 'yup';

export const upsertUserSchema = yup.object({
  fullName: yup.string().trim().required('Full name is required').matches(/^[a-zA-Z0-9\s]*$/, 'Full name can only contain letters, numbers, and spaces'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  roleId: yup.string().trim().required('Role is required'),
});

export type UpsertUserFormValues = yup.InferType<typeof upsertUserSchema>;