import Footer from '@/components/Footer/Footer'

import { StyledContainer, StyledLogo, StyledWrapper } from './AuthLayout.styled'

export default function AuthLayout({ children, ...props }) {
    return (
        <>
            <StyledWrapper {...props}>
                <StyledContainer>
                    <StyledLogo />
                    {children}
                </StyledContainer>
            </StyledWrapper>
            <Footer />
        </>
    )
}
