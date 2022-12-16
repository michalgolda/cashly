export const getUsernameFromEmail = (email) => email.split('@')[0];

export const getLetterFromEmail = (email) =>
  getUsernameFromEmail(email)[0].toUpperCase();
