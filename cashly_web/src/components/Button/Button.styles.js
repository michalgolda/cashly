import styled, { css } from "styled-components";

const BaseButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  line-height: 1.5;
  padding: 6px 16px;
  position: relative;
  border-radius: 2px;
  align-items: center;
  display: inline-flex;
  min-width: max-content;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-family: ${({ theme }) => theme.fontFamily};
  transition: ${({ theme }) => theme.defaultTransition};
  font-weight: ${({ theme }) => theme.fontWeights.regular};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.primary300};
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};
`;

const PrimaryButton = styled(BaseButton)`
  color: white;
  background-color: ${({ theme }) => theme.colors.primary400};
`;

const PrimaryOutlinedButton = styled(BaseButton)`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary400};

  &:hover {
    color: white;
  }
`;

const TextButton = styled(BaseButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const BaseIconWrapper = styled.span`
  display: inherit;
`;

const StartIconWrapper = styled(BaseIconWrapper)`
  margin-right: 16px;
`;

const EndIconWrapper = styled(BaseIconWrapper)`
  margin-left: 16px;
`;

export {
  PrimaryButton,
  PrimaryOutlinedButton,
  TextButton,
  StartIconWrapper,
  EndIconWrapper,
};
