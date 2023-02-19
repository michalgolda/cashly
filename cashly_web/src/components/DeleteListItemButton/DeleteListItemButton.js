import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { StyledActionButton } from './DeleteListItemButton.styled'

export default function DeleteListItemButton(props) {
    return <StyledActionButton icon={faTrash} {...props} />
}
