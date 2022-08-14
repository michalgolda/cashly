import AddCategoryButton from "@/pages/Expenses/AddExpenseButton";
import ImportExpenseButton from "@/pages/Expenses/ImportExpensesButton";
import ExportExpensesButton from "@/pages/Expenses/ExportExpensesButton";

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
