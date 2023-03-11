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
    font-weight: bold;
    overflow: hidden;
    display: none;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
        display: block;
    }
`
