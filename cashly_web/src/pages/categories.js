import Meta from '@/components/Meta'
import { withAuthenticatedUser } from '@/lib/withAuthenticatedUser'
import Categories from '@/views/Categories/Categories'

export default function CategoriesPage() {
    return (
        <>
            <Meta title="Kategorie" />
            <Categories />
        </>
    )
}

export const getServerSideProps = withAuthenticatedUser()
