import Link from 'next/link'

import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

import Container from '../components/Container'
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader/FormHeader'
import Separator from '../components/Separator/Separator'
import Form from './components/Form'

export default function Login() {
    return (
        <AuthLayout>
            <Container>
                <FormHeader
                    title="Logowanie"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <Form />
                <FormFooter>
                    <p>
                        Jeszcze nie posiadasz konta?{' '}
                        <Link href="/register">Zarejestruj się</Link>
                    </p>
                    <Separator />
                    <p>
                        Zapomniałeś hasło?{' '}
                        <Link href="/passwordrecovery"> Zresetuj hasło</Link>
                    </p>
                </FormFooter>
            </Container>
        </AuthLayout>
    )
}
