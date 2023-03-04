import styled, { css } from 'styled-components'

export const StyledBaseButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 700;
    padding: 8px 16px;
    position: relative;
    font-size: 0.938rem;
    align-items: center;
    display: inline-flex;
    min-width: max-content;
    justify-content: center;
    font-family: ${({ theme }) => theme.fontFamily};
    transition: ${({ theme }) => theme.defaultTransition};

    &:hover {
        background-color: #292929;
    }

    &:active {
        background-color: #3f3f3f;
    }

    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `};
`

export const StyledPrimaryButton = styled(StyledBaseButton)`
    color: white;
    background-color: ${({ theme }) => theme.colors.primary400};
`

export const StyledPrimaryOutlinedButton = styled(StyledBaseButton)`
    padding: 6px 14px;
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.colors.primary400};

    &:hover {
        color: white;
    }
`

export const StyledTextButton = styled(StyledBaseButton)`
    padding: 8px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary400};

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray100};
    }

    &:active {
        background-color: ${({ theme }) => theme.colors.gray300};
    }
`

export const StyledBaseIconWrapper = styled.span`
    width: auto;
    height: 20px;
    display: inherit;
`

export const StyledStartIconWrapper = styled(StyledBaseIconWrapper)`
    margin-right: 8px;
`

export const StyledEndIconWrapper = styled(StyledBaseIconWrapper)`
    margin-left: 8px;
`
