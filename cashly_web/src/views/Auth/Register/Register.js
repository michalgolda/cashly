import Link from 'next/link'

import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

import Container from '../components/Container'
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader/FormHeader'
import Form from './components/Form'

export default function Register() {
    return (
        <AuthLayout>
            <Container>
                <FormHeader
                    title="Rejestracja"
                    description={`
                        Witaj! Nasza aplikacja pomoże Ci w zarządzaniu finansami i śledzeniu wydatków.`}
                />
                <Form />
                <FormFooter>
                    <p>
                        Posiadasz juz konto ?{' '}
                        <Link href="/login">Zaloguj się</Link>
                    </p>
                </FormFooter>
            </Container>
        </AuthLayout>
    )
}
