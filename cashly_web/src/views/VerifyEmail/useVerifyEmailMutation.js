import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '@/api/services'

export const useVerifyEmailMutation = () => {
    const router = useRouter()

    const notifySuccess = () =>
        toast.success('Adres email został pomyślnie zweryfikowany')

    return useMutation(userService.verifyEmail, {
        onSuccess: () => {
            router.push('/expenses').then(() => {
                router.reload()
                notifySuccess()
            })
        },
        onError: () => {
            notifyUnhandledError()
            router.push('/expenses')
        },
    })
}
