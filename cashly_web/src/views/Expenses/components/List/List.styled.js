import styled from 'styled-components'

import List from '@/components/List'

export const StyledList = styled(List)`
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 375px) {
        grid-template-columns: 1fr;
    }
`

export const StyledText = styled.p`
    text-align: center;
`
