import PropTypes from 'prop-types'

import {
    StyledBody,
    StyledHeader,
    StyledTitle,
    StyledWidget,
} from './Widget.styled'

function Widget({ className, children, title, centerContent }) {
    return (
        <StyledWidget className={className}>
            {title && (
                <StyledHeader>
                    <StyledTitle>{title}</StyledTitle>
                </StyledHeader>
            )}
            <StyledBody centerContent={centerContent}>{children}</StyledBody>
        </StyledWidget>
    )
}

Widget.propTypes = {
    centerContent: PropTypes.bool,
    title: PropTypes.string.isRequired,
}

Widget.defaultProps = { centerContent: true }

export default Widget
