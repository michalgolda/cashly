import styled, { css } from 'styled-components'

export const StyledContainer = styled.div`
    width: 256px;
    row-gap: 8px;
    display: flex;
    flex-direction: column;

    input[type='date'],
    input[type='color'],
    select {
        height: 53.6px;
    }

    input[type='color'] {
        padding: 0;
    }

    &:focus-within {
        .labelText {
            color: ${({ theme, isError }) =>
                isError ? theme.colors.red400 : theme.colors.primary400};
        }
    }

    ${({ theme, isError }) =>
        isError &&
        css`
            .labelText {
                color: ${theme.colors.red400};
            }

            .labelSeparator {
                background-color: ${theme.colors.red400};
            }

            .input {
                border-color: ${theme.colors.red400};
            }

            .input:focus {
                border-color: ${theme.colors.red400};
            }
        `}

    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `}
`

export const StyledInput = styled.input`
    width: 100%;
    outline: none;
    padding: 16px;
    font-weight: 400;
    font-size: 0.938rem;
    background-color: #fbfbfb;
    border: 2px solid #cdcdcd;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.colors.primary400};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary400};
    }

    &:placeholder {
        color: #eaeaea;
    }
`

export const StyledLabelContainer = styled.div`
    display: flex;
    column-gap: 4px;
    align-items: center;
    flex-direction: row;
`

export const StyledLabelSeparator = styled.span`
    width: 8px;
    height: 1px;
    background-color: #858585;
`

export const StyledLabelText = styled.span`
    color: #858585;
    font-weight: 700;
    width: fit-content;
    font-size: 0.75rem;
`
