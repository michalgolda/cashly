import { withSession } from './withSession'

export const withUnauthenticatedUser = (handler) =>
    withSession(async (ctx) => {
        if (ctx.req.session) {
            return {
                redirect: {
                    destination: '/',
                    permament: true,
                },
            }
        }

        return handler ? handler(ctx) : { props: {} }
    })
