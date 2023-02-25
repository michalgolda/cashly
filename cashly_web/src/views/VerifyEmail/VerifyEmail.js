import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

export default function VerifyEmail() {
    const notifyVerifyEmailSuccess = () =>
        toast.success('Adres email został pomyślnie potwierdzony')

    const verifyEmailMutation = useMutation(userService.verifyEmail, {
        onSuccess: () => {
            router.push('/expenses').then(() => {
                router.reload()
                notifyVerifyEmailSuccess()
            })
        },
        onError: () => {
            notifyUnhandledError()
            router.push('/expenses')
        },
    })

    const router = useRouter()

    useEffect(() => {
        const { emailVerificationToken } = router.query
        emailVerificationToken &&
            verifyEmailMutation.mutate({ emailVerificationToken })
    }, [router.query])

    return null
}
