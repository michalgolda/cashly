import CountExpensesByCategoryWidget from '../CountExpensesByCategoryWidget/CountExpensesByCategoryWidget';
import ExpensesByCategoryWidget from '../ExpensesByCategoryWidget/ExpensesByCategoryWidget';
import GeneralExpensesWidget from '../GeneralExpensesWidget/GeneralExpensesWidget';
import TotalAmountOfExpensesWidget from '../TotalAmountOfExpensesWidget/TotalAmountOfExpensesWidget';
import * as S from './WidgetList.styled';

export default function WidgetList() {
  return (
    <S.List>
      <S.Group columns={1}>
        <TotalAmountOfExpensesWidget />
      </S.Group>
      <GeneralExpensesWidget />
      <ExpensesByCategoryWidget />
      <CountExpensesByCategoryWidget />
    </S.List>
  );
}
