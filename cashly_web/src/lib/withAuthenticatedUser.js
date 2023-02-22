import { withSession } from './withSession'

export const withAuthenticatedUser = (handler) =>
    withSession(async (ctx) => {
        if (!ctx.req.session) {
            return {
                redirect: {
                    destination: '/login',
                    permament: true,
                },
            }
        }
        return handler ? handler(ctx) : { props: {} }
    })
