import PropTypes from 'prop-types'

import {
    StyledContainer,
    StyledDescription,
    StyledHeader,
    StyledTextContainer,
} from './Header.styled'

function Header({ children, title, description, ...props }) {
    return (
        <StyledHeader {...props}>
            <StyledContainer>
                <StyledTextContainer>
                    <h1>{title}</h1>
                    <StyledDescription>{description}</StyledDescription>
                </StyledTextContainer>
                {children}
            </StyledContainer>
        </StyledHeader>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default Header
