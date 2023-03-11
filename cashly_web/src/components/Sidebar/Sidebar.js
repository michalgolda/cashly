import {
    faChartSimple,
    faGripVertical,
    faReceipt,
} from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import PropTypes from 'prop-types'

import SessionDetails from './SessionDetails/SessionDetails'
import {
    StyledLogoImage,
    StyledLogoutButton,
    StyledMenu,
    StyledNav,
} from './Sidebar.styled'
import SidebarLinkButton from './SidebarLinkButton/SidebarLinkButton'

function Sidebar({ userEmail, onLogout }) {
    return (
        <StyledNav>
            <StyledLogoImage
                className="logo"
                src="logo.svg"
                alt="logo"
                width={150}
                height={39}
                priority
            />
            <Image
                className="appIcon"
                src="appIcon.svg"
                alt="app icon"
                width={50}
                height={50}
                priority
            />
            <StyledMenu>
                <li>
                    <SidebarLinkButton
                        className="linkButtonWithText"
                        icon={faReceipt}
                        href="/expenses"
                    >
                        Wydatki
                    </SidebarLinkButton>
                    <SidebarLinkButton
                        className="linkButtonWithOnlyIcon"
                        icon={faReceipt}
                        href="/expenses"
                    />
                </li>
                <li>
                    <SidebarLinkButton
                        className="linkButtonWithText"
                        icon={faGripVertical}
                        href="/categories"
                    >
                        Kategorie
                    </SidebarLinkButton>
                    <SidebarLinkButton
                        className="linkButtonWithOnlyIcon"
                        icon={faGripVertical}
                        href="/categories"
                    />
                </li>
                <li>
                    <SidebarLinkButton
                        className="linkButtonWithText"
                        icon={faChartSimple}
                        href="/analytics"
                    >
                        Analityka
                    </SidebarLinkButton>
                    <SidebarLinkButton
                        className="linkButtonWithOnlyIcon"
                        icon={faChartSimple}
                        href="/analytics"
                    />
                </li>
            </StyledMenu>
            <SessionDetails userEmail={userEmail} />
            <StyledLogoutButton
                className="textLogoutButton"
                onClick={onLogout}
                variant="text"
            >
                Wyloguj się
            </StyledLogoutButton>
            <StyledLogoutButton className="iconLogoutButton" onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOut} />
            </StyledLogoutButton>
        </StyledNav>
    )
}

Sidebar.propTypes = {
    onLogout: PropTypes.func,
}

export default Sidebar
