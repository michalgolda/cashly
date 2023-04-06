import NiceModal, { useModal } from '@ebay/nice-modal-react'

import BaseModal from '../BaseModal/BaseModal'
import { useForm } from './useForm'

export default NiceModal.create(() => {
    const modal = useModal()
    const form = useForm()

    return (
        <BaseModal
            show={modal.visible}
            onHide={() => modal.hide()}
            submitText="Utwórz"
            onSubmit={form.onSubmit}
            initialValues={form.initialValues}
            title="Dodawanie kategorii"
            description={`
                Jeśli chcesz dodać nową kategorię, możesz to zrobić poprzez ponniższy formularz.
            `}
        />
    )
})
