import { StyledContainer, StyledLogo, StyledWrapper } from './AuthLayout.styled'

export default function AuthLayout({ children, ...props }) {
    return (
        <StyledContainer {...props}>
            <StyledWrapper>
                <StyledLogo />
                {children}
            </StyledWrapper>
        </StyledContainer>
    )
}
