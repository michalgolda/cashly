import Meta from '@/components/Meta'
import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import Login from '@/views/Auth/Login/Login'

export default function LoginPage() {
    return (
        <>
            <Meta title="Logowanie" />
            <Login />
        </>
    )
}

export const getServerSideProps = withUnauthenticatedUser()
