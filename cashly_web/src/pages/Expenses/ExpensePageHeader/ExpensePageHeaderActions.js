import { ActionsContainer } from '@/components/Header/Header.styled';

import AddExpenseButton from '../AddExpenseButton';
import ExportExpensesButton from '../ExportExpensesButton';
import ImportExpenseButton from '../ImportExpensesButton';

export default function ExpensePageHeaderActions() {
  return (
    <ActionsContainer>
      <AddExpenseButton />
      <ExportExpensesButton />
      <ImportExpenseButton />
    </ActionsContainer>
  );
}
