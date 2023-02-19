import Link from 'next/link'

import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

import Text from '../components/Text/Text'
import Form from './components/Form'

export default function Login() {
    return (
        <AuthLayout>
            <h2>Zaloguj się</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Form />
            <Text>
                Jeszcze nie posiadasz konta?{' '}
                <Link href="/register">Zarejestruj się</Link>
            </Text>
            <Text>
                Zapomniałeś hasło?{' '}
                <Link href="/passwordrecovery"> Zresetuj hasło</Link>
            </Text>
        </AuthLayout>
    )
}
