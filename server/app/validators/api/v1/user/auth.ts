import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().trim().email().maxLength(254);
const password = () => vine.string().trim().minLength(8).maxLength(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/); //'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
    fullName: vine.string().trim().alphaNumeric({ allowDashes: true, allowSpaces: true }).minLength(3).maxLength(100),
    email: email().unique({ table: 'users', column: 'email' }),
    password: password(),
    passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
    email: email(),
    password: vine.string().trim(),
})

/**
 * Validator for forgot-password request
 */
export const forgotPasswordValidator = vine.create({
    email: email(),
})

/**
 * Validator for reset-password request
 */
export const resetPasswordValidator = vine.create({
    token: vine.string().trim(),
    email: email(),
    password: password(),
    passwordConfirmation: password().sameAs('password'),
})
