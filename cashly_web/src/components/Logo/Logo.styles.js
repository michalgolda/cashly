import styled from "styled-components";

const Text = styled.h2`
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
`;

export { Text };
