import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

import Footer from '@/components/Footer/Footer'
import Sidebar from '@/components/Sidebar/Sidebar'

import { StyledContent, StyledMain } from './MainLayout.styled'

export default function MainLayout({ children, ...props }) {
    const { data: session } = useSession()
    const onLogout = () => signOut({ callbackUrl: '/login' })

    return (
        <StyledMain {...props}>
            <Sidebar
                userEmail={session && session.user.email}
                onLogout={onLogout}
            />
            <StyledContent>
                {children}
                <Footer />
            </StyledContent>
        </StyledMain>
    )
}
