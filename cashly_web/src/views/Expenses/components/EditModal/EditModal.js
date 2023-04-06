import NiceModal, { useModal } from '@ebay/nice-modal-react'

import BaseModal from '../BaseModal/BaseModal'
import { useUpdateExpenseMutation } from './useUpdateExpenseMutation'

export default NiceModal.create(
    ({ id, amount, realisedDate, expenseCategoryId }) => {
        const modal = useModal()
        const mutation = useUpdateExpenseMutation()

        const initialValues = {
            amount,
            realisedDate,
            expenseCategoryId,
        }

        const onSubmit = (values) => {
            values.expenseCategoryId = values.expenseCategoryId
                ? values.expenseCategoryId
                : null
            mutation.mutate({ id, ...values })
        }

        return (
            <BaseModal
                show={modal.visible}
                onHide={() => modal.hide()}
                title="Edytowanie wydatku"
                description={`
                    Jeśli chcesz zmienić parametry wydatku, możesz to zrobić poprzez ponniższy formularz.
                `}
                onSubmit={onSubmit}
                submitText="Zapisz zmiany"
                initialValues={initialValues}
            />
        )
    }
)
