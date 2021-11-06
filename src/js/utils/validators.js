const EMAIL_REGEX = /^[^\@]+@[^\.]+\..+[^\.]+$/;
const USERNAME_REGEX = /^[_a-zA-Z0-9]+$/;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_RULES = {
  charCount: (password) => password.length >= 6,
  containsCapital: (password) => /[A-Z]/.test(password),
  containsNumber: (password) => /[0-9]/.test(password),
};

export function validateEmail(email = '') {
  return !!(email && EMAIL_REGEX.test(email));
}

export function validateUsername(username = '') {
  return !!(username && USERNAME_REGEX.test(username) && username.length <= USERNAME_MAX_LENGTH);
}

export function validatePassword(password = '') {
  return !!(password && Object.keys(PASSWORD_RULES).every((key) => PASSWORD_RULES[key](password)));
}
