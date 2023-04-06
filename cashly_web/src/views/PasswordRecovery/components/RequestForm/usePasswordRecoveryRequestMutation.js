import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { authService } from '@/api/services'

export const usePasswordRecoveryRequestMutation = () => {
    const router = useRouter()

    const notifySuccess = () =>
        toast.success('Link do resetowania hasła został pomyślnie wysłany')

    return useMutation(authService.passwordRecoveryRequest, {
        onSuccess: () => {
            router.push('/login')
            notifySuccess()
        },
    })
}
