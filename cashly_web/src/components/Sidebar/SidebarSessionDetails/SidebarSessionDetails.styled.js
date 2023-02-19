import styled from 'styled-components'

import Avatar from '@/components/Avatar/Avatar'

export const StyledContainer = styled.div`
    padding: 16px;
    display: flex;
    column-gap: 16px;
    flex-direction: row;
    align-items: center;
    row-gap: 16px;
    flex-direction: column;
`

export const StyledUserAvatar = styled(Avatar)`
    flex: 0;
`
