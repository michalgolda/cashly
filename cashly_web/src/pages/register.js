import Meta from '@/components/Meta'
import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import Register from '@/views/Auth/Register/Register'

export default function RegisterPage() {
    return (
        <>
            <Meta title="Rejestracja" />
            <Register />
        </>
    )
}

export const getServerSideProps = withUnauthenticatedUser()
