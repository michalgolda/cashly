import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import NiceModal, { bootstrapDialog, useModal } from '@ebay/nice-modal-react';

import { expenseAPI } from '@/api';
import { notifyUnhandledError } from '@/helpers/notify';

import ExpenseModal from './ExpenseModal/ExpenseModal';

export default NiceModal.create(
  ({ id, amount, realisedDate, expenseCategoryId }) => {
    const modal = useModal();

    const queryClient = useQueryClient();

    const notifyEditExpenseSuccess = () =>
      toast.success('Wydatek został pomyślnie zaktualizowany');

    const updateExpenseMutation = useMutation(expenseAPI.updateExpense, {
      onSuccess: () => {
        modal.hide();
        notifyEditExpenseSuccess();
        queryClient.invalidateQueries('expenses');
      },
      onError: () => notifyUnhandledError(),
    });
    const initialValues = {
      amount,
      realisedDate,
      expenseCategoryId,
    };
    const onSubmit = (values) => {
      values.expenseCategoryId = values.expenseCategoryId
        ? values.expenseCategoryId
        : null;
      updateExpenseMutation.mutate({ id, ...values });
    };

    return (
      <ExpenseModal
        {...bootstrapDialog(modal)}
        title="Edycja wydatku"
        onSubmit={onSubmit}
        submitText="Zapisz zmiany"
        initialValues={initialValues}
        description={`
				Lorem ipsum dolor sit amet, 
				consectetur adipiscing elit, 
				sed do eiusmod tempor incididunt.
			`}
      />
    );
  },
);
