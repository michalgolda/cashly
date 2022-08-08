import PropTypes from "prop-types";
import styled from "styled-components";
import { useModal } from "@ebay/nice-modal-react";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

import { expenseCategoryAPI } from "@/api";
import { ListItem, IconButton } from "@/components";
import EditCategoryModal from "../EditCategoryModal/EditCategoryModal";

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledCategory = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

const StyledCategoryName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.h6};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const StyledActionButton = styled(IconButton)`
  color: white;
  margin-left: 16px;
`;

const StyledEditButton = styled(StyledActionButton)`
  background-color: ${({ theme }) => theme.colors.blue400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.blue300};
  }
`;

const StyledDeleteButton = styled(StyledActionButton)`
  background-color: ${({ theme }) => theme.colors.red400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.red300};
  }
`;

function CategoryListItem({ id, name, color }) {
  const queryClient = useQueryClient();
  const editCategoryModal = useModal(EditCategoryModal);
  const deleteCategoryMutation = useMutation(
    expenseCategoryAPI.deleteExpenseCategory,
    {
      onSuccess: () => queryClient.invalidateQueries("categories"),
    }
  );

  return (
    <StyledListItem>
      <StyledCategory color={color}>
        <StyledCategoryName>{name}</StyledCategoryName>
      </StyledCategory>
      <StyledEditButton
        icon={faEdit}
        onClick={() => editCategoryModal.show({ id, name, color })}
      />
      <StyledDeleteButton
        icon={faTrashAlt}
        onClick={() => deleteCategoryMutation.mutate({ id })}
      />
    </StyledListItem>
  );
}

CategoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CategoryListItem;
