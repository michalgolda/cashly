import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'
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

    const notifyImportExpensesSuccess = () =>
        toast.success('Wydatki zostały pomyślnie zaimportowane')

    const importExpensesMutation = useMutation(expenseService.importExpenses, {
        onSuccess: () => {
            modal.hide()
            queryClient.invalidateQueries('expenses')
            notifyImportExpensesSuccess()
        },
        onError: () => notifyUnhandledError(),
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const file = formData.get('file')

        importExpensesMutation.mutate({ file })
    }

    return (
        <StyledModal show={modal.visible} onHide={() => modal.hide()}>
            <StyledTextContainer>
                <h2>Importuj wydatki</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                </p>
            </StyledTextContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Input name="file" type="file" labelText="Plik" fullWidth />
                <Button fullWidth>Importuj</Button>
            </StyledForm>
        </StyledModal>
    )
})
