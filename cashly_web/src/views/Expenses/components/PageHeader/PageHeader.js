import PropTypes from 'prop-types'

import Header from '@/components/Header/Header'

import Actions from './Actions'

function PageHeader({ showActions }) {
    return (
        <Header
            title="Wydatki"
            description={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                Praesent rutrum viverra iaculis. 
                Phasellus commodo orci vitae venenatis consequat.
            `}
        >
            {showActions && <Actions />}
        </Header>
    )
}

PageHeader.propTypes = { showActions: PropTypes.bool }
PageHeader.defaultProps = { showActions: true }

export default PageHeader
