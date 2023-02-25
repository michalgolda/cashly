import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

import EmailVerificationReminder from '@/components/EmailVerificationReminder/EmailVerificationReminder'
import { useEmailVerificationReminder } from '@/components/EmailVerificationReminder/useEmailVerificationReminder'
import Footer from '@/components/Footer/Footer'
import Sidebar from '@/components/Sidebar/Sidebar'

import { StyledContent, StyledMain } from './MainLayout.styled'

export default function MainLayout({ children, ...props }) {
    const { data: session } = useSession()
    const emailVerificationReminder = useEmailVerificationReminder()

    const email = session && session.user.email
    const emailIsVerified = session && session.user.email_is_verified

    const onLogout = () =>
        signOut({ callbackUrl: '/login' }).then(() =>
            emailVerificationReminder.reset()
        )

    return (
        <StyledMain {...props}>
            <Sidebar userEmail={email} onLogout={onLogout} />
            <StyledContent>
                {!emailIsVerified && (
                    <EmailVerificationReminder
                        email={email}
                        onHide={() => emailVerificationReminder.hide()}
                        isHidden={emailVerificationReminder.isHidden}
                    />
                )}
                {children}
                <Footer />
            </StyledContent>
        </StyledMain>
    )
}
