import PropTypes from 'prop-types'

import Header from '@/components/Header/Header'

import Actions from './Actions'

function PageHeader({ showActions }) {
    return <Header title="Wydatki">{showActions && <Actions />}</Header>
}

PageHeader.propTypes = {
    showActions: PropTypes.bool,
}
PageHeader.defaultProps = { showActions: true }

export default PageHeader
