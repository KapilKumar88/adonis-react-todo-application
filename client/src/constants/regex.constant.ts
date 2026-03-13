const REGEX = Object.freeze({
    PASSWORD_REGEX: {
        PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        MESSAGE: 'Password must contain uppercase, lowercase, number, and special character.'
    }
});

export default REGEX;