import * as S from "./WidgetList.styles";
import GeneralExpensesWidget from "../GeneralExpensesWidget/GeneralExpensesWidget";
import ExpensesByCategoryWidget from "../ExpensesByCategoryWidget/ExpensesByCategoryWidget";
import CountExpensesByCategoryWidget from "../CountExpensesByCategoryWidget/CountExpensesByCategoryWidget";
import TotalAmountOfExpensesWidget from "../TotalAmountOfExpensesWidget/TotalAmountOfExpensesWidget";

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
