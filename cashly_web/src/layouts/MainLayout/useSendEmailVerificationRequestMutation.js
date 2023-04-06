import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

export const useSendEmailVerificationRequestMutation = () => {
    const notifySuccess = () =>
        toast.success('Link weryfikacyjny został wysłany')

    return useMutation(userService.sendEmailVerificationRequest, {
        onSuccess: () => notifySuccess(),
        onError: () => notifyUnhandledError(),
    })
}
