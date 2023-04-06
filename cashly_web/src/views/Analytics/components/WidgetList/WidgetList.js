import CountAllExpenseCategoriesWidget from '../CountAllExpenseCategoriesWidget/CountAllExpenseCategoriesWidget'
import CountAllExpensesWidget from '../CountAllExpensesWidget/CountAllExpensesWidget'
import CountExpensesByCategoryWidget from '../CountExpensesByCategoryWidget/CountExpensesByCategoryWidget'
import ExpensesByCategoryWidget from '../ExpensesByCategoryWidget/ExpensesByCategoryWidget'
import GeneralExpensesWidget from '../GeneralExpensesWidget/GeneralExpensesWidget'
import TotalAmountOfExpensesWidget from '../TotalAmountOfExpensesWidget/TotalAmountOfExpensesWidget'
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
