import Button from '../Button/Button'
import { StyledLink } from './LinkButton.styled'

export default function LinkButton({ children, href, ...props }) {
    return (
        <StyledLink href={href} data-testid="linkbutton-component">
            <Button {...props}>{children}</Button>
        </StyledLink>
    )
}
