import { withAuth } from './withAuth'

export const withAuthenticatedUser = (PageComponent) =>
    withAuth(PageComponent, (session) => !session, '/login')
