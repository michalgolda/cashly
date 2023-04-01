import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import {
    StyledForm,
    StyledModal,
    StyledTextContainer,
} from './ImportModal.styled'

export default NiceModal.create(() => {
    const modal = useModal()

    const queryClient = useQueryClient()

    const notifySuccess = () =>
        toast.success('Kategorie wydatków zostały pomyślnie zaimportowane')

    const mutation = useMutation(
        expenseCategoryService.importExpenseCategories,
        {
            onSuccess: () => {
                modal.hide()
                queryClient.invalidateQueries('categories')
                notifySuccess()
            },
            onError: () => notifyUnhandledError(),
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const file = formData.get('file')

        mutation.mutate({ file })
    }

    return (
        <StyledModal show={modal.visible} onHide={() => modal.hide()}>
            <StyledTextContainer>
                <h2>Importowanie kategorii</h2>
                <p>
                    Jeśli masz już listę swoich kategorii, możesz łatwo je
                    zaimportować. Wystarczy, że przygotujesz plik danymi.
                </p>
            </StyledTextContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Input name="file" type="file" labelText="Plik" fullWidth />
                <Button fullWidth>Importuj</Button>
            </StyledForm>
        </StyledModal>
    )
})
