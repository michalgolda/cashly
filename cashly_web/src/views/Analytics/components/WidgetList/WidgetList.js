import CountAllExpenseCategoriesWidget from '../CountAllExpenseCategoriesWidget'
import CountAllExpensesWidget from '../CountAllExpensesWidget'
import CountExpensesByCategoryWidget from '../CountExpensesByCategoryWidget/CountExpensesByCategoryWidget'
import ExpensesByCategoryWidget from '../ExpensesByCategoryWidget/ExpensesByCategoryWidget'
import GeneralExpensesWidget from '../GeneralExpensesWidget/GeneralExpensesWidget'
import TotalAmountOfExpensesWidget from '../TotalAmountOfExpensesWidget'
import { StyledGroup, StyledList } from './WidgetList.styled'

export default function WidgetList() {
    return (
        <StyledList>
            <StyledGroup>
                <TotalAmountOfExpensesWidget />
                <CountAllExpensesWidget />
                <CountAllExpenseCategoriesWidget />
            </StyledGroup>
            <GeneralExpensesWidget />
            <ExpensesByCategoryWidget />
            <CountExpensesByCategoryWidget />
        </StyledList>
    )
}
