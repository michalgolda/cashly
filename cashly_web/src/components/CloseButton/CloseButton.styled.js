import styled from 'styled-components'
import { variant } from 'styled-system'

export const StyledCloseButton = styled.span`
    width: 15px;
    height: 24px;
    border: none;
    outline: none;
    cursor: pointer;
    display: inherit;
    user-select: none;
    font-size: 1.44rem;
    background-color: transparent;

    ${variant({
        variants: {
            light: {
                color: 'white',
                '&:hover': {
                    color: '#000',
                },
                '&:active': {
                    color: '#f0f0f0',
                },
            },
            dark: {
                '&:active': {
                    color: '#4d4d4d',
                },
            },
        },
    })}

    &:hover {
        transform: rotate(180deg);
        transition: transform 300ms;
    }
`
