import Head from 'next/head'

export default function Meta({ children, title }) {
    return (
        <Head>
            <title>{`Cash.ly - ${title}`}</title>
            {children}
        </Head>
    )
}
