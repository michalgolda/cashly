import styled, { css } from 'styled-components'

export const StyledWidget = styled.div`
    border-radius: 2px;
`

export const StyledHeader = styled.div`
    padding: 8px 16px;
    width: fit-content;
    background-color: white;
    border-bottom: none;
    border-left: 1px solid #f3f3f3;
    border-top: 1px solid #f3f3f3;
    border-right: 1px solid #f3f3f3;
`

export const StyledTitle = styled.h4`
    color: #000;
`

export const StyledBody = styled.div`
    padding: 16px;
    border: 1px solid #f3f3f3;
    background-color: white;

    ${({ centerContent }) =>
        centerContent &&
        css`
            display: flex;
            justify-content: center;
        `}
`
