import Link from 'next/link'

import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

import Text from '../components/Text/Text'
import Form from './components/Form'

export default function Register() {
    return (
        <AuthLayout>
            <h2>Utwórz nowe konto</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Form />
            <Text>
                Posiadasz konto ? <Link href="/login">Zaloguj się</Link>
            </Text>
        </AuthLayout>
    )
}
