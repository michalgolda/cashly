import * as yup from "yup";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import styled from "styled-components";
import { useQuery } from "react-query";

import { getAllExpenseCategories } from "../../../queries";
import { Modal, Button, Input } from "../../../components";


const StyledModal = styled(Modal)`text-align: center;`;

const StyledTextContainer = styled.div`margin: 16px 0 32px 0;`;

const StyledForm = styled.form`
	display: grid;
	row-gap: 1rem;
	margin-top: 16px;
`;

function ExpenseModal(props) {
    const {
        title,
        onSubmit, 
        submitText, 
        description, 
        initialValues
    } = props;

    const validationSchema = yup.object().shape({
		amount: yup.number()
            .required("Kwota jest wymagana.")
            .positive("Podaj prawidłową wartość.")
            .min(0.01, "Minimalna wartość to 0.01")
            .max(99999.00, "Maksymalna wartość to 99999.00"),
        realised_date: yup.date()
            .required("Data zrealizowania wydatku jest wymagana.")
    });

    initialValues.amount = Number(initialValues.amount).toFixed(2);

    const {  
        values,
        errors,
        touched,
        handleChange,
        handleSubmit
    } = useFormik({
        onSubmit,
		initialValues,
		validationSchema
	});

    const { data } = useQuery(
        "categories", 
        getAllExpenseCategories
    );

    return (
        <StyledModal {...props}>
			<StyledTextContainer>
				<h2>{title}</h2>
				<p>{description}</p>
			</StyledTextContainer>
			<StyledForm onSubmit={handleSubmit}>
				<Input 
                    step="any"
					type="number"
					name="amount"
					labelText="Kwota"
					value={values.amount}
					error={touched.amount && errors.amount}
					fullWidth
				/>
                <Input 
                    as="select"
                    labelText="Kategoria"
                    name="expense_category_id"
                    onChange={handleChange}
                    value={values.expense_category_id}
                    error={touched.expense_category_id && errors.expense_category_id}
                    fullWidth
                >
                    <option value="">Bez kategorii</option>
                    {data && data.map((category, index) => {
                        return (
                            <option 
                                key={index} 
                                value={category.id} 
                            >
                                {category.name}
                            </option>
                        );
                    })}
                </Input>
                <Input 
                    type="date"
                    name="realised_date"
                    labelText="Data zrealizowania"
                    onChange={handleChange}
                    value={values.realised_date}
                    error={touched.realised_date && errors.realised_date}
                    fullWidth
                />
				<Button 
					type="submit" 
					fullWidth
				>
					{submitText}
				</Button>
			</StyledForm>
		</StyledModal>
    );
}

ExpenseModal.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        expense_category_id: PropTypes.string.isRequired
    }).isRequired
};

export default ExpenseModal;