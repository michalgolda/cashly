import NiceModal, { useModal } from '@ebay/nice-modal-react'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import {
    StyledForm,
    StyledModal,
    StyledTextContainer,
} from './ImportModal.styled'
import { useImportExpenseMutation } from './useImportExpensesMutation'

export default NiceModal.create(() => {
    const modal = useModal()
    const mutation = useImportExpenseMutation()

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const file = formData.get('file')

        mutation.mutate({ file })
    }

    return (
        <StyledModal show={modal.visible} onHide={() => modal.hide()}>
            <StyledTextContainer>
                <h2>Importowanie wydatków</h2>
                <p>
                    Jeśli masz już listę swoich wydatków, możesz łatwo je
                    zaimportować. Wystarczy, że przygotujesz plik z danymi.
                </p>
            </StyledTextContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Input name="file" type="file" labelText="Plik" fullWidth />
                <Button fullWidth>Importuj</Button>
            </StyledForm>
        </StyledModal>
    )
})
