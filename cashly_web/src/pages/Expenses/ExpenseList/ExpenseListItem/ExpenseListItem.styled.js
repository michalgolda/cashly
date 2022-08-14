import styled from "styled-components";
import { ListItem as BaseListItem, IconButton } from "@/components";

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
  justify-content: right;
`;

const ActionButton = styled(IconButton)`
  color: white;
`;

const EditButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.blue400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.blue300};
  }
`;

const DeleteButton = styled(ActionButton)`
  margin-left: 16px;
  background-color: ${({ theme }) => theme.colors.red400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.red300};
  }
`;

export { ListItem, Span, Category, Actions, EditButton, DeleteButton };
