import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import NiceModal, { bootstrapDialog, useModal } from '@ebay/nice-modal-react';

import { expenseCategoryAPI } from '@/api';
import { notifyUnhandledError } from '@/helpers/notify';

import CategoryModal from './CategoryModal/CategoryModal';

export default NiceModal.create(({ id, name, color }) => {
  const modal = useModal();

  const queryClient = useQueryClient();

  const initialValues = { name, color };

  const notifyUpdateExpenseSuccess = () =>
    toast.success('Kategoria została pomyślnie zaktualizowana');

  const updateExpenseCategoryMutation = useMutation(
    expenseCategoryAPI.updateExpenseCategory,
    {
      onSuccess: () => {
        modal.hide();
        notifyUpdateExpenseSuccess();
        queryClient.invalidateQueries('categories');
      },
      onError: () => notifyUnhandledError(),
    },
  );
  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    const categories = queryClient.getQueryData('categories');
    const categoryNameIsAlreadyUsed = categories.find(
      ({ name: categoryName }) => {
        return categoryName === values.name && categoryName !== name;
      },
    );

    if (categoryNameIsAlreadyUsed) {
      setSubmitting(false);
      setFieldError('name', 'Podana nazwa jest już w użyciu.');
    } else {
      updateExpenseCategoryMutation.mutate({
        id,
        ...values,
      });
    }
  };

  return (
    <CategoryModal
      {...bootstrapDialog(modal)}
      onSubmit={onSubmit}
      title="Edycja kategorii"
      submitText="Zapisz zmiany"
      initialValues={initialValues}
      description={`
				Lorem ipsum dolor sit amet, 
				consectetur adipiscing elit, 
				sed do eiusmod tempor incididunt.
			`}
    />
  );
});
