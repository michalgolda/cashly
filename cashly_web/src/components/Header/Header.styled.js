import styled from 'styled-components';

const Header = styled.header`
  height: auto;
  padding: 32px;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};

  @media (min-width: 768px) {
    padding: 64px;
  }
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  row-gap: 1rem;
  column-gap: 2rem;
  max-width: 1024px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TextContainer = styled.div`
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.h5};
`;

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
`;

export { Header, Container, Description, TextContainer, ActionsContainer };
