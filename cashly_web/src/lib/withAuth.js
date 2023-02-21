import { getSession } from 'next-auth/react'

export function withAuth(PageComponent, condition, redirectDestination) {
    const PageComponentWrapper = (props) => <PageComponent {...props} />

    PageComponentWrapper.getInitialProps = async (ctx) => {
        const session = await getSession(ctx)
        if (condition(session)) {
            ctx.res.writeHead(307, { Location: redirectDestination })
            ctx.res.end()
        }
        return {}
    }

    return PageComponentWrapper
}
