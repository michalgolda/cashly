import NiceModal, { useModal } from '@ebay/nice-modal-react'

import BaseModal from '../BaseModal/BaseModal'
import { useForm } from './useForm'

export default NiceModal.create(({ id, color, name }) => {
    const modal = useModal()
    const form = useForm(id)

    return (
        <BaseModal
            show={modal.visible}
            onHide={() => modal.hide()}
            onSubmit={form.onSubmit}
            title="Edytowanie kategorii"
            submitText="Zapisz zmiany"
            initialValues={{ color, name }}
            description={`
                Jeśli chcesz zmienić parametry kategorii, możesz to zrobić poprzez ponniższy formularz.
			`}
        />
    )
})
