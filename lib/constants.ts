export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MIN_LENGTH_ERROR = "Username should be at least 5 characters long.";

export const EMAIL_EXIST_ERROR = "Email does not exist.";

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MIN_LENGTH_ERROR = "Password should be at least 10 characters long.";
export const PASSWORD_REGEX = new RegExp('^(?=.*\\d).{10,}$');
export const PASSWORD_ERROR = "Password should contain at least one number (0123456789).";