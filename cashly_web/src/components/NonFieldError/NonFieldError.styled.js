import styled from "styled-components";

const Message = styled.p`
  color: white;
  padding: 6px 8px;
  text-align: center;
  word-break: break-word;
  font-size: ${({ theme }) => theme.fontSizes.h6};
  background-color: ${({ theme }) => theme.colors.red400};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

export { Message };
