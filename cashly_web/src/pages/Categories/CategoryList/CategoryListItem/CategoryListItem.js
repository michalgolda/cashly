import PropTypes from "prop-types";
import * as S from "./CategoryListItem.styled";
import { useModal } from "@ebay/nice-modal-react";
import { useMutation, useQueryClient } from "react-query";
import { expenseCategoryAPI } from "@/api";
import EditCategoryModal from "@/pages/Categories/EditCategoryModal";
import { EditListItemButton, DeleteListItemButton } from "@/components";

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
    <S.ListItem>
      <S.Category color={color}>
        <S.CategoryName>{name}</S.CategoryName>
      </S.Category>
      <S.Actions>
        <EditListItemButton
          onClick={() => editCategoryModal.show({ id, name, color })}
        />
        <DeleteListItemButton
          onClick={() => deleteCategoryMutation.mutate({ id })}
        />
      </S.Actions>
    </S.ListItem>
  );
}

CategoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CategoryListItem;
