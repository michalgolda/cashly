import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '@/api/services'
import Button from '@/components/Button/Button'
import Footer from '@/components/Footer/Footer'
import Informer from '@/components/Informer/Informer'
import PageMain from '@/components/PageMain/PageMain'
import Sidebar from '@/components/Sidebar/Sidebar'

import { StyledContent, StyledMain } from './MainLayout.styled'

function UnVerified({ userEmail }) {
    const notifySuccess = () =>
        toast.success('Link weryfikacyjny został wysłany')

    const mutation = useMutation(userService.sendEmailVerificationRequest, {
        onSuccess: () => notifySuccess(),
        onError: () => notifyUnhandledError(),
    })

    return (
        <PageMain>
            <Informer
                text="Aby móc w pełni korzystać z aplikacji musisz zweryfikować swoje konto poprzez kliknięcie w link, który zostanie przesłany po kliknięciu w ponniższy przycisk"
                illustration={<Image src="email.svg" alt="email" fill />}
                bottomElement={
                    <Button
                        onClick={() => mutation.mutate({ email: userEmail })}
                    >
                        Aktywuj
                    </Button>
                }
            />
        </PageMain>
    )
}

export default function MainLayout({ children, ...props }) {
    const { data: session } = useSession()

    const email = session && session.user.email
    const emailIsVerified = session && session.user.email_is_verified

    const onLogout = () => signOut({ callbackUrl: '/login' })

    return (
        <StyledMain {...props}>
            <Sidebar userEmail={email} onLogout={onLogout} />
            <StyledContent>
                {session ? (
                    <>
                        {emailIsVerified ? (
                            children
                        ) : (
                            <UnVerified userEmail={email} />
                        )}
                    </>
                ) : (
                    children
                )}
                <Footer />
            </StyledContent>
        </StyledMain>
    )
}
