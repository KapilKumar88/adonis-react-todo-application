import * as yup from 'yup';

export const profileUpdateSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters.')
    .max(100, 'Name must be at most 100 characters.')
    .required('Full name is required.'),
  bio: yup
    .string()
    .trim()
    .max(500, 'Bio must be at most 500 characters.')
    .default(''),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .trim()
    .required('Current password is required.'),
  newPassword: yup
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters.')
    .max(32, 'Password must be at most 32 characters.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain uppercase, lowercase, number, and special character.'
    )
    .required('New password is required.'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('newPassword')], 'Passwords must match.')
    .required('Please confirm your new password.'),
});
