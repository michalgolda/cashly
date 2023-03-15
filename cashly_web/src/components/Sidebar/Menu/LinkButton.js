import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { StyledIcon, StyledLink, StyledLinkButton } from './LinkButton.styled'

function LinkButton({ children, href, icon, ...props }) {
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

LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
}

export default LinkButton
