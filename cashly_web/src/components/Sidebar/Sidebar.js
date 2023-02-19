import {
    faChartPie,
    faGripVertical,
    faReceipt,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import PropTypes from 'prop-types'

import {
    StyledHeader,
    StyledMenu,
    StyledMenuItem,
    StyledNav,
    StyledSeparator,
} from './Sidebar.styled'
import SidebarLinkButton from './SidebarLinkButton/SidebarLinkButton'
import SidebarSessionDetails from './SidebarSessionDetails/SidebarSessionDetails'
import SidebarTooltip from './SidebarTooltip/SidebarTooltip'

function Sidebar({ userEmail, onLogout }) {
    return (
        <StyledNav>
            <StyledHeader>
                <Image
                    src="/appIcon.svg"
                    alt="app icon"
                    width={40.03}
                    height={40.3}
                    priority
                />
            </StyledHeader>
            <StyledSeparator />
            <StyledMenu>
                <StyledMenuItem>
                    <SidebarTooltip text="Wydatki">
                        <SidebarLinkButton
                            text="Wydatki"
                            href="/expenses"
                            icon={faReceipt}
                        />
                    </SidebarTooltip>
                </StyledMenuItem>
                <StyledMenuItem>
                    <SidebarTooltip text="Kategorie">
                        <SidebarLinkButton
                            href="/categories"
                            icon={faGripVertical}
                        />
                    </SidebarTooltip>
                </StyledMenuItem>
                <StyledMenuItem>
                    <SidebarTooltip text="Analityka">
                        <SidebarLinkButton
                            text="Analityka"
                            href="/analytics"
                            icon={faChartPie}
                        />
                    </SidebarTooltip>
                </StyledMenuItem>
            </StyledMenu>
            <StyledSeparator />
            <SidebarSessionDetails userEmail={userEmail} onLogout={onLogout} />
        </StyledNav>
    )
}

Sidebar.propTypes = {
    userEmail: PropTypes.string,
    onLogout: PropTypes.func,
}

export default Sidebar
