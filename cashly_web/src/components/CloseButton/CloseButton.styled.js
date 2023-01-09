import styled from 'styled-components';

const CloseButton = styled.span`
  border: none;
  outline: none;
  cursor: pointer;
  display: inherit;
  user-select: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  transition: ${({ theme }) => theme.defaultTransition};
  color: ${({ variant }) => (variant === 'light' ? 'white' : 'inherit')};

  &:hover {
    transform: rotate(180deg);
    transition: transform 300ms;
    color: ${({ variant, theme }) =>
      variant === 'light' ? theme.colors.gray500 : theme.colors.primary600};
  }

  &:active {
    color: ${({ variant, theme }) =>
      variant === 'light' ? theme.colors.gray300 : theme.colors.primary300};
  }
`;

export { CloseButton };