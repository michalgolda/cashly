import * as yup from "yup";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import styled from "styled-components";

import { Modal, Button, Input } from "../../../components";


const StyledModal = styled(Modal)`text-align: center;`;

const StyledTextContainer = styled.div`margin: 16px 0 32px 0;`;

const StyledForm = styled.form`
	display: grid;
	row-gap: 1rem;
	margin-top: 16px;
`;

const StyledColorInput = styled(Input)`
	padding: 0;
	height: 40px;

	&::-webkit-color-swatch { border: none; }
	&::-webkit-color-swatch-wrapper { padding: 0; }
`;

function CategoryModal(props) {
    const { 
		title, 
		onSubmit, 
		submitText, 
		description, 
		initialValues  
	} = props;

    const validationSchema = yup.object().shape({
		name: yup.string()
			.required("Nazwa kategorii jest wymagana.")
			.max(25, "Nazwa kategorii może mieć maksymalnie 25 znaków.")
	});

    const formik = useFormik({
        onSubmit,
		initialValues,
		validationSchema,
		enableReinitialize: true
	});

    return (
        <StyledModal {...props}>
			<StyledTextContainer>
				<h2>{title}</h2>
				<p>{description}</p>
			</StyledTextContainer>
			<StyledForm onSubmit={formik.handleSubmit}>
				<Input 
					type="text"
					name="name"
					labelText="Nazwa"
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && formik.errors.name}
					fullWidth
				/>
				<StyledColorInput 
					type="color"
					name="color"
					labelText="Kolor"
					value={formik.values.color}
					onChange={formik.handleChange}
					error={formik.touched.color && formik.errors.color}
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

CategoryModal.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    }).isRequired,
};

export default CategoryModal;