import styled from 'styled-components'

export const StyledHeader = styled.header`
    height: auto;
    padding: 32px 32px;
    background-color: white;
    border-bottom: 1px solid #f3f3f3;

    @media (min-width: 768px) {
        padding: 32px 64px;
    }
`

export const StyledContainer = styled.div`
    display: flex;
    margin: 0 auto;
    row-gap: 16px;
    max-width: 1024px;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 1024px) {
        column-gap: 32px;
        flex-direction: row;
    }
`

export const StyledTextContainer = styled.div``

export const StyledTitle = styled.h1`
    font-size: 1.5rem;
`

export const StyledActionsContainer = styled.div`
    width: 100%;
    display: flex;
    column-gap: 16px;
    flex-direction: row;
    justify-content: right;
`

export const StyledWrapper = styled.div`
    display: flex;
    column-gap: 32px;
`
