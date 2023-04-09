import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { authService } from '@/api/services'

export const useRegisterMutation = () => {
    const router = useRouter()

    const notifyRegisterSuccess = () =>
        toast.success(
            'Konto zostało pomyślnie utworzone. Na podany adres email został wysłany link aktywacyjny'
        )

    return useMutation(
        (payload = { email, password }) => authService.register(payload),
        {
            onSuccess: () => {
                router.push('/login')
                notifyRegisterSuccess()
            },
            onError: ({ response }) => {
                if (response) {
                    const { code, message } = response.data
                    if (code === 'UserEmailAlreadyUsedError') {
                        toast.warning(message)
                        return
                    }
                }
                notifyUnhandledError()
            },
        }
    )
}
