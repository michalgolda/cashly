import styled, { css } from "styled-components";
import { FormError } from "@/components";

const Wrapper = styled.div`
  width: 256px;
  display: flex;
  flex-direction: column;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  &:focus-within {
    ${".inputLabel"} {
      color: white;
      background-color: ${({ theme }) => theme.colors.primary400};
    }
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  line-height: 1.5;
  padding: 5px 15px;
  background-color: white;
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.colors.primary400};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  border: 1px solid ${({ theme }) => theme.colors.primary400};
  border-bottom-left-radius: ${({ isError }) => (isError ? "0" : "2px")};
  border-bottom-right-radius: ${({ isError }) => (isError ? "0" : "2px")};
  border-top-left-radius: ${({ labelText }) => (labelText ? "0" : "2px")};
  border-top-right-radius: ${({ labelText }) => (labelText ? "0" : "2px")};
`;

const Label = styled.label`
  padding: 3px 8px;
  width: fit-content;
  background-color: white;
  border-radius: 2px 2px 0 0;
  border-bottom: none !important;
  font-size: ${({ theme }) => theme.fontSizes.h6};
  color: ${({ theme }) => theme.colors.primary400};
  transition: ${({ theme }) => theme.defaultTransition};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  border: 1px solid ${({ theme }) => theme.colors.primary400};
`;

const Error = styled(FormError)`
  text-align: left;
  border-radius: 0 0 2px 2px;
`;

export { Wrapper, Input, Label, Error };
