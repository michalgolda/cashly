import { useMutation, useQueryClient } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";

import { updateExpense } from "../../../mutations";
import ExpenseModal from "../ExpenseModal/ExpenseModal";


export default NiceModal.create(({ id, amount, realised_date, expense_category_id }) => {
	const modal = useModal();
	const queryClient = useQueryClient();
	const mutation = useMutation(updateExpense, {
		onSuccess: () => {
			modal.hide();

			queryClient.invalidateQueries("expenses");
		}
	})


	const initialValues = { 
		amount,
		realised_date, 
		expense_category_id: expense_category_id ? expense_category_id : ""
	};
	
	const onSubmit = (values) => {
		values.expense_category_id = values.expense_category_id ? values.expense_category_id : null; 

		mutation.mutate({ expenseId: id, data: values });
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
})