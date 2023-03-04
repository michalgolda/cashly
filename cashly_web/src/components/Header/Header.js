import { useSession } from 'next-auth/react'
import PropTypes from 'prop-types'

import {
    StyledContainer,
    StyledHeader,
    StyledTextContainer,
    StyledTitle,
    StyledWrapper,
} from './Header.styled'
import SessionDetails from './SessionDetails/SessionDetails'

function Header({ children, title, ...props }) {
    return (
        <StyledHeader {...props}>
            <StyledContainer>
                <StyledTextContainer>
                    <StyledTitle>{title}</StyledTitle>
                </StyledTextContainer>
                <StyledWrapper>{children}</StyledWrapper>
            </StyledContainer>
        </StyledHeader>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
