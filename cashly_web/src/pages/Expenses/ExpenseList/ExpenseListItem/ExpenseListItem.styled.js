import styled from 'styled-components';

import { ListItem as BaseListItem } from '@/components';

const ListItem = styled(BaseListItem)`
  display: grid;
  column-gap: 16px;
  align-items: center;
  justify-content: left;
  grid-template-columns: repeat(4, 1fr);
`;

const Span = styled.span`
  overflow: hidden;
  line-height: 1.7;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const Category = styled(Span)`
  color: white;
  padding: 4px 8px;
  width: min-content;
  text-align: center;
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSizes.h6};
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.gray600};
`;

const Actions = styled.div`
  display: flex;
  column-gap: 16px;
  justify-content: right;
`;

export { ListItem, Span, Category, Actions };
