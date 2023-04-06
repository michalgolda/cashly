import NiceModal, { useModal } from '@ebay/nice-modal-react'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import {
    StyledForm,
    StyledModal,
    StyledTextContainer,
} from './ExportModal.styled'
import { useForm } from './useForm'

export default NiceModal.create(() => {
    const form = useForm()
    const modal = useModal()

    return (
        <StyledModal show={modal.visible} onHide={() => modal.hide()}>
            <StyledTextContainer>
                <h2>Eksportowanie kategorii</h2>
                <p>
                    Wygenerowany plik zostanie automatycznie zabezpieczony
                    hasłem. Hasło zostanie wysłane na Twój adres email, abyś
                    mógł/mogła mieć pewność, że Twoje dane są bezpieczne.
                </p>
            </StyledTextContainer>
            <StyledForm onSubmit={form.handleSubmit}>
                <Input
                    as="select"
                    name="fileFormat"
                    onChange={form.handleChange}
                    labelText="Format pliku"
                    value={form.values.fileFormat}
                    fullWidth
                >
                    <option value="CSV">CSV</option>
                </Input>
                <Button fullWidth>Eksportuj</Button>
            </StyledForm>
        </StyledModal>
    )
})
