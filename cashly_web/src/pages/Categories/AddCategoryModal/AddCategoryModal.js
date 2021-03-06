import { useMutation, useQueryClient } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";

import { expenseCategoryAPI } from "@/api";
import CategoryModal from "../CategoryModal/CategoryModal";

export default NiceModal.create(() => {
  const modal = useModal();
  const queryClient = useQueryClient();

  const initialValues = { name: "", color: "#29eaff" };

  const createExpenseCategoryMutation = useMutation(
    expenseCategoryAPI.createExpenseCategory,
    {
      onSuccess: () => {
        modal.hide();
        queryClient.invalidateQueries("categories");
      },
      onError: () => modal.hide(),
    }
  );

  const onSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    const categories = queryClient.getQueryData("categories");
    const categoryNameIsAlreadyUsed = categories.find(
      ({ name: categoryName }) => categoryName === values.name
    );

    if (categoryNameIsAlreadyUsed) {
      setSubmitting(false);
      setFieldError("name", "Podana nazwa jest już w użyciu.");
    } else {
      resetForm();
      createExpenseCategoryMutation.mutate(values);
    }
  };

  return (
    <CategoryModal
      {...bootstrapDialog(modal)}
      submitText="Utwórz"
      onSubmit={onSubmit}
      initialValues={initialValues}
      title="Stwórz nową kategorię"
      description={`
				Lorem ipsum dolor sit amet, 
				consectetur adipiscing elit, 
				sed do eiusmod tempor incididunt.
			`}
    />
  );
});
