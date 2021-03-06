import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
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

  const queryClient = useQueryClient();

  const importExpensesMutation = useMutation(expenseAPI.importExpenses, {
    onSuccess: () => {
      modal.hide();
      queryClient.invalidateQueries("expenses");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const file = formData.get("file");

    importExpensesMutation.mutate({ file });
  };

  return (
    <StyledModal {...bootstrapDialog(modal)}>
      <StyledTextContainer>
        <h2>Importuj wydatki</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      </StyledTextContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Input name="file" type="file" labelText="Plik" fullWidth />
        <Button fullWidth>Importuj</Button>
      </StyledForm>
    </StyledModal>
  );
});
