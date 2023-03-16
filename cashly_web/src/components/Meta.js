import Head from 'next/head'

export default function Meta({ children, title }) {
    return (
        <Head>
            <title>{`Cashly.ly - ${title}`}</title>
            {children}
        </Head>
    )
}
