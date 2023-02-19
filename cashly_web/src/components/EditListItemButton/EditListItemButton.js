import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { StyledActionButton } from './EditListItemButton.styled'

export default function EditListItemButton(props) {
    return <StyledActionButton icon={faEdit} {...props} />
}
