import Button from '@/components/Button/Button'

import { StyledContainer } from './OptionsSection.styled'

export default function OptionsSection({ children, onClearParams }) {
    return (
        <StyledContainer>
            {children}
            <Button onClick={onClearParams}>Wyczyść parametry</Button>
        </StyledContainer>
    )
}
