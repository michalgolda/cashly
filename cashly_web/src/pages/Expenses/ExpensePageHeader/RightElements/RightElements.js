import AddCategoryButton from "../../AddExpenseButton/AddExpenseButton";
import ImportExpenseButton from "../../ImportExpensesButton/ImportExpensesButton";
import ExportExpensesButton from "../../ExportExpensesButton/ExportExpensesButton";


function RightElements() {
	return (
		<>
			<AddCategoryButton />
			<ExportExpensesButton />
			<ImportExpenseButton />
		</>
	);
}

export default RightElements;