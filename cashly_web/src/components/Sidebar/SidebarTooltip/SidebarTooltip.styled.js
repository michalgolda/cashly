import styled from 'styled-components'

export const StyledTooltip = styled.div`
    color: white;
    width: 128px;
    padding: 4px 8px;
    text-align: center;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.primary400};
`
