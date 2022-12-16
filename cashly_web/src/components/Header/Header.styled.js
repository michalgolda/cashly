import styled from 'styled-components';

const Header = styled.header`
  height: auto;
  padding: 64px;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1024px;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.p`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.h5};
`;

const LeftContentWrapper = styled.div`
  display: flex;
  margin-right: 32px;
  flex-direction: column;
`;

const RightContentWrapper = styled.div`
  display: flex;
  row-gap: 16px;
  margin-left: 8px;
  flex-direction: column;
`;

export {
  Header,
  Wrapper,
  Description,
  LeftContentWrapper,
  RightContentWrapper,
};
