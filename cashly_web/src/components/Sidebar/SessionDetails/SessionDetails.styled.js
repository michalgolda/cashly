import styled from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    column-gap: 8px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin-left: 16px;
    margin-right: 16px;
`

export const StyledEmail = styled.p`
    display: none;
    overflow: hidden;
    font-weight: bold;
    text-overflow: ellipsis;

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        display: block;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        display: block;
    }
`
