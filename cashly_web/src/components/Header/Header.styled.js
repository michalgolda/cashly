import styled from 'styled-components'

export const StyledHeader = styled.header`
    height: auto;
    padding: 32px;
    background-color: white;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};

    @media (min-width: 768px) {
        padding: 64px;
    }
`

export const StyledContainer = styled.div`
    display: flex;
    margin: 0 auto;
    row-gap: 1rem;
    column-gap: 2rem;
    max-width: 1024px;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export const StyledTextContainer = styled.div`
    display: flex;
    row-gap: 1rem;
    flex-direction: column;
`

export const StyledDescription = styled.p`
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.fontSizes.h5};
`

export const StyledActionsContainer = styled.div`
    width: 100%;
    display: flex;
    row-gap: 1rem;
    flex-direction: column;
`
