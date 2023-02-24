import styled from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    padding: 8px 64px;
    justify-content: center;
    background-color: black;
`

export const StyledWrapper = styled.div`
    width: 100%;
    display: flex;
    column-gap: 16px;
    max-width: 1024px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const StyledText = styled.p`
    color: white;
    font-size: ${({ theme }) => theme.fontSizes.h6};
`

export const StyledResendEmailVerificationButton = styled.span`
    color: black;
    padding: 2px 8px;
    border-radius: 2px;
    background-color: white;
    font-size: ${({ theme }) => theme.fontSizes.h6};

    &:hover {
        cursor: pointer;
    }
`

export const StyledTextContainer = styled.div`
    width: 100%;
    display: flex;
    column-gap: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
