import styled, { css } from 'styled-components';

const Widget = styled.div`
  border-radius: 2px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const Header = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Body = styled.div`
  padding: 15px;
  ${({ centerContent }) =>
    centerContent &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

export { Widget, Header, Title, Body };
