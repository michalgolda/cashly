import PropTypes from 'prop-types'

import { StyledSkeleton } from './Skeleton.styled'

function Skeleton({ width, height, ...props }) {
    return (
        <StyledSkeleton
            width={width}
            height={height}
            {...props}
            data-testid="skeleton-component"
        />
    )
}

Skeleton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    type: PropTypes.oneOf(['rectangle', 'circle']),
}

Skeleton.defaultProps = { type: 'rectangle' }

export default Skeleton
