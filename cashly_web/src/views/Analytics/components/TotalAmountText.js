import styled from 'styled-components'

const TotalAmountText = styled.p`
    color: #2667ff;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`

export default TotalAmountText
