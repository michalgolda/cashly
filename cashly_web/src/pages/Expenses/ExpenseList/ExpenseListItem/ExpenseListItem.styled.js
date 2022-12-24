import styled from 'styled-components';

import { ListItem as BaseListItem } from '@/components';

const ListItem = styled(BaseListItem)`
  display: grid;
  row-gap: 16px;
  column-gap: 16px;
  align-items: center;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Span = styled.span`
  overflow: hidden;
  line-height: 1.7;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  @media (min-width: 768px) {
    text-align: initial;
  }
`;

const Category = styled(Span)`
  width: 100%;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSizes.h6};
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.gray600};

  @media (min-width: 768px) {
    grid-row: inherit;
    grid-column: inherit;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const RealisedDate = styled(Span)`
  text-align: center;

  @media (max-width: 768px) {
    grid-row: 2;
  }
`;

const Actions = styled.div`
  display: flex;
  column-gap: 16px;
  justify-content: center;

  @media (min-width: 768px) {
    grid-row: inherit;
    grid-column: inherit;
    justify-content: right;
  }
`;

export { ListItem, Span, Category, RealisedDate, Actions };
