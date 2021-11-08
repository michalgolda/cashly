import * as yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Modal, Button, Input } from "../../../components";


const StyledWrapper = styled.div`
	display: grid;
	row-gap: 1rem;
`;

const StyledHeader = styled(StyledWrapper)`text-align: center;`;

const StyledHeaderDescription = styled.p`
	color: ${({ theme }) => theme.colors.gray600};
	font-weight: ${({ theme }) => theme.font.weights.semiBold};	
`;

const StyledForm = styled.form`margin-top: .5rem;`;

export default NiceModal.create(() => {
	const modal = useModal();

	const validationSchema = yup.object().shape({
		name: yup.string()
			.required("Nazwa kategorii jest wymagana.")
			.max(15, "Nazwa kategorii może mieć maksymalnie 15 znaków.")
	});

	const formik = useFormik({
		initialValues: { 
			name: "",
			color: "#30ff37"
		},
		onSubmit(values) {
			console.log(values);
		},
		validationSchema
	});

	return (
		<Modal
			show={modal.visible}
			onClose={() => modal.hide()}
		>
			<StyledWrapper>
				<StyledHeader>
					<h2>Stwórz nową kategorię</h2>
					<StyledHeaderDescription>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh.
					</StyledHeaderDescription>
				</StyledHeader>
				<StyledForm onSubmit={formik.handleSubmit}>
					<StyledWrapper>
						<Input
							type="text"
							name="name"
							labelText="Nazwa"
							value={formik.values.name}
							onChange={formik.handleChange}
							errorText={formik.touched.name && formik.errors.name}
						/>
						<Input
							type="color"
							name="color"
							labelText="Kolor"
							value={formik.values.color}
							onChange={formik.handleChange}
						/>
						<Button type="submit" fullWidth>Utwórz</Button>
					</StyledWrapper>
				</StyledForm>
			</StyledWrapper>
		</Modal>
	);
});