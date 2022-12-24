import CountAllExpenseCategories from '../CountAllExpenseCategories/CountAllExpenseCategories';
import CountAllExpensesWidget from '../CountAllExpensesWidget/CountAllExpensesWidget';
import CountExpensesByCategoryWidget from '../CountExpensesByCategoryWidget/CountExpensesByCategoryWidget';
import ExpensesByCategoryWidget from '../ExpensesByCategoryWidget/ExpensesByCategoryWidget';
import GeneralExpensesWidget from '../GeneralExpensesWidget/GeneralExpensesWidget';
import TotalAmountOfExpensesWidget from '../TotalAmountOfExpensesWidget/TotalAmountOfExpensesWidget';
import * as S from './WidgetList.styled';

export default function WidgetList() {
  return (
    <S.List>
      <S.Group>
        <TotalAmountOfExpensesWidget />
        <CountAllExpensesWidget />
        <CountAllExpenseCategories />
      </S.Group>
      <GeneralExpensesWidget />
      <ExpensesByCategoryWidget />
      <CountExpensesByCategoryWidget />
    </S.List>
  );
}
