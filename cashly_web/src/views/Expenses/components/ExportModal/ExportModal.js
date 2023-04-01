import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { saveAs } from 'file-saver'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { defaultDateTimeFormat } from '@/utils/defaultDateTimeFormat'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import {
    StyledForm,
    StyledModal,
    StyledTextContainer,
} from './ExportModal.styled'

export default NiceModal.create(() => {
    const modal = useModal()

    const notifyExportExpensesSuccess = () =>
        toast.success('Wydatki zostały pomyślnie wyeksportowane')

    const exportExpensesMutation = useMutation(expenseService.exportExpenses, {
        onSuccess: ({ data }) => {
            modal.hide()

            const blob = new Blob([data], { type: 'text/csv' })
            saveAs(
                blob,
                `Wydatki - ${defaultDateTimeFormat.format(new Date())}`
            )

            notifyExportExpensesSuccess()
        },
        onError: () => notifyUnhandledError(),
    })

    const onSubmit = (values) => exportExpensesMutation.mutate(values)

    const initialValues = { fileFormat: 'CSV' }

    const formik = useFormik({
        onSubmit,
        initialValues,
    })

    return (
        <StyledModal show={modal.visible} onHide={() => modal.hide()}>
            <StyledTextContainer>
                <h2>Eksportowanie wydatków</h2>
                <p>
                    Wygenerowany plik zostanie automatycznie zabezpieczony
                    hasłem. Hasło zostanie wysłane na Twój adres email, abyś
                    mógł/mogła mieć pewność, że Twoje dane są bezpieczne.
                </p>
            </StyledTextContainer>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Input
                    as="select"
                    name="fileFormat"
                    onChange={formik.handleChange}
                    labelText="Format pliku"
                    value={formik.values.fileFormat}
                    fullWidth
                >
                    <option value="CSV">CSV</option>
                </Input>
                <Button fullWidth>Eksportuj</Button>
            </StyledForm>
        </StyledModal>
    )
})
