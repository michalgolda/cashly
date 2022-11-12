import PropTypes from "prop-types";
import * as S from "./ExpenseListItem.styled";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient, useMutation } from "react-query";
import { expenseAPI } from "@/api";
import { defaultCurrencyFormat, defaultDateTimeFormat } from "@/helpers/formating";
import EditExpenseModal from "@/pages/Expenses/EditExpenseModal";
import { EditListItemButton, DeleteListItemButton } from "@/components";

function ExpenseListItem({ id, amount, category, realisedDate }) {
  const queryClient = useQueryClient();
  const editExpenseModal = useModal(EditExpenseModal);
  const deleteExpenseMutation = useMutation(expenseAPI.deleteExpense, {
    onSuccess: () => queryClient.invalidateQueries("expenses"),
  });

  return (
    <S.ListItem>
      <S.Span>{defaultCurrencyFormat.format(amount)}</S.Span>
      {category ? (
        <S.Category color={category.color}>{category.name}</S.Category>
      ) : (
        <S.Category>Bez kategorii</S.Category>
      )}
      <S.Span>{defaultDateTimeFormat.format(new Date(realisedDate))}</S.Span>
      <S.Actions>
        <EditListItemButton
          onClick={() => {
            editExpenseModal.show({
              id,
              amount,
              realisedDate,
              expenseCategoryId: category ? category.id : null,
            });
          }}
        />
        <DeleteListItemButton
          onClick={() => deleteExpenseMutation.mutate({ id })}
        />
      </S.Actions>
    </S.ListItem>
  );
}

ExpenseListItem.propTypes = {
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

export default ExpenseListItem;
