import { withAuth } from './withAuth'

export const withUnauthenticatedUser = (PageComponent) =>
    withAuth(PageComponent, (session) => session, '/')
