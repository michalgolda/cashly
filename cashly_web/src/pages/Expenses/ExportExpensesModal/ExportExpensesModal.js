import { useFormik } from "formik";
import styled from "styled-components";
import { useMutation } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";

import { expenseAPI } from "@/api";
import { Modal, Input, Button } from "@/components";

const StyledModal = styled(Modal)`
  text-align: center;
`;

const StyledTextContainer = styled.div`
  margin: 16px 0 32px 0;
`;

const StyledForm = styled.form`
  display: grid;
  row-gap: 1rem;
  margin-top: 16px;
`;

export default NiceModal.create(() => {
  const modal = useModal();

  const exportExpensesMutation = useMutation(expenseAPI.exportExpenses, {
    onSuccess: ({ data }) => {
      modal.hide();

      const blob = new Blob([data], { type: "text/csv" });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    },
  });

  const onSubmit = (values) => exportExpensesMutation.mutate(values);
  const initialValues = { fileFormat: "CSV" };
  const { values, handleChange, handleSubmit } = useFormik({
    onSubmit,
    initialValues,
  });

  return (
    <StyledModal {...bootstrapDialog(modal)}>
      <StyledTextContainer>
        <h2>Eksportuj wydatki</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      </StyledTextContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          as="select"
          name="fileFormat"
          onChange={handleChange}
          labelText="Format pliku"
          value={values.fileFormat}
          fullWidth
        >
          <option value="CSV">CSV</option>
        </Input>
        <Button fullWidth>Eksportuj</Button>
      </StyledForm>
    </StyledModal>
  );
});
