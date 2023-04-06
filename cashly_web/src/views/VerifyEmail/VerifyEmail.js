import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useVerifyEmailMutation } from './useVerifyEmailMutation'

export default function VerifyEmail() {
    const router = useRouter()
    const mutation = useVerifyEmailMutation()

    useEffect(() => {
        const { emailVerificationToken } = router.query
        emailVerificationToken && mutation.mutate({ emailVerificationToken })
    }, [router.query])

    return null
}
