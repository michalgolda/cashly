import styled from 'styled-components'

export const StyledCloseButton = styled.span`
    width: 15px;
    height: 24px;
    border: none;
    outline: none;
    cursor: pointer;
    display: inherit;
    user-select: none;
    background-color: transparent;
    font-size: ${({ theme }) => theme.fontSizes.h4};
    color: ${({ variant }) => (variant === 'light' ? 'white' : 'inherit')};

    &:hover {
        transform: rotate(180deg);
        transition: transform 300ms;
        color: ${({ variant, theme }) =>
            variant === 'light'
                ? theme.colors.gray500
                : theme.colors.primary600};
    }

    &:active {
        color: ${({ variant, theme }) =>
            variant === 'light'
                ? theme.colors.gray300
                : theme.colors.primary300};
    }
`
