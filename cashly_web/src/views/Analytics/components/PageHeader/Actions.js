import { StyledActionsContainer } from '@/components/Header/Header.styled'

import DatePeriodSelect from '../DatePeriodSelect/DatePeriodSelect'

export default function Actions() {
    return (
        <StyledActionsContainer>
            <DatePeriodSelect />
        </StyledActionsContainer>
    )
}
