import {
    StyledContainer,
    StyledFooter,
    StyledLogo,
    StyledWrapper,
} from './AuthLayout.styled'

export default function AuthLayout({ children, ...props }) {
    return (
        <>
            <StyledWrapper {...props}>
                <StyledContainer>
                    <StyledLogo />
                    {children}
                </StyledContainer>
            </StyledWrapper>
            <StyledFooter />
        </>
    )
}
