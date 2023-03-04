import Footer from '@/components/Footer/Footer'

import {
    StyledContainer,
    StyledFlexCenter,
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
            <Footer />
        </>
    )
}
