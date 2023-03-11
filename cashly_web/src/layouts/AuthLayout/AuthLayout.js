import {
    StyledContainer,
    StyledFlexCenter,
    StyledFooter,
    StyledLogo,
} from './AuthLayout.styled'

export default function AuthLayout({ children, ...props }) {
    return (
        <>
            <StyledFlexCenter {...props}>
                <StyledContainer>
                    <StyledLogo />
                    {children}
                </StyledContainer>
            </StyledFlexCenter>
            <StyledFooter />
        </>
    )
}
