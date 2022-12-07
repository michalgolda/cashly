import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useModal } from "@ebay/nice-modal-react";
import { useMutation, useQueryClient } from "react-query";
import { expenseCategoryAPI } from "@/api";
import * as S from "./CategoryListItem.styled";
import { notifyUnhandledError } from "@/helpers/notify";
import EditCategoryModal from "@/pages/Categories/EditCategoryModal";
import { EditListItemButton, DeleteListItemButton } from "@/components";

function CategoryListItem({ id, name, color }) {
  const queryClient = useQueryClient();
  
  const editCategoryModal = useModal(EditCategoryModal);

  const notifyDeleteCategorySuccess = () =>
    toast.success("Kategoria została pomyślnie usunięta");

  const deleteCategoryMutation = useMutation(
    expenseCategoryAPI.deleteExpenseCategory,
    {
      onSuccess: () => {
        notifyDeleteCategorySuccess();
        queryClient.invalidateQueries("categories");
      },
      onError: () =>
        notifyUnhandledError()
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
