import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";

import ExpenseModal from "../ExpenseModal/ExpenseModal";


export default NiceModal.create(({ id, amount, expense_category_id }) => {
	const modal = useModal();

	const initialValues = { amount, expense_category_id };
	
	const onSubmit = (_, { resetForm }) => { resetForm(); };

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