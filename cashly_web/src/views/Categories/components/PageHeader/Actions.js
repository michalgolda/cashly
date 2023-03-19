import { StyledActionsContainer } from '@/components/Header/Header.styled'

import AddButton from '../AddButton'
import ExportButton from '../ExportButton'
import ImportButton from '../ImportButton'

export default function Actions() {
    return (
        <StyledActionsContainer>
            <AddButton />
            <ImportButton />
            <ExportButton />
        </StyledActionsContainer>
    )
}
