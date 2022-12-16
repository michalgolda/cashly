import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 0 32px 0 32px;
`;

const Illustration = styled.img`
  width: 100%;
  max-width: 256px;
`;

const Text = styled.p`
  margin-top: 16px;
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const BottomElementWrapper = styled.div`
  margin-top: 32px;
`;

export { Container, Illustration, Text, BottomElementWrapper };
