import { useModal } from '@ebay/nice-modal-react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'
import DeleteListItemButton from '@/components/DeleteListItemButton/DeleteListItemButton'
import EditListItemButton from '@/components/EditListItemButton/EditListItemButton'
import { defaultCurrencyFormat } from '@/utils/defaultCurrencyFormat'
import { defaultDateTimeFormat } from '@/utils/defaultDateTimeFormat'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import EditModal from '../../EditModal'
import {
    StyledActions,
    StyledCategory,
    StyledListItem,
    StyledRealisedDate,
    StyledSpan,
} from './ListItem.styled'

function ListItem({ id, amount, category, realisedDate }) {
    const queryClient = useQueryClient()
    const editExpenseModal = useModal(EditModal)

    const notifyDeleteExpenseSuccess = () =>
        toast.success('Wydatek został pomyślnie usunięty')

    const deleteExpenseMutation = useMutation(expenseService.deleteExpense, {
        onSuccess: () => {
            notifyDeleteExpenseSuccess()
            queryClient.invalidateQueries('expenses')
        },
        onError: () => notifyUnhandledError(),
    })

    return (
        <StyledListItem color={category && category.color}>
            <StyledSpan>{defaultCurrencyFormat.format(amount)}</StyledSpan>
            {category ? (
                <StyledCategory color={category.color}>
                    {category.name}
                </StyledCategory>
            ) : (
                <StyledCategory>Brak kategorii</StyledCategory>
            )}
            <StyledRealisedDate>
                {defaultDateTimeFormat.format(new Date(realisedDate))}
            </StyledRealisedDate>
            <StyledActions>
                <EditListItemButton
                    onClick={() => {
                        editExpenseModal.show({
                            id,
                            amount,
                            realisedDate,
                            expenseCategoryId: category ? category.id : null,
                        })
                    }}
                />
                <DeleteListItemButton
                    onClick={() => deleteExpenseMutation.mutate({ id })}
                />
            </StyledActions>
        </StyledListItem>
    )
}

ListItem.propTypes = {
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }),
}

export default ListItem
