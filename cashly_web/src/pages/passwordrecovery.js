import Meta from '@/components/Meta'
import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import PasswordRecovery from '@/views/PasswordRecovery/PasswordRecovery'

export default function PasswordRecoveryPage() {
    return (
        <>
            <Meta title="Resetowanie hasła" />
            <PasswordRecovery />
        </>
    )
}

export const getServerSideProps = withUnauthenticatedUser()
