import styled from 'styled-components'

export const StyledBox = styled.div`
    padding: 15px;
    border-radius: 2px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
`

export const StyledContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;
    flex-direction: column;
`
