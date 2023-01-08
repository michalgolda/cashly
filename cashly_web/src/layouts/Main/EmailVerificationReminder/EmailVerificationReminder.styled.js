import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 8px 64px;
  justify-content: center;
  background-color: black;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 16px;
  max-width: 1024px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Text = styled.p`
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.h6};
`;

const ResendEmailVerificationButton = styled.span`
  color: black;
  padding: 2px 8px;
  border-radius: 2px;
  background-color: white;
  font-size: ${({ theme }) => theme.fontSizes.h6};

  &:hover {
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export {
  Container,
  Wrapper,
  TextContainer,
  Text,
  ResendEmailVerificationButton,
};
