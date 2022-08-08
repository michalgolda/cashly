import PropTypes from "prop-types";
import styled from "styled-components";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient, useMutation } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

import { expenseAPI } from "@/api";
import { defaultCurrencyFormat } from "@/utils";
import { ListItem, IconButton } from "@/components";
import EditExpenseModal from "../EditExpenseModal/EditExpenseModal";

const StyledListItem = styled(ListItem)`
  display: grid;
  column-gap: 16px;
  align-items: center;
  justify-content: left;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledSpan = styled.span`
  overflow: hidden;
  line-height: 1.7;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const StyledCategory = styled(StyledSpan)`
  color: white;
  padding: 4px 8px;
  width: min-content;
  text-align: center;
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSizes.h6};
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.gray600};
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: right;
`;

const StyledActionButton = styled(IconButton)`
  color: white;
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
  margin-left: 16px;
  background-color: ${({ theme }) => theme.colors.red400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red500};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.red300};
  }
`;

function ExpenseListItem({ id, amount, category, realisedDate }) {
  const queryClient = useQueryClient();
  const editExpenseModal = useModal(EditExpenseModal);
  const deleteExpenseMutation = useMutation(expenseAPI.deleteExpense, {
    onSuccess: () => queryClient.invalidateQueries("expenses"),
  });

  return (
    <StyledListItem>
      <StyledSpan>{defaultCurrencyFormat.format(amount)}</StyledSpan>
      {category ? (
        <StyledCategory color={category.color}>{category.name}</StyledCategory>
      ) : (
        <StyledCategory>Bez kategorii</StyledCategory>
      )}
      <StyledSpan>{realisedDate}</StyledSpan>
      <StyledActions>
        <StyledEditButton
          icon={faEdit}
          onClick={() => {
            editExpenseModal.show({
              id,
              amount,
              realisedDate,
              expenseCategoryId: category ? category.id : null,
            });
          }}
        />
        <StyledDeleteButton
          icon={faTrashAlt}
          onClick={() => deleteExpenseMutation.mutate({ id })}
        />
      </StyledActions>
    </StyledListItem>
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
