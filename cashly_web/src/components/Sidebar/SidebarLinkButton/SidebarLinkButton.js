import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { StyledLink, StyledLinkButton } from './SidebarLinkButton.styled'

function SidebarLinkButton({ href, ...props }) {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <StyledLink href={href}>
            <StyledLinkButton variant="text" isActive={isActive} {...props} />
        </StyledLink>
    )
}

SidebarLinkButton.propTypes = { href: PropTypes.string.isRequired }

export default SidebarLinkButton
