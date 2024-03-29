import Link from 'next/link'
import { useRouter } from 'next/router'

import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

import Container from '../Auth/components/Container'
import FormFooter from '../Auth/components/FormFooter'
import FormHeader from '../Auth/components/FormHeader/FormHeader'
import ProceedForm from './components/ProceedForm/ProceedForm'
import RequestForm from './components/RequestForm/RequestForm'
import { PasswordRecoveryProvider } from './context'
import { usePasswordRecoveryProvider } from './usePasswordRecoveryProvider'

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
            <Container>
                <PasswordRecoveryProvider provider={passwordRecoveryProvider}>
                    {showPasswordRecoveryRequestForm && (
                        <>
                            <FormHeader
                                title="Resetowanie hasła"
                                description={`
                                    Na podany adres zostanie wysłana wiadomość z
                                    odnośnikiem, który przekieruje Cię do formularza zmiany hasła.
                                `}
                            />
                            <RequestForm />
                            <FormFooter>
                                <Link href="/login">Powrót</Link>
                            </FormFooter>
                        </>
                    )}
                    {showPasswordRecoveryProceedForm && (
                        <>
                            <FormHeader
                                title="Resetowanie hasła"
                                description={`
                                    Wprowadź nowe hasło, które chcesz ustawić. Upewnij się, że używasz silnego hasła.`}
                            />
                            <ProceedForm />
                            <FormFooter>
                                <Link href="/login">Powrót</Link>
                            </FormFooter>
                        </>
                    )}
                </PasswordRecoveryProvider>
            </Container>
        </AuthLayout>
    )
}
