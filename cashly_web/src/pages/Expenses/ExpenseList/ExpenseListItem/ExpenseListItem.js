import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient, useMutation } from "react-query";
import { expenseAPI } from "@/api";
import * as S from "./ExpenseListItem.styled";
import { notifyUnhandledError } from "@/helpers/notify";
import EditExpenseModal from "@/pages/Expenses/EditExpenseModal";
import { EditListItemButton, DeleteListItemButton } from "@/components";
import { defaultCurrencyFormat, defaultDateTimeFormat } from "@/helpers/formating";

function ExpenseListItem({ id, amount, category, realisedDate }) {
  const queryClient = useQueryClient();

  const editExpenseModal = useModal(EditExpenseModal);

  const notifyDeleteExpenseSuccess = () => 
    toast.success("Wydatek został pomyślnie usunięty");

  const deleteExpenseMutation = useMutation(expenseAPI.deleteExpense, {
    onSuccess: () => {
      notifyDeleteExpenseSuccess();
      queryClient.invalidateQueries("expenses");
    },
    onError: () =>
      notifyUnhandledError()
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
