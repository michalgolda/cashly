import PropTypes from 'prop-types'

import {
    StyledCircleSkeleton,
    StyledRectangleSkeleton,
} from './Skeleton.styled'

const SKELETON_TYPES = {
    circle: StyledCircleSkeleton,
    rectangle: StyledRectangleSkeleton,
}

function Skeleton({ type, width, height, ...props }) {
    const ChoosedSkeletonType = SKELETON_TYPES[type]

    return <ChoosedSkeletonType width={width} height={height} {...props} />
}

Skeleton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    type: PropTypes.oneOf(['rectangle', 'circle']),
}

Skeleton.defaultProps = { type: 'rectangle' }

export default Skeleton
