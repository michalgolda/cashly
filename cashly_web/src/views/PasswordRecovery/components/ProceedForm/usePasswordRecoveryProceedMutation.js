import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { authService } from '@/api/services'

export const usePasswordProceedMutation = () => {
    const router = useRouter()

    const notifySuccess = () =>
        toast.success('Hasło zostało pomyślnie zmienione')

    return useMutation(authService.passwordRecoveryProceed, {
        onSuccess: () => {
            router.push('/login')
            notifySuccess()
        },
        onError: () => {
            notifyUnhandledError()
        },
    })
}
