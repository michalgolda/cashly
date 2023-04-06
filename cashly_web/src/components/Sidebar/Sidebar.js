import { faBars, faSignOut, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Menu from './Menu/Menu'
import SessionDetails from './SessionDetails/SessionDetails'
import {
    StyledAppIcon,
    StyledContainer,
    StyledIconLogoutButton,
    StyledLogo,
    StyledNav,
    StyledTextLogoutButton,
    StyledToggleMenuButton,
} from './Sidebar.styled'

function Sidebar({ userEmail, onLogout }) {
    const [isHidden, setIsHidden] = useState(true)
    const toggle = () => {
        window.scrollTo(0, 0)
        setIsHidden(!isHidden)
    }

    return (
        <StyledNav>
            <StyledLogo
                src="logo.svg"
                alt="logo"
                width={150}
                height={39}
                priority
            />
            <StyledAppIcon
                src="appIcon.svg"
                alt="app icon"
                width={50}
                height={50}
                priority
            />
            <StyledContainer isHidden={isHidden}>
                <Menu />
                <SessionDetails userEmail={userEmail} />
                <StyledTextLogoutButton onClick={onLogout} variant="text">
                    Wyloguj się
                </StyledTextLogoutButton>
                <StyledIconLogoutButton onClick={onLogout} variant="text">
                    <FontAwesomeIcon icon={faSignOut} />
                </StyledIconLogoutButton>
            </StyledContainer>
            <StyledToggleMenuButton
                onClick={() => toggle()}
                icon={isHidden ? faBars : faXmark}
            />
        </StyledNav>
    )
}

Sidebar.propTypes = {
    onLogout: PropTypes.func,
}

export default Sidebar
