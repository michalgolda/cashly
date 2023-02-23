import { useModal } from '@ebay/nice-modal-react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'
import DeleteListItemButton from '@/components/DeleteListItemButton/DeleteListItemButton'
import EditListItemButton from '@/components/EditListItemButton/EditListItemButton'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import EditModal from '../../EditModal'
import {
    StyledActions,
    StyledCategory,
    StyledCategoryName,
    StyledListItem,
} from './ListItem.styled'

function ListItem({ id, name, color }) {
    const queryClient = useQueryClient()
    const editCategoryModal = useModal(EditModal)

    const notifyDeleteCategorySuccess = () =>
        toast.success('Kategoria została pomyślnie usunięta')

    const deleteCategoryMutation = useMutation(
        expenseCategoryService.deleteExpenseCategory,
        {
            onSuccess: () => {
                notifyDeleteCategorySuccess()
                queryClient.invalidateQueries('categories')
            },
            onError: () => notifyUnhandledError(),
        }
    )

    return (
        <StyledListItem>
            <StyledCategory color={color}>
                <StyledCategoryName>{name}</StyledCategoryName>
            </StyledCategory>
            <StyledActions>
                <EditListItemButton
                    onClick={() => editCategoryModal.show({ id, name, color })}
                />
                <DeleteListItemButton
                    onClick={() => deleteCategoryMutation.mutate({ id })}
                />
            </StyledActions>
        </StyledListItem>
    )
}

ListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default ListItem
