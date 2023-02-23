import { StyledActionsContainer } from '@/components/Header/Header.styled'

import AddExpenseButton from '../AddButton'
import ExportExpensesButton from '../ExportButton'
import ImportExpenseButton from '../ImportButton'

export default function Actions() {
    return (
        <StyledActionsContainer>
            <AddExpenseButton />
            <ExportExpensesButton />
            <ImportExpenseButton />
        </StyledActionsContainer>
    )
}
