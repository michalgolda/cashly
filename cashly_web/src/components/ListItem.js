import styled from 'styled-components'

const ListItem = styled.li`
    padding: 15px;
    border-radius: 2px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
`

export default ListItem
