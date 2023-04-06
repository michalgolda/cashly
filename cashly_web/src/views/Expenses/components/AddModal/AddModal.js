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
            title="Dodawanie wydatku"
            description={`
                Jeśli chcesz dodać nowy wydatek, możesz to zrobić poprzez ponniższy formularz.
            `}
            onSubmit={form.onSubmit}
            submitText="Dodaj"
            initialValues={form.initialValues}
        />
    )
})
