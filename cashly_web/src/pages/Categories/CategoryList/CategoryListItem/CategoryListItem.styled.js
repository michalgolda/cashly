import styled from "styled-components";
import { IconButton, ListItem as BaseListItem } from "@/components";

const ListItem = styled(BaseListItem)`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Category = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

const CategoryName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.h6};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const ActionButton = styled(IconButton)`
  color: white;
  margin-left: 16px;
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
  background-color: ${({ theme }) => theme.colors.red400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.red300};
  }
`;

export { ListItem, Category, CategoryName, EditButton, DeleteButton };
