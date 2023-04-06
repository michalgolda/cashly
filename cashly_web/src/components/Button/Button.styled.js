import styled, { css } from 'styled-components'
import { variant } from 'styled-system'

export const StyledBaseButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 700;
    padding: 8px 16px;
    font-size: 0.938rem;
    align-items: center;
    display: inline-flex;
    min-width: max-content;
    justify-content: center;
    font-family: ${({ theme }) => theme.fontFamily};
`

export const StyledButton = styled(StyledBaseButton)`
    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `};

    ${variant({
        variants: {
            primary: {
                color: 'white',
                backgroundColor: '#000',
                border: '2px solid #000',
                '&:hover': {
                    backgroundColor: '#292929',
                },
                '&:active': {
                    backgroundColor: '#3f3f3f',
                },
            },
            primaryOutlined: {
                backgroundColor: 'transparent',
                border: '2px solid #000',
                '&:hover': {
                    color: '#000',
                },
            },
            text: {
                padding: '8px',
                backgroundColor: 'transparent',
                color: '#000',
                '&:hover': {
                    backgroundColor: 'gray100',
                },
                '&:active': {
                    backgroundColor: 'gray300',
                },
            },
        },
    })}
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
