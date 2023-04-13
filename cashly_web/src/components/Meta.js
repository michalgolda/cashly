import Head from 'next/head'
import PropTypes from 'prop-types'

function Meta({ children, title }) {
    return (
        <Head>
            <title>{`Cash.ly - ${title}`}</title>
            {children}
        </Head>
    )
}

Meta.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Meta
