import { getServerSession } from 'next-auth'

import { authOptions } from './authOptions'

export function withSession(handler) {
    return async function getServerSidePropsWithSession(ctx) {
        const session = await getServerSession(ctx.req, ctx.res, authOptions)

        Object.defineProperty(ctx.req, 'session', {
            value: session,
        })

        return handler(ctx)
    }
}
