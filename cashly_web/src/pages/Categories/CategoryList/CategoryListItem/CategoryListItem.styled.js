import styled from 'styled-components';

import { ListItem as BaseListItem } from '@/components';

const ListItem = styled(BaseListItem)`
  display: flex;
  row-gap: 16px;
  column-gap: 16px;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Category = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  height: 40.03px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

const CategoryName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.h6};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const Actions = styled.div`
  display: flex;
  column-gap: 16px;
`;

export { ListItem, Category, CategoryName, Actions };
