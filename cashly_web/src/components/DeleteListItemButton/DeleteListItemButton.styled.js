import styled from "styled-components";
import { IconButton } from "@/components";

const ActionButton = styled(IconButton)`
  color: white;
  background-color: ${({ theme }) => theme.colors.red400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.red300};
  }
`;

export { ActionButton };
