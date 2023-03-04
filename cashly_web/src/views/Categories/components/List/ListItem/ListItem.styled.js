import styled from 'styled-components'

import ListItem from '@/components/ListItem'

export const StyledListItem = styled(ListItem)`
    display: flex;
    row-gap: 16px;
    column-gap: 16px;
    align-items: center;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export const StyledCategory = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    height: 40.03px;
    border-radius: 2px;
    align-items: center;
    justify-content: center;
    background-color: ${({ color }) => color};
`

export const StyledCategoryName = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.h6};
    font-weight: bold;
`

export const StyledActions = styled.div`
    display: flex;
    column-gap: 16px;
`
