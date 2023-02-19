import styled from 'styled-components'

export const StyledContainer = styled.div`
    min-width: 45px;
    min-height: 45px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.blue400};
`

export const StyledLetter = styled.p`
    color: white;
    padding-top: 4px;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.h5};
`
