import { toast } from 'react-toastify'

export const notifyUnhandledError = () =>
    toast.error('Coś poszło nie tak. Spróbuj ponownie.')
