import PropTypes from 'prop-types'

import {
    StyledContainer,
    StyledHeader,
    StyledTextContainer,
    StyledTitle,
    StyledWrapper,
} from './Header.styled'

function Header({ children, title, ...props }) {
    return (
        <StyledHeader {...props} data-testid="header-component">
            <StyledContainer>
                <StyledTextContainer>
                    <StyledTitle>{title}</StyledTitle>
                </StyledTextContainer>
                {children && <StyledWrapper>{children}</StyledWrapper>}
            </StyledContainer>
        </StyledHeader>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
