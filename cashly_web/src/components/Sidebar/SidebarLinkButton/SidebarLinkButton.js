import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import {
    StyledIcon,
    StyledLink,
    StyledLinkButton,
} from './SidebarLinkButton.styled'

function SidebarLinkButton({ children, href, icon, ...props }) {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <StyledLink href={href}>
            <StyledLinkButton variant="text" isActive={isActive} {...props}>
                <StyledIcon icon={icon} />
                {children}
            </StyledLinkButton>
        </StyledLink>
    )
}

SidebarLinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
}

export default SidebarLinkButton
