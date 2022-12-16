import styled from 'styled-components';

const Footer = styled.footer`
  margin-top: auto;
  text-align: center;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.h6};
`;

export { Footer };
