import { useMutation, useQueryClient } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";

import { updateExpenseCategory } from "../../../mutations";
import CategoryModal from "../CategoryModal/CategoryModal";


export default NiceModal.create(({ id, name, color }) => {
	const modal = useModal();
	const queryClient = useQueryClient();

	const initialValues = { name, color };

	const mutation = useMutation(updateExpenseCategory, {
		onSuccess: () => {
			modal.hide();

			queryClient.invalidateQueries("categories");
		}
	});

	const onSubmit = (values, { setSubmitting, setFieldError }) => {
		const categories = queryClient.getQueryData("categories");
		const categoryNameIsAlreadyUsed = categories.find(
			({ name: categoryName }) => {
				return categoryName === values.name && categoryName !== name;
			}
		);
		
		if (categoryNameIsAlreadyUsed) {
			setSubmitting(false);
			setFieldError("name", "Podana nazwa jest już w użyciu.");
		} else {
			mutation.mutate({ expenseCategoryId: id, data: values });
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
})