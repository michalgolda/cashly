import { getUsernameFromEmail } from './getUsernameFromEmail'

export const getLetterFromEmail = (email) =>
    getUsernameFromEmail(email)[0].toUpperCase()
