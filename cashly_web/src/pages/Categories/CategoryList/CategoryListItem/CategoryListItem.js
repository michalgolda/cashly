import PropTypes from "prop-types";
import * as S from "./CategoryListItem.styled";
import { useModal } from "@ebay/nice-modal-react";
import { useMutation, useQueryClient } from "react-query";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { expenseCategoryAPI } from "@/api";
import EditCategoryModal from "@/pages/Categories/EditCategoryModal";

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
      <S.EditButton
        icon={faEdit}
        onClick={() => editCategoryModal.show({ id, name, color })}
      />
      <S.DeleteButton
        icon={faTrashAlt}
        onClick={() => deleteCategoryMutation.mutate({ id })}
      />
    </S.ListItem>
  );
}

CategoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CategoryListItem;
