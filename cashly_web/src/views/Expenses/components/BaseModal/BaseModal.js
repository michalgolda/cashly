import PropTypes from 'prop-types'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import {
    StyledForm,
    StyledModal,
    StyledTextContainer,
} from './BaseModal.styled'
import { useForm } from './useForm'
import { useGetAllExpenseCategoriesQuery } from './useGetAllExpenseCategoriesQuery'

function BaseModal({
    title,
    onSubmit,
    submitText,
    description,
    initialValues,
    ...props
}) {
    initialValues.amount = Number(initialValues.amount).toFixed(2)

    const form = useForm({ onSubmit, initialValues })
    const { data: expenseCategories } = useGetAllExpenseCategoriesQuery()

    return (
        <StyledModal {...props}>
            <StyledTextContainer>
                <h2>{title}</h2>
                <p>{description}</p>
            </StyledTextContainer>
            <StyledForm onSubmit={form.handleSubmit}>
                <Input
                    step="any"
                    type="number"
                    name="amount"
                    labelText="Kwota"
                    value={form.values.amount}
                    onChange={form.handleChange}
                    error={form.touched.amount && form.errors.amount}
                    fullWidth
                />
                <Input
                    as="select"
                    labelText="Kategoria"
                    name="expenseCategoryId"
                    onChange={form.handleChange}
                    value={
                        form.values.expenseCategoryId
                            ? form.values.expenseCategoryId
                            : ''
                    }
                    error={
                        form.touched.expenseCategoryId &&
                        form.errors.expenseCategoryId
                    }
                    fullWidth
                >
                    <option value="">Bez kategorii</option>
                    {expenseCategories &&
                        expenseCategories.map((category, index) => {
                            return (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            )
                        })}
                </Input>
                <Input
                    type="date"
                    name="realisedDate"
                    labelText="Data zrealizowania"
                    onChange={form.handleChange}
                    value={form.values.realisedDate}
                    error={
                        form.touched.realisedDate && form.errors.realisedDate
                    }
                    fullWidth
                />
                <Button type="submit" fullWidth>
                    {submitText}
                </Button>
            </StyledForm>
        </StyledModal>
    )
}

BaseModal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        expenseCategoryId: PropTypes.string,
        realisedDate: PropTypes.string.isRequired,
    }).isRequired,
}

export default BaseModal
