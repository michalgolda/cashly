import styled from 'styled-components'

export const StyledContainer = styled.div`
    text-align: center;
    padding: 0 32px 0 32px;
`

export const StyledIllustration = styled.img`
    width: 100%;
    max-width: 256px;
`

export const StyledText = styled.p`
    margin-top: 16px;
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`

export const StyledBottomElementWrapper = styled.div`
    margin-top: 32px;
`
