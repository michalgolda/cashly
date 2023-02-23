import { useRouter } from 'next/router'

import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

import ProceedForm from './components/ProceedForm'
import RequestForm from './components/RequestForm'
import { PasswordRecoveryProvider } from './context'
import { usePasswordRecoveryProvider } from './hooks/usePasswordRecoveryProvider'

export default function PasswordRecovery() {
    const router = useRouter()
    const { password_recovery_token: passwordRecoveryToken } = router.query

    const passwordRecoveryProvider = usePasswordRecoveryProvider(
        passwordRecoveryToken
    )
    const { showPasswordRecoveryRequestForm, showPasswordRecoveryProceedForm } =
        passwordRecoveryProvider

    return (
        <AuthLayout>
            <PasswordRecoveryProvider provider={passwordRecoveryProvider}>
                {showPasswordRecoveryRequestForm && <RequestForm />}
                {showPasswordRecoveryProceedForm && <ProceedForm />}
            </PasswordRecoveryProvider>
        </AuthLayout>
    )
}
