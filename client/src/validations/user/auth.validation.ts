import REGEX from '@/constants/regex.constant';
import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .trim()
    .required('Password is required.'),
});

export const signupSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters.')
    .max(100, 'Name must be at most 100 characters.')
    .required('Full name is required.'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters.')
    .max(32, 'Password must be at most 32 characters.')
    .matches(
      REGEX.PASSWORD_REGEX.PATTERN,
      REGEX.PASSWORD_REGEX.MESSAGE
    )
    .required('Password is required.'),
  passwordConfirmation: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Please confirm your password.'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms & conditions.')
    .required(),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
});
